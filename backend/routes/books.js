import express from 'express';
import mongoose from 'mongoose';
import Book from '../models/Book.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Helper to query book by ObjectId or custom id string
const findBookById = async (id) => {
  const query = {};
  if (mongoose.isValidObjectId(id)) {
    query.$or = [{ _id: id }, { id: id }];
  } else {
    query.id = id;
  }
  return await Book.findOne(query);
};

// @desc    Get all books
// @route   GET /api/books
// @access  Public
router.get('/', async (req, res) => {
  try {
    const books = await Book.find({}).sort({ createdAt: -1 });
    res.json(books);
  } catch (error) {
    console.error('Fetch books error:', error);
    res.status(500).json({ message: 'Server error fetching books' });
  }
});

// @desc    Get book by ID
// @route   GET /api/books/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const book = await findBookById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    console.error('Fetch book error:', error);
    res.status(500).json({ message: 'Server error fetching book details' });
  }
});

// @desc    Create a book
// @route   POST /api/books
// @access  Private/Admin
router.post('/', protect, adminOnly, async (req, res) => {
  const { id, title, author, description, genres, tags, type, coverImageId, chapters } = req.body;

  try {
    const processedChapters = (chapters || []).map(ch => ({
      id: ch.id || `ch_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title: ch.title,
      pageImageIds: ch.pageImageIds || [],
      content: ch.content || '',
      group: ch.group || 'System Translation',
      volume: ch.volume || 'Vol. 1',
      likes: ch.likes || 0,
      comments: ch.comments || [],
    }));

    const newBook = new Book({
      id: id || `book_${Date.now()}`,
      title,
      author,
      description: description || '',
      genres: genres || [],
      tags: tags || [],
      type: type || 'comic',
      coverImageId,
      uploadedBy: req.user._id,
      chapters: processedChapters,
    });

    const createdBook = await newBook.save();
    res.status(201).json(createdBook);
  } catch (error) {
    console.error('Create book error:', error);
    res.status(500).json({ message: 'Server error creating book' });
  }
});

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private/Admin
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const book = await findBookById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    await Book.deleteOne({ _id: book._id });
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Delete book error:', error);
    res.status(500).json({ message: 'Server error deleting book' });
  }
});

// @desc    Add a chapter to a book
// @route   POST /api/books/:id/chapters
// @access  Private/Admin
router.post('/:id/chapters', protect, adminOnly, async (req, res) => {
  const { title, pageImageIds, content, group, volume } = req.body;

  try {
    const book = await findBookById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const newChapter = {
      id: req.body.id || `ch_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title,
      pageImageIds: pageImageIds || [],
      content: content || '',
      group: group || 'System Translation',
      likes: 0,
      volume: volume || 'Vol. 1',
      createdAt: new Date()
    };

    book.chapters.push(newChapter);
    await book.save();

    res.status(201).json(book);
  } catch (error) {
    console.error('Add chapter error:', error);
    res.status(500).json({ message: 'Server error adding chapter' });
  }
});

// @desc    Rate a book
// @route   POST /api/books/:id/rate
// @access  Public
router.post('/:id/rate', async (req, res) => {
  const { rating } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Valid rating (1-5) is required' });
  }

  try {
    const book = await findBookById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Calculate rolling average
    const currentRating = parseFloat(book.rating || 4.5);
    const currentCount = book.ratingsCount || 15;
    const newCount = currentCount + 1;
    const newRating = parseFloat(((currentRating * currentCount + parseFloat(rating)) / newCount).toFixed(1));

    book.rating = newRating;
    book.ratingsCount = newCount;

    await book.save();
    res.json(book);
  } catch (error) {
    console.error('Rate book error:', error);
    res.status(500).json({ message: 'Server error rating book' });
  }
});

// @desc    Increment book views
// @route   POST /api/books/:id/views
// @access  Public
router.post('/:id/views', async (req, res) => {
  try {
    const book = await findBookById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    book.views = (book.views || 0) + 1;
    await book.save();

    res.json({ views: book.views });
  } catch (error) {
    console.error('Increment views error:', error);
    res.status(500).json({ message: 'Server error incrementing views' });
  }
});

// @desc    Add a comment to a book or chapter
// @route   POST /api/books/:id/comments
// @access  Public
router.post('/:id/comments', async (req, res) => {
  const { chapterIndex, comment } = req.body;

  if (!comment || !comment.content) {
    return res.status(400).json({ message: 'Comment content is required' });
  }

  try {
    const book = await findBookById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const newComment = {
      id: comment.id || `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      username: comment.username || 'Guest Reader',
      avatar: comment.avatar || 'G',
      content: comment.content,
      rating: comment.rating || null,
      timestamp: new Date()
    };

    if (chapterIndex !== undefined && chapterIndex !== null) {
      const idx = parseInt(chapterIndex);
      if (book.chapters && book.chapters[idx]) {
        if (!book.chapters[idx].comments) {
          book.chapters[idx].comments = [];
        }
        book.chapters[idx].comments.push(newComment);
      } else {
        return res.status(404).json({ message: 'Chapter not found' });
      }
    } else {
      book.comments.push(newComment);
    }

    await book.save();
    res.status(201).json(book);
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ message: 'Server error adding comment' });
  }
});

export default router;

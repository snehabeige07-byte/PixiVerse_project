import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  id: { type: String, required: true },
  username: { type: String, required: true },
  avatar: { type: String, default: 'G' },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  rating: { type: Number, default: null }
});

const chapterSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  pageImageIds: [{ type: String }], // Array of uploaded page images paths
  content: { type: String, default: '' }, // Markdown/text content for novels
  group: { type: String, default: 'System Translation' },
  likes: { type: Number, default: 0 },
  volume: { type: String, default: 'Vol. 1' },
  comments: [commentSchema], // Support chapter-specific comments
  createdAt: { type: Date, default: Date.now }
});

const bookSchema = new mongoose.Schema({
  id: { type: String, unique: true }, // Custom string identifier (e.g., "cyberpunk_odyssey")
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  genres: [{ 
    type: String, 
    required: true 
  }],
  tags: [{ 
    type: String, 
    trim: true 
  }],
  type: { type: String, enum: ['comic', 'novel'], default: 'comic' },
  coverImageId: { type: String, required: true },
  rating: { type: Number, default: 4.5 },
  ratingsCount: { type: Number, default: 1 },
  views: { type: Number, default: 0 },
  uploadedBy: { type: String, default: null },
  isFavorite: { type: Boolean, default: false },
  comments: [commentSchema],
  chapters: [chapterSchema]
}, {
  timestamps: true
});

const Book = mongoose.model('Book', bookSchema);
export default Book;

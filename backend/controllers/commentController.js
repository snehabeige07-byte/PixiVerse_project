import Comment from '../models/Comment.js';

/**
 * Helper function to build a nested tree from a flat array of Mongoose documents
 */
const buildCommentTree = (flatComments) => {
  const map = {};
  const roots = [];

  // Convert to plain JS objects and initialize .replies array
  flatComments.forEach(comment => {
    // using .toObject() or .toJSON() if needed, but since we are iterating 
    // it's safer to map to a plain object first to avoid strict mongoose immutability
    const plainComment = comment.toObject ? comment.toObject() : comment;
    map[plainComment._id.toString()] = { ...plainComment, replies: [] };
  });

  flatComments.forEach(comment => {
    const plainComment = map[comment._id.toString()];
    if (plainComment.parentId) {
      const parentStrId = plainComment.parentId.toString();
      if (map[parentStrId]) {
        map[parentStrId].replies.push(plainComment);
      }
    } else {
      roots.push(plainComment);
    }
  });

  return roots;
};

/**
 * Fetch all comments for a given comicId and chapterId, applying sorting logic and tree structure.
 */
export const getComments = async (req, res) => {
  try {
    const { comicId, chapterId } = req.params;
    const { sort = 'newest' } = req.query;
    
    // Determine sort condition
    let sortCondition = { createdAt: -1 }; // newest by default
    if (sort === 'oldest') {
      sortCondition = { createdAt: 1 };
    } else if (sort === 'best') {
      // Sort by upvotes desc, then fallback to newest
      sortCondition = { upvotes: -1, createdAt: -1 };
    }

    // Find all comments by comicId AND chapterId, sort dynamically
    // Mongoose array will be ordered by the sortCondition. 
    // Tree building preserves the ordered child insertions.
    const comments = await Comment.find({ comicId, chapterId }).sort(sortCondition);
    
    // Parse the flat array into a nested tree structure
    const tree = buildCommentTree(comments);
    
    return res.status(200).json(tree);
  } catch (error) {
    console.error('Error in getComments controller:', error);
    return res.status(500).json({ message: 'Failed to fetch comments', error: error.message });
  }
};

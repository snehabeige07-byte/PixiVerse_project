import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  comicId: { 
    type: String, 
    required: true,
  },
  chapterId: {
    type: String,
    required: true,
  },
  parentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Comment', 
    default: null 
  },
  username: { 
    type: String, 
    required: true 
  },
  text: { 
    type: String, 
    required: true 
  },
  upvotes: { 
    type: Number, 
    default: 0 
  },
  downvotes: { 
    type: Number, 
    default: 0 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Compound index for efficient querying by specific chapter
commentSchema.index({ comicId: 1, chapterId: 1 });

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;

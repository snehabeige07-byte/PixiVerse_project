import mongoose from 'mongoose';

const uploadSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    trim: true 
  },
  description: { 
    type: String, 
    default: '' 
  },
  genres: { 
    type: [String], 
    default: [] 
  },
  tags: { 
    type: [String], 
    default: [] 
  },
  type: { 
    type: String, 
    enum: ['comic', 'novel'], 
    default: 'comic' 
  },
  uploadedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    default: null 
  }
}, {
  timestamps: true
});

const Upload = mongoose.model('Upload', uploadSchema);
export default Upload;

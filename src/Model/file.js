import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  originalName: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  gradeLevel: {
    type: String,
    required: true
  },
  firebasePath:{
    type: String,
    required: true
  },
  downloadURL: {
    type: String,
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('File', fileSchema);
// Compare this snippet from server.js:
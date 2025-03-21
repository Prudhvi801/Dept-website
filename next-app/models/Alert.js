import mongoose from 'mongoose';

// Check if the Alert model already exists to prevent overwriting
const AlertSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    maxlength: [60, 'Title cannot be more than 60 characters']
  },
  content: {
    type: String,
    required: [true, 'Please provide content'],
    maxlength: [200, 'Content cannot be more than 200 characters']
  },
  date: {
    type: Date,
    default: Date.now
  },
  isNewAlert: {  // Changed from isNew to isNewAlert
    type: Boolean,
    default: true
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  // Add this option to suppress the warning if you still need to use isNew elsewhere
  suppressReservedKeysWarning: true
});

// Export the model or create it if it doesn't exist
export default mongoose.models.Alert || mongoose.model('Alert', AlertSchema);
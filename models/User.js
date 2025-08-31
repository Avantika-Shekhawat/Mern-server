import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: true,
    trim: true
  },
  Email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  Password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export default mongoose.model('users', userSchema);

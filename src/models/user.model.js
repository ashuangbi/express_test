import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gestionnaire_ref: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gestionnaire',
  },
});

UserSchema.methods.comparePassword = (userPw, pw, cb) => {
  bcrypt.compare(pw, userPw, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    return cb(null, isMatch);
  });
};

/**
 * @typedef User
 */
module.exports = mongoose.model('User', UserSchema);

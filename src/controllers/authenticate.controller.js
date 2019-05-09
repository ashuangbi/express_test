import httpStatus from 'http-status';
import Config from 'config';
import jwt from 'jsonwebtoken';

import User from '../models/user.model';

async function login(req, res) {
  const user = await User.findOne({
    username: req.body.username,
  });
  if (!user) {
    return res.status(httpStatus.UNAUTHORIZED)
      .json({ success: false, message: 'Authentication failed.' });
  }

  return user.comparePassword(user.password, req.body.password, (err, isMatch) => {
    if (isMatch && !err) {
      const payload = {
        id: user._id,
        gestionnaire_ref: user.gestionnaire_ref,
      };
      jwt.sign(
        payload,
        Config.get('JWT_secret'),
        {
          expiresIn: 86400,
        },
        (err, token) => {
          if (err) console.error('There is some error in token', err);
          else {
            res.json({
              success: true,
              token: `Bearer ${token}`,
            });
          }
        },
      );
    } else {
      res
        .status(httpStatus.UNAUTHORIZED)
        .json({ success: false, message: 'Authentication failed.' });
    }
  });
}

module.exports = {
  login,
};

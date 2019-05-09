import express from 'express';
import expressJwt from 'express-jwt';
import Config from 'config';
import clientCtrl from '../controllers/client.controller';
import { getPagination } from '../middleware/pagination';

const router = express.Router();
const jwtSecret = Config.get('JWT_secret');

router.route('/')
  .get(
    expressJwt({
      secret: jwtSecret,
    }),
    getPagination,
    clientCtrl.getUserList,
  );

module.exports = router;

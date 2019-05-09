import express from 'express';
import authenticateCtrl from '../controllers/authenticate.controller';

const router = express.Router();

router.route('/')
  .post(authenticateCtrl.login);

module.exports = router;

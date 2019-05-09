import express from 'express';
import expressJwt from 'express-jwt';
import Config from 'config';
import gestionnaireCtrl from '../controllers/gestionnaire.controller';

const router = express.Router();
const jwtSecret = Config.get('JWT_secret');

router.route('/agentNumber')
  .get(
    expressJwt({
      secret: jwtSecret,
    }),
    gestionnaireCtrl.getAgentNumber,
  );

module.exports = router;

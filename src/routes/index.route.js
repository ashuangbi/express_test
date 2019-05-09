import express from 'express';
import authenticateRoutes from './authenticate.route';
import clientRoutes from './client.route';
import gestionnaireRoutes from './gestionnaire.route';

const router = new express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API',
  });
});

router.use('/authenticate', authenticateRoutes);
router.use('/client', clientRoutes);
router.use('/gestionnaire', gestionnaireRoutes);

module.exports = router;

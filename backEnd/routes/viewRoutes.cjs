const express = require('express');
const viewsController = require('../controllers/viewsController.cjs');

const router = express.Router();

router.get('/', viewsController.getHome);
router.get('/news/:slug(*)', viewsController.getNews);
router.get('/guides/:slug(*)', viewsController.getGuide);
router.get('/guides-overview', viewsController.getOverview);

module.exports = router;

const express = require('express');
const viewsController = require('../controllers/viewsController.cjs');

const router = express.Router();

router.get('/', viewsController.getHome);
router.get('/news/:slug', viewsController.getNews);

module.exports = router;

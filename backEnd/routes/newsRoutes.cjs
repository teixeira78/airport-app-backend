const express = require('express');
const newsController = require('../controllers/newsController.cjs');

const router = express.Router();

router
  .route('/')
  .get(newsController.getAllNews)
  .post(newsController.createNews);

router
  .route('/:id')
  .get(newsController.getNews)
  .patch(newsController.updateNews)
  .delete(newsController.deleteNews);

module.exports = router;

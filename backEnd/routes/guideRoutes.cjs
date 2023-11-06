const express = require('express');
const guideController = require('../controllers/guideController.cjs');

const router = express.Router();

router
  .route('/')
  .get(guideController.getAllGuides)
  .post(guideController.createGuide);

router
  .route('/:id')
  .get(guideController.getGuide)
  .patch(guideController.updateGuide)
  .delete(guideController.deleteGuide);

module.exports = router;

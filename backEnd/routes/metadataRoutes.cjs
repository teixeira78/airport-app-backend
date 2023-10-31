const express = require('express');
const metadataController = require('../controllers/metadataController.cjs');

const router = express.Router();

router.route('/').get(metadataController.getMetadata);

module.exports = router;

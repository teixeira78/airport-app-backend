const express = require('express');
const flightController = require('../controllers/flightController.cjs');

const router = express.Router();

router.route('/').get(flightController.getFlights);

module.exports = router;

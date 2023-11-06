const Guide = require('../models/guideModel.cjs');
const factory = require('./handlerFactory.cjs');

exports.getAllGuides = factory.getAll(Guide);
exports.getGuide = factory.getOne(Guide);
exports.createGuide = factory.createOne(Guide);
exports.updateGuide = factory.updateOne(Guide);
exports.deleteGuide = factory.deleteOne(Guide);

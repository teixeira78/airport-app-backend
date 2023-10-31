const Hotel = require('../models/hotelModel.cjs');
const factory = require('./handlerFactory.cjs');

exports.getAllHotels = factory.getAll(Hotel);
exports.getHotel = factory.getOne(Hotel);
exports.createHotel = factory.createOne(Hotel);
exports.updateHotel = factory.updateOne(Hotel);
exports.deleteHotel = factory.deleteOne(Hotel);

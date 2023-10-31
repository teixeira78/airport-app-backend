const News = require('../models/newsModel.cjs');
const factory = require('./handlerFactory.cjs');

exports.getAllNews = factory.getAll(News);
exports.getNews = factory.getOne(News);
exports.createNews = factory.createOne(News);
exports.updateNews = factory.updateOne(News);
exports.deleteNews = factory.deleteOne(News);

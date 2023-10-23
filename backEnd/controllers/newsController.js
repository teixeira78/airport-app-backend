const News = require('../models/newsModel');
const factory = require('./handlerFactory');

exports.getAllNews = factory.getAll(News);
exports.getNews = factory.getOne(News);
exports.createNews = factory.createOne(News);
exports.updateNews = factory.updateOne(News);
exports.deleteNews = factory.deleteOne(News);

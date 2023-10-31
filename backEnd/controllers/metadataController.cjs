const catchAsync = require('../utils/catchAsync.cjs');
const News = require('../models/newsModel.cjs');
const Hotel = require('../models/hotelModel.cjs');

exports.getMetadata = catchAsync(async (req, res) => {
  const newsCount = await News.countDocuments();
  const hotelCount = await Hotel.countDocuments();

  const metadata = {
    newsCount,
    hotelCount,
  };

  res.status(200).json({ metadata });
});

const catchAsync = require('../utils/catchAsync.cjs');
const News = require('../models/newsModel.cjs');
const Hotel = require('../models/hotelModel.cjs');

exports.getMetadata = catchAsync(async (req, res) => {
  // Unwind data array inside news doc
  const newsDoc = await News.aggregate([
    {
      $unwind: '$data',
    },
  ]);

  // Get the length to send newsCount as the metadata
  const newsCount = newsDoc.length;

  // Count the docs in Hotel documents
  const hotelCount = await Hotel.countDocuments();

  const metadata = {
    newsCount,
    hotelCount,
  };

  // Sent metadata as response
  res.status(200).json({ metadata });
});

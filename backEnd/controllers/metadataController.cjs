const catchAsync = require('../utils/catchAsync.cjs');
const News = require('../models/newsModel.cjs');
const Hotel = require('../models/hotelModel.cjs');
const aggregations = require('../mongodb/aggregations.cjs');
const constants = require('../utils/constants.cjs');

let currentNewsType;

exports.updateNewsType = (type) => {
  currentNewsType = type;
};

exports.getMetadata = catchAsync(async (req, res) => {
  const nationalNewsData = await News.aggregate(
    aggregations.countDataArr(constants.NEWS_TYPE_NATIONAL),
  );

  const aviationNewsData = await News.aggregate(
    aggregations.countDataArr(constants.NEWS_TYPE_AVIATION),
  );

  const nationalNewsCount = nationalNewsData[0].count;
  const aviationNewsCount = aviationNewsData[0].count;

  // Get the length to send newsCount as the metadata
  // Count the docs in Hotel documents
  const hotelCount = await Hotel.countDocuments();

  const metadata = {
    newsData: [
      {
        type: constants.NEWS_TYPE_NATIONAL,
        count: nationalNewsCount,
      },
      {
        type: constants.NEWS_TYPE_AVIATION,
        count: aviationNewsCount,
      },
    ],
    newsType: currentNewsType,
    hotelCount,
  };

  console.log(metadata);

  // Sent metadata as response
  res.status(200).json({ metadata });
});

const News = require('../models/newsModel.cjs');
const Guide = require('../models/guideModel.cjs');
const AppError = require('../utils/appError.cjs');
const catchAsync = require('../utils/catchAsync.cjs');
const APIFeatures = require('../utils/apiFeature.cjs');
const helper = require('../utils/helper.cjs');
const aggregations = require('../mongodb/aggregations.cjs');
const metadata = require('./metadataController.cjs');

exports.getHome = catchAsync(async (req, res) => {
  // 1) Get data from collection and map it

  // Get Guides data
  const guideType = 'passenger';

  const guidesDoc = await Guide.aggregate(
    aggregations.createGuideAggPipeline(guideType),
  );

  const guides = guidesDoc[0].data;

  // Get News data by type
  const nationalNews = await helper.getDataByType(News, 'national');
  const airportNews = await helper.getDataByType(News, 'aviation');

  // 2) Render the template using data from 1)
  res.status(200).render('home', {
    title: 'Welcome',
    nationalNews,
    airportNews,
    guides,
  });
});

exports.getNews = catchAsync(async (req, res, next) => {
  // Get current slug from the request param
  const currentSlug = req.params.slug;

  // Extract type from slug - format 'type/title'
  const newsType = helper.extractTypeFromSlug(currentSlug);

  metadata.updateNewsType(newsType);

  // Find News data where data.slug = currentSlug and return the first matching element
  const currentNewsDoc = await News.findOne(
    { 'data.slug': currentSlug },
    { 'data.$': 1 },
  );

  const currentNews = currentNewsDoc.data[0];

  // Paginate News doc with the parameteres requested from the client
  const features = new APIFeatures(
    News.aggregate(aggregations.createNewsAggPipeline(newsType, currentSlug)),
    req.query,
  ).paginate();

  const news = await features.query;

  // Check if the client accepts HTML or JSON format
  if (req.accepts('html')) {
    res.status(200).render('news', {
      title: currentNews.title,
      newsType,
      currentNews,
      news,
    });
  } else if (req.accepts('json')) {
    res.status(200).json({
      news,
    });
  }
});

exports.getGuide = catchAsync(async (req, res, next) => {
  // slug format - type/title. Extract the type by splitting the string
  const currentSlug = req.params.slug;
  const guideType = helper.extractTypeFromSlug(currentSlug);

  // Iterate through doc to find current guide
  const currentGuideDoc = await Guide.findOne(
    { type: guideType, 'data.slug': currentSlug },
    { 'data.$': 1 },
  );

  if (!currentGuideDoc)
    return next(new AppError('No document found with that ID', 404));

  const currentGuide = currentGuideDoc.data[0];

  const relatedGuides = await Guide.aggregate(
    aggregations.guidePagePipeline(guideType, currentSlug),
  );

  // send data to be rendered using PUG
  res.status(200).render('guide', {
    title: currentGuide.title,
    currentGuide,
    relatedGuides,
  });
});

exports.getOverview = catchAsync(async (req, res) => {
  // Execute an aggregation pipeline on the 'Guide' collection
  const guides = await Guide.aggregate(aggregations.overviewPagePipeline);

  // send data to be rendered using PUG
  res.status(200).render('guideOverview', {
    title: 'Guide Overview',
    guides,
  });
});

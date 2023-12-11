const News = require('../models/newsModel.cjs');
const Guide = require('../models/guideModel.cjs');
const AppError = require('../utils/appError.cjs');
const catchAsync = require('../utils/catchAsync.cjs');
const APIFeatures = require('../utils/apiFeature.cjs');
const helper = require('../utils/helper.cjs');
const aggregations = require('../utils/aggregations.cjs');

exports.getHome = catchAsync(async (req, res) => {
  // 1) Get data from collection and map it

  // Get Guides data
  const guideType = 'passenger';
  const guidesDoc = await Guide.aggregate([
    aggregations.commonAggregations.matchByType(guideType),
    {
      $project: {
        data: {
          $map: {
            input: '$data',
            as: 'item',
            in: {
              title: '$$item.title',
              subtitle: '$$item.subtitle',
              slug: '$$item.slug',
              icon: '$$item.icon',
            },
          },
        },
      },
    },
  ]);

  const guides = guidesDoc[0].data;

  // Get News data by type
  const latestNews = await helper.getDataByType(News, 'national');
  const airportNews = await helper.getDataByType(News, 'aviation');

  // 2) Render the template using data from 1)
  res.status(200).render('home', {
    title: 'Welcome',
    latestNews,
    airportNews,
    guides,
  });
});

exports.getNews = catchAsync(async (req, res, next) => {
  // Get current slug from the request param
  const currentSlug = req.params.slug;

  // Extract type from slug - format 'type/title'
  const newsType = helper.extractTypeFromSlug(currentSlug);

  // Find News data where data.slug = currentSlug and return the first matching element
  const currentNewsDoc = await News.findOne(
    { 'data.slug': currentSlug },
    { 'data.$': 1 },
  );

  const currentNews = currentNewsDoc.data[0];

  // PipeLine for MongoDb query
  const aggregationPipeLine = [
    aggregations.commonAggregations.matchByType(newsType),
    aggregations.commonAggregations.unwindData(),
    aggregations.commonAggregations.matchSlugNotEqual(currentSlug),

    {
      // Group the documents to create a new array 'documents' with specified fields
      $group: {
        _id: null,
        documents: {
          $push: {
            title: '$data.title',
            slug: aggregations.commonAggregations.projectSlug(),
            coverImg: '$data.coverImg',
            publishDate: '$data.publishDate',
          },
        },
      },
    },

    aggregations.commonAggregations.unwindDocuments(),
    aggregations.commonAggregations.replaceRootWithDocuments(),
  ];

  // Paginate News doc with the parameteres requested from the client
  const features = new APIFeatures(
    News.aggregate(aggregationPipeLine),
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
  const type = currentSlug.split('/')[0];

  // Iterate through doc to find current guide
  const currentGuideDoc = await Guide.findOne(
    { type, 'data.slug': currentSlug },
    { 'data.$': 1 },
  );

  if (!currentGuideDoc)
    return next(new AppError('No document found with that ID', 404));

  const currentGuide = currentGuideDoc.data[0];

  const aggregationPipeLine = [
    aggregations.commonAggregations.matchByType(type),

    aggregations.commonAggregations.unwindData(),

    aggregations.commonAggregations.matchSlugNotEqual(currentSlug),
    {
      // Group the docs to create a new array 'documents' with specified fields
      $group: {
        _id: null,
        documents: {
          $push: {
            title: '$data.title',
            slug: aggregations.commonAggregations.projectSlug(),
          },
        },
      },
    },

    aggregations.commonAggregations.unwindDocuments(),

    aggregations.commonAggregations.replaceRootWithDocuments(),
  ];

  const relatedGuides = await Guide.aggregate(aggregationPipeLine);

  // send data to be rendered using PUG
  res.status(200).render('guide', {
    title: currentGuide.title,
    currentGuide,
    relatedGuides,
  });
});

exports.getOverview = catchAsync(async (req, res) => {
  const aggregationPipeLine = [
    // Project stage: Shape the output document by including specific fields
    {
      $project: {
        // Include the 'title' and 'subtitle' fields in the output document
        title: 1,
        subtitle: 1,
        // Use the 'map' operator to transform the 'data' array
        data: {
          $map: {
            // Specify the input array for 'map' as the 'data' field
            input: '$data',
            // Define a variable 'item' to represent each element in the 'data' array
            as: 'item',
            // Specify the transformation for each element in the 'data' array
            in: {
              title: '$$item.title',
              slug: '$$item.slug',
            },
          },
        },
      },
    },
  ];

  // Execute an aggregation pipeline on the 'Guide' collection
  const guides = await Guide.aggregate(aggregationPipeLine);

  // send data to be rendered using PUG
  res.status(200).render('guideOverview', {
    title: 'Guide Overview',
    guides,
  });
});

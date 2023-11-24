const News = require('../models/newsModel.cjs');
const Guide = require('../models/guideModel.cjs');
const APIFeatures = require('../utils/apiFeature.cjs');
const catchAsync = require('../utils/catchAsync.cjs');
const helper = require('../utils/helper.cjs');

// TODO: Understand the AppError and Error handling on prod and dev mode. Watch the udemy video again;

// FIXME: Render the overview page with the intended data and set title for each data type: e.g: Passanger Guide, etc ...

// BUG: @Get guide, all the guides are being displayed. Need to filter the guides according to the category

exports.getHome = catchAsync(async (req, res) => {
  // 1) Get data from collection
  const guidesData = await Guide.find({
    category: {
      $in: [
        'health',
        'immigration',
        'check_in',
        'security',
        'baggage',
        'transport',
      ],
    },
  });

  const latestNews = await helper.getDataByType(News, 'national');
  const airportNews = await helper.getDataByType(News, 'airport');

  // 2) Specify the fields needed
  const guides = guidesData.map((guide) => ({
    slug: guide.slug,
    title: guide.title,
    subtitle: guide.subtitle,
    icon: guide.icon,
  }));

  // 3) Render the template using news data from 2)
  res.status(200).render('home', {
    title: 'Welcome',
    latestNews,
    airportNews,
    guides,
  });
});

exports.getNews = catchAsync(async (req, res) => {
  const currentNews = await News.findOne({ slug: req.params.slug });
  const features = new APIFeatures(
    News.find({ slug: { $ne: currentNews.slug } }),
    req.query,
  ).paginate();

  const news = await features.query;

  if (req.accepts('html')) {
    res.status(200).render('news', {
      title: currentNews.title,
      currentNews,
      news,
    });
  } else if (req.accepts('json')) {
    const reducedNews = news.map((el) => ({
      slug: el.slug,
      title: el.title,
      coverImg: el.coverImg,
      publishDate: el.publishDate.toLocaleString('en-us', {
        month: 'long',
        year: 'numeric',
      }),
    }));

    res.status(200).json({
      news: reducedNews,
    });
  }
});

exports.getGuide = catchAsync(async (req, res) => {
  const currentGuide = await Guide.findOne({ slug: req.params.slug });

  const guideData = await Guide.find();
  const guides = guideData.map((el) => ({
    slug: el.slug,
    title: el.title,
  }));

  res.status(200).render('guide', {
    title: currentGuide.title,
    currentGuide,
    guides,
  });
});

exports.getOverview = catchAsync(async (req, res) => {
  const passangerGuide = await helper.getGuideData('passanger');
  const serviceGuide = await helper.getGuideData('services');
  const airportGuide = await helper.getGuideData('airport');

  res.status(200).render('guideOverview', {
    title: 'Guide Overview',
    passangerGuide,
    serviceGuide,
    airportGuide,
  });
});

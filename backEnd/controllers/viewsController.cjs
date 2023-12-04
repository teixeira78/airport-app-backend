const News = require('../models/newsModel.cjs');
const Guide = require('../models/guideModel.cjs');
const APIFeatures = require('../utils/apiFeature.cjs');
const catchAsync = require('../utils/catchAsync.cjs');
const helper = require('../utils/helper.cjs');

// TODO: Understand the AppError and Error handling on prod and dev mode. Watch the udemy video again;

// [x]: Render the overview page with the intended data and set title for each data type: e.g: Passanger Guide, etc ...

// [x]: @Get guide, all the guides are being displayed. Need to filter the guides according to the category

exports.getHome = catchAsync(async (req, res) => {
  // 1) Get data from collection
  const doc = await Guide.find({
    type: {
      $in: 'passenger',
    },
  });

  const guidesData = doc[0].data;

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
  const currentSlug = req.params.slug;
  const type = currentSlug.split('/')[0];

  const doc = await Guide.find({
    type,
  });

  const currentGuide = doc[0].data.find((el) => el.slug === currentSlug);
  const guides = doc[0].data
    .filter((el) => el.slug !== currentSlug)
    .map((el) => ({
      title: el.title,
      slug: el.slug.split('/')[1],
    }));

  res.status(200).render('guide', {
    title: currentGuide.title,
    currentGuide,
    guides,
  });
});

exports.getOverview = catchAsync(async (req, res) => {
  const doc = await Guide.find();

  const guides = doc.map((guide) => ({
    type: guide.type,
    title: guide.title,
    subtitle: guide.subtitle,
    data: guide.data.map((item) => ({
      title: item.title,
      slug: item.slug,
    })),
  }));

  res.status(200).render('guideOverview', {
    title: 'Guide Overview',
    guides,
  });
});

const News = require('../models/newsModel.cjs');
const Guide = require('../models/guideModel.cjs');
const APIFeatures = require('../utils/apiFeature.cjs');
const catchAsync = require('../utils/catchAsync.cjs');

exports.getHome = catchAsync(async (req, res) => {
  // 1) Get data from collection
  const newsData = await News.find();
  const guidesData = await Guide.find();

  const latestNews = newsData.filter((news) => news.type === 'national');
  const airportNews = newsData.filter((news) => news.type === 'airport');
  const guides = guidesData.map((el) => ({
    slug: el.slug,
    title: el.title,
    subtitle: el.subtitle,
    icon: el.icon,
  }));

  // 2) Build template
  // 3) Render the template using news data from 1)
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

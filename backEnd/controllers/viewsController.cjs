const News = require('../models/newsModel.cjs');
const APIFeatures = require('../utils/apiFeature.cjs');
const catchAsync = require('../utils/catchAsync.cjs');

exports.getHome = catchAsync(async (req, res) => {
  // 1) Get news data from collection
  const data = await News.find();

  const latestNews = data.filter((news) => news.type === 'national');
  const airportNews = data.filter((news) => news.type === 'airport');

  // 2) Build template
  // 3) Render the template using news data from 1)
  res.status(200).render('home', {
    title: 'Welcome',
    latestNews,
    airportNews,
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

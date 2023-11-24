const slugify = require('slugify');
const AppError = require('../utils/appError.cjs');

// Remove any non-alphanumeric characters before slugify
exports.slugifyTitle = (title) => {
  const cleanedTitle = title.replace(/[^a-zA-Z0-9\s-]/g, '').toLowerCase();
  return slugify(cleanedTitle, { lower: true });
};

exports.getDataByType = async (Model, type) => {
  try {
    const data = await Model.find({ type });

    if (data.length === 0)
      throw new AppError(`No data found for type ${type}`, 404);

    return data.map((el) => ({
      slug: el.slug,
      title: el.slug,
      content: el.content,
      coverImg: el.coverImg,
    }));
  } catch (err) {
    console.error('Error retriving data:', err.message);
  }
};

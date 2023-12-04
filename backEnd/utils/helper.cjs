const slugify = require('slugify');
const AppError = require('./appError.cjs');

// Remove any non-alphanumeric characters before slugify
exports.slugifyTitle = (title, type) => {
  const slug = `${type}/${title}`;

  return slugify(slug, {
    remove: /[^a-zA-Z0-9\s/]/g, // Exclude all characters except alphanumeric, spaces, and "/"
    replacement: '-', // Replace spaces with hyphens
    lower: true, // Convert to lowercase
    trim: true, // Trim leading and trailing hyphens
  });
};

// FIXME: REFACTOR THE FUNCTIONS BELOW

exports.getDataByType = async (Model, type) => {
  try {
    const data = await Model.find({ type });

    if (data.length === 0)
      throw new AppError(`No data found for type ${type}`, 404);

    return data.map((el) => ({
      slug: el.slug,
      title: el.title,
      content: el.content,
      coverImg: el.coverImg,
    }));
  } catch (err) {
    console.error('Error retriving data:', err.message);
  }
};

exports.getOverviewData = async (Model, type) => {
  try {
    const data = await Model.find({ type });
    if (data.length === 0)
      throw new AppError(`No data found for type ${type}`, 404);

    return data.map((el) => ({
      slug: el.slug,
      title: el.title,
    }));
  } catch (err) {
    console.error('Error retrieving data:', err.message);
  }
};

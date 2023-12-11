const slugify = require('slugify');
const AppError = require('./appError.cjs');

// Remove any non-alphanumeric characters before slugify
exports.generateSlug = (slug) =>
  slugify(slug, {
    remove: /[^a-zA-Z0-9\s/]/g, // Exclude all characters except alphanumeric, spaces, and "/"
    replacement: '-', // Replace spaces with hyphens
    lower: true, // Convert to lowercase
    trim: true, // Trim leading and trailing hyphens
  });

// FIXME: REFACTOR THE FUNCTIONS BELOW

exports.getDataByType = async (Model, type) => {
  try {
    const doc = await Model.aggregate([
      { $match: { type: `${type}` } },
      {
        $project: {
          title: 1,
          subtitle: 1,
          data: {
            $map: {
              input: '$data',
              as: 'item',
              in: {
                slug: '$$item.slug',
                title: '$$item.title',
                content: '$$item.content',
                coverImg: '$$item.coverImg',
              },
            },
          },
        },
      },
    ]);

    return doc[0];
  } catch (err) {
    console.error('Error retriving document:', err.message);
  }
};

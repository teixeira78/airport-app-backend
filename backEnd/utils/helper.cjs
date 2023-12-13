const slugify = require('slugify');
const AppError = require('./appError.cjs');
const aggregations = require('../mongodb/aggregations.cjs');

// Remove any non-alphanumeric characters before slugify
exports.generateSlug = (slug) =>
  slugify(slug, {
    remove: /[^a-zA-Z0-9\s/]/g, // Exclude all characters except alphanumeric, spaces, and "/"
    replacement: '-', // Replace spaces with hyphens
    lower: true, // Convert to lowercase
    trim: true, // Trim leading and trailing hyphens
  });

exports.extractTypeFromSlug = (slug) => slug.split('/')[0];

exports.getDataByType = async (Model, type) => {
  try {
    const doc = await Model.aggregate(aggregations.getDataByTypeAgg(type));

    return doc[0];
  } catch (err) {
    console.error('Error retriving document:', err.message);
  }
};

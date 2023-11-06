const slugify = require('slugify');

// Remove any non-alphanumeric characters before slugify
exports.slugifyTitle = (title) => {
  const cleanedTitle = title.replace(/[^a-zA-Z0-9\s-]/g, '').toLowerCase();
  return slugify(cleanedTitle, { lower: true });
};

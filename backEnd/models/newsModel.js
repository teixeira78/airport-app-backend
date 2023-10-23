const mongoose = require('mongoose');
const slugify = require('slugify');

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'News must have a title'],
      unique: true,
      trim: true,
      minlength: [
        10,
        'News title must be more than or equal to 10 characters ',
      ],
    },
    slug: String,
    author: String,
    publishDate: {
      type: Date,
      // required: [true, "News must have a publication date "],
    },
    source: {
      type: String,
      required: [true, 'News must have a source'],
    },
    content: {
      type: String,
      required: [true, 'News must have a content'],
      // minlength: [100, "News content must contain at least 100 characters"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
  },
);

newsSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

// Singular as it is just "1 News"
const News = mongoose.model('News', newsSchema);

module.exports = News;

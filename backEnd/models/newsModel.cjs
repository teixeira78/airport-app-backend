const mongoose = require('mongoose');
const helper = require('../utils/helper.cjs');

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
      // required: [true, 'News must have a publication date '],
    },
    type: {
      type: String,
      required: [true, 'News must have a type'],
      enum: {
        values: ['national', 'airport'],
        message: 'News type is either: national or aiport',
      },
    },
    source: {
      type: String,
      required: [true, 'News must have a source'],
    },
    content: {
      type: String,
      required: [true, 'News must have a content'],
      // minlength: [100, 'News content must contain at least 100 characters'],
    },
    coverImg: {
      type: String,
      // required: [true, 'News must have a cover image']
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

// Generate slug for the model
newsSchema.pre('save', function (next) {
  this.slug = helper.slugifyTitle(this.title);
  next();
});

const News = mongoose.model('News', newsSchema);

module.exports = News;

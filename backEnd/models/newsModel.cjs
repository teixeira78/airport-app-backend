const mongoose = require('mongoose');
const helper = require('../utils/helper.cjs');

const newsSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, 'News must have a type'],
      enum: {
        values: ['aviation', 'national'],
        message: 'News type is either: airport_news or latest_news',
      },
    },
    title: {
      type: String,
      required: [true, 'News type must have a title'],
      unique: true,
      trim: true,
      maxlength: [
        20,
        'News type title must be less than or equal to 20 characters ',
      ],
    },
    subtitle: {
      type: String,
      required: [true, 'News type must have a subtitle'],
      trim: true,
      maxlength: [
        100,
        'News type subtitle must be less than or equal to 100 characters ',
      ],
    },
    slug: String,
    data: [
      {
        title: {
          type: String,
          required: [true, 'News type must have a title'],
          unique: true,
          trim: true,
          minlength: [10, 'News title must have at least 10 characters'],
          maxlength: [
            75,
            'News title must have less than or equal to 75 characters ',
          ],
        },
        slug: String,
        author: String,
        publishDate: {
          type: Date,
          // required: [true, 'News must have a publication date '],
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
    ],
  },
  {
    toJSON: { virtuals: true },
  },
);

// Generate slug for the model
newsSchema.pre('save', function (next) {
  // Generate slug for each dataset in data array
  const type = this.type.toLowerCase();
  this.data.forEach((item) => {
    const toSlugify = `${type}/${item.title}`;
    item.slug = helper.generateSlug(toSlugify);
  });

  // Generate slug for each News type
  this.slug = helper.generateSlug(this.title);

  next();
});

const News = mongoose.model('News', newsSchema);

module.exports = News;

const mongoose = require('mongoose');
const helper = require('../utils/helper.cjs');

const guideSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, 'Guide must have a type'],
    enum: {
      values: ['passanger', 'airport', 'services'],
      message: 'Guides type is either: passanger, airport or services',
    },
  },
  category: {
    type: String,
    required: [true, 'A Guide must have a category'],
  },
  title: {
    type: String,
    required: [true, 'A Guide must have a title'],
    unique: true,
    trim: true,
  },
  slug: String,
  subtitle: {
    type: String,
    required: [true, 'A Guide must have a sub-title '],
  },
  description: {
    type: String,
    required: [true, 'A Guide must have a description'],
  },
  coverImg: {
    type: String,
    required: [true, 'A Guide must have a cover image'],
  },
  icon: {
    type: String,
  },
  accordionItems: [
    {
      title: {
        type: String,
        required: [true, 'An accordion item must have a title'],
      },
      content: {
        type: String,
        required: [true, 'An accordion item must have a content '],
      },
    },
  ],
});

// Generate slug for the model
guideSchema.pre('save', function (next) {
  this.slug = helper.slugifyTitle(this.title);
  next();
});

const Guide = mongoose.model('Guide', guideSchema);

module.exports = Guide;

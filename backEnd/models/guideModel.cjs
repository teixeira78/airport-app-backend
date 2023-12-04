const mongoose = require('mongoose');
const helper = require('../utils/helper.cjs');

const guideSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, 'Guide must have a type'],
    enum: {
      values: ['passenger', 'airport', 'services'],
      message: 'Guides type is either: passanger, airport or services',
    },
  },
  title: {
    type: String,
    required: [true, 'Guide type must have a title'],
  },
  subtitle: {
    type: String,
    required: [true, 'Guide type must have a subtitle'],
  },
  data: [
    {
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
    },
  ],
});

// Generate slug for the model
guideSchema.pre('save', function (next) {
  const type = this.type.toLowerCase();
  this.data.forEach((item) => {
    item.slug = helper.slugifyTitle(item.title, type);
  });
  next();
});

const Guide = mongoose.model('Guide', guideSchema);

module.exports = Guide;

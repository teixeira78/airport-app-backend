const mongoose = require('mongoose');
const slugify = require('slugify');

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'A hotel must have a name'],
    },
    slug: String,
    location: {
      type: String,
      trim: true,
      required: [true, 'A hotel must have a location'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    amenities: [
      {
        type: String,
      },
    ],
    images: [
      {
        type: String,
        // required: [true, 'A hotel must have at least 1 image'],
      },
    ],
    howToBook: {
      type: String,
      required: [
        true,
        'A hotel must have instructions about booking, for example: Book now at www.example.com/',
      ],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Generate slug for the model
hotelSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;

const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const News = require('./../../models/newsModel');
const Hotel = require('./../../models/hotelModel');
const { dirname } = require('path');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB, {}).then('DB connection successful!');

// READ JSON FILE

const news = JSON.parse(fs.readFileSync(`${__dirname}/news.json`, 'utf-8'));
const hotel = JSON.parse(fs.readFileSync(`${__dirname}/hotels.json`, 'utf-8'));

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await News.create(news);
    await Hotel.create(hotel);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }

  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await News.deleteMany();
    await Hotel.deleteMany();
    console.log('Data Deleted successfully');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// console.log(process.argv);

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

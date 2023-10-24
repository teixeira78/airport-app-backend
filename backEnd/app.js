const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const newsRouter = require('./routes/newsRoutes');
const hotelRouter = require('./routes/hotelRoutes');
const pageRouter = require('./routes/pageRoutes.js');

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.json());

app.use(cors());

// Serving static files
app.use(express.static('public'));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2) ROUTES
// TODO: Implement routing & controllers for the rest of the pages
app.use('/api/v1/news', newsRouter);
app.use('/api/v1/hotels', hotelRouter);
app.use('/homePage.html', pageRouter);

// If previous routes are not executed:
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Express error handling middleware
app.use(globalErrorHandler);

module.exports = app;

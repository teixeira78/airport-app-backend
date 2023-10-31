const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const AppError = require('./utils/appError.cjs');
const globalErrorHandler = require('./controllers/errorController.cjs');
const newsRouter = require('./routes/newsRoutes.cjs');
const hotelRouter = require('./routes/hotelRoutes.cjs');
const viewRouter = require('./routes/viewRoutes.cjs');
const metadataRouter = require('./routes/metadataRoutes.cjs');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 1) GLOBAL MIDDLEWARES
// Serving static files
app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use(express.static(path.join(__dirname, '..', 'public')));

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2) ROUTES
app.use('/', viewRouter);
app.use('/api/v1/news', newsRouter);
app.use('/api/v1/hotels', hotelRouter);
app.use('/api/v1/metadata', metadataRouter);

// If previous routes are not executed:
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Express error handling middleware
app.use(globalErrorHandler);

module.exports = app;

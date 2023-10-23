const AppError = require('../utils/appError');

// Invalid ID
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

// "message": "E11000 duplicate key error collection: oxbAirport.hotels index: name_1 dup key: { name: \"Mountain View Lodge\" }"
// From the error we want to return "name", so we can use regular expression to extract the value between quotes ("")
const handleDuplicateFieldDB = (err) => {
  const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value} Please use another value!`;
  return new AppError(message, 400);
};

// In development - get as much information about the error that occurred
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

// In production - leak as little info about the error to the client, as possible
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming or unknown error: don't leak error details
  } else {
    // 1) Log error to console;
    console.error('ERROR 🧨', err);

    // 2) Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong !',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    if (err.name === 'CastError') err = handleCastErrorDB(err);
    if (err.code === 11000) err = handleDuplicateFieldDB(err);
    // console.log(err.code);
    sendErrorProd(err, res);
  }
};

const AppError = require('../utils/appError.cjs');

// [x]: Handle Mongoose validation error, unhandled rejections and catch uncaught exceptions

// Invalid ID
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

// From the error return "name". Regular expression to extract the value between quotes ("")
const handleDuplicateFieldDB = (err) => {
  const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value} Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join('; ')}`;
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
    if (err.name === 'ValidationError') err = handleValidationErrorDB(err);

    sendErrorProd(err, res);
  }
};

// The function passed into catch Async is a asynchronous function which will return a promise. If the promise is rejected (error in the async function) when can catch the error - catch(err => next(err)). Error will be propagated to our error handling middleware

module.exports = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};

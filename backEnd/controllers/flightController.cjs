const axios = require('axios');
const catchAsync = require('../utils/catchAsync.cjs');

const params = {
  access_key: '9d90127de750b0653893b7fd878c3bca',
};

exports.getFlights = catchAsync(async (req, res, next) => {
  const response = await axios.get('http://api.aviationstack.com/v1/airports', {
    params,
  });
  const apiResponse = response.data;

  apiResponse.data.forEach((el) => {
    console.log(el.country_name === 'United States');
  });

  res.status(201).json({
    status: 'success',
    data: {
      apiResponse,
    },
  });
});

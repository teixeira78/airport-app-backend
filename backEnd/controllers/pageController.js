const path = require('path');
const catchAsync = require('../utils/catchAsync');

// TODO: Create function GET PAGE reusable by other pages
exports.getPage = catchAsync(async (req, res) => {
  const filePath = path.join(
    __dirname,
    '..',
    '..',
    'public',
    'html',
    'pages',
    'homePage.html',
  );

  res.status(200).sendFile(filePath);
});

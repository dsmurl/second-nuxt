const express = require('express');

const router = express.Router();
const app = express();

const imageServerBaseUrl = process.env.IMAGE_SERVER_BASE_URL || "http://www.UNINIT-IMAGE-ADDRESS.com/";

router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request);
  Object.setPrototypeOf(res, app.response);
  req.res = res;
  res.req = req;
  next();
});

// Example Api Calls
// router.get('/env-data', (req, res) => {
//   res.status(200).json({ imageServerBaseUrl: imageServerBaseUrl});
// });
//
// router.post('/track-data', (req, res) => {
//   res.status(200).json({ message: 'Success!'});
// });

module.exports = {
  path: '/api',
  handler: router
};

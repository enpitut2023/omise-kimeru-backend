const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const request = require('request');

const app = express();

app.use(morgan(':method :url :status'));
app.use(cors());

app.get(
  '/hotpepper-proxy',
  (req, res) => {
    const url = 'http://webservice.recruit.co.jp/hotpepper/gourmet/v1';

    const params = {
      key: 'd9a6f98b0866d869',
      format: 'json',
      ...req.query,
    };
    request.get({ url, qs: params }, (error, response, body) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error: 'internal server error' });
      }
      res.status(response.statusCode).send(body);
    });
  },
);

app.listen(3001);

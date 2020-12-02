/* eslint-disable no-console */
require('dotenv').config();
const { exit } = require('process');
const axios = require('axios');
const bodyParser = require('body-parser');
const colors = require('colors');
const express = require('express');
const FormData = require('form-data');
const helmet = require('helmet');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

if (!process.env.PORT) {
  console.error(colors.red('ERROR: PORT env variable required!'));
  exit();
}

if (!process.env.SERVER_URL) {
  console.error(colors.red('ERROR: SERVER_URL env variable required!'));
  exit();
}

axios.interceptors.request.use((req) => {
  console.log(`[PROXY AXIOS REQUEST] ${req.method} ${req.url}`);
  return req;
});

axios.interceptors.response.use((res) => {
  console.log(`[PROXY AXIOS RESPONSE] ${res.config.method} ${res.config.url}: >>>`, res);
  return res;
});

const app = express();
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get(
  '/proxy/helloWorld',
  async (_req, res) => {
    const response = await axios.get(`${process.env.SERVER_URL}/helloWorld`);
    res.json(response.data);
  },
);

app.get(
  '/proxy/download',
  (_req, res) => axios({
    method: 'get',
    url: `${process.env.SERVER_URL}/download`,
    data: {},
    responseType: 'arraybuffer',
  })
    .then((response) => {
      const buffer = Buffer.from(response.data);
      res.set('Content-Type', 'application/zip');
      return res.send(buffer);
    }),
);

app.post(
  '/proxy/upload',
  upload.single('file'),
  (req, res) => {
    const { file } = req;

    const form = new FormData();
    form.append(file.fieldname, file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
      knownLength: file.size,
    });

    return axios({
      method: 'post',
      url: `${process.env.SERVER_URL}/upload`,
      data: form,
      headers: {
        ...form.getHeaders(),
      },
    })
      .then(({ data }) => {
        console.log(data);
        res.json(data);
      })
      .catch((error) => console.log(error));
  },
);

app.listen(process.env.PORT, () => {
  console.log(`Proxy listening at port ${process.env.PORT}`);
});

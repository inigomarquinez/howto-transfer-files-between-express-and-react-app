/* eslint-disable no-console */
require('dotenv').config();
const { exit } = require('process');
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const multer = require('multer');
const FormData = require('formdata-node');
const colors = require('colors');

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

const app = express();
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/proxy/helloWorld', async (_req, res) => {
  console.log(`[AXIOS REQUEST] GET ${process.env.SERVER_URL}/helloWorld ...`);

  const response = await axios.get(`${process.env.SERVER_URL}/helloWorld`);
  console.log(`[AXIOS RESPONSE] GET ${process.env.SERVER_URL}/helloWorld ...`, response);

  res.json(response.data);
});

app.get('/proxy/download', (_req, res) => {
  console.log(`[AXIOS REQUEST] GET ${process.env.SERVER_URL}/download ...`);

  return axios({
    method: 'get',
    url: `${process.env.SERVER_URL}/download`,
    data: {},
    // responseType: 'blob',
    responseType: 'arraybuffer',
  })
    .then((response) => {
      console.log(`[AXIOS RESPONSE] GET ${process.env.SERVER_URL}/download ...`);
      console.log(response);

      const buffer = Buffer.from(response.data);
      res.set('Content-Type', 'application/zip');
      return res.send(buffer);
    });
});

app.post(
  '/proxy/upload',
  upload.single('file'),
  (req, res) => {
    console.log(`[AXIOS REQUEST] POST ${process.env.SERVER_URL}/upload ...`);

    const { file } = req;
    const form = new FormData();
    form.set('file', file.buffer);

    console.log('FormData proxy file :>> ', form.get('file'));

    // const blob = Buffer.from(file.buffer);

    return axios({
      method: 'post',
      url: `${process.env.SERVER_URL}/upload`,
      data: form,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(({ data }) => {
        console.log(`[AXIOS RESPONSE] POST ${process.env.SERVER_URL}/upload ...`);
        console.log(data);
        res.json(data);
      })
      .catch((error) => console.log(error));
  },
);

app.listen(process.env.PORT, () => {
  console.log(`Proxy listening at http://localhost:${process.env.PORT}`);
});

/* eslint-disable no-console */
const express = require('express');
// const { join } = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const multer = require('multer');
const FormData = require('formdata-node');
const download = require('downloadjs');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const port = 4000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const serverURL = 'http://localhost:3001';

app.get('/proxy/helloWorld', async (_req, res) => {
  console.log(`[AXIOS REQUEST] GET ${serverURL}/helloWorld ...`);

  const response = await axios.get(`${serverURL}/helloWorld`);
  console.log(`[AXIOS RESPONSE] GET ${serverURL}/helloWorld ...`, response);

  res.json(response.data);
});

app.get('/proxy/download', (_req, res) => {
  console.log(`[AXIOS REQUEST] GET ${serverURL}/download ...`);

  return axios({
    method: 'get',
    url: `${serverURL}/download`,
    data: {},
    // responseType: 'blob',
    responseType: 'arraybuffer',
  })
    .then((response) => {
      console.log(`[AXIOS RESPONSE] GET ${serverURL}/download ...`);
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
    console.log(`[AXIOS REQUEST] POST ${serverURL}/upload ...`);

    const { file } = req;
    const form = new FormData();
    form.set('file', file.buffer);

    console.log('FormData proxy file :>> ', form.get('file'));

    // const blob = Buffer.from(file.buffer);

    return axios({
      method: 'post',
      url: `${serverURL}/upload`,
      data: form,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(({ data }) => {
        console.log(`[AXIOS RESPONSE] POST ${serverURL}/upload ...`);
        console.log(data);
        res.json(data);
      })
      .catch((error) => console.log(error));
  },
);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

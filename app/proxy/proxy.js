const express = require('express');
// const { join } = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const multer = require('multer');
const FormData = require('formdata-node');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const port = 4000;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/proxy', (_req, res) => {
  console.log('*** [proxy] GET /proxy ***');
  return axios
    .get('http://localhost:3001')
    .then(({ data }) => console.log('proxy resending response for GET /', data) || res.json(data))
    .catch((error) => console.error(error.message));
});

app.get('/proxy/download', (_req, res) => {
  console.log('*** [proxy] GET /proxy/download ***');

  return axios({
    method: 'get',
    url: 'http://localhost:3001/download',
    data: {},
    responseType: 'blob',
  })
  // return axios
  //   .get('http://localhost:3001/download')
    .then((response) => {
      console.log('Response:');
      console.log(response);
      // return res.send(response.data);
      return res.send(Buffer.from(response.data));
    });

  // res.download(
  //   join(__dirname, 'file-to-download.zip'),
  //   'download.zip',
  //   (error) => {
  //     if (error) {
  //       console.error('Error downloading file: >>>', error);
  //     } else {
  //       console.info('File downloaded!');
  //     }
  //   },
  // );
});

// app.get('/pdf', async (_req, res) => {
//   await generatePdf();

//   res.sendStatus(200);
// // res
// //   .download(
// //     join(__dirname, 'file-to-download.zip'),
// //     'download.zip',
// //     (error) => {
// //       if (error) {
// //         console.error('Error downloading file: >>>', error);
// //       } else {
// //         console.info('File downloaded!');
// //       }
// //     },
// //   );
// });

app.post(
  '/proxy/upload',
  upload.single('file'),
  (req, res) => {
    console.log('*** [proxy] POST /proxy/upload ***');

    const { file } = req;
    const form = new FormData();
    form.set('file', file.buffer);

    console.log('FormData proxy file :>> ', form.get('file'));

    // const blob = Buffer.from(file.buffer);

    return axios({
      method: 'post',
      url: 'http://localhost:3001/upload',
      data: form,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(({ data }) => {
        console.log('Response:');
        console.log(data);
        res.json(data);
      })
      .catch((error) => console.log(error));
  },
);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

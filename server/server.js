/* eslint-disable no-console */
const express = require('express');
const { join } = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');

const { generatePdf } = require('./utils');

const storage = multer.memoryStorage();
const upload = multer({ storage });

let app = null;
const port = 3001;

const initServer = () => {
  if (app) {
    return app;
  }

  app = express();

  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.get('/helloWorld', (_req, res) => {
    res.json('Hello World!');
  });

  app.get('/download', (_req, res) => {
    res.download(
      join(__dirname, 'file-to-download.zip'),
      'download.zip',
      (error) => {
        if (error) {
          console.error('Error downloading file: >>>', error);
        } else {
          console.info('File downloaded!');
        }
      },
    );
  });

  app.get('/pdf', async (_req, res) => {
    await generatePdf();

    res.sendStatus(200);
  // res
  //   .download(
  //     join(__dirname, 'file-to-download.zip'),
  //     'download.zip',
  //     (error) => {
  //       if (error) {
  //         console.error('Error downloading file: >>>', error);
  //       } else {
  //         console.info('File downloaded!');
  //       }
  //     },
  //   );
  });

  app.get('/long', async (_req, res) => {
    const writeToRes = (counter) => {
      setTimeout(() => {
        if (counter > 0) {
          res.write(`${JSON.stringify({ counter })}`);
          writeToRes(counter - 1);
        } else {
          res.end();
        }
      }, 1000);
    };

    writeToRes(10);
  });

  app.post('/upload', upload.single('file'), (req, res) => {
    console.log('req', req);
    const { file } = req;

    // console.log('file :>> ', file);

    res.send('File uploaded!');
  });

  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });

  return app;
};

module.exports = initServer;

/* eslint-disable no-console */
require('dotenv').config();
const { join } = require('path');
const { exit } = require('process');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const multer = require('multer');
const colors = require('colors');

// const { generatePdf } = require('./utils');

const storage = multer.memoryStorage();
const upload = multer({ storage });

if (!process.env.PORT) {
  console.error(colors.red('ERROR: PORT env variable required!'));
  exit();
}

const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/helloWorld', (_req, res) => {
  res.json('Hello World!');
});

app.get('/download', (_req, res) => {
  res.download(
    join(__dirname, 'assets', 'file-to-download.zip'),
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

app.listen(process.env.PORT, () => {
  console.log(colors.green(`Server listening at http://localhost:${process.env.PORT}`));
});

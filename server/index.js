/* eslint-disable no-console */
require('dotenv').config();
const { exit } = require('process');
const { join } = require('path');
const bodyParser = require('body-parser');
const colors = require('colors');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const multer = require('multer');

// For DiskStorage
const upload = multer({ dest: 'uploads/' });
// For MemoryStorage
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

if (!process.env.PORT) {
  console.error(colors.red('ERROR: PORT env variable required!'));
  exit();
}

const app = express();
app.use(helmet());
app.use(cors({
  exposedHeaders: ['Content-Disposition'],
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get(
  '/helloWorld',
  (_req, res) => {
    res.json('Hello World!');
  },
);

app.get(
  '/download',
  (_req, res) => {
    res.download(join(__dirname, 'assets', 'file-to-download.zip'));
  },
);

app.post(
  '/upload',
  upload.single('file'),
  (req, res) => {
    const { file } = req;
    console.log('file :>> ', file);

    res.send('File uploaded!');
  },
);

app.listen(process.env.PORT, () => {
  console.log(colors.green(`Server listening at port ${process.env.PORT}`));
});

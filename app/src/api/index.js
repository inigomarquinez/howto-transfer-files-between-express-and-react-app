/* eslint-disable no-console */
import axios from 'axios';

import {
  axiosHelloWorld,
  axiosDownloadFile,
  axiosUploadFile,
} from './axios-api';
import {
  fetchHelloWorld,
  fetchDownloadFile,
  fetchUploadFile,
} from './fetch-api';

const ApiLib = {
  AXIOS: 'axios',
  FETCH: 'fetch',
};

const Target = {
  SERVER: 'server',
  PROXY: 'proxy',
};

const helloWorld = async (lib, target) => {
  const targetURL = (target === Target.PROXY ? process.env.REACT_APP_PROXY_URL : process.env.REACT_APP_SERVER_URL);
  return lib === ApiLib.AXIOS ? axiosHelloWorld(targetURL) : fetchHelloWorld(targetURL);
};

const downloadFile = async (lib, target) => {
  const targetURL = (target === Target.PROXY ? process.env.REACT_APP_PROXY_URL : process.env.REACT_APP_SERVER_URL);
  return lib === ApiLib.AXIOS ? axiosDownloadFile(targetURL) : fetchDownloadFile(targetURL);
};

const uploadFile = async (lib, target, file) => {
  const targetURL = (target === Target.PROXY ? process.env.REACT_APP_PROXY_URL : process.env.REACT_APP_SERVER_URL);
  return lib === ApiLib.AXIOS ? axiosUploadFile(targetURL, file) : fetchUploadFile(targetURL, file);
};

export {
  ApiLib,
  Target,
  helloWorld,
  downloadFile,
  uploadFile,
};

/* eslint-disable no-console */
import axios from 'axios';

const ApiLib = {
  AXIOS: 'axios',
  FETCH: 'fetch',
};

const Target = {
  SERVER: 'server',
  PROXY: 'proxy',
};

const url = (target) => (target === Target.PROXY ? '/proxy' : 'http://localhost:3001');

const axiosHelloWorld = async (target) => {
  console.log(`[AXIOS REQUEST] GET ${url(target)}/helloWorld ...`);
  const response = await axios.get(`${url(target)}/helloWorld`);
  console.log(`[AXIOS RESPONSE] GET ${url(target)}/helloWorld ...`);
  console.log(response);
  return response;
};

const fetchHelloWorld = async (target) => {
  console.log(`[FETCH REQUEST] GET ${url(target)}/helloWorld ...`);
  const response = await fetch(`${url(target)}/helloWorld`);
  console.log(`[FETCH RESPONSE] GET ${url(target)}/helloWorld ...`);
  console.log(response);
  return response;
};

const axiosDownloadFile = async (target) => {
  console.log(`[AXIOS REQUEST] GET ${url(target)}/download ...`);
  const response = await axios({
    method: 'get',
    url: `${url(target)}/download`,
    data: {},
    responseType: 'blob',
  });
  console.log(`[AXIOS RESPONSE] GET ${url(target)}/download ...`);
  console.log(response);

  console.log('data @ app', response.data);
  return response;
};

const fetchDownloadFile = async (target) => {
  console.log(`[FETCH REQUEST] GET ${url(target)}/download ...`);
  const response = await fetch(`${url(target)}/download`);
  console.log(`[FETCH RESPONSE] GET ${url(target)}/download ...`);
  console.log(response);
  return response;
};

const axiosUploadFile = async (target, file) => {
  console.log(`[AXIOS REQUEST] POST ${url(target)}/upload ...`);

  const form = new FormData();
  form.set('file', file);

  const response = await axios({
    method: 'post',
    url: `${url(target)}/upload`,
    data: form,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  console.log(`[AXIOS RESPONSE] POST ${url(target)}/upload ...`);
  console.log(response);
  return response;
};

const fetchUploadFile = async (target, file) => {
  console.log(`[FETCH REQUEST] POST ${url(target)}/upload ...`);

  const form = new FormData();
  form.set('file', file);

  const response = await fetch(`${url(target)}/upload`, {
    method: 'POST',
    body: form,
  });
  console.log(`[FETCH RESPONSE] POST ${url(target)}/upload ...`);
  console.log(response);
  return response;
};

const helloWorld = async (lib, target) => (lib === ApiLib.AXIOS ? axiosHelloWorld(target) : fetchHelloWorld(target));
const downloadFile = async (lib, target) => (lib === ApiLib.AXIOS ? axiosDownloadFile(target) : fetchDownloadFile(target));
const uploadFile = async (lib, target, file) => (lib === ApiLib.AXIOS ? axiosUploadFile(target, file) : fetchUploadFile(target, file));

export {
  ApiLib,
  Target,
  helloWorld,
  downloadFile,
  uploadFile,
};

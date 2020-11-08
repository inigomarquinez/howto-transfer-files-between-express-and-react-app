/* eslint-disable no-console */
import axios from 'axios';

const Mode = {
  AXIOS: 'axios',
  FETCH: 'fetch',
};

const url = '/proxy';

const axiosHelloWorld = async () => {
  console.log(`[AXIOS REQUEST] GET ${url}/helloWorld ...`);
  const response = await axios.get(`${url}/helloWorld`);
  console.log(`[AXIOS RESPONSE] GET ${url}/helloWorld ...`);
  console.log(response);
  return response;
};

const fetchHelloWorld = async () => {
  console.log(`[FETCH REQUEST] GET ${url}/helloWorld ...`);
  const response = await fetch(`${url}/helloWorld`);
  console.log(`[FETCH RESPONSE] GET ${url}/helloWorld ...`);
  console.log(response);
  return response;
};

const axiosDownloadFile = async () => {
  console.log(`[AXIOS REQUEST] GET ${url}/download ...`);
  const response = await axios({
    method: 'get',
    url: `${url}/download`,
    data: {},
    responseType: 'blob',
  });
  console.log(`[AXIOS RESPONSE] GET ${url}/download ...`);
  console.log(response);
  return response;
};

const fetchDownloadFile = async () => {
  console.log(`[FETCH REQUEST] GET ${url}/download ...`);
  const response = await fetch(`${url}/download`);
  console.log(`[FETCH RESPONSE] GET ${url}/download ...`);
  console.log(response);
  return response;
};

const axiosUploadFile = async (file) => {
  console.log(`[AXIOS REQUEST] POST ${url}/upload ...`);

  const form = new FormData();
  form.set('file', file);

  const response = await axios({
    method: 'post',
    url: `${url}/upload`,
    data: form,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  console.log(`[AXIOS RESPONSE] POST ${url}/upload ...`);
  console.log(response);
  return response;
};

const fetchUploadFile = async (file) => {
  console.log(`[FETCH REQUEST] POST ${url}/upload ...`);

  const form = new FormData();
  form.set('file', file);

  const response = await fetch(`${url}/upload`, {
    method: 'POST',
    body: form,
  });
  console.log(`[FETCH RESPONSE] POST ${url}/upload ...`);
  console.log(response);
  return response;
};

const proxyHelloWorld = async (mode) => (mode === Mode.AXIOS ? axiosHelloWorld() : fetchHelloWorld());
const proxyDownloadFile = async (mode) => (mode === Mode.AXIOS ? axiosDownloadFile() : fetchDownloadFile());
const proxyUploadFile = async (mode) => (mode === Mode.AXIOS ? axiosUploadFile() : fetchUploadFile());

export {
  Mode,
  proxyHelloWorld,
  proxyDownloadFile,
  proxyUploadFile,
};

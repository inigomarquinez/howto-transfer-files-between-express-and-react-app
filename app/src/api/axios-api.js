/* eslint-disable no-console */
import axios from 'axios';

const axiosHelloWorld = async (targetURL) => {
  console.log(`[AXIOS REQUEST] GET ${targetURL}/helloWorld ...`);
  const response = await axios.get(`${targetURL}/helloWorld`);
  console.log(`[AXIOS RESPONSE] GET ${targetURL}/helloWorld ...`);
  console.log(response);
  return response;
};

const axiosDownloadFile = async (targetURL) => {
  console.log(`[AXIOS REQUEST] GET ${targetURL}/download ...`);
  const response = await axios({
    method: 'get',
    url: `${targetURL}/download`,
    data: {},
    responseType: 'blob',
  });
  console.log(`[AXIOS RESPONSE] GET ${targetURL}/download ...`);
  console.log(response);

  return response;
};

const axiosUploadFile = async (targetURL, file) => {
  console.log(`[AXIOS REQUEST] POST ${targetURL}/upload ...`);

  const form = new FormData();
  form.set('file', file);

  const response = await axios({
    method: 'post',
    url: `${targetURL}/upload`,
    data: form,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  console.log(`[AXIOS RESPONSE] POST ${targetURL}/upload ...`);
  console.log(response);
  return response;
};

export {
  axiosHelloWorld,
  axiosDownloadFile,
  axiosUploadFile,
};

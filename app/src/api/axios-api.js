/* eslint-disable no-console */
import axios from 'axios';

axios.interceptors.request.use((req) => {
  console.log(`[CLIENT AXIOS REQUEST] ${req.method} ${req.url}`);
  return req;
});

axios.interceptors.response.use((res) => {
  console.log(`[CLIENT AXIOS RESPONSE] ${res.config.method} ${res.config.url}: >>>`, res);
  return res;
});

const axiosHelloWorld = async (targetURL) => {
  const response = await axios.get(`${targetURL}/helloWorld`);
  return response;
};

const axiosDownloadFile = async (targetURL) => {
  const response = await axios({
    method: 'get',
    url: `${targetURL}/download`,
    data: {},
    responseType: 'blob',
  });
  return response;
};

const axiosUploadFile = async (targetURL, file) => {
  const form = new FormData();
  form.set('file', file);

  const response = await axios({
    method: 'post',
    url: `${targetURL}/upload`,
    data: form,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response;
};

export {
  axiosHelloWorld,
  axiosDownloadFile,
  axiosUploadFile,
};

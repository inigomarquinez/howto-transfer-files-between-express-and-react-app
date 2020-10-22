import axios from 'axios';

const upload = async (file) => {
  console.log('*** UPLOAD ***');

  const form = new FormData();
  form.set('file', file);

  axios({
    method: 'post',
    url: 'http://localhost:3001/upload',
    data: form,
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    .then(async (axiosResponse) => {
      console.log('Response:');
      console.log(axiosResponse);
    })
    .catch((error) => console.error(error));
};

const uploadUsingProxy = async (file) => {
  console.log('*** UPLOAD WITH PROXY ***');

  const form = new FormData();
  form.set('file', file);

  axios({
    method: 'post',
    url: '/proxy/upload',
    data: form,
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    .then(async (axiosResponse) => {
      console.log('Response:');
      console.log(axiosResponse);
    })
    .catch((error) => console.error(error));
};

export {
  upload,
  uploadUsingProxy,
};

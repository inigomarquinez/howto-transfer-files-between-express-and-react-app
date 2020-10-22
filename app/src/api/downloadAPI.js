import axios from 'axios';
import download from 'downloadjs';

const downloadWithFetch = async () => {
  const fetchResponse = await fetch('http://localhost:3001/download');
  console.log('*** FETCH ***');
  console.log('Response:');
  console.log(fetchResponse);
  console.log('Blob:');
  const fetchBlob = await fetchResponse.blob();
  console.log(fetchBlob);
  download(fetchBlob, 'test.zip');
};

const downloadWithAxiosBlob = async () => {
  console.log('*** AXIOS (Blob) ***');
  axios({
    method: 'get',
    url: 'http://localhost:3001/download',
    data: {},
    responseType: 'blob',
  })
    .then(async (axiosResponse) => {
      console.log('Response:');
      console.log(axiosResponse);
      console.log('Blob:');
      const axiosBlob = new Blob([axiosResponse.data], { type: 'application/zip' });
      console.log(axiosBlob);
      download(axiosBlob, 'test.zip');
    })
    .catch((error) => console.error(error));
};

const downloadWithAxiosReader = async () => {
  console.log('*** AXIOS (FileReader) ***');
  axios({
    method: 'get',
    url: 'http://localhost:3001/download',
    data: {},
    responseType: 'blob',
  })
    .then((response) => {
      console.log('Response:');
      console.log(response);
      const reader = new window.FileReader();
      reader.readAsBinaryString(response.data);
      reader.onload = () => {
        console.log('Reader result:');
        console.log(reader.result);
        download(reader.result, 'test.zip');
      };
    })
    .catch((error) => console.log(error));
};

const downloadWithProxyAxiosBlob = async () => {
  console.log('*** AXIOS WITH PROXY (Blob) ***');
  axios({
    method: 'get',
    url: '/proxy/download',
    data: {},
    responseType: 'blob',
  })
    .then(async (axiosResponse) => {
      console.log('Response:');
      console.log(axiosResponse);
      console.log('Blob:');
      const axiosBlob = new Blob([axiosResponse.data], { type: 'application/zip' });
      console.log(axiosBlob);
      download(axiosBlob, 'test.zip');
    })
    .catch((error) => console.error(error));
};

const downloadWithProxyAxiosReader = async () => {
  console.log('*** AXIOS WITH PROXY (FileReader) ***');
  axios({
    method: 'get',
    url: '/proxy/download',
    data: {},
    responseType: 'blob',
  })
    .then((response) => {
      console.log('Response:');
      console.log(response);
      const reader = new window.FileReader();
      reader.readAsBinaryString(response.data);
      reader.onload = () => {
        console.log('Reader result:');
        console.log(reader.result);
        download(reader.result, 'test.zip');
      };
    })
    .catch((error) => console.log(error));
};

const helloWorldWithProxy = async () => {
  axios
    .get('/proxy')
    .then((axiosResponse) => {
      console.log('AXIOS RESPONSE');
      console.log(axiosResponse);
    })
    .catch((error) => console.error(error));
};

const longRequest = async () => {
  console.log('*** LONG REQUEST ***');
  // axios
  //   .get('http://localhost:3001/long')
  //   .then(async (axiosResponse) => {
  //     console.log('Response:');
  //     console.log(axiosResponse);
  //   })
  //   .catch((error) => console.error(error));

  const Http = new XMLHttpRequest();
  const url = 'http://localhost:3001/long';
  Http.open('GET', url, true);
  Http.onreadystatechange = (e) => {
    console.log('onreadystatechange', Http.responseText);
  };

  Http.send(null);
};

export {
  downloadWithFetch,
  downloadWithAxiosBlob,
  downloadWithAxiosReader,
  downloadWithProxyAxiosBlob,
  downloadWithProxyAxiosReader,
  helloWorldWithProxy,
  longRequest,
};

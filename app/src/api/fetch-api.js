/* eslint-disable no-console */

const fetchHelloWorld = async (targetURL) => {
  console.log(`[FETCH REQUEST] GET ${targetURL}/helloWorld ...`);
  const response = await fetch(`${targetURL}/helloWorld`);
  console.log(`[FETCH RESPONSE] GET ${targetURL}/helloWorld ...`);
  console.log(response);
  return response;
};

const fetchDownloadFile = async (targetURL) => {
  console.log(`[FETCH REQUEST] GET ${targetURL}/download ...`);
  const response = await fetch(`${targetURL}/download`);
  console.log(`[FETCH RESPONSE] GET ${targetURL}/download ...`);
  console.log(response);
  return response;
};

const fetchUploadFile = async (targetURL, file) => {
  console.log(`[FETCH REQUEST] POST ${targetURL}/upload ...`);

  const form = new FormData();
  form.set('file', file);

  const response = await fetch(`${targetURL}/upload`, {
    method: 'POST',
    body: form,
  });
  console.log(`[FETCH RESPONSE] POST ${targetURL}/upload ...`);
  console.log(response);
  return response;
};

export {
  fetchHelloWorld,
  fetchDownloadFile,
  fetchUploadFile,
};

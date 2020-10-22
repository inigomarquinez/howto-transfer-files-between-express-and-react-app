/* eslint-disable no-console */
import React, { useState } from 'react';

import {
  downloadWithFetch,
  downloadWithAxiosBlob,
  downloadWithAxiosReader,
  downloadWithProxyAxiosBlob,
  downloadWithProxyAxiosReader,
  helloWorldWithProxy,
  longRequest,
} from './api/downloadAPI';
import {
  upload,
  uploadUsingProxy,
} from './api/uploadAPI';

const App = () => {
  const [file, setFile] = useState(null);

  return (
    <div>
      <button
        type="button"
        onClick={downloadWithFetch}
      >
        Download with fetch
      </button>
      <button
        type="button"
        onClick={downloadWithAxiosBlob}
      >
        Download with axios blob
      </button>
      <button
        type="button"
        onClick={downloadWithAxiosReader}
      >
        Download with axios reader
      </button>
      <button
        type="button"
        onClick={downloadWithProxyAxiosBlob}
      >
        Download with proxy axios blob
      </button>
      <button
        type="button"
        onClick={downloadWithProxyAxiosReader}
      >
        Download with proxy axios reader
      </button>
      <button
        type="button"
        onClick={helloWorldWithProxy}
      >
        Hello world with proxy
      </button>

      <br />

      <button
        type="button"
        onClick={longRequest}
      >
        Long request
      </button>

      <br />

      <input
        type="file"
        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
      />
      <button
        type="button"
        onClick={() => (file ? upload(file) : null)}
      >
        Upload
      </button>
      <button
        type="button"
        onClick={() => (file ? uploadUsingProxy(file) : null)}
      >
        Upload using proxy
      </button>
    </div>
  );
};

export default App;

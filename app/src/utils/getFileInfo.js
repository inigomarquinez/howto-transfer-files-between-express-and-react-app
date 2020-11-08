import {
  ApiLib,
} from '../constants';

// eslint-disable-next-line import/prefer-default-export
const getFileInfo = (headers, lib) => {
  let contentDisposition;
  let contentType;

  if (lib === ApiLib.FETCH) {
    contentDisposition = headers.get('content-disposition');
    contentType = headers.get('content-type');
  } else {
    contentDisposition = headers['content-disposition'];
    contentType = headers['content-type'];
  }

  const re = /filename="(?<filename>.*)"/;
  const { groups: { filename } } = re.exec(contentDisposition);

  return {
    filename,
    mimetype: contentType,
  };
};

export default getFileInfo;

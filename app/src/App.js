/* eslint-disable no-alert */
/* eslint-disable no-console */
import React, { createRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import download from 'downloadjs';

import {
  ApiLib,
  Target,
  helloWorld,
  downloadFile,
  uploadFile,
} from './api';

const App = () => {
  const fileInputRef = createRef();

  const [file, setFile] = useState(null);
  const [currentResponse, printCurrentResponse] = useState(null);
  const [currentBody, printCurrentBody] = useState(null);

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Card variant="outlined">
          <CardHeader title="Hello World" />
          <CardContent>
            {Object.values(Target).map((value) => (
              <>
                <Typography variant="body2" component="p">
                  {`Through ${value}`}
                </Typography>
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                  <Button
                    onClick={async () => helloWorld(ApiLib.AXIOS, value)
                      .then((response) => {
                        printCurrentResponse(response);
                        return response;
                      })
                      .then(({ data }) => {
                        printCurrentBody(data);
                        alert(data);
                      })}
                  >
                    Using axios
                  </Button>
                  <Button
                    onClick={async () => helloWorld(ApiLib.FETCH, value)
                      .then((response) => {
                        printCurrentResponse(response);
                        return response.json();
                      })
                      .then((body) => {
                        printCurrentBody(body);
                        alert(body);
                      })}
                  >
                    Using fetch
                  </Button>
                </ButtonGroup>
              </>
            ))}
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardHeader title="Download" />
          <CardContent>
            {Object.values(Target).map((value) => (
              <>
                <Typography variant="body2" component="p">
                  {`Through ${value}`}
                </Typography>
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                  <Button
                    onClick={async () => downloadFile(ApiLib.AXIOS, value)
                      .then((response) => {
                        printCurrentResponse(response);
                        printCurrentBody(null);

                        const re = /filename="(?<filename>.*)"/;
                        const { groups: { filename } } = re.exec(response.headers['content-disposition']);

                        const blob = new Blob([response.data], { type: response.data.type });
                        download(blob, filename, response.data.type);
                      })}
                  >
                    Using axios
                  </Button>
                  <Button
                    onClick={async () => downloadFile(ApiLib.FETCH, value)
                      .then(async (response) => {
                        printCurrentResponse(response);
                        printCurrentBody(null);
                        const blob = await response.blob();
                        download(blob);
                      })}
                  >
                    Using fetch
                  </Button>
                </ButtonGroup>
              </>
            ))}
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardHeader title="Upload" />
          <CardContent>
            <Input
              readOnly
              value={file ? file.name : ''}
              endAdornment={(
                <InputAdornment position="end">
                  <Button onClick={() => (file ? setFile(null) : fileInputRef.current.click())}>
                    {file ? 'Clear' : 'Select'}
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    style={{ display: 'none' }}
                    onChange={(e) => setFile(e.target.files.length > 0 ? e.target.files[0] : null)}
                  />
                </InputAdornment>
            )}
            />

            <Typography variant="body2" component="p">
              Direct call to server
            </Typography>
            <ButtonGroup color="primary" aria-label="outlined primary button group">
              <Button
                disabled={file === null}
                onClick={async () => uploadFile(ApiLib.AXIOS, Target.SERVER, file)
                  .then((response) => {
                    printCurrentResponse(response);
                    return response;
                  })
                  .then(({ data }) => {
                    printCurrentBody(data);
                  })}
              >
                Using axios
                <input
                  type="file"
                  style={{ display: 'none' }}
                />
              </Button>
              <Button
                disabled={file === null}
                onClick={async () => uploadFile(ApiLib.FETCH, Target.SERVER, file)
                  .then((response) => {
                    printCurrentResponse(response);
                    return response.blob();
                  })
                  .then((body) => {
                    printCurrentBody(body);
                  })}
              >
                Using fetch
              </Button>
            </ButtonGroup>

            <Typography variant="body2" component="p">
              Call using proxy
            </Typography>
            <ButtonGroup color="secondary" aria-label="outlined secondary button group">
              <Button
                disabled={file === null}
                onClick={async () => uploadFile(ApiLib.AXIOS, Target.PROXY, file)
                  .then((response) => {
                    printCurrentResponse(response);
                    return response;
                  })
                  .then(({ data }) => {
                    printCurrentBody(data);
                  })}
              >
                Using axios
                <input
                  type="file"
                  style={{ display: 'none' }}
                />
              </Button>
              <Button
                disabled={file === null}
                onClick={async () => uploadFile(ApiLib.FETCH, Target.PROXY, file)
                  .then((response) => {
                    printCurrentResponse(response);
                    return response.blob();
                  })
                  .then((body) => {
                    printCurrentBody(body);
                  })}
              >
                Using fetch
              </Button>
            </ButtonGroup>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={4}>
        {currentResponse ? (
          <>
            <h1>Response</h1>
            <pre>
              {JSON.stringify(currentResponse, null, 2)}
            </pre>
            <h1>Body</h1>
            <pre>
              {JSON.stringify(currentBody, null, 2)}
            </pre>
          </>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default App;

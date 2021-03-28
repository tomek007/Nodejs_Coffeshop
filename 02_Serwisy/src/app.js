import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { APP_PORT } from './config/app';
import api from './api';

(async function runApp() {
  const app = express();

  // Add basic middlewares
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // Add routing
  app.use(api);

  const server = app.listen(APP_PORT, () => {
    console.log(`Listening on port ${server.address().port}`);
  });
})();

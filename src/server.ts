import dotenv from 'dotenv';
import app, {init} from "./app";
dotenv.config();

const port = process.env.PORT || 4000;

import "./streams/import-csv.js"

init().then(() => {
  app.listen(port, () => {
    /* eslint-disable-next-line no-console */
    console.log(`Server is listening on port ${port}.`);
  });
});

export default init;

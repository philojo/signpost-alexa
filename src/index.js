const express = require('express');

const { PORT } = process.env;
const LISTEN = Number(PORT) || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/** Route Middleware */
app.use('/', require('./routes/index'));

app.listen(LISTEN, (error) => {
    if (!error) {
        console.log(`Server is Successfully Running, and App is listening on port ${PORT}`);
    } else {
        console.log("Error occurred, server can't start", error);
    }
});

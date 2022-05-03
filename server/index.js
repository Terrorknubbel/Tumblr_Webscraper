const express = require('express');
const app = express();
const api = require('./router/api');

app.use('/api', api);

app.listen(3001, () => {
    console.log("Listening on Port: " + 3001);
});
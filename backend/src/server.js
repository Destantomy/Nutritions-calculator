const express = require('express');
require('dotenv').config();
const router = require('./router/routes');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use('/api', router);

app.listen(port, () => {
    console.log(`server is up and running on http://localhost:${port}`);
});
const express = require('express');
require('dotenv').config();
const routers = require('./router/routes');
const cors = require('cors');
const corsOptions = {
    origin: '*',
    methods: 'GET, PUT, POST, DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };

const app = express();
const port = process.env.PORT || 3000;

app.use(cors(corsOptions));

app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use('/api/', routers);

app.listen(port, () => {
    console.log(`server is up and running on http://localhost:${port}`);
});
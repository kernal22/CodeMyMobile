const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const indexRoutes = require('./routes/index.routes');
const cors = require('cors');

const app = express();

app.server = http.createServer(app);

app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors());

app.use('/', indexRoutes);

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.use(function(err, res, req, next) {
    const errorMsg = JSON.stringify({error: err.message, code: err.status});
    res.send(errorMsg);
});

const PORT = 1704;
app.server.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`);
});
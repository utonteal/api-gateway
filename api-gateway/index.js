const express = require('express')
const helmet = require('helmet')
const { verifyToken } = require('./services/token')
const app = express()
const PORT = 3000
const axios = require('axios')
const registry = require('./registry.json')


app.use(helmet())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res, next) => {
    res.send({ message: "Connected To API Gateway" });
});

app.use(verifyToken)
app.use((req, res, next) => {


    console.log('Middleware for all HTTP requests');
    const method = req.method;
    const path = req.path;
    const body = req.body;
    const headers = req.headers;

    const microServiceName = req.path.split('/')[1];
    const url = registry.services[microServiceName].protocol
        + registry.services[microServiceName].host
        + registry.services[microServiceName].port;
    // console.log(req.path,method,url,body,"http://localhost:3001" + url)
    console.log(url + path)
    axios({
        method: method,
        url: url + path,
        headers: headers,
        data: body
    }).then((response) => {
        res.send(response.data)
    }).catch(error => {
        res.send(error)
    })
});

app.listen(PORT, () => {
    console.log('Gateway has started on port ' + PORT)
})

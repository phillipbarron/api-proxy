require('dotenv').config()

const express = require('express')
const getProxyMiddleware = require('./proxy-middleware').getProxyMiddleware
const app = express()
const port = 3000

app.use('/_activities', getProxyMiddleware());
app.get('/', (req, res) => res.send('WHAT?'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
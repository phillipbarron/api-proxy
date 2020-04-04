const express = require('express')
const getProxyMiddleware = require('./proxy-middleware')
const app = express()
const port = 3000

app.use('/api', getProxyMiddleware.getProxyMiddleware());
app.get('/', (req, res) => res.send('WHAT?'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
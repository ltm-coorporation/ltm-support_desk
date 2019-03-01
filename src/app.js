
const server = require('http').createServer();
const { router } = require('./router');
server.on('request', (req, res) => router(req, res))
    .listen(3000, () => { });


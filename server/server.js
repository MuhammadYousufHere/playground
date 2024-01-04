const http = require('http');
const port = process.env.PORT || 3333;
const server = http.createServer(function (req, res) {
    res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/plain');

    res.end('Hello');
});

server.listen(port, function () {
    console.log(`Server listening on port ${port}...`);
});

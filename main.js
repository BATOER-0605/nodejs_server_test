const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const queryObject = url.parse(req.url, true).query;
    const variable = queryObject.variable;

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`URL: ${req.url}\nVariable: ${variable}`);
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
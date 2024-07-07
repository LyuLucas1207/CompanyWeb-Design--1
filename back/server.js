const http = require('http');
const { incrementView_section26 } = require('./newsHandler_section26'); // Importing the module
const PORT = process.env.PORT || 5500;

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url.startsWith('/incrementView_section26/')) {
        handleIncrementView(req, res);
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
});

const handleIncrementView = (req, res) => {
    // Parse URL to get article index
    const urlParts = req.url.split('/');
    const articleIndex = parseInt(urlParts[urlParts.length - 1]);

    if (isNaN(articleIndex)) {
        res.statusCode = 400;
        return res.end('Invalid article index');
    }

    incrementView_section26(articleIndex, (err, result) => {
        if (err) {
            res.statusCode = 500;
            res.end(err.message);
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result));
        }
    });
};

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

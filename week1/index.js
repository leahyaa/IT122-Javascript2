import http from 'node:http';
http.createServer((req, res) => {
    let path = req.url.toLowerCase();
    console.log(path);
    switch (path) {
        case '/':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Home page');
            break;
        case '/about':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('About page\nYajuan Zeng has been studying at SCC for 4 quarters');
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not found');
            break;
    }
}).listen(process.env.PORT || 3000);
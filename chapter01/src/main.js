const http = require('http');
const fs = require('fs');
const port = process.env.PORT || 8080;

function serveStaticFile(res, path, contentType, responesCode = 200){
    fs.readFile(__dirname + path, (err, data) => {
        if(err){
            res.writeHead(500, {'Content-Type': 'text/plain'});
            return res.end('500 - Internal err');
        }
        res.writeHead(responesCode, {'Content-Type': contentType});
        res.end(data);
    });
}

const server = http.createServer((req, res) => {
    //쿼리스트링, 옵션인 마지막 슬래시를 없애고 소문자로 바꿔서 url을 정규화합니다.
    const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();

    switch(path){
        case '':
            serveStaticFile(res, '/public/home.html', 'text/html');
            res.end('MainPage');
            break;
        case '/about':
            serveStaticFile(res, '/public/about.html', 'text/html');
            res.end('About');
            break;
        default:
            serveStaticFile(res, '/public/404.html', 'text/html');
            res.end('Not Found');
            break;
    }
});

server.listen(port, () => console.log(`server started on port ${port}\n` + 'press Ctrl-C to terminate..'));
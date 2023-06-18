## Node Express

#### Hello World!
http 모듈을 사용해서 기본적인 웹 서버를 여는 예제입니다.

```Javascript
const http = require('http');
const port = process.env.PORT || 3000

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type' : 'text/plain'});
    res.end('Hello world!');
});

server.listen(port, () => console.log(`server started on port : ${port}` + `press Ctrl-C to terminate..`));
```

### [Cahpter01]()



## 이벤트 주도 프로그래밍
노드의 배경이 되는 철학은 **이벤트 주도 프로그래밍** 입니다. 이 말은 어떤 이벤트가 일어날지, 그 이벤트를 어떻게 처리해야 할지 프로그래머가 이해해야 한다는 뜻입니다. 사용자가 뭔가를 클릭하면, 프로그래머는 클릭 이벤트를 처리합니다.
이벤트가 서버에서 일어난다는 점은 낯선 개념이지만, 기본 발상은 동일합니다. 예를 들어 사용자가 애플리케이션의 한 영역에서 다른 영역으로 이동하는 것도 이벤트입니다. 이런 내비게이션 이벤트에 애플리케이션이 어떻게 반응할지 정하는 것을 **라우팅**이라 부릅니다.


## 라우팅
라우팅은 클라이언트가 요청한 컨텐츠를 전송하는 매커니즘을 가르킵니다. 웹 기반 클라이언트/서버 애플리케이션 에서 클라이언트는 원하는 컨텐츠를 URL, 즉 경로와 쿼리스트링으로 요청합니다.


다음 예제를 살펴보겠습니다.

```javascript
const http = require('http');
const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
    //쿼리스트링, 옵션인 마지막 슬래시를 없애고 소문자로 바꿔서 url을 정규화합니다.
    const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();

    switch(path){
        case '':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('MainPage');
            break;
        case '/about':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('About');
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not Found');
            break;
    }
});

server.listen(port, () => console.log(`server started on port ${port}\n` + 'press Ctrl-C to terminate..'));
```

위 예제를 node index.js로 실행하면 서버가 열립니다.
위에서 지정한 포트 8080에서 열리게 됩니다. http://localhost:8080 으로 접근할 수 있습니다.

### http.createServer() 메소드
http 모듈에 createServer() 메소드는 콜백함수를 인자로 받습니다. 이 생성한 서버로 오는 HTTP 요청마다 createServer에 전달된 함수가 한번씩 호출됩니다.

사실 위에 예제는 server 객체를 생성하고 리스너를 추가하는 축약 문법입니다. 위 코드는 아래와 동일합니다.

```Javascript
const server = http.createServer();

// localhost:8080 만 정의
server.on('request', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('MainPage');
})
 

server.listen(port, () => console.log(`server started on port ${port}\n` + 'press Ctrl-C to terminate..'));
```

또한 위에서 정의한 정규화를 console.log로 찍어서 살펴보면
```Javascript
    //쿼리스트링, 옵션인 마지막 슬래시를 없애고 소문자로 바꿔서 url을 정규화합니다.
    const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
    console.log(path);
```

http://localhost:8080/about 를 전달하면 콘솔에 /about이 찍혀나오고
http://localhost:8080 를 전달해보면 빈 문자열이 전달됩니다.
또한 http://localhost:8080/?foo=bar 를 전달해보면 쿼리스트링은 제거하기 때문에 빈문자열이 찍여서 나오게 되어서
쿼리스트링을 전달할 경우 http://localhost:8080 와 동일한 결과로 MainPage가 나오게됩니다.
그 외에 나머지 결과들은 default 로 가서 'Not Found'를 홈페이지에 출력합니다.


## 정적 자원 전송
라우팅에 성공했으니 실제 HTML과 이미지를 전송해보겠습니다. 이런 파일을 정적 자원이라 부르는 이유는 일반적으로 바뀌지 않기 때문입니다. 실시간 주가라던지 실시간 스코어 같은 것들과는 반대입니다.
###### (보통 큰 프로젝트에서는 NGINX 같은 프록시 서버나 CDN을 통해 정적 자원을 전송하는 편이 좋습니다.)



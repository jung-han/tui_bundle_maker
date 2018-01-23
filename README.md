# tui_bundle_maker
tui bundle을 만드는 조금은 비효율적인 방법
## clone 전에
0. git은 설치하셨겠죠
1. [https://nodejs.org/ko/](https://nodejs.org/ko/)에 들어가서 노드를 설치하세요. 설치 후 `$ npm --version`을 쳐서 제대로 설치되었는지 확인해 보세요
2. 설치 후 `$ npm install --global webpack` webpack을 global로 깔아주세요.

## 사용법

1. `$ git clone https://github.com/junghanNHN/tui_bundle_maker.git`
2. clone한 프로젝트에 들어가서 `$ npm i` 입력
3. `index.js`파일 수정 후 터미널 창에 `$ webpack` 입력
4. 그럼 public 폴더에 tui_bundle.js가 생성된 것을 볼 수 있다!
5. 한번 들어가서 확인해보세요. 원하는데로 적용되는지
6. 그리고 된다면 bundle.js를 들고가서 스프링에 include시키고 사용한다.



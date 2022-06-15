# 주제
헬시 플레저 음식에 대한 정보를 제공하고, 협업 필터링을 사용한 추천 시스템으로 사용자에게 알맞은 헬시 플레저 음식을 추천하는 서비스
<br />
<br />

# 시작방법

* yarn upgrade -> yarn install -> project최상위 directory에서 -> yarn start


오류나면 package 재설치 -> yarn install --check-files

혹은 node_module 폴더(client폴더에 있는 것도 함께)  삭제 후 yarn install

혹은 npm install concurrently --save --legacy-peer-deps 후 yarn start
<br />
<br />
# 동작 과정

![mainpage](./image/mainpage.png)

localhost:3000 으로 접속하면 메인페이지가 보인다.
<br />
<br />

![recipepage](./image/recipepage.png)

음식을 클릭하면 정보를 볼 수 있음
<br />
<br />

![singup](./image/signup.png)

![singin](./image/signin.png)

추천 시스템을 사용하기 위해 회원가입 후 로그인
<br />
<br />


![addcart1](./image/addcart1.png)

메인 페이지나 레시피 정보 페이지에서 장바구니로 관심있는 음식 추가
<br />
<br />

![cartpage](./image/cartpage.png)

장바구니 페이지로 이동하면 담은 음식들과 사용자에게 추천하는 음식들을 볼 수 있음
<br />
<br />
# 참고
AWS RDS로 DB를 관리하기 때문에 이 RDS가 닫히면 동작 불가

<p align="center"><img src="https://github.com/UMC-Project/Front-end/assets/135521917/7ccf3867-f9ea-426b-a311-42757b4db03f" /></p>

<h1>목차</h1>

1. [프로젝트 소개](#1)
2. [개발 기간 및 개발 환경](#2)
3. [주요 기능](#3)
4. [기술 특이점](#4)
5. [설계 문서](#5)
6. [협업 및 컨벤션](#6)

<br>
<h1 id="1">1. 프로젝트 소개</h1>

> 푸드브릿지는 전국의 배달음식점과 소비자를 연결하는 웹사이트입니다.<br>
> 기존의 배달 앱에 커뮤니티 기능을 추가하여 사용자 상호작용 중심의 배달 서비스 플랫폼을 만들었습니다.

<br>

### 👩‍🔧 팀원 소개

<table >
  <tr>
    <td align="center" width="150px">
      <a href="https://github.com/seon318" target="_blank">
        <img src="https://github.com/UMC-Project/Front-end/assets/135521917/a8243b68-5f06-4d2e-8796-c7f7539ea9a7" alt="정은선 프로필" />
      </a>
    </td>
    <td align="center" width="150px">
      <a href="https://github.com/NewJiSoo" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/135521917?v=4" alt="신지수 프로필" />
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/seon318" target="_blank">
        정은선
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/NewJiSoo" target="_blank">
        신지수
      </a>
    </td>
  </tr>
</table>

### 🤴 역할

<p align="center">
  <img src="https://github.com/UMC-Project/Front-end/assets/135521917/3d583c12-f8b0-48ee-afd2-4db6e1e9e825" alt="역할" />
</p>

<br>

<h1 id="2">2. 개발 기간 및 개발 환경</h1>

### 📆개발 기간

<table>
  <tr>
    <td><h4>1차 개발</h4></td>
    <td>24. 01. 21 ~ 24. 04. 05</td>
    <td>
      <br>
      ● 기획 및 피그마 활용 디자인 <br>
      ● 페이지 구현 및 axios 활용 서버 연결 <br>
      <br>
    </td>
  </tr>
    <tr>
    <td><h4>2차 개발</h4></td>
    <td>24. 04. 06 ~ 24. 04. 22</td>
    <td>
      <br>
      ● 배포 후 서비스 운영 <br>
      ● 사용자 피드백 반영 <br>
      ● Lighthouse 점수 최적화 <br>
      <br>
    </td>
  </tr>
</table>
<br>

### 📋 기술 스택

```
- React
- ReactRouter
- JavaScript
- Axios

- Redux

- scss
- figma
- ESLint
- Prettier
```

<br>

<h1 id="3">3. 주요 기능</h1>
<h3>1. 메인 페이지</h3>

```
메인 페이지에서는 사이트의 전반적인 정보를 알 수 있습니다. 이벤트 및 음식점 리스트, 커뮤니티, 할인 쿠폰 페이지 등으로 이동이 가능합니다.
```

<p  align="center">
  <img width="500" src="https://github.com/UMC-Project/Front-end/assets/135521917/a7b29c36-da46-44db-86d9-58ecc2cfb1da" />
</p>

<h3>2. 회원가입/로그인 페이지</h3>

```
사이트의 주요 기능 이용을 위해 회원가입 및 로그인이 필요합니다. <br>
자체 로그인 외에도 카카오, 구글 소셜 로그인이 가능합니다.
```

<p  align="center">
  <img width="400" src="https://github.com/UMC-Project/Front-end/assets/135521917/3c2c7045-2408-4760-b73e-08a6a0d6e99d"/>
  <img width="400" src="https://github.com/UMC-Project/Front-end/assets/135521917/98d36aef-f9b5-4d76-958e-66acdfd6e618"/>
</p>

<h3>3. 배달 / 포장 페이지</h3>
    
```
배달 / 포장 페이지에서는 카테고리별로 음식점 목록을 볼 수 있습니다.
음식점 이름, 별점, 최소주문금액 및 배달팁 등 기본적인 음식점 정보를 제공합니다.
```
<p  align="center">
  <img width="500" src="https://github.com/UMC-Project/Front-end/assets/135521917/fac90e9e-5769-4428-b801-1ae383de5cca"/>
</p>

<h3>4. 음식점 상세 / 메뉴 옵션 페이지</h3>
    
```
음식점 상세 페이지에서는 음식점의 세부 정보와 메뉴를 볼 수 있고 각 메뉴 버튼을 누르면 옵션 페이지로 넘어가 장바구니에 메뉴를 추가할 수 있습니다.
```
<p  align="center">
  <img width="500" src="https://github.com/UMC-Project/Front-end/assets/135521917/b17c0f71-a031-4071-aaca-c5b256499a31"/>
</p>

<h3>5. 장바구니 / 결제 페이지</h3>
    
```
장바구니 페이지에서는 음식점에서 담은 메뉴의 추가, 삭제 및 수량 변경, 배달 / 포장 선택이 가능합니다.
주문하기 버튼을 누르면 결제페이지로 넘어가 주소 입력, 요청사항, 할인쿠폰 선택 후 최종 결제가 됩니다.
```
<p  align="center">
  <img width="500" src="https://github.com/UMC-Project/Front-end/assets/135521917/c97af645-21f9-4710-b5f3-09047aac3472"/>
</p>

<h3>6. 커뮤니티 페이지</h3>
    
```
커뮤니티 페이지에서는 주간 인기 글, 일간 인기 글, 최신 글을 각각 2개씩 모아볼 수 있으며 글쓰기 페이지로 넘어갈 수 있습니다.
각 게시물을 누르면 해당 글 전체를 확인할 수 있습니다.
```
 <p  align="center">
  <img width="500" src="https://github.com/UMC-Project/Front-end/assets/135521917/8c3107ae-1a1b-4608-8044-0232ffe2fad7"/>
</p>

<h3>7. 사용자 프로필 페이지</h3>
  
```
사용자 프로필 페이지에서는 프로필 사진 및 닉네임 변경, 로그아웃이 가능하며 마이데이터를 모아볼 수 있습니다.
```

<p  align="center">
  <img width="500" src="https://github.com/UMC-Project/Front-end/assets/135521917/09d88268-24f0-4b22-ba2a-9bad158642be"/>
</p>

<h3>8. 주문내역 / 리뷰 / 찜 페이지</h3>

```
주문내역 페이지에서는 각 주문의 상세 내용을 확인하고 주문 3일 내에 리뷰를 작성할 수 있습니다.
리뷰 페이지에서는 내가 각 음식점에 작성한 리뷰를 모아볼 수 있으며 내가 쓴 리뷰 별점의 평균을 확인할 수 있습니다.
찜 페이지에서는 내가 하트를 누른 음식점을 모아볼 수 있습니다.
```

<h3>9. 검색 페이지</h3>
    
```
검색 페이지에서는 인기 검색어 순위를 확인할 수 있고 검색 시 관련된 음식점 목록을 볼 수 있습니다.
```
<p  align="center">
  <img width="500" src="https://github.com/UMC-Project/Front-end/assets/135521917/df31b662-e6d4-4799-9713-818dafe43948"/>
</p>

<br>

<h1 id="4">4. 기술 특이점</h1>

```
사용자 친화적인 사이트를 만들기 위해 성능 개선표를 작성해 페이지별 성능과 접근성 등을 개선했습니다
```

<p  align="center">
  <img width="500" src="https://github.com/Food-Bridge/Front-end/assets/135521917/f170d936-6b49-4245-8391-c5d8f0b3d011"/>
  <img width="500" src="https://github.com/UMC-Project/Front-end/assets/135521917/319bb9d7-2c58-4af3-aa32-a8fd3d65f078"/>
</p>

<h1 id="5">5. 설계 문서</h1>

### 🎨 Figma

<p  align="center">
<img width="900" src="/src/data/FoodBridgeDesign.png"/>
</p>

<br>

### 💻 서비스 아키텍처

<p  align="center">
  <img width="900" src="https://github.com/UMC-Project/Front-end/assets/135521917/f691648c-50b0-4d4b-b9a3-7692546c67d9"/>
</p>

<br>

<h1 id="6">6. 협업 및 컨벤션</h1>

### 🛠 협업 도구

```
- Notion
- git
- Discord
- Figma
```

<br>

### 📢 커밋 컨벤션

**Type**

| 태그 이름 | 설명                                                           |
| --------- | -------------------------------------------------------------- |
| Feat      | 새로운 기능 구현                                               |
| Add       | Feat 이외의 부수적인 코드 추가, 라이브러리 추가                |
| Fix       | 버그, 오류 수정                                                |
| Hotfix    | issue나 QA에서 급한 버그 수정                                  |
| Design    | CSS 및 레이아웃 작업                                           |
| Refactor  | 프로덕션 코드 리팩토링(기능은 바꾸지 않되, 코드의 구조를 변경) |
| Style     | 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우          |
| Chore     | 프로덕션 코드 외 빌드 부분 혹은 패키지 매니저 수정사항         |
| Test      | 테스트 코드 추가, 테스트 코드 리팩토링                         |
| Docs      | 문서 수정                                                      |
| Merge     | 다른 브랜치를 merge 할 때 사용                                 |

**Title**

- type: `lowercase`
- format: `type: title (#issueNumber)` (ex. feat: 게시글 삭제 (#10))
- 제목은 50자 이내
- 변경사항이 “무엇”인지 명확히 작성
- 끝에 마침표 금지

**Body (Optional)**

- 제목과 본문의 분리를 위해 한 줄 띄기
- “어떻게”보다 “무엇을”, “왜”에 맞춰 작성
  - 무엇을 추가/변경했는지와 그 이유를 작성
- 구체적인 내용이 없다면 생략 가능
- 여러 줄의 메시지를 작성할 땐 “-”로 구분
- 한 줄은 72자 이내

<br>

### ⚙브랜치 전략

- **`main`**
  - **현재 제일 좋은 모델**로 합니다
  - 언제든지 즉시 배포(Production)가 가능한 상태여야 합니다.
- **`dev`**
  - feat에서 온 레포를 이전 버전과 합치는 과정입니다.
  - **실행 가능한 코드 단위**이어야 합니다.
  - dev 브랜치로 들어오는 **모든 코드는 리뷰를** 거치게 됩니다.
- **`feat`**
  - 기능 단위로 개발을 진행하는 브랜치입니다.
  - **브랜치 네이밍**은 아래 양식을 지켜주세요 🙏
    - `feat {기능 이름}`
    - ex) feat modeling, feat eda, feat preprocess

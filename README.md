<p align="center">
  <img src="https://github.com/user-attachments/assets/21f2b1e8-d34f-4917-8d89-5ba48bf73ac1" width="120"/>
</p>
<h2 align="center">최애의 전당</h1>

### 목차
- [프로젝트 소개](#프로젝트-소개)
- [사용 기술 및 이유](#프로젝트-소개)
- [트러블 슈팅](#프로젝트-소개)
- [성과 및 배운점](#프로젝트-소개)

## 📍 프로젝트 소개
<a href="https://www.myidolranking.com" target="blank">www.myidolranking.com</a>
<p>기여도: 100%</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/477aa3e9-827a-4563-ae41-9b1a20898169" width="800"/>
</p>
<p align="center">(메인 페이지)</p>
<p>아이돌 팬들을 위한 실시간 투표 및 랭킹 시스템을 제공하는 <strong>"최애의 전당"</strong> 입니다.</p>
<p>자신이 좋아하는 아이돌 멤버에게 매일 한 번씩 투표할 수 있으며, 가장 많은 투표를 받은 멤버가 다음날 메인 페이지에 우승자로 공개되는 구조입니다.</p>

## 📍 사용 기술 및 이유
<p>
  <img src="https://github.com/user-attachments/assets/382dea93-0af9-4e8a-8d17-364780745d36" width="48">
  <strong>Next JS</strong>
</p>
<p>투표 시스템과 자유게시판 등 다양한 기능이 존재하는 프로젝트를 NextJS의 API Routes 로 인해 프론트엔드와 백엔드를 하나의 프로젝트에서 관리 가능하기 편하다는 생각이 들었습니다.</p>
<p>또한, 실제 배포를 위해 React 보다 SSR로 인해 SEO에 최적화 되어있는 장점으로 선택하게 되었습니다.</p>

<p>
  <img src="https://github.com/user-attachments/assets/6a9b273e-d93a-40f9-8a9e-3a956bc2648b" width="48">
  <strong>TypeScript</strong>
</p>
<p>정적 타입 시스템을 가진 타입스크립트를 사용하면서, 개발 중이나 빌드시에 <strong>오류를 쉽게 찾아내었습니다.</strong></p>
<p>그렇게 런타임시 발생하는 오류를 줄여 <strong>안정적인 코드를 작성</strong>할 수 있었습니다.</p>

<p>
  <img src="https://github.com/user-attachments/assets/78e19658-3cdb-4325-84aa-7b26a30e1068" width="48">
  <strong>Mongo DB</strong>
</p>
<p>JSON 기반 구조로 인해 빠르게 개발이 진행 가능하다고 생각하였고,</p>
<p>개발하면서 <strong>데이터의 구조 변경이 편리</strong>하다는 장점으로 인해 선택하였습니다.</p>

## 📍 트러블 슈팅

### 🔥 CORS 에러 🔥

<p align="center">
  <img src="https://github.com/user-attachments/assets/2b0a34a3-64d4-46f7-b73d-1d99b3694d8a" width="480">
</p>
<p><strong>문제 상황</strong></p>
<ul>
  <li>프로젝트를 <strong>Vercel에 배포</strong>한 직후, 페이지에 오류가 발생했다는 문구와 함께 콘솔창은 빨간색 에러로 뒤덮혔습니다.</li>
  <li>개발 환경에서는 문제없이 작동하던 API 요청들이, 배포 환경에서는 오류나며 기능이 아무것도 작동하지 않는 상황이였습니다.</li>
</ul>
<p><strong>원인 분석</strong></p>
<ul>
  <li>콘솔에 띄어진 에러를 읽으며 CORS 설정의 문제라고 생각하여, NextJS의 API Route 관련 CORS 글들을 찾아보았습니다.</li>
  <li>NextJs의 App router 기반 API Route에서는 별도로 CORS 설정을 하지 않아도 기본 요청은 처리가 가능하다는 점을 알아냈습니다.</li>
  <li>다음으로 에러를 다시 확인했을때 API를 localhost:3000으로 불러온다는 것을 발견했습니다.</li>
  <li>이로 인해, 브라우저는 배포된 url이 아닌 다른 url에서 요청을 시도하면서 <strong>브라우저 차원에서 CORS 오류를 발생</strong>시킨 것이었습니다.</li>
  <li>즉, API 서버 자체의 문제가 아닌, 잘못된 환경변수로 인해 브라우저 보안 정책이 작동한 상황임을 찾았습니다.</li>
</ul>
<p><strong>해결 과정</strong></p>
<ul>
  <li>먼저 Vercel의 프로젝트 환경 변수 항목에 들어가 확인했습니다.</li>
  <li>확인결과, 여전히 로컬 개발용 주소로 설정되어 있었고, 브라우저가 배포된 도메인에서 다른 origin으로 요청을 보내는 상황이 발생하고 있었습니다.</li>
  <li>이 문제를 해결하기 위해, 환경 변수의 값을 실제 배포 도메인으로 수정하였고, 이후 반영되도록 다시 프로젝트를 재배포하였습니다.</li>
</ul>
<p><strong>결과</strong></p>
<ul>
  <li>배포 완료 후, 개발자 도구를 열고 실제 API 요청을 확인했습니다.</li>
  <li>요청의 origin과 응답 헤더를 비교해본 결과 더 이상 브라우저에서 CORS 오류가 발생하지 않는 것을 확인할 수 있었습니다.</li>
</ul>


## 📍 성과 및 배운점

### ✨ CORS 오류 해결 경험
<ul>
  <li>초기에는 단순 코드 문제로만 생각했지만, 브라우저의 CORS 정책과 배포 환경 설정의 상호작용을 이해하게 되었습니다.</li>
  <li>특히 단순한 오류 메시지의 원인을 파악하면서, 환경변수와 배포 설정의 중요성을 알게 된것이 좋은 경험이 되었다고 생각합니다.</li>
</ul>

### ✨ 애니메이션 및 인터랙션
<ul>
  <li>성능 최적화를 위해서 욕심만큼 다양한 애니메이션을 적용할 수는 없겠지만</li>
  <li>사이트를 구상할때 생각했던 애니메이션을 구현하려다 실패도 해보고,</li>
  <li>다양한 라이브러리도 찾아보며 성능과 애니메이션 사이에는 균형이 필요하다는 것을 명확히 알게되었습니다.</li>
</ul>

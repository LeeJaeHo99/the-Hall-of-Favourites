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
  <img src="https://github.com/user-attachments/assets/4785c7a5-7e60-4ac8-9fc4-0402117175e5" width="48">
  <strong>Jest + React Testing Library</strong>
</p>
<p>React 컴포넌트 테스트에 최적화 되어있으며, 에러를 조기 발견할 수 있고 추후 긴 시간동안 서비스를 진행할 수록 안정성이 있다 생각해 선택하였습니다.</p>

<p>
  <img src="https://github.com/user-attachments/assets/78e19658-3cdb-4325-84aa-7b26a30e1068" width="48">
  <strong>Mongo DB</strong>
</p>
<p>JSON 기반 구조로 인해 빠르게 개발이 진행 가능하다고 생각하였고,</p>
<p>개발하면서 <strong>데이터의 구조 변경이 편리</strong>하다는 장점으로 인해 선택하였습니다.</p>

## 📍 트러블 슈팅

### 🔥 투표 시스템 중복 방지 이슈 🔥
<p><strong>문제 상황</strong></p>
<ul>
  <li>음악 재생 버튼을 클릭해도 간헐적으로 <strong>재생이 되지 않는 현상</strong>이 발생했습니다.</li>
  <li>데이터 페칭 로직은 정상적으로 동작하고 있었으며, 콘솔 오류 메시지나 네트워크 이슈도 전혀 발견되지 않았습니다.</li>
  <li>DB에서 받아온 영상 정보에는 문제가 없어, 문제의 <strong>원인을 Youtube Iframe 로딩으로 좁혀 확인</strong>하게 되었습니다.</li>
</ul>
<p><strong>원인 분석</strong></p>
<ul>
  <li>Youtube Iframe API는 비동기적으로 로드되기 때문에, API가 아직 로드되지 않은 상태에서 playVideo()를 호출하면 영상이 재생되지 않는다는 점을 확인했습니다.</li>
  <li>실제로 대기 후 재생하면 정상 작동하는 것을 통해,API 로딩 타이밍 이슈임을 확신할 수 있었습니다.</li>
  <li>이와 함께, Youtube Iframe은 <strong>웹 성능을 저하시킨 주요 원인</strong> 중 하나였으며, 해당 문제는 후속적인 웹 성능 최적화 과정에서도 중점적으로 다뤄졌습니다.</li>
</ul>
<p><strong>해결 과정</strong></p>
<ul>
  <li>사용자 접속 시, Youtube Iframe이 로드되기 전까지는 빈 화면이 출력되지 않도록 하고, 로딩 상태를 명확하게 인지할 수 있도록 <strong>로딩 컴포넌트를 제공</strong>하였습니다.</li>
  <li>이후 API가 완전히 로드된 후에만 음악이 재성되도록 하여, 재생 실패 없이 <strong>안정적인 음악 재생이 가능</strong>하도록 구조를 개선하였습니다.</li>
</ul>
<p><strong>결과</strong></p>
<ul>
  <li>사용자가 재생 버튼을 눌렀을 때 영상이 재생되지 않는 오류가 재현되지 않게 되었고, 음악 재생에 대한 안정성이 확보되었습니다.</li>
  <li>해당 개선은 <strong>웹 성능 최적화에도 긍정적인 영향</strong>을 주었으며, <strong>사용자 경험 향상</strong>에도 기여했습니다.</li>
</ul>

### 🔥 CORS 에러 🔥
<p><strong>문제 상황</strong></p>
<img src="https://github.com/user-attachments/assets/dd1f0fea-626a-4fb6-8d76-06e2d55b8d64" width="480">
<img src="https://github.com/user-attachments/assets/5061c4ac-fa9e-4347-822b-229ab4ab30cf" width="560">

<ul>
  <li>배포 전 웹 성능 점검 도중, 예상보다 전반적인 웹 성능 지표가 낮게 측정되는 현상을 확인했습니다.</li>
  <li>Youtube Iframe이 성능에 영향을 줄 수 있다는 점은 예상했지만, <strong>다양한 요소가 복합적으로 성능 저하를 유발</strong>하고 있었습니다.</li>
</ul>
<p><strong>원인 분석</strong></p>
<ul>
  <li>Youtube Iframe의 초기 렌더링 지연이 주요 원인이었습니다.</li>
  <li>사용자 인터랙션을 높이기 위해 구현한 과도한 애니메이션 효과가 렌더링 비용을 증가시켰습니다.</li>
  <li>음악 정보는 하루에 두 번만 바뀌지만, 매 접속 시마다 API 요청을 보내는 비효율적인 방식으로 구현되어 있었습니다.</li>
  <li>사용하지 않는 폰트, 불필요한 CSS/JS 코드, 최적화되지 않은 이미지 리소스들이 불필요하게 로딩되고 있었습니다.</li>
</ul>
<p><strong>해결 과정</strong></p>
<ul>
  <li>Youtube Iframe은 퍼사드 패턴을 도입해, 초기에는 썸네일만 노출하고, <strong>재생 버튼 클릭 시에만 실제 Iframe을 로드</strong>하도록 변경하였습니다.</li>
  <li>과도한 <strong>애니메이션은 최소화</strong>하여 불필요한 렌더링을 줄였습니다.</li>
  <li>음악 정보 API 호출은 <strong>ISR 방식으로 변경</strong>하여, 페이지 접근 시마다 네트워크 요청을 보내지 않도록 개선했습니다.</li>
  <li>불필요한 리소스(폰트, CSS, JS, 이미지 등)를 제거하고, 이미지에는 next/image 최적화 전략을 적용하였습니다.</li>
</ul>
<p><strong>결과</strong></p>
<img src="https://github.com/user-attachments/assets/69c8f116-5287-4ac8-a05c-a2dc2668f6f4" width="480">
<img src="https://github.com/user-attachments/assets/0c3f9508-0d43-40b8-a167-d48151e2c5f3" width="560">
<ul>
  <li>PageSpeed Insights 기준 LCP, FCP, CLS 등 주요 <strong>지표가 개선</strong>되었고, 사용자 경험 또한 향상되었습니다.</li>
  <li>초기 페이지 로딩 시간이 <strong>약 2초 단축</strong>되었고, 모바일 기준 평균 성능 점수는 20~30점 가량 향상되었습니다.</li>
  <li>이러한 개선 과정을 통해 <strong>성능 최적화에 대한 인사이트와 실전 경험</strong>을 쌓을 수 있었습니다.</li>
</ul>

## 📍 성과 및 배운점

### ✨ 웹 성능 최적화의 중요성과 실전 적용 경험
<ul>
  <li>예상보다 <strong>복합적인 원인으로 성능이 저하</strong>될 수 있다는 점을 직접 겪으면서, 단순한 기능 구현을 넘어서 사용자 경험 관점에서의 기술 선택과 구조 설계의 중요성을 체감했습니다.</li>
  <li>특히 퍼사드 패턴 도입, 리소스 정리, ISR 적용 등 실질적인 성능 개선 작업을 통해 실제 성능 지표(FCP, LCP 등)와 사용자 체감 속도 모두 향상시키는 경험을 얻었습니다.</li>
</ul>

### ✨ UX 중심 설계 사고 확립
<ul>
  <li>단순히 성능을 개선하는 것을 넘어서, 사용자에게 <strong>명확하게 로딩 상태를 제공</strong>하거나 불필요한 요소는 지연 로딩하는 등 UX 측면의 배려가 중요하다는 점을 학습했습니다.</li>
</ul>

### ✨ 테스트 코드의 중요성
<ul>
  <li>개발 시간을 </li>
</ul>

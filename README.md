# README.md

![Frame 43 (1)](https://i.postimg.cc/fL7NPF1Y/bar.png)


## PloMeet!

> 플로밋은 플로깅(Plogging) + 만남(Meeting) 의 합성어로
>
> ‘환경보호 운동 Plogging’을 함께 즐길수 있도록 기획한 앱서비스입니다
>
> 플로밋으로 선한 영향력을 펼쳐보세요! 🌎  :-)

- 함께하면 더 꾸준히 할 수 있어요! ⇒ 채팅, 모임개설로 활발한 `커뮤니티`
- 지도를 따라 재미있게~ ⇒ 실시간 경로 `트래킹`
- 자동기록되는 캘린더로 동기부여 받고 데일리플로깅 실천하세요! ⇒ `캘린더`

## 팀 소개

> SSAFY 6기 자율 프로젝트 서울 2반 5팀

- 이수림 | `👍 팀장` `💠 Jira` `👨‍👩‍👧‍👦 모임 기능`
- 박찬혁 | `🎬 UCC` `😊 회원 기능`
- 이지우 | `🚀 배포` `🎬 UCC` `🏃 플로깅` `📝 기록`
- 이혜민 | `🚀 배포` `🏃 플로깅` `📝 기록` `🍎 iOS` `🛡 뱃지`
- 정지민 | `📝 기록` `🚀 배포` `💬 채팅` `🛡 뱃지`
- 최윤수 | `🦊 GIT` `💬 채팅`

## 기획 배경

- 이삭을 줍다(Plocka Upp) + 조깅(Jogging) = `조깅하며 쓰레기를 줍는 활동(Plogging)!`
- 최근 사회관계망 서비스(SNS)를 통해 **환경 보호 캠페인**이 챌린지 형식으로 유행
- MZ세대는 친환경에 관심을 많이 갖고, 플로깅을 비롯한 리사이클링, 플라스틱 프리 등 **환경보호 활동에 적극적으로 참여**하는 추세
- 네이버에서 플로깅을 검색한 횟수는 4만 4600회(4월 기준)으로, 지난해 5월 기준 2만 6400회에 비해 **약 두 배 증가**

## 서비스 목표

- 플로깅을 처음 접하는 사용자도 지속적으로 재미있게 플로깅에 참여할 수 있도록 유도하는 서비스를 개발
- 기존 러닝앱에서 제공하는 GPS 트래킹 기능 뿐 아니라 플로깅에 특화된 기능을 제공하여 차별성을 높이고 커뮤니티, 랭킹 기능 등을 도입하여 사용자가 지속적으로 서비스에 방문할 수 있도록 유도
- 누구나 사용하기 쉬운 사용자 친화적 UI를 통해 최상의 사용자 경험을 제공
- 프로젝트의 완성도를 높여 실사용 가능한 퀄리티의 서비스를 만들고 Google Play 및 App Store에 배포하는 경험을 통해 팀원 개개인의 개발 역량 향상을 도모
- 플로밋을 통해 꾸준한 플로깅을 통해 사회 공헌 활동 지속 효과 기대

## 대상 타겟

- 조깅과 런지 효과를 함께 볼 수 있는 플로깅을 통해 `건강해지고 싶은 사람들`
- 주변 곳곳에 버려지는 쓰레기를 주우며 `환경을 지키고 싶은 사람들`
- 환경 운동은 하고싶지만 혼자 하기에 망설여지는 사람들
- 플로깅 활동을 기록해서 간직하고싶은 사람들

## 기술 스택


### ⛏ 기술 스택

| Back-end            | Front-end            | App                     | DevOps  |
| ------------------- | -------------------- | ----------------------- | ------- |
| Java `JDK 11`       | ReactNative `0.68.1` | Android - minSDK 26     | NginX   |
| SpringBoot `2.5.10` | Redux                | Android - targetSDK 30  | Jenkins |
| MySQL `8.0.28`      | Node.js `14.15.4`    | Android - compileSDK 30 | Git     |
| JPA                 | npm `6.14.10`        | iOS 11                  | Docker  |
| Gradle `7.4.1`      | yarn `1.22.18`       |                         |         |

### 🌏 개발환경

| IDE                | Database       | Server                     | 협업툴     |
| ------------------ | -------------- | -------------------------- | ---------- |
| intelliJ           | MySQL (8.0.28) | AWS EC2 (Ubuntu 20.04 LTS) | Jira       |
| Visual Studio Code | Firebase       | AWS S3                     | Gitlab     |
| Figma              |                |                            | Webex      |
| MySQL Workbench    |                |                            | Notion     |
|                    |                |                            | GatherTown |


## 주요 기능

### 🏠 홈

![ezgif com-gif-maker (2)](https://user-images.githubusercontent.com/67628725/169386847-faa1b587-dc9a-4dcb-8d26-af8395cf483a.gif)
![ezgif com-gif-maker (4)](https://user-images.githubusercontent.com/67628725/169388166-163a4cda-7695-4f67-aca3-c5cc9acfc879.gif)



홈 화면에서는 함께 플로깅하고 싶은 사람들이 동료를 기다리고 있답니다!

카드에 간단히 표출된 날짜/시간/인원수 를 확인하고 마음에 맞는 모임을 구해보세요!

직접 모임을 생성할 수도 있습니다

- 모임방 확인 가능
- 모임 생성 가능
- ‘날짜’별 검색기능 제공
- ‘키워드’ 검색기능(최근검색기록 포함) 제공

### 📝 기록

![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/67628725/169386563-9f67df4c-c0cb-41a4-84ae-affd57278cf2.gif)
![ezgif com-gif-maker](https://user-images.githubusercontent.com/67628725/169386161-0d2f637f-b7cb-41b9-a55c-6242ab1eb393.gif)

기록 화면에서 월별 캘린더로 내 ‘플로깅 기록’을 한눈에 확인하세요!

플로깅한 날에 도장이 찍히며, 하단의 리스트에선

그날의 ‘플로깅 경로’ 와 ‘인증사진’을 함께 확인할 수 있습니다.

상단의 총 누적 거리 / 시간 / 플로깅횟수 를 보며 동기부여 받고가세요

- 캘린더 도장 표시
- 상단의 총 누적 거리 / 시간 / 횟수 기록
- 하단의 월별 플로깅 리스트
- 상세 플로깅 페이지에서 경로 / 인증사진 제공

### 🏃 플로깅

플로깅을 할 때 켜는 메인기능! 실시간으로 그려지는 경로를 확인해보세요!

플로깅 도중 적당한 타이밍에 멋진 인증샷을 찍어 함께 저장할 수 있어요

플로깅 탭에서 나만의 플로깅 추억을 쌓아보세요

서울 지역 곳곳의 쓰레기통 위치도 표시되니 손이 부족할 때 활용하길 추천해요!

- 네이버 지도 API
- 실시간 트래킹 기능 제공
- 공공데이터 시설물 위치 표시
- 카메라로 연결한 인증샷 기능
- 누적 거리/시간 및 날씨 표시 ⇒ 플로깅 피드백

### 💬 채팅목록

모임에 가입하면 단체 체팅방이 자동생성 됩니다.

활발히 교류하며 만남에도 무리가 없도록 지원하는 기능입니다.

모임과 연계되는 채팅방의 공지에서, 모임 준비물 / 장소 / 시간 등 **만남에 관한 정보**를 쉽게 확인하세요

- 채팅 기능 지원
- 인채팅내에서 모임정보 확인 가능
- 모임 참여자 확인 가능
- 안읽은 메시지 표시

### 😈 MY

MY는 내 계정 / 모임 / 배지 크게 세가지로 나뉩니다.

우리 플로밋의 자랑 너무너무 귀여운 배지를 하나씩 모으는 재미에 스며들게 될거에요!

앱 곳곳에 숨어있는 획득 조건을 달성해 배지마스터가 되어보아요!

- 카카오 프로필 표출
- 닉네임 수정 가능
- 설정 페이지 → 앱 서비스의 이용약관, 운영정책 제공
- 앱 버전 확인 가능
- 참여중인 모임 카드 확인
- 호스트인 모임은 `운영중` 배지 부착
- 25가지 배지 제공 !

## 프로젝트 구성도

### 🗺 아키텍처

![아키텍쳐](/uploads/4c99ed72fdf95e342d6b3d004032f86c/아키텍쳐.png)

### 📂 와이어 프레임

![스크린샷_2022-05-19_오후_10.28.25](/uploads/c1d768a7c77ea8c7ebe2ae3a35229d77/스크린샷_2022-05-19_오후_10.28.25.png)
![스크린샷_2022-05-19_오후_10.28.52](/uploads/bb9b07789ac9d2ede4ff8992ecf11446/스크린샷_2022-05-19_오후_10.28.52.png)


### 📲 화면정의서

![image 76 (1)](https://user-images.githubusercontent.com/67628725/169357973-ea597ee3-b622-4838-ab6c-0bc02dceef44.png)

### 📄 ERD

- MySQL

![plomeetDB](/uploads/703f672c531ed9987ee3cb5fd93cffad/plomeetDB.png)

- FireStore

![스크린샷_2022-05-20_오전_1.23.17](/uploads/497a49c5a4e6937f3ee275bcd2100b64/스크린샷_2022-05-20_오전_1.23.17.png)

### 📂 디렉토리 구조

```markdown
📦backend
 ┣ 📂.gradle
 ┣ 📂build
 ┃ ┣ 📂classes
 ┃ ┣ 📂generated
 ┃ ┣ 📂libs
 ┃ ┃ ┗ 📜PloMeet-1.0-SNAPSHOT.jar
 ┃ ┣ 📂resources
 ┃ ┃ ┣ 📂bootJar
 ┃ ┃ ┗ 📂compileJava
 ┃ ┗ 📜.DS_Store
 ┣ 📂gradle
 ┃ ┗ 📂wrapper
 ┃ ┃ ┣ 📜gradle-wrapper.jar
 ┃ ┃ ┗ 📜gradle-wrapper.properties
 ┣ 📂src
 ┃ ┣ 📂main
 ┃ ┃ ┣ 📂java
 ┃ ┃ ┃ ┗ 📂com
 ┃ ┃ ┃ ┃ ┗ 📂ssafy
 ┃ ┃ ┃ ┃ ┃ ┗ 📂PloMeet
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂api
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂request
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂response
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂common
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂config
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂exception
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂util
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂model
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜PloMeetApplication.java
 ┃ ┃ ┗ 📂resources
 ┃ ┃ ┃ ┣ 📂static
 ┃ ┃ ┃ ┗ 📜application.properties
 ┃ ┣ 📂test
 ┣ 📜.gitignore
 ┣ 📜Dockerfile
 ┣ 📜build.gradle
 ┣ 📜gradlew
 ┣ 📜gradlew.bat
 ┗ 📜settings.gradle
 ```
 ```markdown
📦app
 ┣ 📂actions
 ┣ 📂components
 ┃ ┣ 📂auth
 ┃ ┣ 📂chat
 ┃ ┣ 📂home
 ┃ ┣ 📂my
 ┃ ┣ 📂plogging
 ┃ ┗ 📂record
 ┣ 📂container
 ┣ 📂reducers
 ┣ 📂store
 ┣ 📜index.js
 ┗ 📜routes.js
```

### 📝 명세서 & 기타 문서 작성

플로밋에 필요한 기능과 그에 따른 API 명세서 작성, 쓰레기통 데이터 전처리

- 기능 명세서

![스크린샷_2022-05-19_오후_10.39.07](/uploads/e97e03917ff367229837b4e54e5e81ec/스크린샷_2022-05-19_오후_10.39.07.png)

- REST API 명세서

![스크린샷_2022-05-19_오후_10.39.54](/uploads/3ece192ec783ed22d250484c01c496ce/스크린샷_2022-05-19_오후_10.39.54.png)

- 데이터 전처리

![스크린샷_2022-05-19_오후_10.39.34](/uploads/6dbf29a9ac3f38cf8b3a8bc7c140a973/스크린샷_2022-05-19_오후_10.39.34.png)

### 🤙 컨벤션

- Git

  - branch

    - master → 프로젝트 최종

    - develop → default 브랜치

    - 기능 단위 [Depth 2 기준]로 구분

    - 동일한 작업을 둘로 나뉘어서 할 때만 `이름 이니셜` 브랜치 따서 하기

    - 영어로 작성

      ```bash
      git branch feat/login-menu-component/SR
      	        |목적|------기능 이름-----|자기 이니셜|
      	        |-------브랜치 이름-------|
      브랜치 이름에 들어가는 목적으로는 feat/fix만
      ```

  - Commit

    ```bash
    🚀 feat : 새 기능 추가
    
    🐛 fix : 버그 수정      
    
    🔥 hotfix : 급한 수정    
    
    💡 update : 코드 수정(제거/추가/이동/변경)
        
    🔧 refact : 코드 리팩토링
    
    ✏️ docs : 문서 관련 업로드 
    
    💄 style : 코드 형식, 정렬, 주석 등의 변경(동작에 영향을 주는 코드 변경 없음)
    
    🤖 chore : 빌드 업무 수정, 패키지 매니저 설정 (코드 수정 X)
    
    ✨ wip : 진행중인 업무 work in process        
    ```

    ```
    {이모지} type : 커밋내용(한글)
    ex) 🚀 feat : 로그인 기능
    ```

  - Merge Request

    - 페어끼리 코드리뷰

    - Template

      ```markdown
      ## MR Description :page_facing_up:
      
      ### 목적
      - 무슨 이유로 코드를 변경했는지
        
      ### 주요 변경사항
      - [x] 변경사항(1)
      - [x] 변경사항(2)
      - [x] 변경사항(3)
        
      ### 리뷰 요청
      - 어떤 부분에 리뷰어가 집중하면 좋을지
        
      ### 이슈(없으면 삭제)
      - 어떤 위험이나 장애가 발견됐는지
        
      ### 참고사항(없으면 삭제)
      ['참고한 레퍼런스명'](<https://edu.ssafy.com/edu/main/index.do>)
        
      ### 관련 스크린샷(없으면 삭제)
      ```

  - Issue

    - Template

      ```markdown
      ## Issue Description :question:
      
      ### 목적
      ex) 이메일(또는 아이디)과 비밀번호를 사용한 회원 로그인 기능 구현
      
      ### 작업 목록
      - [ ] 요구사항(1)
      - [ ] 요구사항(2)
      - [ ] 요구사항(3)
      
      ### 기타 
      <!-- 깃 태그 하면 되고, 이슈 내용 쓰면 됨 -->
      - 관련 깃 태그 :
      - 이슈 내용 :
      ```

- Jira

  - Epic

    - 이름 형식 

      
      `[영어] 한글`

      - ex) [Planning] 기획


    - 기능단위

      - ex) 기획, 개발 등

  - Story

    - Back / Front 구분
    - 작업 단위
      - ex) [FE] 일
        - FE, BE, 공통

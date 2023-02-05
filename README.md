# 채팅 프로그램 구현기

nextron + firebase 로 채팅 프로그램 구현하기

## 목차

1. [환경 세팅](#환경-세팅)<br/>
   1.1 [버전](#버전)<br/>
   1.2 [실행 방법](#실행-방법)<br/>
   1.3 [환경 변수](#환경-변수)<br/>
2. [기술 스택](#기술-스택)
3. [구현 기능](#구현-기능)
4. [메인홈](#메인홈)
5. [작동 화면](#작동-화면)
6. [과제 진행 시 주안점](#과제-진행-시-주안점)
7. [한계점](#한계점)

## 환경 세팅

### 버전

```
# node 버전: 18.12.1
# npm 버전: 9.1.2
```

### 실행 방법

1. 프로젝트 clone

```
git clone https://github.com/mamonde456/chatting.git
```

2. 프로젝트 clone 후 프로젝트 폴더 경로로 이동
   `/chatting `

3. 패키지 설치
   `npm install`

4. 서버 실행

```
npm run dev
# http://localhost:8888
```

### 환경 변수

```
firebase의 config
(firebase.js 파일에 필요합니다.)

- apiKey
- authDomain
- projectId
- storageBucket
- messagingSenderId
- appId
- measurementId

```

## 기술 스택

- TypeScript
- React
- Nextron.js
- Firebase
- styled-components
- git

## 구현 기능

- [x] 회원가입
- [x] 로그인
- [x] 유저 목록
- [x] 1: 1 채팅
- [x] 그룹 채팅

## 메인홈

<img src="https://user-images.githubusercontent.com/81732659/216550732-b63bde09-32a8-49ae-a288-f47f0cd645f6.png" alt="메인홈 이미지">

## 작동 화면

<img src="https://user-images.githubusercontent.com/81732659/216550859-26e2098d-ce45-4740-9afb-df44430ef9b5.gif" alt="작동화면 gif">

## 과제 진행 시 주안점

디자인보다는 최대한 구현 기능에 중심을 맞춰 프로그램이 돌아가는 것에 집중했습니다. 그 후 컴포넌트의 분리, 코드의 관심사별로 분리하려고 했습니다.

## 한계점

- nextron 템플릿을 사용하여 프로그램을 구현하는 데 있어 이슈가 있었습니다. global 변수를 못찾는 등의 이슈로 템플릿이 돌아가지 않았고, 임시로 고쳐 자잘한 버그가 많습니다. 기회가 된다면 `Electron`을 배워서 환경 세팅부터 해보고 싶습니다. 따라서 해당 이슈로 페이지의 웹팩, env가 먹히지 않는 오류가 있어 스타일이 깨질 수 있습니다.

- 코드의 리팩토링을 충분하게 완료하지 못하여 아쉬운 부분이 있습니다. 이부분도 추후 계속 수정하며 리팩토링 할 예정입니다.

- 채팅방에 들어가 있는 유저들에게만 해당 채팅방이 보이게끔 구현하고자 했으나 시간상의 문제로 보류했습니다. 후일 차차 수정해나가고 싶습니다.

- 유저의 프로필 페이지를 생성해 탈퇴 서비스도 가능하게 만들고 싶습니다. 해당 서비스는 간단한 로직인 것 같아 차차 수정하겠습니다.

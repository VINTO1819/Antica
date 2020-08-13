# Antica
<img src="https://github.com/VINTO1819/Antica/blob/master/ANTICA/app/public/antica.png?raw=true" alt="drawing" width="200"/>

Introduction
-----------
앤티카는 경량 비디오 스트리밍 서비스입니다.   

 * 2020/08/13(목) - 스트리밍 기능 개발영상(RADWIMPS의 We'll be alright 재생)
<img src="https://github.com/VINTO1819/Antica/blob/master/Screenshots/2020-08-13-001.gif?raw=true" alt="drawing" width="400"/>

Features
===========
✅ : 완전 구현됨   
🔄 : 일부 구현됨   
❎ : 구현되지 않음(개발중)   

 * 비디오 스트리밍 🔄
 * 음성/문자 채팅 ❎
 * 프로그램 별 추가 호환기능 제공 ❎
    * 일반 게임/앱 :
        * 시청자들이 유저에게 포인팅 기능
    * 비행 시뮬레이터(XP 11, MSFS 2020) :
        * 시청자에게 비행 정보 표시
    * 개발 도구(VSC, IntelliJ) :
        * NPM 라이브러리 원클릭 전송 가능(설치하도록 안내)
        * 사용자가 작성중인 프로젝트 파일들 확인 가능
        * 특정 코드 줄에 하이라이팅/메모 가능
        * 특정 줄에 Code Insert 기능
        * 청취자가 사용자에게 코드파일 전송/반영 가능

Tech Stack
===========
서버(사용자)
-----------
 * Node.JS
 * Typescript + React
 * Electron
 * WebRTC

클라이언트(청취자)
-----------
 * 웹 버전
    * 데이터 송수신 : Express + Socket.io
    * 웹앱 : React
    * Simple Peer
 * Android
    * Expo(또는 React Native CLI)
    * Typescript + React Native
    * Axios
    * Simple Peer
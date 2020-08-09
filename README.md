# Antica
<img src="https://github.com/VINTO1819/Antica/blob/master/ANTICA/app/public/antica.png?raw=true" alt="drawing" width="200"/>
   
앤티카는 경량 비디오 스트리밍 서비스입니다.

제공 예정인 기능
===========
 * 비디오 스트리밍
 * 음성/문자 채팅
 * 프로그램 별 추가 호환기능 제공
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

기술적 구현
===========
서버(사용자)
-----------
 * Node.JS
 * Typescript + React
 * Electron
 * WebRTC

클라이언트(청취자)
-----------
 * 웹 버전(방식 미확정)
    * 데이터 송수신 : Express + Socket.io
    * 웹앱 : React
    * WebRTC
    * 개발 계획
        * 1안(데이터만 클라이언트에 전송하고 웹앱은 공식 사이트에서 수신) 
        * 2안(웹앱과 데이터 모두 서버에서 전송) 
 * Android
    * Expo(또는 React Native CLI)
    * Typescript + React Native
    * Axios
    * WebRTC
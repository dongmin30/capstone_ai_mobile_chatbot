# 업무 관리 고객 서비스 AI 챗봇 - 잡봇

React Native Expo 및 FireBase를 사용하여 구축된 AI 모바일 앱입니다.
앱은 사용자 로그인, 등록, 채팅 완료, 이미지 생성과 같은 기능을 제공합니다.

![Chat GPT Mobile](https://i.ibb.co/RcNyyT6/chatgpt.png)

## 앱의 특징

잡봇은 아래와 같은 기능을 제공합니다.:

1. **사용자 인증관리:**

-   로그인: 사용자 로그인을 통해 앱을 사용할 수 있습니다.
-   회원가입: 신규사용자는 필요한 정보를 제공하여 계정을 만들 수 있습니다.

2. **채팅 기능:**

-   사용자는 Llama2, GPT-3.5 모델과 대화에 참여하고 응답을 받을 수 있습니다.
-   해당 앱은 대규모 언어 모델인 Llama2와 GPT-3.5의 강력한 기능을 활용하여 사람과 유사한 텍스트 응답을 생성합니다.

3. **이미지 생성**

-   사용자는 특정 프롬프트나 설명을 기반으로 이미지를 생성할 수 있습니다. - 현재는 GPT 모델만 가능
-   해당 앱은 AI 모델과 이미지 생성 알고리즘을 사용하여 이미지를 생성합니다.

## 사전 작업

앱을 설정하기 전에 아래 필수 구성 요소가 설치되어 있는지 확인해주세요:

-   **Node.js**: 공식 웹사이트(https://nodejs.org)에서 Node.js를 설치하거나 Homebrew(macOS) 또는 Chocolatey(Windows)와 같은 패키지 관리자를 사용합니다.

-   **Firebase Account**: https://firebase.google.com 에서 Firebase 계정을 만들고 새 프로젝트를 설정합니다.

-   **GPT API**: https://platform.openai.com/account/api-keys 에서 GPT API키를 생성합니다.

## 시작하기

잡봇 앱을 시작하려면 아래 단계를 확인해주세요

1. **저장소 Clone:**

```shell
git clone https://github.com/dongmin30/capstone_ai_chatbot.git

cd capstone_ai_chatbot
```

2. **dependencies 다운로드:**

```shell
npm install
```

3. **파이어 베이스 세팅 Firebase:**

-   새 파이어 베이스 프로젝트를 생성합니다.
-   Authentication 및 Firestore 서비스를 활성화합니다.
-   Firebase 콘솔에서 프로젝트 설정으로 이동하여 Firebase 구성 개체를 복사합니다.

4. **앱에서 Firebase 구성:**

-   firebaseHelper.js의 자리 표시자 값을 Firebase 구성 값으로 바꿉니다.

5. **GPT API**

- 생성한 API Key를 Chat.js 의 Authorization 값에 붙혀넣습니다. - 해당 값은 별도로 관리하여야합니다.

6. **Expo 개발 서버 시작:**

```shell
npx expo start
```

6. **스토어에서 Expo Go 앱을 설치합니다.** iOS 또는 Android 기기에 설치합니다.
7. **QR 코드를 찍고 접속합니다.** Expo Go 앱을 통해 접속하기 위해 QR을 찍습니다. - 같은 네트워크여야 합니다.
8. 이제 기기에서 잡봇 앱을 사용할 수 있습니다.

## 사용된 스택

잡봇 앱은 아래 스택을 활용합니다.:

-   **React Native**: React를 사용하여 네이티브 앱을 구축하기 위한 프레임워크입니다.
-   **Expo**: React 애플리케이션을 위한 프레임워크 및 플랫폼입니다.
-   **Firebase**: 웹 및 모바일 앱 구축을 위한 서비스형 백엔드 플랫폼입니다.
-   **GPT-3.5**: OpenAI가 개발한 최첨단 언어 모델입니다.
-   **Llama2**: 메타가 공개한 대규모 AI 언어 모델입니다.

# Gemini AI 질문하기 웹 애플리케이션

Google Gemini API를 사용하여 질문과 답변을 주고받을 수 있는 웹 애플리케이션입니다.

## 기능

- 사용자 친화적인 웹 인터페이스
- Google Gemini Pro 모델을 통한 AI 질문 응답
- 실시간 로딩 표시
- 반응형 디자인 (모바일 지원)
- 마크다운 형식 응답 지원

## 설치 방법

1. 프로젝트 클론 또는 다운로드
2. 필요한 패키지 설치:
   ```bash
   pip install -r requirements.txt
   ```

3. Google Gemini API 키 설정:
   - [Google AI Studio](https://makersuite.google.com/app/apikey)에서 API 키 발급
   - `.env.example` 파일을 `.env`로 복사
   - `.env` 파일에 API 키 입력:
     ```
     GEMINI_API_KEY=your_actual_api_key_here
     ```

## 실행 방법

```bash
python app.py
```

웹 브라우저에서 `http://localhost:5000`에 접속하여 사용할 수 있습니다.

## 사용법

1. 상단 텍스트 영역에 질문을 입력
2. "질문하기" 버튼을 클릭하거나 `Ctrl + Enter` 키 조합 사용
3. 하단 결과창에서 Gemini의 응답 확인

## 프로젝트 구조

```
gemini-request/
├── app.py              # Flask 백엔드 서버
├── requirements.txt    # Python 의존성 패키지
├── .env.example       # 환경변수 예제 파일
├── templates/
│   └── index.html     # HTML 템플릿
└── static/
    ├── style.css      # CSS 스타일시트
    └── script.js      # JavaScript 클라이언트 코드
```

## 주요 기술 스택

- **백엔드**: Python Flask
- **프론트엔드**: HTML, CSS, JavaScript
- **AI API**: Google Gemini Pro
- **스타일링**: 그라데이션과 블러 효과를 활용한 모던 UI

## 주의사항

- Gemini API 키가 필요합니다 (무료 할당량 있음)
- 네트워크 연결이 필요합니다
- API 사용량에 따른 요금이 발생할 수 있습니다
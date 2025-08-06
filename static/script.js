document.addEventListener('DOMContentLoaded', function() {
    const questionInput = document.getElementById('questionInput');
    const askButton = document.getElementById('askButton');
    const responseContent = document.getElementById('responseContent');
    const loading = document.getElementById('loading');
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.querySelector('.theme-icon');

    // 테마 초기화
    initTheme();
    
    // 이벤트 리스너
    askButton.addEventListener('click', askQuestion);
    themeToggle.addEventListener('click', toggleTheme);
    questionInput.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            askQuestion();
        }
    });

    async function askQuestion() {
        const question = questionInput.value.trim();
        
        if (!question) {
            showError('질문을 입력해주세요.');
            return;
        }

        setLoading(true);
        askButton.disabled = true;

        try {
            const response = await fetch('/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: question })
            });

            const data = await response.json();

            if (data.success) {
                showResponse(data.response);
            } else {
                showError(data.error);
            }

        } catch (error) {
            showError('네트워크 오류가 발생했습니다: ' + error.message);
        } finally {
            setLoading(false);
            askButton.disabled = false;
        }
    }

    function showResponse(text) {
        responseContent.innerHTML = `<div class="response-text">${formatResponse(text)}</div>`;
        responseContent.scrollTop = 0;
    }

    function showError(message) {
        responseContent.innerHTML = `<div class="error">${message}</div>`;
        responseContent.scrollTop = 0;
    }

    function formatResponse(text) {
        return text
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>');
    }

    function setLoading(isLoading) {
        if (isLoading) {
            loading.style.display = 'flex';
            responseContent.innerHTML = '<div class="placeholder">응답을 기다리는 중...</div>';
        } else {
            loading.style.display = 'none';
        }
    }

    // 테마 관련 함수들
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const defaultTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
        
        applyTheme(defaultTheme);
        
        // 시스템 테마 변경 감지
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
            if (!localStorage.getItem('theme')) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
    
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    }
    
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        // 아이콘 업데이트
        if (theme === 'dark') {
            themeIcon.textContent = '☀️';
            themeToggle.setAttribute('aria-label', '라이트모드로 전환');
        } else {
            themeIcon.textContent = '🌙';
            themeToggle.setAttribute('aria-label', '다크모드로 전환');
        }
    }

    questionInput.focus();
});
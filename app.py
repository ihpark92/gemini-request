from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Gemini API 키 설정
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel('gemini-1.5-flash')
else:
    model = None
    print("Warning: GEMINI_API_KEY not found in environment variables")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/ask', methods=['POST'])
def ask_gemini():
    try:
        if not model:
            return jsonify({
                'success': False, 
                'error': 'Gemini API key not configured'
            })
        
        data = request.get_json()
        question = data.get('question', '').strip()
        
        if not question:
            return jsonify({
                'success': False, 
                'error': '질문을 입력해주세요.'
            })
        
        # Gemini API 호출
        response = model.generate_content(question)
        
        return jsonify({
            'success': True,
            'response': response.text
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'오류가 발생했습니다: {str(e)}'
        })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
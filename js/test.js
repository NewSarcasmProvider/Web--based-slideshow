// Модуль тестирования
class TestManager {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.score = 0;
        this.totalQuestions = 10;
        this.testStarted = false;
        
        this.init();
    }
    
    async init() {
        await this.loadQuestions();
        this.setupEventListeners();
    }
    
    async loadQuestions() {
        try {
            // Загружаем данные глоссария
            const response = await fetch('data/glossary.json');
            const data = await response.json();
            
            // Генерируем вопросы на основе глоссария
            this.generateQuestions(data.terms);
        } catch (error) {
            console.error('Ошибка загрузки вопросов:', error);
            this.questions = this.getDefaultQuestions();
        }
    }
    
    generateQuestions(terms) {
        this.questions = [];
        
        // 1. Вопросы с выбором ответа (5 штук)
        for (let i = 0; i < 5; i++) {
            const term = terms[Math.floor(Math.random() * terms.length)];
            const wrongTerms = terms
                .filter(t => t.id !== term.id)
                .sort(() => Math.random() - 0.5)
                .slice(0, 3);
            
            const options = [
                { text: term.definition, correct: true },
                ...wrongTerms.map(t => ({ text: t.definition, correct: false }))
            ].sort(() => Math.random() - 0.5);
            
            this.questions.push({
                id: this.questions.length + 1,
                type: 'multiple-choice',
                question: `Что такое "${term.term}"?`,
                options: options,
                correctAnswer: term.definition,
                points: 10
            });
        }
        
        // 2. Вопросы на соответствие (3 штуки)
        for (let i = 0; i < 3; i++) {
            const selectedTerms = [...terms]
                .sort(() => Math.random() - 0.5)
                .slice(0, 4);
            
            const definitions = selectedTerms.map(t => t.definition);
            const shuffledDefinitions = [...definitions].sort(() => Math.random() - 0.5);
            
            this.questions.push({
                id: this.questions.length + 1,
                type: 'matching',
                question: 'Сопоставьте термины и определения:',
                terms: selectedTerms.map(t => t.term),
                definitions: definitions,
                shuffledDefinitions: shuffledDefinitions,
                correctMatches: selectedTerms.map((t, index) => ({
                    term: t.term,
                    definition: t.definition
                })),
                points: 10
            });
        }
        
        // 3. Вопросы с заполнением пропусков (2 штуки)
        for (let i = 0; i < 2; i++) {
            const term = terms[Math.floor(Math.random() * terms.length)];
            const words = term.definition.split(' ');
            const blankIndex = Math.floor(Math.random() * (words.length - 3)) + 1;
            const blankWord = words[blankIndex];
            
            words[blankIndex] = '______';
            const questionText = words.join(' ');
            
            this.questions.push({
                id: this.questions.length + 1,
                type: 'fill-blank',
                question: `Заполните пропуск в определении термина "${term.term}":`,
                text: questionText,
                blankWord: blankWord,
                hint: `Подсказка: слово начинается на "${blankWord[0].toUpperCase()}"`,
                points: 10
            });
        }
        
        // Перемешиваем вопросы
        this.questions = this.questions.sort(() => Math.random() - 0.5);
        this.totalQuestions = this.questions.length;
    }
    
    getDefaultQuestions() {
        return [
            {
                id: 1,
                type: 'multiple-choice',
                question: 'Что такое "Спринт" в SCRUM?',
                options: [
                    { text: 'Длинный период разработки', correct: false },
                    { text: 'Короткий фиксированный период работы', correct: true },
                    { text: 'Встреча для планирования', correct: false },
                    { text: 'Документация проекта', correct: false }
                ],
                correctAnswer: 'Короткий фиксированный период работы',
                points: 10
            }
        ];
    }
    
    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            // Кнопка начала теста
            const startBtn = document.getElementById('start-test-btn');
            if (startBtn) {
                startBtn.addEventListener('click', () => this.startTest());
            }
            
            // Кнопки навигации
            const prevBtn = document.getElementById('prev-question-btn');
            const nextBtn = document.getElementById('next-question-btn');
            const finishBtn = document.getElementById('finish-test-btn');
            
            if (prevBtn) prevBtn.addEventListener('click', () => this.prevQuestion());
            if (nextBtn) nextBtn.addEventListener('click', () => this.nextQuestion());
            if (finishBtn) finishBtn.addEventListener('click', () => this.finishTest());
            
            // Кнопки результатов
            const restartBtn = document.getElementById('restart-test-btn');
            const reviewBtn = document.getElementById('review-test-btn');
            
            if (restartBtn) restartBtn.addEventListener('click', () => this.restartTest());
            if (reviewBtn) reviewBtn.addEventListener('click', () => this.reviewAnswers());
        });
    }
    
    startTest() {
        this.currentQuestionIndex = 0;
        this.userAnswers = new Array(this.totalQuestions).fill(null);
        this.score = 0;
        this.testStarted = true;
        
        // Переключение экранов
        this.showScreen('test-questions-screen');
        this.updateProgress();
        this.displayQuestion();
        
        // Сохраняем время начала теста
        this.testStartTime = new Date();
        
        // Обновляем статистику
        ProgressManager.incrementTestsTaken();
    }
    
    showScreen(screenId) {
        // Скрыть все экраны
        document.querySelectorAll('.test-screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Показать нужный экран
        const screen = document.getElementById(screenId);
        if (screen) {
            screen.classList.add('active');
        }
    }
    
    updateProgress() {
        const progress = ((this.currentQuestionIndex + 1) / this.totalQuestions) * 100;
        const progressFill = document.getElementById('progress-fill');
        const currentQuestionEl = document.getElementById('current-question');
        const totalQuestionsEl = document.getElementById('total-questions');
        
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
        
        if (currentQuestionEl) {
            currentQuestionEl.textContent = this.currentQuestionIndex + 1;
        }
        
        if (totalQuestionsEl) {
            totalQuestionsEl.textContent = this.totalQuestions;
        }
    }
    
    displayQuestion() {
        const container = document.getElementById('question-container');
        if (!container || this.currentQuestionIndex >= this.questions.length) return;
        
        const question = this.questions[this.currentQuestionIndex];
        
        switch (question.type) {
            case 'multiple-choice':
                this.renderMultipleChoice(question, container);
                break;
            case 'matching':
                this.renderMatching(question, container);
                break;
            case 'fill-blank':
                this.renderFillBlank(question, container);
                break;
        }
        
        this.updateProgress();
        this.updateNavigationButtons();
    }
    
    renderMultipleChoice(question, container) {
        let html = `
            <div class="question-text">${question.question}</div>
            <div class="answer-options">
        `;
        
        const options = ['A', 'B', 'C', 'D'];
        const userAnswer = this.userAnswers[this.currentQuestionIndex];
        
        question.options.forEach((option, index) => {
            const isSelected = userAnswer === option.text;
            const className = isSelected ? 'answer-option selected' : 'answer-option';
            
            html += `
                <div class="${className}" data-answer="${option.text}">
                    <div class="option-letter">${options[index]}</div>
                    <div class="option-text">${option.text}</div>
                </div>
            `;
        });
        
        html += '</div>';
        container.innerHTML = html;
        
        // Добавляем обработчики кликов
        container.querySelectorAll('.answer-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const selectedOption = e.currentTarget;
                const answer = selectedOption.dataset.answer;
                
                // Снимаем выделение со всех вариантов
                container.querySelectorAll('.answer-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                // Выделяем выбранный вариант
                selectedOption.classList.add('selected');
                
                // Сохраняем ответ
                this.userAnswers[this.currentQuestionIndex] = answer;
                
                // Активируем кнопку "Далее"
                this.updateNavigationButtons();
            });
        });
    }
    
    renderMatching(question, container) {
        let html = `
            <div class="question-text">${question.question}</div>
            <div class="matching-container">
                <div class="terms-column">
                    <h4>Термины:</h4>
        `;
        
        question.terms.forEach((term, index) => {
            html += `<div class="matching-term" data-term="${term}">${index + 1}. ${term}</div>`;
        });
        
        html += `
                </div>
                <div class="definitions-column">
                    <h4>Определения:</h4>
        `;
        
        question.shuffledDefinitions.forEach((definition, index) => {
            const letter = String.fromCharCode(65 + index);
            html += `
                <div class="matching-definition" data-definition="${definition}">
                    ${letter}. ${definition}
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
            <div class="matching-pairs" id="matching-pairs">
                <h4>Сопоставления:</h4>
                <div id="pairs-container"></div>
            </div>
        `;
        
        container.innerHTML = html;
        
        this.setupMatchingListeners(question);
        this.updateMatchingPairs();
    }
    
    setupMatchingListeners(question) {
        let selectedTerm = null;
        let selectedDefinition = null;
        
        document.querySelectorAll('.matching-term').forEach(term => {
            term.addEventListener('click', () => {
                document.querySelectorAll('.matching-term, .matching-definition').forEach(el => {
                    el.classList.remove('selected');
                });
                
                term.classList.add('selected');
                selectedTerm = term.dataset.term;
                selectedDefinition = null;
                
                this.checkMatchingPair(selectedTerm, selectedDefinition);
            });
        });
        
        document.querySelectorAll('.matching-definition').forEach(def => {
            def.addEventListener('click', () => {
                document.querySelectorAll('.matching-term, .matching-definition').forEach(el => {
                    el.classList.remove('selected');
                });
                
                def.classList.add('selected');
                selectedDefinition = def.dataset.definition;
                
                this.checkMatchingPair(selectedTerm, selectedDefinition);
            });
        });
    }
    
    checkMatchingPair(term, definition) {
        if (term && definition) {
            // Сохраняем сопоставление
            const matches = this.userAnswers[this.currentQuestionIndex] || [];
            const existingIndex = matches.findIndex(m => m.term === term);
            
            if (existingIndex !== -1) {
                matches[existingIndex] = { term, definition };
            } else {
                matches.push({ term, definition });
            }
            
            this.userAnswers[this.currentQuestionIndex] = matches;
            this.updateMatchingPairs();
            
            // Сбрасываем выделение
            selectedTerm = null;
            selectedDefinition = null;
            document.querySelectorAll('.matching-term, .matching-definition').forEach(el => {
                el.classList.remove('selected');
            });
        }
    }
    
    updateMatchingPairs() {
        const container = document.getElementById('pairs-container');
        if (!container) return;
        
        const matches = this.userAnswers[this.currentQuestionIndex] || [];
        
        if (matches.length === 0) {
            container.innerHTML = '<p class="no-pairs">Сопоставьте термины и определения, кликая по ним</p>';
            return;
        }
        
        let html = '';
        matches.forEach((match, index) => {
            html += `
                <div class="pair-item">
                    <span class="pair-term">${match.term}</span>
                    <i class="fas fa-arrow-right"></i>
                    <span class="pair-definition">${match.definition}</span>
                    <button class="remove-pair" data-index="${index}">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
        });
        
        container.innerHTML = html;
        
        // Добавляем обработчики для кнопок удаления
        container.querySelectorAll('.remove-pair').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.dataset.index);
                const matches = this.userAnswers[this.currentQuestionIndex] || [];
                matches.splice(index, 1);
                this.userAnswers[this.currentQuestionIndex] = matches;
                this.updateMatchingPairs();
            });
        });
    }
    
    renderFillBlank(question, container) {
        const userAnswer = this.userAnswers[this.currentQuestionIndex] || '';
        
        let html = `
            <div class="question-text">${question.question}</div>
            <div class="fill-blank-text">${question.text}</div>
            <div class="blank-input-container">
                <input type="text" 
                       id="blank-input" 
                       placeholder="Введите слово" 
                       value="${userAnswer}"
                       autocomplete="off">
                <button id="check-blank" class="control-btn secondary">
                    <i class="fas fa-check"></i> Проверить
                </button>
            </div>
            <div class="hint-text">${question.hint}</div>
        `;
        
        container.innerHTML = html;
        
        // Обработчики для поля ввода
        const input = document.getElementById('blank-input');
        const checkBtn = document.getElementById('check-blank');
        
        if (input) {
            input.addEventListener('input', (e) => {
                this.userAnswers[this.currentQuestionIndex] = e.target.value.trim();
                this.updateNavigationButtons();
            });
            
            input.addEventListener('keyup', (e) => {
                if (e.key === 'Enter') {
                    checkBtn.click();
                }
            });
        }
        
        if (checkBtn) {
            checkBtn.addEventListener('click', () => {
                const answer = input.value.trim().toLowerCase();
                const correct = question.blankWord.toLowerCase();
                
                if (answer === correct) {
                    input.classList.add('correct');
                    input.classList.remove('incorrect');
                } else {
                    input.classList.add('incorrect');
                    input.classList.remove('correct');
                }
            });
        }
    }
    
    updateNavigationButtons() {
        const prevBtn = document.getElementById('prev-question-btn');
        const nextBtn = document.getElementById('next-question-btn');
        const finishBtn = document.getElementById('finish-test-btn');
        
        if (prevBtn) {
            prevBtn.disabled = this.currentQuestionIndex === 0;
        }
        
        if (nextBtn) {
            const hasAnswer = this.userAnswers[this.currentQuestionIndex] !== null &&
                             this.userAnswers[this.currentQuestionIndex] !== '';
            nextBtn.disabled = !hasAnswer && this.currentQuestionIndex === this.totalQuestions - 1;
        }
        
        if (finishBtn) {
            finishBtn.style.display = this.currentQuestionIndex === this.totalQuestions - 1 ? 
                'flex' : 'none';
            nextBtn.style.display = this.currentQuestionIndex === this.totalQuestions - 1 ?
                'none' : 'flex';
        }
    }
    
    prevQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.displayQuestion();
        }
    }
    
    nextQuestion() {
        if (this.currentQuestionIndex < this.totalQuestions - 1) {
            this.currentQuestionIndex++;
            this.displayQuestion();
        }
    }
    
    finishTest() {
        this.calculateScore();
        this.showResults();
        this.saveTestResults();
    }
    
    calculateScore() {
        this.score = 0;
        
        this.questions.forEach((question, index) => {
            const userAnswer = this.userAnswers[index];
            
            if (!userAnswer) return;
            
            switch (question.type) {
                case 'multiple-choice':
                    if (userAnswer === question.correctAnswer) {
                        this.score += question.points;
                    }
                    break;
                    
                case 'matching':
                    const matches = userAnswer;
                    let correctMatches = 0;
                    
                    question.correctMatches.forEach(correct => {
                        const userMatch = matches.find(m => 
                            m.term === correct.term && m.definition === correct.definition
                        );
                        if (userMatch) {
                            correctMatches++;
                        }
                    });
                    
                    // Частичные баллы за правильные сопоставления
                    const matchScore = (correctMatches / question.correctMatches.length) * question.points;
                    this.score += matchScore;
                    break;
                    
                case 'fill-blank':
                    if (userAnswer.toLowerCase() === question.blankWord.toLowerCase()) {
                        this.score += question.points;
                    }
                    break;
            }
        });
        
        this.score = Math.round(this.score);
    }
    
    showResults() {
        this.showScreen('test-results-screen');
        
        // Обновляем отображение счета
        const scoreValue = document.getElementById('score-value');
        const scoreMessage = document.getElementById('score-message');
        const scoreDetails = document.getElementById('score-details');
        const resultsList = document.getElementById('results-list');
        
        if (scoreValue) {
            scoreValue.textContent = this.score;
            
            // Анимация счетчика
            this.animateScore(scoreValue, 0, this.score, 1000);
        }
        
        if (scoreMessage) {
            let message = '';
            if (this.score >= 90) message = 'Отличный результат!';
            else if (this.score >= 70) message = 'Хороший результат!';
            else if (this.score >= 50) message = 'Неплохой результат!';
            else message = 'Есть куда расти!';
            scoreMessage.textContent = message;
        }
        
        if (scoreDetails) {
            const correctAnswers = Math.floor(this.score / 10);
            scoreDetails.textContent = `Вы ответили правильно на ${correctAnswers} из ${this.totalQuestions} вопросов`;
        }
        
        if (resultsList) {
            let html = '';
            this.questions.forEach((question, index) => {
                const userAnswer = this.userAnswers[index];
                const isCorrect = this.isAnswerCorrect(question, userAnswer);
                
                html += `
                    <div class="result-item">
                        <div class="result-status ${isCorrect ? 'correct' : 'incorrect'}">
                            <i class="fas fa-${isCorrect ? 'check' : 'times'}"></i>
                            <span>Вопрос ${index + 1}: ${question.question.substring(0, 50)}...</span>
                        </div>
                        <div class="result-points">
                            ${isCorrect ? question.points : 0}/${question.points}
                        </div>
                    </div>
                `;
            });
            resultsList.innerHTML = html;
        }
    }
    
    animateScore(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    isAnswerCorrect(question, userAnswer) {
        if (!userAnswer) return false;
        
        switch (question.type) {
            case 'multiple-choice':
                return userAnswer === question.correctAnswer;
            case 'fill-blank':
                return userAnswer.toLowerCase() === question.blankWord.toLowerCase();
            case 'matching':
                const matches = userAnswer;
                let correctCount = 0;
                question.correctMatches.forEach(correct => {
                    const userMatch = matches.find(m => 
                        m.term === correct.term && m.definition === correct.definition
                    );
                    if (userMatch) correctCount++;
                });
                return correctCount === question.correctMatches.length;
        }
        return false;
    }
    
    saveTestResults() {
        const testEndTime = new Date();
        const duration = Math.round((testEndTime - this.testStartTime) / 1000); // в секундах
        
        const testResult = {
            date: new Date().toISOString(),
            score: this.score,
            total: this.totalQuestions * 10,
            duration: duration,
            questions: this.totalQuestions
        };
        
        ProgressManager.saveTestResult(testResult);
        ProgressManager.updateBestScore(this.score);
    }
    
    restartTest() {
        this.startTest();
    }
    
    reviewAnswers() {
        // Показываем правильные ответы
        alert('Функция просмотра ответов будет реализована в следующей версии!');
    }
}

// Инициализация теста
let testManager;
document.addEventListener('DOMContentLoaded', () => {
    testManager = new TestManager();
});

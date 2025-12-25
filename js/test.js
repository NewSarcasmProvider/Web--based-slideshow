// Модуль тестирования - ПОЛНАЯ РАБОЧАЯ ВЕРСИЯ (10 вопросов)
class TestManager {
    constructor() {
        // Создаем 10 вопросов сразу
        this.questions = this.createAllQuestions();
        this.totalQuestions = 10; // Фиксируем 10 вопросов
        
        console.log(`✅ TestManager initialized with ${this.totalQuestions} questions`);
        
        this.currentQuestionIndex = 0;
        this.userAnswers = new Array(this.totalQuestions).fill(null);
        this.score = 0;
        this.testStarted = false;
        this.testInProgress = false;
        
        this.init();
    }
    
    createAllQuestions() {
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
                explanation: 'Спринт - это короткий, фиксированный по времени период (обычно 1-4 недели).',
                points: 10,
                category: 'Основные понятия'
            },
            {
                id: 2,
                type: 'multiple-choice',
                question: 'Кто такой SCRUM-мастер в образовании?',
                options: [
                    { text: 'Студент-отличник', correct: false },
                    { text: 'Преподаватель или тьютор, фасилитатор процесса', correct: true },
                    { text: 'Руководитель учебного заведения', correct: false },
                    { text: 'Внешний эксперт', correct: false }
                ],
                correctAnswer: 'Преподаватель или тьютор, фасилитатор процесса',
                explanation: 'SCRUM-мастер помогает организовать работу, устраняет препятствия.',
                points: 10,
                category: 'Роли'
            },
            {
                id: 3,
                type: 'multiple-choice',
                question: 'Что такое "Учебный бэклог"?',
                options: [
                    { text: 'Список опоздавших студентов', correct: false },
                    { text: 'Приоритизированный список учебных задач', correct: true },
                    { text: 'Журнал успеваемости', correct: false },
                    { text: 'Расписание занятий', correct: false }
                ],
                correctAnswer: 'Приоритизированный список учебных задач',
                explanation: 'Бэклог постоянно актуализируется в процессе обучения.',
                points: 10,
                category: 'Инструменты'
            },
            {
                id: 4,
                type: 'multiple-choice',
                question: 'Что такое "Учебная команда" в SCRUM?',
                options: [
                    { text: 'Группа преподавателей', correct: false },
                    { text: 'Самоорганизующаяся группа студентов', correct: true },
                    { text: 'Администрация учебного заведения', correct: false },
                    { text: 'Внешние консультанты', correct: false }
                ],
                correctAnswer: 'Самоорганизующаяся группа студентов',
                explanation: 'Команда самостоятельно распределяет задачи между участниками.',
                points: 10,
                category: 'Роли'
            },
            {
                id: 5,
                type: 'multiple-choice',
                question: 'Какова цель ежедневного стендапа?',
                options: [
                    { text: 'Принять важные решения', correct: false },
                    { text: 'Синхронизировать работу команды', correct: true },
                    { text: 'Провести обучение', correct: false },
                    { text: 'Назначить задачи', correct: false }
                ],
                correctAnswer: 'Синхронизировать работу команды',
                explanation: 'Стендап помогает быстро выявить и устранить препятствия.',
                points: 10,
                category: 'Церемонии'
            },
            {
                id: 6,
                type: 'matching',
                question: 'Сопоставьте термины и их определения:',
                pairs: [
                    { term: 'Диаграмма сгорания задач', definition: 'Визуальный инструмент для отслеживания прогресса' },
                    { term: 'Ретроспектива спринта', definition: 'Анализ процесса работы для улучшений' },
                    { term: 'Планирование спринта', definition: 'Определение целей и задач на спринт' },
                    { term: 'Обзор спринта', definition: 'Демонстрация результатов работы' }
                ],
                points: 10,
                category: 'Инструменты и церемонии'
            },
            {
                id: 7,
                type: 'fill-blank',
                question: 'Заполните пропуск:',
                text: 'На ежедневном стендапе каждый участник отвечает на три вопроса: что было сделано ______, что планируется сделать сегодня и какие есть препятствия.',
                correctAnswer: 'вчера',
                hint: 'Начинается на "в"',
                points: 10,
                category: 'Церемонии'
            },
            {
                id: 8,
                type: 'fill-blank',
                question: 'Заполните пропуск:',
                text: '______ - это приоритизированный список учебных задач, тем и компетенций.',
                correctAnswer: 'Учебный бэклог',
                hint: 'Начинается на "У"',
                points: 10,
                category: 'Инструменты'
            },
            {
                id: 9,
                type: 'multiple-choice',
                question: 'Сколько вопросов задает каждый участник на ежедневном стендапе?',
                options: [
                    { text: '1', correct: false },
                    { text: '2', correct: false },
                    { text: '3', correct: true },
                    { text: '4', correct: false }
                ],
                correctAnswer: '3',
                explanation: 'Что сделал вчера, что сделает сегодня, какие препятствия.',
                points: 10,
                category: 'Церемонии'
            },
            {
                id: 10,
                type: 'multiple-choice',
                question: 'Кто формирует учебный бэклог?',
                options: [
                    { text: 'Студенты', correct: false },
                    { text: 'SCRUM-мастер', correct: false },
                    { text: 'Преподаватель', correct: true },
                    { text: 'Все вместе', correct: false }
                ],
                correctAnswer: 'Преподаватель',
                explanation: 'Преподаватель формирует бэклог с учетом учебной программы.',
                points: 10,
                category: 'Роли'
            }
        ];
    }
    
    init() {
        this.setupEventListeners();
        this.initializeTest();
        console.log('✅ TestManager fully initialized');
    }
    
    initializeTest() {
        console.log('📋 Initializing test...');
        this.userAnswers = new Array(this.totalQuestions).fill(null);
        this.score = 0;
        this.currentQuestionIndex = 0;
        this.testInProgress = false;
        
        this.updateQuestionCounter();
        this.updateNavigationButtons();
        
        console.log('✅ Test initialized with', this.totalQuestions, 'questions');
    }
    
    setupEventListeners() {
        // Кнопка начала теста
        const startBtn = document.getElementById('start-test-btn');
        if (startBtn) {
            startBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('🚀 Start test button clicked');
                this.startTest();
            });
        }
        
        // Кнопки навигации
        const prevBtn = document.getElementById('prev-question-btn');
        const nextBtn = document.getElementById('next-question-btn');
        const finishBtn = document.getElementById('finish-test-btn');
        
        if (prevBtn) prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.prevQuestion();
        });
        
        if (nextBtn) nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.nextQuestion();
        });
        
        if (finishBtn) finishBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.finishTest();
        });
        
        // Кнопки результатов
        const restartBtn = document.getElementById('restart-test-btn');
        const reviewBtn = document.getElementById('review-test-btn');
        
        if (restartBtn) restartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.restartTest();
        });
        
        if (reviewBtn) reviewBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.reviewAnswers();
        });
        
        console.log('✅ All event listeners set up');
    }
    
    startTest() {
        console.log('🎯 STARTING TEST ============');
        
        if (this.questions.length === 0) {
            console.error('❌ No questions available!');
            alert('Ошибка: вопросы не загружены!');
            return;
        }
        
        this.testStarted = true;
        this.testInProgress = true;
        this.testStartTime = new Date();
        
        // Сброс предыдущих ответов
        this.userAnswers = new Array(this.totalQuestions).fill(null);
        this.score = 0;
        this.currentQuestionIndex = 0;
        
        // Переключение экранов
        this.showScreen('test-questions-screen');
        this.updateProgressBar();
        this.displayQuestion();
        
        // Обновляем статистику
        if (window.ProgressManager) {
            ProgressManager.incrementTestsTaken();
        }
        
        console.log(`✅ Test started with ${this.totalQuestions} questions`);
        console.log('📝 Questions:', this.questions.map(q => q.question.substring(0, 30) + '...'));
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
            console.log(`🖥️ Showing screen: ${screenId}`);
        }
    }
    
    updateProgressBar() {
        const progress = ((this.currentQuestionIndex + 1) / this.totalQuestions) * 100;
        const progressFill = document.getElementById('progress-fill');
        
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
        
        this.updateQuestionCounter();
    }
    
    updateQuestionCounter() {
        const currentQuestionEl = document.getElementById('current-question');
        const totalQuestionsEl = document.getElementById('total-questions');
        
        if (currentQuestionEl) {
            currentQuestionEl.textContent = this.currentQuestionIndex + 1;
        }
        
        if (totalQuestionsEl) {
            totalQuestionsEl.textContent = this.totalQuestions;
        }
    }
    
    displayQuestion() {
        const container = document.getElementById('question-container');
        if (!container) {
            console.error('❌ Question container not found!');
            return;
        }
        
        if (this.currentQuestionIndex >= this.questions.length) {
            console.error('❌ Question index out of bounds!');
            return;
        }
        
        const question = this.questions[this.currentQuestionIndex];
        console.log(`❓ Displaying question ${this.currentQuestionIndex + 1}: ${question.question.substring(0, 40)}...`);
        
        let html = '';
        
        switch (question.type) {
            case 'multiple-choice':
                html = this.renderMultipleChoice(question);
                break;
            case 'matching':
                html = this.renderMatching(question);
                break;
            case 'fill-blank':
                html = this.renderFillBlank(question);
                break;
            default:
                html = '<p>Неизвестный тип вопроса</p>';
                console.error('❌ Unknown question type:', question.type);
        }
        
        container.innerHTML = html;
        this.updateProgressBar();
        this.updateNavigationButtons();
        this.setupQuestionListeners(question.type);
        
        console.log(`✅ Question ${this.currentQuestionIndex + 1} displayed`);
    }
    
    renderMultipleChoice(question) {
        const userAnswer = this.userAnswers[this.currentQuestionIndex];
        const options = ['A', 'B', 'C', 'D'];
        
        let html = `
            <div class="question-text">${question.question}</div>
            <div class="answer-options">
        `;
        
        question.options.forEach((option, index) => {
            const isSelected = userAnswer === option.text;
            const className = isSelected ? 'answer-option selected' : 'answer-option';
            
            html += `
                <div class="${className}" data-answer="${option.text}" data-correct="${option.correct}">
                    <div class="option-letter">${options[index]}</div>
                    <div class="option-text">${option.text}</div>
                </div>
            `;
        });
        
        html += '</div>';
        return html;
    }
    
    renderMatching(question) {
        const userAnswer = this.userAnswers[this.currentQuestionIndex] || [];
        
        // Перемешиваем пары для вопросов
        const shuffledTerms = [...question.pairs].sort(() => Math.random() - 0.5);
        const shuffledDefinitions = [...question.pairs].sort(() => Math.random() - 0.5);
        
        let html = `
            <div class="question-text">${question.question}</div>
            <div class="matching-container">
                <div class="terms-column">
                    <h4><i class="fas fa-list"></i> Термины:</h4>
        `;
        
        shuffledTerms.forEach((pair, index) => {
            html += `<div class="matching-term" data-term="${pair.term}">
                        <span class="term-number">${index + 1}.</span> ${pair.term}
                     </div>`;
        });
        
        html += `
                </div>
                <div class="definitions-column">
                    <h4><i class="fas fa-align-left"></i> Определения:</h4>
        `;
        
        shuffledDefinitions.forEach((pair, index) => {
            const letter = String.fromCharCode(65 + index);
            html += `
                <div class="matching-definition" data-definition="${pair.definition}">
                    <span class="def-letter">${letter}.</span> ${pair.definition}
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
            <div class="matching-pairs">
                <h4><i class="fas fa-link"></i> Ваши сопоставления:</h4>
                <div id="pairs-container" class="pairs-container">
        `;
        
        if (userAnswer.length === 0) {
            html += `<div class="no-pairs">
                        <i class="fas fa-mouse-pointer"></i>
                        <p>Кликните на термин, затем на определение для сопоставления</p>
                     </div>`;
        } else {
            userAnswer.forEach((pair, index) => {
                html += `
                    <div class="pair-item">
                        <span class="pair-term">${pair.term}</span>
                        <i class="fas fa-arrow-right"></i>
                        <span class="pair-definition">${pair.definition}</span>
                        <button class="remove-pair" data-index="${index}" title="Удалить">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                `;
            });
        }
        
        html += `
                </div>
                <div class="matching-hint">
                    <i class="fas fa-lightbulb"></i> 
                    Подсказка: нужно сопоставить все 4 пары правильно
                </div>
            </div>
        `;
        
        return html;
    }
    
    renderFillBlank(question) {
        const userAnswer = this.userAnswers[this.currentQuestionIndex] || '';
        
        return `
            <div class="question-text">${question.question}</div>
            <div class="fill-blank-container">
                <div class="fill-blank-text">
                    ${question.text.replace('______', '<span class="blank-space">______</span>')}
                </div>
                <div class="blank-input-container">
                    <input type="text" 
                           id="blank-input" 
                           placeholder="Введите пропущенное слово" 
                           value="${userAnswer}"
                           autocomplete="off"
                           autofocus>
                    <div class="hint-text">
                        <i class="fas fa-lightbulb"></i> ${question.hint}
                    </div>
                </div>
            </div>
        `;
    }
    
    setupQuestionListeners(type) {
        switch (type) {
            case 'multiple-choice':
                this.setupMultipleChoiceListeners();
                break;
            case 'matching':
                this.setupMatchingListeners();
                break;
            case 'fill-blank':
                this.setupFillBlankListeners();
                break;
        }
    }
    
    setupMultipleChoiceListeners() {
        const container = document.getElementById('question-container');
        if (!container) return;
        
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
                
                console.log(`✅ Selected answer for question ${this.currentQuestionIndex + 1}: ${answer}`);
                this.updateNavigationButtons();
            });
        });
    }
    
    setupMatchingListeners() {
        let selectedTerm = null;
        let selectedDefinition = null;
        
        // Обработчики для терминов
        document.querySelectorAll('.matching-term').forEach(term => {
            term.addEventListener('click', (e) => {
                // Снимаем выделение
                document.querySelectorAll('.matching-term, .matching-definition').forEach(el => {
                    el.classList.remove('selected');
                });
                
                // Выделяем термин
                term.classList.add('selected');
                selectedTerm = term.dataset.term;
                selectedDefinition = null;
                
                console.log(`📌 Selected term: ${selectedTerm}`);
                this.tryCreatePair(selectedTerm, selectedDefinition);
            });
        });
        
        // Обработчики для определений
        document.querySelectorAll('.matching-definition').forEach(def => {
            def.addEventListener('click', (e) => {
                // Снимаем выделение
                document.querySelectorAll('.matching-term, .matching-definition').forEach(el => {
                    el.classList.remove('selected');
                });
                
                // Выделяем определение
                def.classList.add('selected');
                selectedDefinition = def.dataset.definition;
                
                console.log(`📌 Selected definition: ${selectedDefinition.substring(0, 30)}...`);
                this.tryCreatePair(selectedTerm, selectedDefinition);
            });
        });
        
        // Обработчики для удаления пар
        document.querySelectorAll('.remove-pair').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const index = parseInt(e.currentTarget.dataset.index);
                const matches = this.userAnswers[this.currentQuestionIndex] || [];
                matches.splice(index, 1);
                this.userAnswers[this.currentQuestionIndex] = matches;
                this.displayQuestion(); // Перерисовываем
                console.log(`🗑️ Removed pair at index ${index}`);
            });
        });
    }
    
    tryCreatePair(term, definition) {
        if (term && definition) {
            // Получаем текущие сопоставления
            let matches = this.userAnswers[this.currentQuestionIndex] || [];
            
            // Проверяем, не сопоставлен ли уже этот термин
            const existingTermIndex = matches.findIndex(m => m.term === term);
            if (existingTermIndex !== -1) {
                matches[existingTermIndex].definition = definition;
            } else {
                // Проверяем, не сопоставлено ли уже это определение
                const existingDefIndex = matches.findIndex(m => m.definition === definition);
                if (existingDefIndex !== -1) {
                    matches[existingDefIndex].term = term;
                } else {
                    // Добавляем новое сопоставление
                    matches.push({ term, definition });
                }
            }
            
            // Ограничиваем количество пар (в данном случае 4)
            if (matches.length > 4) {
                matches = matches.slice(0, 4);
            }
            
            // Сохраняем
            this.userAnswers[this.currentQuestionIndex] = matches;
            
            // Перерисовываем вопрос
            this.displayQuestion();
            
            console.log(`✅ Created pair: ${term} → ${definition.substring(0, 30)}...`);
            console.log(`📊 Current pairs:`, matches);
        }
    }
    
    setupFillBlankListeners() {
        const input = document.getElementById('blank-input');
        if (!input) return;
        
        input.addEventListener('input', (e) => {
            const answer = e.target.value.trim();
            this.userAnswers[this.currentQuestionIndex] = answer;
            this.updateNavigationButtons();
        });
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.nextQuestion();
            }
        });
        
        // Фокус на поле ввода
        setTimeout(() => input.focus(), 100);
    }
    
    updateNavigationButtons() {
        const prevBtn = document.getElementById('prev-question-btn');
        const nextBtn = document.getElementById('next-question-btn');
        const finishBtn = document.getElementById('finish-test-btn');
        
        if (!prevBtn || !nextBtn || !finishBtn) {
            console.error('❌ Navigation buttons not found!');
            return;
        }
        
        // Кнопка "Назад"
        prevBtn.disabled = this.currentQuestionIndex === 0;
        
        // Проверяем, есть ли ответ на текущий вопрос
        const hasAnswer = this.checkIfQuestionAnswered();
        
        // Кнопка "Далее" и "Завершить"
        if (this.currentQuestionIndex === this.totalQuestions - 1) {
            // Последний вопрос
            nextBtn.style.display = 'none';
            finishBtn.style.display = 'flex';
            finishBtn.disabled = !hasAnswer;
        } else {
            // Не последний вопрос
            nextBtn.style.display = 'flex';
            finishBtn.style.display = 'none';
            nextBtn.disabled = !hasAnswer;
        }
    }
    
    checkIfQuestionAnswered() {
        const answer = this.userAnswers[this.currentQuestionIndex];
        
        if (!answer && answer !== '') return false;
        
        if (Array.isArray(answer)) {
            return answer.length > 0; // Для сопоставлений
        }
        
        return answer.toString().trim().length > 0;
    }
    
    prevQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.displayQuestion();
            console.log(`◀️ Previous question: ${this.currentQuestionIndex + 1}`);
        }
    }
    
    nextQuestion() {
        if (this.currentQuestionIndex < this.totalQuestions - 1) {
            this.currentQuestionIndex++;
            this.displayQuestion();
            console.log(`▶️ Next question: ${this.currentQuestionIndex + 1}`);
        }
    }
    
    finishTest() {
        if (!this.testInProgress) {
            console.error('❌ Test not in progress!');
            return;
        }
        
        console.log('🏁 FINISHING TEST ============');
        this.testInProgress = false;
        this.calculateScore();
        this.showResults();
        this.saveTestResults();
    }
    
    calculateScore() {
        console.log('🧮 Calculating score...');
        this.score = 0;
        
        this.questions.forEach((question, index) => {
            const userAnswer = this.userAnswers[index];
            
            if (!userAnswer && userAnswer !== '') {
                console.log(`❓ Question ${index + 1}: No answer`);
                return;
            }
            
            let questionScore = 0;
            
            switch (question.type) {
                case 'multiple-choice':
                    if (userAnswer === question.correctAnswer) {
                        questionScore = question.points;
                    }
                    break;
                    
                case 'matching':
                    if (userAnswer && Array.isArray(userAnswer)) {
                        let correctMatches = 0;
                        
                        question.pairs.forEach(correctPair => {
                            const userMatch = userAnswer.find(m => 
                                m.term === correctPair.term && m.definition === correctPair.definition
                            );
                            if (userMatch) {
                                correctMatches++;
                            }
                        });
                        
                        // Частичные баллы за правильные сопоставления
                        questionScore = (correctMatches / question.pairs.length) * question.points;
                    }
                    break;
                    
                case 'fill-blank':
                    if (userAnswer.toLowerCase() === question.correctAnswer.toLowerCase()) {
                        questionScore = question.points;
                    }
                    break;
            }
            
            this.score += questionScore;
            console.log(`📊 Question ${index + 1}: ${Math.round(questionScore)}/${question.points} points`);
        });
        
        this.score = Math.round(this.score);
        console.log(`✅ Final score: ${this.score}/${this.totalQuestions * 10}`);
    }
    
    showResults() {
        console.log('📊 Showing results...');
        this.showScreen('test-results-screen');
        
        // Обновляем отображение счета
        this.updateScoreDisplay();
        
        // Показываем детализацию
        this.showResultsDetails();
        
        // Обновляем анимацию прогресса
        this.animateScoreCircle();
    }
    
    updateScoreDisplay() {
        const scoreValue = document.getElementById('score-value');
        const scoreMessage = document.getElementById('score-message');
        const scoreDetails = document.getElementById('score-details');
        
        if (scoreValue) {
            // Анимация счетчика
            this.animateCounter(scoreValue, 0, this.score, 1500);
        }
        
        if (scoreMessage) {
            let message = '';
            let emoji = '';
            
            if (this.score >= 90) {
                message = 'Отличный результат!';
                emoji = '🏆';
            } else if (this.score >= 70) {
                message = 'Хороший результат!';
                emoji = '👍';
            } else if (this.score >= 50) {
                message = 'Неплохой результат!';
                emoji = '👌';
            } else {
                message = 'Есть куда расти!';
                emoji = '📚';
            }
            
            scoreMessage.innerHTML = `${emoji} ${message}`;
        }
        
        if (scoreDetails) {
            const percentage = Math.round((this.score / (this.totalQuestions * 10)) * 100);
            const correctAnswers = Math.round(this.score / 10);
            scoreDetails.textContent = `Вы набрали ${this.score} баллов из ${this.totalQuestions * 10} (${percentage}%). Правильных ответов: ${correctAnswers} из ${this.totalQuestions}`;
        }
    }
    
    animateCounter(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value;
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    animateScoreCircle() {
        const percentage = (this.score / (this.totalQuestions * 10)) * 100;
        const scoreCircle = document.querySelector('.score-circle');
        
        if (scoreCircle) {
            scoreCircle.style.background = `conic-gradient(#4CAF50 0% ${percentage}%, #e0e0e0 ${percentage}% 100%)`;
        }
    }
    
    showResultsDetails() {
        const resultsList = document.getElementById('results-list');
        if (!resultsList) return;
        
        let html = '';
        
        this.questions.forEach((question, index) => {
            const userAnswer = this.userAnswers[index];
            const isCorrect = this.isAnswerCorrect(question, userAnswer);
            const points = isCorrect ? question.points : 0;
            
            html += `
                <div class="result-item ${isCorrect ? 'correct' : 'incorrect'}">
                    <div class="result-status">
                        <i class="fas fa-${isCorrect ? 'check-circle' : 'times-circle'}"></i>
                        <div class="result-question-info">
                            <span class="result-question-number">Вопрос ${index + 1}</span>
                            <span class="result-question-text">${question.question.substring(0, 50)}...</span>
                        </div>
                    </div>
                    <div class="result-points">
                        ${points}/${question.points}
                    </div>
                </div>
            `;
        });
        
        resultsList.innerHTML = html;
    }
    
    isAnswerCorrect(question, userAnswer) {
        if (!userAnswer && userAnswer !== '') return false;
        
        switch (question.type) {
            case 'multiple-choice':
                return userAnswer === question.correctAnswer;
                
            case 'fill-blank':
                return userAnswer.toLowerCase() === question.correctAnswer.toLowerCase();
                
            case 'matching':
                if (!userAnswer || !Array.isArray(userAnswer)) return false;
                
                let correctCount = 0;
                question.pairs.forEach(correctPair => {
                    const userMatch = userAnswer.find(m => 
                        m.term === correctPair.term && m.definition === correctPair.definition
                    );
                    if (userMatch) correctCount++;
                });
                
                return correctCount === question.pairs.length;
                
            default:
                return false;
        }
    }
    
    saveTestResults() {
        const testEndTime = new Date();
        const duration = Math.round((testEndTime - this.testStartTime) / 1000);
        
        const testResult = {
            date: new Date().toISOString(),
            score: this.score,
            total: this.totalQuestions * 10,
            duration: duration,
            questions: this.totalQuestions,
            percentage: Math.round((this.score / (this.totalQuestions * 10)) * 100)
        };
        
        if (window.ProgressManager) {
            ProgressManager.saveTestResult(testResult);
            ProgressManager.updateBestScore(this.score);
        }
        
        console.log('💾 Test results saved:', testResult);
    }
    
    restartTest() {
        console.log('🔄 Restarting test...');
        this.initializeTest();
        this.showScreen('test-start-screen');
    }
    
    reviewAnswers() {
        console.log('🔍 Reviewing answers...');
        
        let reviewHtml = '<div class="review-container">';
        reviewHtml += '<h3><i class="fas fa-list-check"></i> Обзор ответов</h3>';
        
        this.questions.forEach((question, index) => {
            const userAnswer = this.userAnswers[index];
            const isCorrect = this.isAnswerCorrect(question, userAnswer);
            const formattedUserAnswer = this.formatUserAnswerForReview(userAnswer, question.type);
            const correctAnswer = this.getCorrectAnswerText(question);
            
            reviewHtml += `
                <div class="review-item ${isCorrect ? 'correct' : 'incorrect'}">
                    <div class="review-question-header">
                        <span class="review-number">Вопрос ${index + 1}</span>
                        <span class="review-category">${question.category}</span>
                    </div>
                    <div class="review-question">
                        <strong>${question.question}</strong>
                    </div>
                    <div class="review-answer ${isCorrect ? 'correct' : 'incorrect'}">
                        <span class="review-label">Ваш ответ:</span>
                        <span class="review-value">${formattedUserAnswer}</span>
                        <i class="fas fa-${isCorrect ? 'check' : 'times'}"></i>
                    </div>
                    <div class="review-correct-answer">
                        <span class="review-label">Правильный ответ:</span>
                        <span class="review-value">${correctAnswer}</span>
                    </div>
            `;
            
            if (question.explanation) {
                reviewHtml += `<div class="review-explanation">
                                <i class="fas fa-info-circle"></i>
                                ${question.explanation}
                               </div>`;
            }
            
            reviewHtml += '</div>';
        });
        
        reviewHtml += '</div>';
        
        // Показываем в модальном окне
        this.showModal('Обзор ответов', reviewHtml);
    }
    
    formatUserAnswerForReview(answer, type) {
        if (!answer && answer !== '') return '<span class="no-answer">Нет ответа</span>';
        
        switch (type) {
            case 'matching':
                if (Array.isArray(answer) && answer.length > 0) {
                    return answer.map(pair => 
                        `<div class="pair-review">${pair.term} → ${pair.definition}</div>`
                    ).join('');
                }
                return '<span class="no-answer">Нет сопоставлений</span>';
            default:
                return answer || '<span class="no-answer">Пустой ответ</span>';
        }
    }
    
    getCorrectAnswerText(question) {
        switch (question.type) {
            case 'multiple-choice':
                return question.correctAnswer;
            case 'fill-blank':
                return question.correctAnswer;
            case 'matching':
                return question.pairs.map(pair => 
                    `<div class="pair-review">${pair.term} → ${pair.definition}</div>`
                ).join('');
            default:
                return 'Неизвестно';
        }
    }
    
    showModal(title, content) {
        // Удаляем старые модальные окна
        document.querySelectorAll('.modal-overlay').forEach(el => el.remove());
        
        // Создаем модальное окно
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        modalOverlay.innerHTML = `
            <div class="modal-container">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close" aria-label="Закрыть">&times;</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
                <div class="modal-footer">
                    <button class="modal-ok-btn">
                        <i class="fas fa-check"></i> Закрыть
                    </button>
                </div>
            </div>
        `;
        
        // Добавляем стили
        if (!document.getElementById('modal-styles')) {
            const style = document.createElement('style');
            style.id = 'modal-styles';
            style.textContent = this.getModalStyles();
            document.head.appendChild(style);
        }
        
        document.body.appendChild(modalOverlay);
        
        // Закрытие модального окна
        const closeModal = () => {
            modalOverlay.classList.add('fade-out');
            setTimeout(() => {
                if (modalOverlay.parentNode) {
                    modalOverlay.parentNode.removeChild(modalOverlay);
                }
            }, 300);
        };
        
        modalOverlay.querySelector('.modal-close').addEventListener('click', closeModal);
        modalOverlay.querySelector('.modal-ok-btn').addEventListener('click', closeModal);
        
        // Закрытие по клику на фон
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
        
        // Закрытие по ESC
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escHandler);
            }
        });
    }
    
    getModalStyles() {
        return `
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.7);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            
            .modal-overlay.fade-out {
                animation: fadeOut 0.3s ease;
            }
            
            .modal-container {
                background: white;
                border-radius: 12px;
                width: 90%;
                max-width: 800px;
                max-height: 85vh;
                overflow: hidden;
                box-shadow: 0 10px 40px rgba(0,0,0,0.3);
                animation: slideUp 0.3s ease;
            }
            
            .modal-header {
                background: linear-gradient(135deg, #1a237e 0%, #4a148c 100%);
                color: white;
                padding: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .modal-header h3 {
                margin: 0;
                font-size: 1.5rem;
            }
            
            .modal-close {
                background: none;
                border: none;
                color: white;
                font-size: 28px;
                cursor: pointer;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background 0.2s;
            }
            
            .modal-close:hover {
                background: rgba(255,255,255,0.2);
            }
            
            .modal-body {
                padding: 25px;
                overflow-y: auto;
                max-height: 60vh;
            }
            
            .modal-footer {
                padding: 20px;
                text-align: right;
                border-top: 1px solid #eee;
            }
            
            .modal-ok-btn {
                background: #1a237e;
                color: white;
                border: none;
                padding: 12px 30px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 1rem;
                display: inline-flex;
                align-items: center;
                gap: 10px;
                transition: all 0.2s;
            }
            
            .modal-ok-btn:hover {
                background: #3949ab;
                transform: translateY(-2px);
            }
            
            /* Стили для обзора ответов */
            .review-container {
                font-family: 'Roboto', sans-serif;
            }
            
            .review-item {
                margin-bottom: 25px;
                padding: 20px;
                border-radius: 8px;
                border-left: 5px solid #ccc;
            }
            
            .review-item.correct {
                background: #f1f8e9;
                border-left-color: #4caf50;
            }
            
            .review-item.incorrect {
                background: #ffebee;
                border-left-color: #f44336;
            }
            
            .review-question-header {
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
                font-size: 0.9rem;
            }
            
            .review-number {
                font-weight: bold;
                color: #1a237e;
            }
            
            .review-category {
                color: #666;
                background: #eee;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 0.8rem;
            }
            
            .review-question {
                margin-bottom: 15px;
                font-size: 1.1rem;
                line-height: 1.5;
            }
            
            .review-answer, .review-correct-answer {
                margin-bottom: 10px;
                padding: 10px;
                border-radius: 5px;
                display: flex;
                align-items: flex-start;
                gap: 10px;
            }
            
            .review-answer.correct {
                background: #e8f5e9;
                border: 1px solid #c8e6c9;
            }
            
            .review-answer.incorrect {
                background: #ffebee;
                border: 1px solid #ffcdd2;
            }
            
            .review-label {
                font-weight: bold;
                min-width: 120px;
            }
            
            .review-value {
                flex: 1;
            }
            
            .no-answer {
                color: #999;
                font-style: italic;
            }
            
            .pair-review {
                padding: 5px 0;
                border-bottom: 1px dashed #ddd;
            }
            
            .pair-review:last-child {
                border-bottom: none;
            }
            
            .review-explanation {
                margin-top: 15px;
                padding: 15px;
                background: #e3f2fd;
                border-radius: 5px;
                font-size: 0.95rem;
                color: #1565c0;
                display: flex;
                align-items: flex-start;
                gap: 10px;
            }
            
            .review-explanation i {
                margin-top: 2px;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            
            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
    }
}

// Инициализация теста
document.addEventListener('DOMContentLoaded', () => {
    window.testManager = new TestManager();
    console.log('🎉 TestManager полностью загружен и готов к работе!');
    
    // Добавляем глобальную функцию для отладки
    window.debugTest = function() {
        console.log('=== DEBUG TEST MANAGER ===');
        console.log('Questions:', window.testManager.questions);
        console.log('Total questions:', window.testManager.totalQuestions);
        console.log('Current index:', window.testManager.currentQuestionIndex);
        console.log('User answers:', window.testManager.userAnswers);
        console.log('Test in progress:', window.testManager.testInProgress);
        console.log('=======================');
    };
});
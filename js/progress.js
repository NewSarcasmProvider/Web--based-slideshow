// Модуль управления прогрессом
class ProgressManager {
    static STORAGE_KEY = 'scrum-glossary-progress';
    
    static init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.loadProgress();
            this.setupEventListeners();
            this.updateDisplay();
        });
    }
    
    static loadProgress() {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        if (saved) {
            try {
                this.progress = JSON.parse(saved);
            } catch (error) {
                console.error('Ошибка загрузки прогресса:', error);
                this.resetProgress();
            }
        } else {
            this.resetProgress();
        }
    }
    
    static resetProgress() {
        this.progress = {
            studiedTerms: [],
            testResults: [],
            bestScore: 0,
            testsTaken: 0,
            firstActive: new Date().toISOString(),
            lastActive: new Date().toISOString(),
            totalVisits: 1
        };
        this.saveProgress();
    }
    
    static saveProgress() {
        this.progress.lastActive = new Date().toISOString();
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.progress));
    }
    
    static setupEventListeners() {
        // Кнопка сброса прогресса
        const resetBtn = document.getElementById('reset-progress-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (confirm('Вы уверены, что хотите сбросить весь прогресс? Это действие нельзя отменить.')) {
                    this.resetProgress();
                    this.updateDisplay();
                    alert('Прогресс сброшен!');
                }
            });
        }
        
        // Ссылка на GitHub
        const githubLink = document.getElementById('view-on-github');
        if (githubLink) {
            githubLink.addEventListener('click', (e) => {
                e.preventDefault();
                window.open('https://github.com', '_blank');
            });
        }
        
        // Ссылка на Issue
        const issueLink = document.getElementById('report-issue');
        if (issueLink) {
            issueLink.addEventListener('click', (e) => {
                e.preventDefault();
                window.open('https://github.com/username/repo/issues/new', '_blank');
            });
        }
    }
    
    static updateDisplay() {
        // Изученные термины
        const studiedEl = document.getElementById('studied-terms');
        const termsProgressEl = document.getElementById('terms-progress');
        
        if (studiedEl && termsProgressEl) {
            const studiedCount = this.progress.studiedTerms.length;
            const totalTerms = 10; // Из glossary.json
            const percentage = (studiedCount / totalTerms) * 100;
            
            studiedEl.textContent = `${studiedCount}/${totalTerms}`;
            termsProgressEl.style.width = `${percentage}%`;
        }
        
        // Лучший результат
        const bestScoreEl = document.getElementById('best-score');
        const testsTakenEl = document.getElementById('tests-taken');
        
        if (bestScoreEl) {
            bestScoreEl.textContent = `${this.progress.bestScore}/100`;
        }
        
        if (testsTakenEl) {
            testsTakenEl.textContent = this.progress.testsTaken;
        }
        
        // Активность
        const lastActiveEl = document.getElementById('last-active');
        const firstActiveEl = document.getElementById('first-active');
        
        if (lastActiveEl) {
            lastActiveEl.textContent = this.formatDate(this.progress.lastActive);
        }
        
        if (firstActiveEl) {
            firstActiveEl.textContent = this.formatDate(this.progress.firstActive);
        }
        
        // История тестов
        this.updateTestHistory();
        
        // Счетчик посещений
        const totalVisitsEl = document.getElementById('total-visits');
        if (totalVisitsEl) {
            totalVisitsEl.textContent = `Посещений: ${this.progress.totalVisits}`;
        }
    }
    
    static formatDate(isoString) {
        const date = new Date(isoString);
        const now = new Date();
        const diffMs = now - date;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) {
            return 'Сегодня';
        } else if (diffDays === 1) {
            return 'Вчера';
        } else if (diffDays < 7) {
            return `${diffDays} дня назад`;
        } else {
            return date.toLocaleDateString('ru-RU');
        }
    }
    
    static updateTestHistory() {
        const historyEl = document.getElementById('test-history');
        if (!historyEl) return;
        
        if (this.progress.testResults.length === 0) {
            historyEl.innerHTML = `
                <div class="empty-history">
                    <i class="fas fa-history"></i>
                    <p>Здесь будет отображаться история ваших тестов</p>
                </div>
            `;
            return;
        }
        
        let html = '';
        this.progress.testResults.slice(0, 5).forEach((result, index) => {
            const date = new Date(result.date);
            const percentage = Math.round((result.score / result.total) * 100);
            
            html += `
                <div class="history-item">
                    <div class="history-date">
                        ${date.toLocaleDateString('ru-RU')}
                    </div>
                    <div class="history-score">
                        <span class="score-value">${result.score}/${result.total}</span>
                        <span class="score-percentage">(${percentage}%)</span>
                    </div>
                    <div class="history-duration">
                        <i class="fas fa-clock"></i>
                        ${result.duration} сек
                    </div>
                    <div class="history-questions">
                        ${result.questions} вопросов
                    </div>
                </div>
            `;
        });
        
        historyEl.innerHTML = html;
    }
    
    static markTermAsStudied(termId) {
        if (!this.progress.studiedTerms.includes(termId)) {
            this.progress.studiedTerms.push(termId);
            this.saveProgress();
            this.updateDisplay();
        }
    }
    
    static saveTestResult(result) {
        this.progress.testResults.unshift(result); // Добавляем в начало
        this.progress.testsTaken++;
        
        if (this.progress.testResults.length > 10) {
            this.progress.testResults = this.progress.testResults.slice(0, 10);
        }
        
        this.saveProgress();
        this.updateDisplay();
    }
    
    static updateBestScore(newScore) {
        if (newScore > this.progress.bestScore) {
            this.progress.bestScore = newScore;
            this.saveProgress();
            this.updateDisplay();
        }
    }
    
    static incrementTestsTaken() {
        this.progress.testsTaken++;
        this.saveProgress();
    }
    
    static incrementVisits() {
        this.progress.totalVisits++;
        this.saveProgress();
    }
}

// Инициализация модуля прогресса
ProgressManager.init();

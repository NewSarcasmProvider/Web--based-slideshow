// Главный модуль приложения
class App {
    constructor() {
        this.currentSection = 'glossary';
        this.init();
    }
    
    init() {
        this.setupNavigation();
        this.setupSectionSwitching();
        this.updateActiveSection();
        
        // Инициализируем посещение
        ProgressManager.incrementVisits();
    }
    
    setupNavigation() {
        document.addEventListener('DOMContentLoaded', () => {
            const navButtons = document.querySelectorAll('.nav-btn[data-section]');
            
            navButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const section = e.currentTarget.dataset.section;
                    this.switchSection(section);
                });
            });
        });
    }
    
    setupSectionSwitching() {
        // Обработка переключения секций через URL hash
        window.addEventListener('hashchange', () => {
            this.handleHashChange();
        });
        
        this.handleHashChange();
    }
    
    handleHashChange() {
        const hash = window.location.hash.substring(1) || 'glossary';
        this.switchSection(hash);
    }
    
    switchSection(section) {
        // Обновляем активную кнопку в навигации
        document.querySelectorAll('.nav-btn[data-section]').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.section === section) {
                btn.classList.add('active');
            }
        });
        
        // Скрываем все секции
        document.querySelectorAll('.content-section').forEach(sectionEl => {
            sectionEl.classList.remove('active');
        });
        
        // Показываем нужную секцию
        const targetSection = document.getElementById(`${section}-section`);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = section;
            
            // Обновляем URL hash
            window.location.hash = section;
        }
    }
    
    updateActiveSection() {
        // Проверяем начальный hash
        const initialHash = window.location.hash.substring(1);
        if (initialHash) {
            this.switchSection(initialHash);
        }
    }
}

// Инициализация приложения
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new App();
});

// Вспомогательные функции
function showNotification(message, type = 'info') {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Добавляем на страницу
    document.body.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Удаляем через 3 секунды
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Глобальные функции для отладки
window.debug = {
    showProgress: function() {
        console.log('Прогресс:', ProgressManager.progress);
        alert('Прогресс выведен в консоль');
    },
    
    resetAll: function() {
        if (confirm('Сбросить ВСЕ данные (локальное хранилище)?')) {
            localStorage.clear();
            location.reload();
        }
    },
    
    showTestData: function() {
        if (testManager) {
            console.log('Данные теста:', testManager);
        }
    }
};

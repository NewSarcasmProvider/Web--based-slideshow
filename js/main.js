// Главный модуль приложения - ИСПРАВЛЕННАЯ ВЕРСИЯ
class App {
    constructor() {
        this.currentSection = 'glossary';
        this.init();
    }
    
    init() {
        this.setupNavigation();
        this.setupSectionSwitching();
        this.updateActiveSection();
        
        console.log('App initialized');
    }
    
    setupNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn[data-section]');
        
        navButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.currentTarget.dataset.section;
                console.log('Switching to section:', section);
                this.switchSection(section);
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
        console.log('Hash changed to:', hash);
        this.switchSection(hash);
    }
    
    switchSection(section) {
        console.log('Switching section to:', section);
        
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
            
            // Обновляем URL hash без перезагрузки
            history.pushState(null, null, `#${section}`);
        } else {
            console.error('Section not found:', section);
        }
    }
    
    updateActiveSection() {
        // Проверяем начальный hash
        const initialHash = window.location.hash.substring(1);
        if (initialHash) {
            this.switchSection(initialHash);
        } else {
            this.switchSection('glossary');
        }
    }
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
    console.log('App loaded successfully');
});
// Модуль управления слайдами глоссария
class SlidesManager {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 0;
        this.glossaryData = [];
        this.filteredTerms = [];
        
        this.init();
    }
    
    async init() {
        await this.loadGlossaryData();
        this.renderSlides();
        this.setupEventListeners();
        this.setupSearch();
    }
    
    async loadGlossaryData() {
        try {
            const response = await fetch('data/glossary.json');
            const data = await response.json();
            this.glossaryData = data.terms;
            this.filteredTerms = [...this.glossaryData];
            this.totalSlides = this.glossaryData.length;
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
            this.glossaryData = this.getDefaultData();
            this.filteredTerms = [...this.glossaryData];
            this.totalSlides = this.glossaryData.length;
        }
    }
    
    getDefaultData() {
        return [
            {
                id: 1,
                term: "SCRUM в образовании",
                definition: "Адаптация гибкой методологии управления проектами SCRUM для использования в образовательном процессе.",
                category: "Основные понятия"
            }
        ];
    }
    
    renderSlides() {
        const container = document.getElementById('slides-container');
        const indicatorsContainer = document.getElementById('indicators-container');
        
        container.innerHTML = '';
        indicatorsContainer.innerHTML = '';
        
        this.filteredTerms.forEach((term, index) => {
            // Создание слайда
            const slide = document.createElement('div');
            slide.className = `slide ${index === 0 ? 'active' : ''}`;
            slide.id = `slide${index + 1}`;
            
            const iconClass = this.getIconByCategory(term.category);
            
            slide.innerHTML = `
                <div class="slide-content">
                    <div class="definition">
                        <div class="term">
                            <i class="${iconClass}"></i>
                            <h3>${term.term}</h3>
                        </div>
                        <div class="definition-text">
                            <p>${term.definition}</p>
                        </div>
                    </div>
                    <div class="slide-counter">Слайд ${index + 1} из ${this.filteredTerms.length}</div>
                </div>
            `;
            
            container.appendChild(slide);
            
            // Создание индикатора
            const indicator = document.createElement('div');
            indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
            indicator.dataset.index = index;
            indicator.addEventListener('click', () => this.goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });
        
        this.totalSlides = this.filteredTerms.length;
        this.currentSlide = 0;
    }
    
    getIconByCategory(category) {
        const icons = {
            'Основные понятия': 'fas fa-scroll',
            'Инструменты': 'fas fa-tools',
            'Роли': 'fas fa-user-tie',
            'Церемонии': 'fas fa-users'
        };
        
        return icons[category] || 'fas fa-scroll';
    }
    
    goToSlide(n) {
        const slides = document.querySelectorAll('.slide');
        const indicators = document.querySelectorAll('.indicator');
        
        if (slides.length === 0) return;
        
        slides[this.currentSlide].classList.remove('active');
        indicators[this.currentSlide].classList.remove('active');
        
        this.currentSlide = (n + this.totalSlides) % this.totalSlides;
        
        slides[this.currentSlide].classList.add('active');
        indicators[this.currentSlide].classList.add('active');
    }
    
    nextSlide() {
        this.goToSlide(this.currentSlide + 1);
    }
    
    prevSlide() {
        this.goToSlide(this.currentSlide - 1);
    }
    
    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            const prevBtn = document.querySelector('.prev-btn');
            const nextBtn = document.querySelector('.next-btn');
            
            if (prevBtn) {
                prevBtn.addEventListener('click', () => this.prevSlide());
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', () => this.nextSlide());
            }
            
            // Клавиатурная навигация
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    this.prevSlide();
                } else if (e.key === 'ArrowRight') {
                    this.nextSlide();
                }
            });
            
            // Свайпы для мобильных устройств
            this.setupSwipe();
        });
    }
    
    setupSwipe() {
        let touchStartX = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        document.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].screenX;
            const swipeThreshold = 50;
            
            if (touchEndX < touchStartX - swipeThreshold) {
                this.nextSlide();
            } else if (touchEndX > touchStartX + swipeThreshold) {
                this.prevSlide();
            }
        });
    }
    
    setupSearch() {
        document.addEventListener('DOMContentLoaded', () => {
            const searchInput = document.getElementById('search-input');
            const searchBtn = document.getElementById('search-btn');
            
            if (searchInput && searchBtn) {
                searchBtn.addEventListener('click', () => this.performSearch());
                searchInput.addEventListener('keyup', (e) => {
                    if (e.key === 'Enter') {
                        this.performSearch();
                    }
                });
            }
        });
    }
    
    performSearch() {
        const searchInput = document.getElementById('search-input');
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            this.filteredTerms = [...this.glossaryData];
        } else {
            this.filteredTerms = this.glossaryData.filter(term => 
                term.term.toLowerCase().includes(searchTerm) ||
                term.definition.toLowerCase().includes(searchTerm) ||
                term.category.toLowerCase().includes(searchTerm)
            );
        }
        
        this.renderSlides();
        
        // Показать сообщение если ничего не найдено
        if (this.filteredTerms.length === 0) {
            const container = document.getElementById('slides-container');
            container.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>Ничего не найдено</h3>
                    <p>Попробуйте изменить поисковый запрос</p>
                </div>
            `;
        }
    }
}

// Инициализация при загрузке страницы
let slidesManager;
document.addEventListener('DOMContentLoaded', () => {
    slidesManager = new SlidesManager();
});

// Модуль управления слайдами глоссария - УПРОЩЕННАЯ ВЕРСИЯ
class SlidesManager {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 0;
        this.slides = [];
        this.indicators = [];
        
        console.log('SlidesManager initialized');
        this.init();
    }
    
    init() {
        this.loadDefaultData();
        this.renderSlides();
        this.setupEventListeners();
        this.setupSearch();
    }
    
    loadDefaultData() {
        // Данные по умолчанию
        this.glossaryData = [
            {
                id: 1,
                term: "SCRUM в образовании",
                definition: "Адаптация гибкой методологии управления проектами SCRUM для использования в образовательном процессе. Позволяет организовать учебную деятельность в виде последовательности коротких итераций (спринтов), сфокусированных на достижении конкретных учебных целей.",
                category: "Основные понятия"
            },
            {
                id: 2,
                term: "Спринт (Sprint)",
                definition: "Короткий, фиксированный по времени период (обычно 1-4 недели), в течение которого учебная группа работает над выполнением определённого набора учебных задач. В конце каждого спринта проводится демонстрация результатов и ретроспектива для анализа процесса работы.",
                category: "Основные понятия"
            },
            {
                id: 3,
                term: "Учебный бэклог (Educational Backlog)",
                definition: "Приоритизированный список учебных задач, тем и компетенций, которые необходимо освоить в рамках учебного курса или модуля. Формируется преподавателем с учётом учебной программы и постоянно актуализируется в процессе обучения.",
                category: "Инструменты"
            },
            {
                id: 4,
                term: "SCRUM-мастер в образовании",
                definition: "Преподаватель или тьютор, который выполняет роль фасилитатора учебного процесса по методологии SCRUM. Помогает студентам организовать работу, устраняет препятствия, следит за соблюдением принципов SCRUM и способствует эффективному взаимодействию в учебной группе.",
                category: "Роли"
            },
            {
                id: 5,
                term: "Учебная команда (Student Team)",
                definition: "Самоорганизующаяся группа студентов (обычно 3-9 человек), которая совместно работает над выполнением учебных задач в течение спринта. Команда самостоятельно распределяет задачи между участниками и несет коллективную ответственность за достижение учебных целей спринта.",
                category: "Роли"
            },
            {
                id: 6,
                term: "Ежедневный стендап (Daily Stand-up)",
                definition: "Короткая (5-15 минут) ежедневная встреча учебной команды, на которой каждый участник отвечает на три вопроса: что было сделано вчера, что планируется сделать сегодня и какие есть препятствия в работе. Проводится для синхронизации работы и оперативного решения возникающих проблем.",
                category: "Церемонии"
            },
            {
                id: 7,
                term: "Диаграмма сгорания задач (Burndown Chart)",
                definition: "Визуальный инструмент для отслеживания прогресса выполнения учебных задач в течение спринта. График показывает количество оставшейся работы по дням, позволяя команде и преподавателю оценить темп работы и вероятность завершения задач к концу спринта.",
                category: "Инструменты"
            },
            {
                id: 8,
                term: "Планирование спринта (Sprint Planning)",
                definition: "Встреча в начале каждого спринта, на которой учебная команда совместно с преподавателем определяет цели предстоящего спринта и отбирает учебные задачи из бэклога, которые будут выполнены в течение этого периода. На основе этого формируется спринт-бэклог.",
                category: "Церемонии"
            },
            {
                id: 9,
                term: "Обзор спринта (Sprint Review)",
                definition: "Встреча в конце спринта, на которой учебная команда демонстрирует результаты работы, выполненной в течение спринта. Преподаватель и другие заинтересованные лица (возможно, другие студенты) дают обратную связь, обсуждают достижения и корректируют учебный бэклог на основе полученных результатов.",
                category: "Церемонии"
            },
            {
                id: 10,
                term: "Ретроспектива спринта (Sprint Retrospective)",
                definition: "Встреча учебной команды после завершения спринта, посвященная анализу процесса работы. Команда обсуждает, что прошло хорошо, что можно улучшить и какие изменения внести в работу для повышения эффективности в следующем спринте. Фокус на непрерывном совершенствовании учебного процесса.",
                category: "Церемонии"
            }
        ];
        
        this.filteredTerms = [...this.glossaryData];
        this.totalSlides = this.glossaryData.length;
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
    
    renderSlides() {
        const container = document.getElementById('slides-container');
        const indicatorsContainer = document.getElementById('indicators-container');
        
        if (!container || !indicatorsContainer) {
            console.error('Containers not found');
            return;
        }
        
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
        this.slides = document.querySelectorAll('.slide');
        this.indicators = document.querySelectorAll('.indicator');
        
        console.log(`Rendered ${this.totalSlides} slides`);
    }
    
    goToSlide(n) {
        if (this.slides.length === 0) {
            console.error('No slides found');
            return;
        }
        
        // Скрываем текущий слайд
        if (this.slides[this.currentSlide]) {
            this.slides[this.currentSlide].classList.remove('active');
        }
        if (this.indicators[this.currentSlide]) {
            this.indicators[this.currentSlide].classList.remove('active');
        }
        
        // Обновляем индекс
        this.currentSlide = (n + this.totalSlides) % this.totalSlides;
        
        // Показываем новый слайд
        if (this.slides[this.currentSlide]) {
            this.slides[this.currentSlide].classList.add('active');
        }
        if (this.indicators[this.currentSlide]) {
            this.indicators[this.currentSlide].classList.add('active');
        }
        
        console.log('Went to slide:', this.currentSlide + 1);
    }
    
    nextSlide() {
        this.goToSlide(this.currentSlide + 1);
    }
    
    prevSlide() {
        this.goToSlide(this.currentSlide - 1);
    }
    
    setupEventListeners() {
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Previous button clicked');
                this.prevSlide();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Next button clicked');
                this.nextSlide();
            });
        }
        
        // Клавиатурная навигация
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });
        
        console.log('Event listeners set up');
    }
    
    setupSearch() {
        const searchInput = document.getElementById('search-input');
        const searchBtn = document.getElementById('search-btn');
        
        if (searchInput && searchBtn) {
            searchBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.performSearch();
            });
            
            searchInput.addEventListener('keyup', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch();
                }
            });
        }
    }
    
    performSearch() {
        const searchInput = document.getElementById('search-input');
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        console.log('Searching for:', searchTerm);
        
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
                <div class="no-results" style="text-align: center; padding: 40px;">
                    <i class="fas fa-search" style="font-size: 48px; color: #666; margin-bottom: 20px;"></i>
                    <h3 style="color: #333;">Ничего не найдено</h3>
                    <p style="color: #666;">Попробуйте изменить поисковый запрос</p>
                </div>
            `;
        }
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    window.slidesManager = new SlidesManager();
    console.log('SlidesManager loaded');
});
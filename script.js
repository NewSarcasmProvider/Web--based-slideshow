document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicatorsContainer = document.querySelector('.indicators-container');
    let currentSlide = 0;
    const totalSlides = slides.length;

    // Создание индикаторов слайдов
    function createIndicators() {
        for (let i = 0; i < totalSlides; i++) {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (i === currentSlide) {
                indicator.classList.add('active');
            }
            indicator.addEventListener('click', () => goToSlide(i));
            indicatorsContainer.appendChild(indicator);
        }
    }

    // Переход к конкретному слайду
    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        document.querySelectorAll('.indicator')[currentSlide].classList.remove('active');
        
        currentSlide = (n + totalSlides) % totalSlides;
        
        slides[currentSlide].classList.add('active');
        document.querySelectorAll('.indicator')[currentSlide].classList.add('active');
    }

    // Переход к следующему слайду
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // Переход к предыдущему слайду
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // Обработчики событий для кнопок навигации
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Обработчики событий для клавиатуры
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Обработчики событий для свайпов (на мобильных устройствах)
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Свайп влево - следующий слайд
            nextSlide();
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            // Свайп вправо - предыдущий слайд
            prevSlide();
        }
    }

    // Автоматическое создание индикаторов
    createIndicators();
    
    // Установка начального слайда как активного
    goToSlide(0);
    
    // Добавление информации о проекте в консоль
    console.log('Глоссарий: Гибкая методология SCRUM в образовательном процессе');
    console.log('Презентация из 10 слайдов, созданная с помощью HTML, CSS и JavaScript');
    console.log('Используйте стрелки влево/вправо для навигации по слайдам');
});
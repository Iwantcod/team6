/*==================== 메뉴 토글 ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== 메뉴 표시 =====*/
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== 메뉴 숨기기 =====*/
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*==================== 모바일 메뉴 링크 클릭시 메뉴 제거 ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== 스크롤 섹션 활성 링크 ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== 스크롤시 헤더 색상 변경 ====================*/
function scrollHeader(){
    const nav = document.getElementById('header')
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== 스크롤업 표시 ====================*/
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*==================== 다크 라이트 테마 ====================*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

// 이전에 선택된 테마 확인
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// 현재 테마 확인
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// 사용자가 이전에 테마를 선택했는지 확인
if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

// 테마 버튼 클릭시 테마 활성화/비활성화
if(themeButton){
    themeButton.addEventListener('click', () => {
        document.body.classList.toggle(darkTheme)
        themeButton.classList.toggle(iconTheme)
        localStorage.setItem('selected-theme', getCurrentTheme())
        localStorage.setItem('selected-icon', getCurrentIcon())
    })
}

/*==================== 스무스 스크롤링 ====================*/
const links = document.querySelectorAll('a[href^="#"]');

links.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/*==================== 타이핑 애니메이션 ====================*/
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// 페이지 로드시 타이핑 애니메이션 시작
window.addEventListener('load', () => {
    const homeTitle = document.querySelector('.home__title');
    if (homeTitle) {
        const originalText = homeTitle.textContent;
        typeWriter(homeTitle, originalText, 150);
    }
});

/*==================== 취미 카드 애니메이션 ====================*/
function animateHobbiesCards() {
    const hobbiesCards = document.querySelectorAll('.hobbies__card');
    
    const hobbiesObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
                hobbiesObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    hobbiesCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        hobbiesObserver.observe(card);
    });
}

/*==================== 좋아하는 것 애니메이션 ====================*/
function animateFavoritesSection() {
    const favoritesCategories = document.querySelectorAll('.favorites__category');
    
    const favoritesObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 300);
                favoritesObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    favoritesCategories.forEach((category, index) => {
        category.style.opacity = '0';
        category.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
        category.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        favoritesObserver.observe(category);
    });
}

/*==================== 개발 타임라인 애니메이션 ====================*/
function animateTimelineItems() {
    const timelineItems = document.querySelectorAll('.timeline__item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        timelineObserver.observe(item);
    });
}

/*==================== 컨택트 폼 처리 ====================*/
const contactForm = document.querySelector('.contact__form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 폼 데이터 가져오기
        const formData = new FormData(this);
        const name = formData.get('name') || document.getElementById('name').value;
        const email = formData.get('email') || document.getElementById('email').value;
        const project = formData.get('project') || document.getElementById('project').value;
        const message = formData.get('message') || document.getElementById('message').value;
        
        // 간단한 유효성 검사
        if (!name || !email || !message) {
            alert('모든 필수 필드를 입력해주세요.');
            return;
        }
        
        // 이메일 형식 검사
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('올바른 이메일 형식을 입력해주세요.');
            return;
        }
        
        // 성공 메시지 표시
        alert('메시지가 성공적으로 전송되었습니다! 빠른 시일 내에 답변드리겠습니다.');
        
        // 폼 초기화
        this.reset();
    });
}

/*==================== 페이지 로딩 애니메이션 ====================*/
window.addEventListener('load', () => {
    // 섹션들에 페이드인 애니메이션 추가
    const sections = document.querySelectorAll('.section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });

    // 애니메이션 초기화
    animateHobbiesCards();
    animateFavoritesSection();
    animateTimelineItems();
});

/*==================== 아티스트 태그 클릭 효과 ====================*/
function addArtistTagEffects() {
    const artistTags = document.querySelectorAll('.artist__tag');
    
    artistTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // 클릭 효과
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // 음악 관련 메시지 표시 (예시)
            const artistName = this.textContent;
            console.log(`${artistName}의 음악을 좋아하시는군요! 🎵`);
        });
        
        tag.style.cursor = 'pointer';
        tag.style.transition = 'all 0.3s ease';
    });
}

/*==================== 팀 카드 클릭 효과 ====================*/
function addTeamCardEffects() {
    const teamCards = document.querySelectorAll('.favorites__team');
    
    teamCards.forEach(card => {
        card.addEventListener('click', function() {
            // 클릭 효과
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            const teamName = this.querySelector('.team__name').textContent;
            console.log(`${teamName}을 응원하시는군요! 🏆`);
        });
        
        card.style.cursor = 'pointer';
        card.style.transition = 'all 0.3s ease';
    });
}

/*==================== 하니 갤러리 라이트박스 ====================*/
function initImageLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    function openModal(src, alt) {
        // 모달 요소 생성
        const modal = document.createElement('div');
        modal.className = 'image-modal';

        modal.innerHTML = `
            <div class="image-modal__content">
                <img src="${src}" alt="${alt}" class="image-modal__img">
            </div>
            <div class="image-modal__close">&times;</div>
        `;

        // 닫기 핸들러
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('image-modal__close')) {
                document.body.removeChild(modal);
            }
        });

        // ESC로 닫기
        function escHandler(e) {
            if (e.key === 'Escape' && document.body.contains(modal)) {
                document.body.removeChild(modal);
                document.removeEventListener('keydown', escHandler);
            }
        }
        document.addEventListener('keydown', escHandler);

        document.body.appendChild(modal);
    }

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const src = item.getAttribute('src');
            const alt = item.getAttribute('alt') || '';
            openModal(src, alt);
        });
    });
}

/*==================== 스크롤 진행 표시기 ====================*/
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--first-color);
        z-index: 1001;
        transition: width 0.3s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.pageYOffset / totalHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });
}

// 스크롤 진행 표시기 초기화
createScrollProgress();

/*==================== 키보드 네비게이션 ====================*/
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // ESC 키로 모바일 메뉴 닫기
        const navMenu = document.getElementById('nav-menu');
        if (navMenu.classList.contains('show-menu')) {
            navMenu.classList.remove('show-menu');
        }
    }
});

/*==================== 초기화 함수 ====================*/
document.addEventListener('DOMContentLoaded', () => {
    // 아티스트 태그 효과 추가
    addArtistTagEffects();
    // 팀 카드 효과 추가
    addTeamCardEffects();
    // 하니 갤러리 라이트박스 초기화
    initImageLightbox();
});

/*==================== 성능 최적화: 디바운스 함수 ====================*/
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 스크롤 이벤트 디바운스 적용
const debouncedScrollActive = debounce(scrollActive, 10);
const debouncedScrollHeader = debounce(scrollHeader, 10);
const debouncedScrollUp = debounce(scrollUp, 10);

window.removeEventListener('scroll', scrollActive);
window.removeEventListener('scroll', scrollHeader);
window.removeEventListener('scroll', scrollUp);

window.addEventListener('scroll', debouncedScrollActive);
window.addEventListener('scroll', debouncedScrollHeader);
window.addEventListener('scroll', debouncedScrollUp);
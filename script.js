document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splashScreen');
    const mainContent = document.getElementById('mainContent');
    const profileCard = document.querySelector('.profile-card');
    const video = document.querySelector('video');
    const videoBackground = document.querySelector('.video-background');
    const contactItems = document.querySelectorAll('.contacts li');

    let isMobile = /Mobi|Android/i.test(navigator.userAgent);
    let isVideoLoaded = false;
    let mouseX = 0;
    let mouseY = 0;

    const handleParallax = (e) => {
        if (isMobile) return;
        
        const speed = 0.02;
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        
        mouseX += (x - mouseX) * speed;
        mouseY += (y - mouseY) * speed;
        
        videoBackground.style.transform = `
            translateX(${mouseX * 15}px) 
            translateY(${mouseY * 10}px) 
            scale(1.02)
        `;
    };

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.error('Ошибка копирования:', err);
            return false;
        }
    };

    const checkVideoStatus = () => {
        if (video.readyState < 3) {
            document.body.classList.add('video-fallback');
            videoBackground.style.display = 'none';
        }
    };

    const initAnimations = () => {
    // Сразу применяем размытие
    profileCard.style.backdropFilter = 'blur(10px)';
    profileCard.style.webkitBackdropFilter = 'blur(10px)';

    setTimeout(() => {
        splashScreen.classList.add('hidden');
        
        // Принудительный reflow
        void profileCard.offsetWidth;
        
        // Запуск анимации
        profileCard.removeAttribute('data-state');
        mainContent.classList.add('visible');
    }, 500);
};

// В HTML добавить начальный атрибут
<div class="profile-card" data-state="hidden">
    const setupContactInteractions = () => {
        contactItems.forEach(item => {
            item.style.cursor = 'pointer';
            item.addEventListener('click', async () => {
                const text = item.textContent.split(': ')[1];
                const success = await copyToClipboard(text);
                
                if (success) {
                    item.classList.add('copied');
                    setTimeout(() => item.classList.remove('copied'), 2000);
                }
            });
        });
    };

    const initVideo = () => {
        video.play().catch(error => {
            console.log('Автовоспроизведение видео:', error.message);
            document.body.classList.add('video-fallback');
        });

        video.addEventListener('loadeddata', () => {
            isVideoLoaded = true;
            videoBackground.style.opacity = '1';
        });

        setTimeout(checkVideoStatus, 5000);
    };

    window.addEventListener('resize', () => {
        isMobile = /Mobi|Android/i.test(navigator.userAgent);
        if (isMobile) videoBackground.style.transform = 'none';
    });

    initVideo();
    initAnimations();
    setupContactInteractions();

    document.body.addEventListener('touchstart', () => {
        isMobile = true;
        videoBackground.style.transform = 'none';
    });
});


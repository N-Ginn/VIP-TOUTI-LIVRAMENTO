document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Change icon
            const icon = mobileBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Smooth Scrolling for Anchor Links (Native usually works, but this ensures offset for fixed header)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
            navbar.style.padding = "15px 0";
        } else {
            navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
            navbar.style.padding = "20px 0";
        }
    });

    // Dark Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Check Local Storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
});

/* Carousel Logic */
document.addEventListener('DOMContentLoaded', function () {
    const carousels = document.querySelectorAll('.carousel-container');

    carousels.forEach(container => {
        const track = container.querySelector('.carousel-track');
        const nextBtn = container.querySelector('.next-btn');
        const prevBtn = container.querySelector('.prev-btn');

        if (track && nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => {
                const card = track.querySelector('.licensed-card');
                if (card) {
                    const cardWidth = card.offsetWidth;
                    const style = window.getComputedStyle(track);
                    const gap = parseFloat(style.gap) || 0;
                    track.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
                }
            });

            prevBtn.addEventListener('click', () => {
                const card = track.querySelector('.licensed-card');
                if (card) {
                    const cardWidth = card.offsetWidth;
                    const style = window.getComputedStyle(track);
                    const gap = parseFloat(style.gap) || 0;
                    track.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
                }
            });
        }
    });
});

/* Modal Logic */
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('collection-modal');
    const closeBtn = document.querySelector('.close-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const openBtns = document.querySelectorAll('.js-open-modal');

    // Data Content
    const collections = {
        fit: {
            title: 'Coleção FIT',
            content: '<p>Energia, movimento e frescor. Perfeito para o dia a dia.</p><ul><li>Notas Cítricas</li><li>Amadeiradas Leves</li><li>Fragrâncias Esportivas</li></ul>'
        },
        lux: {
            title: 'Coleção LUX',
            content: '<p>Poder, sedução e intensidade. Para momentos marcantes.</p><ul><li>Fragrâncias Intensas</li><li>Notas Orientais</li><li>Marcantes para a noite</li></ul>'
        },
        spa: {
            title: 'Coleção SPA',
            content: '<p>Bem-estar, leveza e conexão com a natureza.</p><ul><li>Notas Florais Suaves</li><li>Toques Herbais</li><li>Sensação Relaxante</li></ul>'
        },
        vip: {
            title: 'Coleção VIP',
            content: '<p>Exclusividade, brilho e sofisticação pura.</p><ul><li>Topo da Perfumaria</li><li>Fragrâncias Exclusivas</li><li>Altíssima Fixação</li></ul>'
        }
    };

    // Open Modal
    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const category = btn.getAttribute('data-category');
            if (collections[category]) {
                modalTitle.textContent = collections[category].title;
                modalBody.innerHTML = collections[category].content;

                // Reset Theme Classes
                const modalContent = modal.querySelector('.modal-content');
                modalContent.classList.remove('theme-fit', 'theme-lux', 'theme-spa', 'theme-vip');

                // Add new Theme Class
                modalContent.classList.add(`theme-${category}`);

                modal.classList.add('show');
                modal.style.display = 'flex'; // Ensure flex display for centering
                // Optional: disable body scroll
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close Modal Function
    const closeModal = () => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300); // Wait for transition
    };

    // Close Events
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
});

/* Quiz / Filter Logic */
document.addEventListener('DOMContentLoaded', () => {
    const quizBtns = document.querySelectorAll('.quiz-btn');

    quizBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetName = btn.getAttribute('data-target');
            // Construct selector for the specific line card/row
            // e.g. .line-spa-card
            const targetSelector = `.line-${targetName}-card`;
            const targetElement = document.querySelector(targetSelector);

            if (targetElement) {
                // Scroll to the element
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Find the image and trigger animation
                const img = targetElement.querySelector('img');
                if (img) {
                    // Remove class first to reset if already clicked recently
                    img.classList.remove('highlight-line');

                    // Force reflow to ensuring restart of animation
                    void img.offsetWidth;

                    img.classList.add('highlight-line');

                    // Clean up class after animation (1s)
                    setTimeout(() => {
                        img.classList.remove('highlight-line');
                    }, 1000);
                }
            }
        });
    });
});

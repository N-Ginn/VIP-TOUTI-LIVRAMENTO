document.addEventListener('DOMContentLoaded', () => {
    // Alternar menu mobile
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Alterar ícone
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

    // Fechar menu ao clicar em um link
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

    // Rolagem suave para links âncora (o nativo geralmente funciona, mas isso garante o deslocamento do header fixo)
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

    // Efeito da navbar ao rolar a página
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

    // Alternar modo escuro
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Verificar Local Storage
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

/* Lógica do Carrossel */
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

/* Lógica do Modal */
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('collection-modal');
    const closeBtn = document.querySelector('.close-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const openBtns = document.querySelectorAll('.js-open-modal');

    // Conteúdo de dados
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

    // Abrir modal
    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const category = btn.getAttribute('data-category');
            if (collections[category]) {
                modalTitle.textContent = collections[category].title;
                modalBody.innerHTML = collections[category].content;

                // Resetar classes de tema
                const modalContent = modal.querySelector('.modal-content');
                modalContent.classList.remove('theme-fit', 'theme-lux', 'theme-spa', 'theme-vip');

                // Adicionar nova classe de tema
                modalContent.classList.add(`theme-${category}`);

                modal.classList.add('show');
                modal.style.display = 'flex'; // Garante display flex para centralização
                // Opcional: desativar rolagem do body
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Função para fechar modal
    const closeModal = () => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300); // Aguarda a transição
    };

    // Eventos de fechamento
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

/* Lógica do Quiz / Filtro */
document.addEventListener('DOMContentLoaded', () => {
    const quizBtns = document.querySelectorAll('.quiz-btn');

    quizBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetName = btn.getAttribute('data-target');
            // Construir seletor para a linha específica
            // Ex: .line-spa-card
            const targetSelector = `.line-${targetName}-card`;
            const targetElement = document.querySelector(targetSelector);

            if (targetElement) {
                // Rolar até o elemento
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Encontrar a imagem e disparar animação
                const img = targetElement.querySelector('img');
                if (img) {
                    // Remove a classe primeiro para reiniciar a animação se já tiver sido clicado
                    img.classList.remove('highlight-line');

                    // Força reflow para garantir o reinício da animação
                    void img.offsetWidth;

                    img.classList.add('highlight-line');

                    // Remove a classe após a animação (1s)
                    setTimeout(() => {
                        img.classList.remove('highlight-line');
                    }, 1000);
                }
            }
        });
    });
});

/**
 * Script principal para a página "Nosso Amor"
 * Autor: Henrry
 * Data: 2025
 * Versão: 2.0 - Especial para Gestantes
 */    

// ===== CONFIGURAÇÕES =====
const CONFIG = {
    IMAGE_INTERVAL: 3000, // 3 segundos
    MESSAGE_INTERVAL: 3000, // 3 segundos
    COUNTER_UPDATE_INTERVAL: 86400000, // 24 horas
    SCROLL_THRESHOLD: 0.8, // 80% da tela
    PREGNANCY_WEEK_UPDATE_INTERVAL: 60000 // 1 minuto para atualizar semanas
};

// ===== DADOS =====
const IMAGES = [
    'img1.jpg',
    'img2.jpg',
    'img3.jpg',
    'img4.jpg',
    'img5.jpg',
    'img6.jpg',
    'img7.PNG',
    'img8.jpg',
    'img9.jpg',
    'img10.jpg',
    'img11.jpg',
    'img12.png'
];

const MESSAGES = [
    '❤️ Eu te amo muito meu amor ❤️',
    '🥰 Você é meu mundo 🥰',
    'Você é a pessoa que eu sempre quis',
    '💍 Eu te amo minha princesa 💍',
    '❤️ Me sinto completo com você ❤️',
    '🥰 Eu te amo minha vida 🥰',
    'Você é meu tudo! 👸🏾',
    'A mulher mais incrível que eu já conheci!',
    '👶 Nossa família está crescendo! 👶',
    '💕 Você será a melhor mãe do mundo 💕',
    '🤰 Cuidando de vocês dois com todo meu amor 🤰',
    '👨‍👩‍👧‍👦 Nossa história de amor continua... 👨‍👩‍👧‍👦'
];

const DATES = {
    CASAMENTO: new Date("2025-08-23"),
    GRAVIDEZ: new Date("2025-05-07"),
    PARTO: new Date('2026-02-11')
};

// ===== CLASSE PRINCIPAL =====
class LovePage {
    constructor() {
        this.currentImageIndex = 0;
        this.currentMessageIndex = 0;
        this.currentTipIndex = 0;
        this.init();
    }

    init() {
        this.setupImageRotation();
        this.setupMessageRotation();
        this.setupCounters();
        this.setupTimelineAnimation();
        this.setupEventListeners();
        this.setupPregnancyFeatures();
        this.setupTouchGestures();
        this.setupPerformanceOptimizations();
    }

    // ===== ROTAÇÃO DE IMAGENS =====
    setupImageRotation() {
        setInterval(() => {
            this.currentImageIndex = (this.currentImageIndex + 1) % IMAGES.length;
            const photoElement = document.getElementById("foto");
            if (photoElement) {
                photoElement.src = `images/${IMAGES[this.currentImageIndex]}`;
                this.addImageTransitionEffect(photoElement);
            }
        }, CONFIG.IMAGE_INTERVAL);
    }

    addImageTransitionEffect(element) {
        element.style.opacity = '0.7';
        element.style.transform = 'scale(0.95)';
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        }, 200);
    }

    // ===== ROTAÇÃO DE MENSAGENS =====
    setupMessageRotation() {
        this.messageTimeout = null;
        this.currentMessageIndex = 0;
        this.showMessage();
    }

    showMessage() {
        const messageElement = document.getElementById("mensagem");
        if (messageElement) {
            messageElement.style.opacity = '0.5';
            setTimeout(() => {
                messageElement.innerText = MESSAGES[this.currentMessageIndex];
                messageElement.style.opacity = '1';
            }, 300);
        }
        if (this.messageTimeout) clearTimeout(this.messageTimeout);
        this.messageTimeout = setTimeout(() => {
            this.currentMessageIndex = (this.currentMessageIndex + 1) % MESSAGES.length;
            this.showMessage();
        }, CONFIG.MESSAGE_INTERVAL);
    }

    // ===== CONTADORES =====
    setupCounters() {
        this.updateCounters();
        setInterval(() => {
            this.updateCounters();
        }, CONFIG.COUNTER_UPDATE_INTERVAL);
    }

    updateCounters() {
        const hoje = new Date();
        
        // Cálculo dos dias de casamento
        const diasCasamento = this.calculateDaysDifference(hoje, DATES.CASAMENTO);
        
        // Cálculo dos dias de gravidez
        const diasGravidez = this.calculateDaysDifference(hoje, DATES.GRAVIDEZ);
        const semanasGravidez = Math.floor(diasGravidez / 7);
        const diasSemana = diasGravidez % 7;
        
        // Cálculo dos dias para o parto
        const diasFaltantes = this.calculateDaysDifference(DATES.PARTO, hoje);

        // Atualização dos elementos
        this.updateCounterElement("contadorCasamento", 
            `👩‍❤️‍👨 Estamos casados há ${diasCasamento} dias Desde 23/08/2025`);
        
        this.updateCounterElement("contadorGravidez", 
            `👶 Grávida há ${diasGravidez} dias (${semanasGravidez} semanas e ${diasSemana} dias) Desde 07/05/2025`);
        
        this.updateCounterElement("contadorNascimento", 
            `🎉 Possível data de nascimento em 11/02/2026 faltam ${diasFaltantes} dias para nascer`);
    }

    calculateDaysDifference(date1, date2) {
        const diffTime = Math.abs(date2 - date1);
        return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    }

    updateCounterElement(elementId, text) {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerText = text;
            this.addCounterAnimation(element);
        }
    }

    addCounterAnimation(element) {
        element.style.transform = 'scale(1.05)';
        element.style.boxShadow = '0 10px 30px rgba(255, 77, 77, 0.4)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.boxShadow = '0 5px 15px rgba(255, 77, 77, 0.2)';
        }, 300);
    }

    addHeartEffect(x, y) {
        const heart = document.createElement('div');
        heart.innerHTML = '💕';
        heart.style.position = 'fixed';
        heart.style.left = (x - 20) + 'px';
        heart.style.top = (y - 20) + 'px';
        heart.style.fontSize = '2rem';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        heart.style.transition = 'all 1s ease';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.style.transform = 'translateY(-50px) scale(1.5)';
            heart.style.opacity = '0';
        }, 100);
        
        setTimeout(() => {
            document.body.removeChild(heart);
        }, 1000);
    }

    // ===== GESTOS DE TOQUE =====
    setupTouchGestures() {
        let startY = 0;
        let startTime = 0;
        
        document.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
            startTime = Date.now();
        });
        
        document.addEventListener('touchend', (e) => {
            const endY = e.changedTouches[0].clientY;
            const endTime = Date.now();
            const duration = endTime - startTime;
            const distance = Math.abs(endY - startY);
            
            // Swipe rápido para cima = efeito especial
            if (distance > 50 && duration < 300 && endY < startY) {
                this.triggerSpecialEffect();
            }
        });
    }

    triggerSpecialEffect() {
        // Efeito especial de corações
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                this.addHeartEffect(x, y);
            }, i * 100);
        }
        
        // Mensagem especial
        const messageElement = document.getElementById("mensagem");
        if (messageElement) {
            const originalText = messageElement.innerText;
            messageElement.innerText = "💕 Você é minha vida! 💕";
            messageElement.style.transform = 'scale(1.2)';
            messageElement.style.color = '#ff1466';
            
            setTimeout(() => {
                messageElement.innerText = originalText;
                messageElement.style.transform = 'scale(1)';
                messageElement.style.color = '';
            }, 2000);
        }
    }

    // ===== OTIMIZAÇÕES DE PERFORMANCE =====
    setupPerformanceOptimizations() {
        // Lazy loading para imagens
        const images = document.querySelectorAll('img[loading="lazy"]');
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.src;
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }

        // Debounce para scroll
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.handleScrollOptimized();
            }, 16); // ~60fps
        });
    }

    handleScrollOptimized() {
        // Otimização de scroll para melhor performance
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight * CONFIG.SCROLL_THRESHOLD && !item.classList.contains('animate')) {
                item.classList.add('animate');
            }
        });
    }

    // ===== ANIMAÇÃO DA TIMELINE =====
    setupTimelineAnimation() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        // Configuração inicial dos itens
        timelineItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            
            if (item.classList.contains('left')) {
                item.style.transform = 'translateX(-30px)';
            } else {
                item.style.transform = 'translateX(30px)';
            }
        });

        // Função para verificar scroll
        const checkScroll = () => {
            timelineItems.forEach(item => {
                const itemTop = item.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (itemTop < windowHeight * CONFIG.SCROLL_THRESHOLD) {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                    item.classList.add('animate');
                }
            });
        };

        // Event listeners para scroll
        window.addEventListener('scroll', this.debounce(checkScroll, 10));
        window.addEventListener('resize', this.debounce(checkScroll, 10));
        
        // Verificação inicial
        checkScroll();
    }

    // ===== UTILITÁRIOS =====
    debounce(func, wait) {
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

    // ===== EVENT LISTENERS =====
    setupEventListeners() {
        // Adicionar efeitos de hover nos elementos da timeline
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                this.addTimelineHoverEffect(item);
            });
            
            item.addEventListener('mouseleave', () => {
                this.removeTimelineHoverEffect(item);
            });
        });

        // Adicionar efeito de clique na foto
        const photoElement = document.getElementById("foto");
        if (photoElement) {
            photoElement.addEventListener('click', () => {
                this.handlePhotoClick();
            });
            
            // Adicionar efeito de toque para mobile
            photoElement.addEventListener('touchstart', () => {
                this.handlePhotoTouch();
            });
        }

        // Adicionar vibração no toque (se suportado)
        document.addEventListener('touchstart', () => {
            if ('vibrate' in navigator) {
                navigator.vibrate(50);
            }
        });
    }

    addTimelineHoverEffect(item) {
        const content = item.querySelector('.timeline-content');
        if (content) {
            content.style.transform = 'translateY(-8px)';
            content.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.4)';
        }
    }

    removeTimelineHoverEffect(item) {
        const content = item.querySelector('.timeline-content');
        if (content) {
            content.style.transform = 'translateY(-5px)';
            content.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
        }
    }

    handlePhotoClick() {
        // Efeito especial ao clicar na foto
        const photoElement = document.getElementById("foto");
        if (photoElement) {
            photoElement.style.transform = 'scale(1.1) rotate(2deg)';
            setTimeout(() => {
                photoElement.style.transform = 'scale(1.05) rotate(0deg)';
            }, 300);
        }
    }

    handlePhotoTouch() {
        // Efeito especial ao tocar na foto (mobile)
        const photoElement = document.getElementById("foto");
        if (photoElement) {
            photoElement.style.transform = 'scale(0.95)';
            setTimeout(() => {
                photoElement.style.transform = 'scale(1)';
            }, 200);
        }
    }
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('💖 Página de amor carregada com sucesso! 💖');
    console.log('👶 Versão especial para gestantes! 👶');
    new LovePage();
    
    // Registro do Service Worker para PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('💕 Service Worker registrado com sucesso:', registration.scope);
            })
            .catch((error) => {
                console.log('💕 Falha no registro do Service Worker:', error);
            });
    }
});

// ===== FUNÇÕES GLOBAIS ADICIONAIS =====
window.addEventListener('load', function() {
    // Adicionar classe de carregamento completo
    document.body.classList.add('loaded');
    
    // Efeito de fade-in para o conteúdo
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.style.opacity = '0';
        mainContent.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            mainContent.style.transition = 'all 0.8s ease';
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0)';
        }, 100);
    }

    // Adicionar mensagem de boas-vindas especial
    setTimeout(() => {
        const welcomeMessage = document.createElement('div');
        welcomeMessage.innerHTML = '💕 Bem-vinda, minha princesa! 💕';
        welcomeMessage.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #ff4d4d, #ff6b9e);
            color: white;
            padding: 20px 30px;
            border-radius: 25px;
            font-size: 1.2rem;
            font-weight: bold;
            z-index: 10000;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            animation: welcomeFade 3s ease-in-out forwards;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes welcomeFade {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                20% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
                80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(welcomeMessage);
        
        setTimeout(() => {
            document.body.removeChild(welcomeMessage);
        }, 3000);
    }, 1000);
}); 
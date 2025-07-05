/**
 * Script principal para a página "Nosso Amor"
 * Autor: Henrry
 * Data: 2025 */    

// ===== CONFIGURAÇÕES =====
const CONFIG = {
    IMAGE_INTERVAL: 3000, // 3 segundos
    MESSAGE_INTERVAL: 3000, // 3 segundos
    COUNTER_UPDATE_INTERVAL: 86400000, // 24 horas
    SCROLL_THRESHOLD: 0.8 // 80% da tela
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
    'A mulher mais incrível que eu já conheci!'
];

const DATES = {
    NAMORO: new Date("2024-08-10"),
    GRAVIDEZ: new Date("2025-05-07"),
    PARTO: new Date('2026-02-11')
};

// ===== CLASSE PRINCIPAL =====
class LovePage {
    constructor() {
        this.currentImageIndex = 0;
        this.currentMessageIndex = 0;
        this.init();
    }

    init() {
        this.setupImageRotation();
        this.setupMessageRotation();
        this.setupCounters();
        this.setupTimelineAnimation();
        this.setupEventListeners();
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
        setTimeout(() => {
            element.style.opacity = '1';
        }, 150);
    }

    // ===== ROTAÇÃO DE MENSAGENS =====
    setupMessageRotation() {
        setInterval(() => {
            this.currentMessageIndex = (this.currentMessageIndex + 1) % MESSAGES.length;
            const messageElement = document.getElementById("mensagem");
            if (messageElement) {
                messageElement.style.opacity = '0.5';
                setTimeout(() => {
                    messageElement.innerText = MESSAGES[this.currentMessageIndex];
                    messageElement.style.opacity = '1';
                }, 200);
            }
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
        
        // Cálculo dos dias de namoro
        const diasNamoro = this.calculateDaysDifference(hoje, DATES.NAMORO);
        
        // Cálculo dos dias de gravidez
        const diasGravidez = this.calculateDaysDifference(hoje, DATES.GRAVIDEZ);
        const semanasGravidez = Math.floor(diasGravidez / 7);
        
        // Cálculo dos dias para o parto
        const diasFaltantes = this.calculateDaysDifference(DATES.PARTO, hoje);

        // Atualização dos elementos
        this.updateCounterElement("contadorNamoro", 
            `Estamos namorando há ${diasNamoro} dias 💑 Desde 10/08/2024`);
        
        this.updateCounterElement("contadorGravidez", 
            `👶 Grávida a ${diasGravidez} dias (${semanasGravidez} semanas) Desde 07/05/2025`);
        
        this.updateCounterElement("contadorNascimento", 
            `Possível data de nascimento em 11/02/2026 faltam ${diasFaltantes} dias para nascer`);
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
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    }

    // ===== ANIMAÇÃO DA TIMELINE =====
    setupTimelineAnimation() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        // Configuração inicial dos itens
        timelineItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transition = 'all 0.6s ease';
            
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
        }
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
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('💖 Página de amor carregada com sucesso! 💖');
    new LovePage();
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
}); 
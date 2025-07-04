const imagens = [ // lista de imagens 
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

const mensagens = [ // lista de frases carinhosas
    '❤️ Eu te amo muito meu amor ❤️', 
    '🥰Você é meu mundo 🥰',
    'Você é a pessoa que eu sempre quis',
    '💍Eu te amo minha princesa 💍',
    '❤️ Me sinto completo com você ❤️',
    'Você é meu tudo! 👸🏾',
    'A mulher mais incrível que eu já conheci!',
    '🥰 Eu te amo minha vida 🥰'
];

// Troca de imagem a cada 3 segundos
let indexImg = 0;
setInterval(() => {
    indexImg = (indexImg + 1) % imagens.length;
    document.getElementById("foto").src = "images/" + imagens[indexImg];
}, 3000);

// Troca de mensagem a cada 3 segundos
let indexMsg = 0;
setInterval(() => {
    indexMsg = (indexMsg + 1) % mensagens.length;
    document.getElementById("mensagem").innerText = mensagens[indexMsg];
}, 3000);

// Contadores de datas
const dataNamoro = new Date("2024-08-10");
const dataGravidez = new Date("2025-05-07");
const dataParto = new Date('2026-02-11');


function atualizarContadores() {
    const hoje = new Date();
    const diasNamoro = Math.floor((hoje - dataNamoro) / (1000 * 60 * 60 * 24)-1);
    const diasGravidez = Math.floor((hoje - dataGravidez) / (1000 * 60 * 60 * 24)-1);
    const semanasGravidez = Math.floor(diasGravidez / 7);
    const diferencaMs = dataParto - hoje;
    const diasFaltantes = Math.ceil(diferencaMs / (1000 * 60 * 60 * 24));

    document.getElementById("contadorNamoro").innerText =
        "Estamos namorando há " + diasNamoro + " dias 💑 Desde 10/08/2024";

    document.getElementById("contadorGravidez").innerText =
        "👶 Grávida a " + diasGravidez + " dias (" + semanasGravidez + " semanas)  Desde 07/05/2025";

    document.getElementById("contadorNascimento").innerText =
        "Possível data de nascimento em 11/02/2026 faltam " + diasFaltantes + " dias para nascer";
}

atualizarContadores();
setInterval(atualizarContadores, 86400000); // Atualiza a cada 24h

/* Efeito de Rolagem Suave */
document.addEventListener('DOMContentLoaded', function() {
        const items = document.querySelectorAll('.timeline-item');
        
        function checkScroll() {
            items.forEach(item => {
                const itemTop = item.getBoundingClientRect().top;
                if (itemTop < window.innerHeight * 0.8) {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }
            });
        }
        
        // Inicializa com alguns estilos
        items.forEach(item => {
            item.style.opacity = '0';
            item.style.transition = 'all 0.5s ease';
            if (item.classList.contains('left')) {
                item.style.transform = 'translateX(-30px)';
            } else {
                item.style.transform = 'translateX(30px)';
            }
        });
        
        window.addEventListener('scroll', checkScroll);
        checkScroll(); // Verifica ao carregar
    });
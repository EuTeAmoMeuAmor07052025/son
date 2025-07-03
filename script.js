const imagens = [ // lista de imagens 
    'img1.jpg',
    'img2.jpg',
    'img3.jpg',
    'img4.jpg',
    'img5.jpg',
    'img6.jpg'
];

const mensagens = [ // lista de frases carinhosas
    '❤️ Eu te amo muito meu amor ❤️', 
    '🥰Você é meu mundo 🥰',
    'Você é a pessoa que eu sempre quis',
    '💍Eu te amo minha princesa 💍',
    '❤️ Me sinto completo com você ❤️',
    'Sou o cara mais sortudo do mundo em ter você ao meu lado!',
    'Você é meu tudo!',
    'A mulher mais incrível que eu já conheci!',
    'Quantidade de vezes que vi a sua foto hoje = 129 vezes',
    '🥰 Eu te amo minha vida 🥰'
];

// Troca de imagem a cada 5 segundos
let indexImg = 0;
setInterval(() => {
    indexImg = (indexImg + 1) % imagens.length;
    document.getElementById("foto").src = "images/" + imagens[indexImg];
}, 5000);

// Troca de mensagem a cada 4 segundos
let indexMsg = 0;
setInterval(() => {
    indexMsg = (indexMsg + 1) % mensagens.length;
    document.getElementById("mensagem").innerText = mensagens[indexMsg];
}, 4000);

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
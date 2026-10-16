const desafios = [
    { icone: "📱", nome: "Celular Quebrado", respostaCorreta: "eletronico" },
    { icone: "🍌", nome: "Casca de Banana", respostaCorreta: "organico" },
    { icone: "🖱️", nome: "Mouse de Computador", respostaCorreta: "eletronico" },
    { icone: "🥤", nome: "Garrafa Plástica", respostaCorreta: "reciclavel" },
    { icone: "🔋", nome: "Pilhas Gastas", respostaCorreta: "eletronico" },
    { icone: "📦", nome: "Caixa de Papelão", respostaCorreta: "reciclavel" },
    { icone: "🎧", nome: "Fone de Ouvido Quebrado", respostaCorreta: "eletronico" },
    { icone: "🍎", nome: "Resto de Maçã", respostaCorreta: "organico" }
];

let indiceAtual = 0;

window.onload = function() {
    carregarDesafio();
};

function carregarDesafio() {
    const cartao = document.getElementById('cartao-anima');
    
    cartao.style.transform = "scale(0.92)";
    setTimeout(() => {
        document.getElementById('icone-item').innerText = desafios[indiceAtual].icone;
        document.getElementById('nome-item').innerText = desafios[indiceAtual].nome;
        document.getElementById('feedback-jogo').className = 'escondido';
        cartao.style.transform = "scale(1)";
    }, 150);
}

function verificarResposta(tipoEscolhido) {
    const feedback = document.getElementById('feedback-jogo');
    const respostaCerta = desafios[indiceAtual].respostaCorreta;

    if (tipoEscolhido === respostaCerta) {
        feedback.innerHTML = "🎉 Mandou muito bem! A Teka adorou a sua escolha!";
        feedback.className = "sucesso";
        
        setTimeout(function() {
            indiceAtual = (indiceAtual + 1) % desafios.length;
            carregarDesafio();
        }, 1600);
    } else {
        feedback.innerHTML = "❌ Ops! Essa não é a lixeira adequada. Tente novamente!";
        feedback.className = "erro";
    }
}
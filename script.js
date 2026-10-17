/* =========================================================
   PARTE 1: EFEITOS SONOROS (WEB AUDIO API - SEM ARQUIVOS MP3)
   ========================================================= */
let audioCtx = null;
let voiceEnabled = true;

function inicializarAudio() {
    if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
            audioCtx = new AudioContextClass();
        }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

function tocarSomPassinhos() {
    if (!voiceEnabled) return;
    inicializarAudio();
    if (!audioCtx) return;

    const agora = audioCtx.currentTime;
    // Som suave de 3 passinhos quando a Teka anda
    [0.0, 0.18, 0.36].forEach((tempo, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(160 + (i * 30), agora + tempo);

        gain.gain.setValueAtTime(0.08, agora + tempo);
        gain.gain.exponentialRampToValueAtTime(0.001, agora + tempo + 0.08);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(agora + tempo);
        osc.stop(agora + tempo + 0.08);
    });
}

function tocarSomAcerto() {
    if (!voiceEnabled) return;
    inicializarAudio();
    if (!audioCtx) return;

    const agora = audioCtx.currentTime;
    const notas = [523.25, 659.25, 783.99, 1046.50];

    notas.forEach((freq, index) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, agora + index * 0.09);

        gain.gain.setValueAtTime(0.22, agora + index * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, agora + index * 0.09 + 0.25);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(agora + index * 0.09);
        osc.stop(agora + index * 0.09 + 0.25);
    });
}

function tocarSomErro() {
    if (!voiceEnabled) return;
    inicializarAudio();
    if (!audioCtx) return;

    const agora = audioCtx.currentTime;
    const notas = [220, 175];

    notas.forEach((freq, index) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, agora + index * 0.16);

        gain.gain.setValueAtTime(0.15, agora + index * 0.16);
        gain.gain.exponentialRampToValueAtTime(0.001, agora + index * 0.16 + 0.22);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(agora + index * 0.16);
        osc.stop(agora + index * 0.16 + 0.22);
    });
}

function tocarFanfarraVitoria() {
    if (!voiceEnabled) return;
    inicializarAudio();
    if (!audioCtx) return;

    const agora = audioCtx.currentTime;
    const melodia = [
        { freq: 523.25, tempo: 0.0, dur: 0.15 },
        { freq: 659.25, tempo: 0.15, dur: 0.15 },
        { freq: 783.99, tempo: 0.30, dur: 0.15 },
        { freq: 1046.50, tempo: 0.45, dur: 0.35 },
        { freq: 783.99, tempo: 0.80, dur: 0.18 },
        { freq: 1046.50, tempo: 1.00, dur: 0.60 }
    ];

    melodia.forEach(nota => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(nota.freq, agora + nota.tempo);

        gain.gain.setValueAtTime(0.28, agora + nota.tempo);
        gain.gain.exponentialRampToValueAtTime(0.001, agora + nota.tempo + nota.dur);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(agora + nota.tempo);
        osc.stop(agora + nota.tempo + nota.dur);
    });
}

/* =========================================================
   PARTE 2: HISTÓRIA ANIMADA DA TEKA (SEM MARCAÇÃO DE CENAS)
   ========================================================= */
const scenes = [
    {
        title: "Oi, galerinha! Eu sou a Teka!",
        text: "Eu adoro tecnologia! Uso todos os dias para estudar, pesquisar na internet, ouvir música, jogar e criar desenhos super legais! E vocês, também gostam?",
        icons: "💻 🌐 🎵 🎮"
    },
    {
        title: "Ops! Meu celular quebrou...",
        text: "Celular, fone, televisão, teclado, carregadores... A tecnologia está por toda parte, mas ela não dura para sempre. Meu aparelho parou de funcionar. E agora, criançada?",
        icons: "📱💥 🎧 🔌 😢"
    },
    {
        title: "Posso jogar no lixo comum?",
        text: "Eu quase joguei na lixeira normal de casa, mas parei para pensar! Foi aí que descobri o que é o Lixo Eletrônico, ou E-Lixo: todo aparelho ou cabo que quebrou e não usamos mais.",
        icons: "🗑️❌ 🤔 💡"
    },
    {
        title: "Por que NÃO vai no lixo comum?",
        text: "Prestem muita atenção nesses 3 motivos: Primeiro, pode contaminar a terra e a água! Segundo, pilhas e baterias são perigosas! E terceiro, muitas peças podem virar coisas novas!",
        icons: "🌱💧 🔋⚠️ ♻️"
    },
    {
        title: "Ambiente e saúde conectados!",
        text: "Quando não jogamos eletrônicos no lixo comum, evitamos a poluição, reaproveitamos materiais preciosos e protegemos a saúde de todas as crianças, adultos e animaizinhos!",
        icons: "🌍💚 🏥 🛡️"
    },
    {
        title: "Os 4 Caminhos da Teka!",
        text: "Antes de jogar fora, lembrem dos 4 caminhos: 1) REUTILIZAR se ainda funciona; 2) CONSERTAR se tiver reparo; 3) DOAR para quem precisa; ou 4) DESCARTAR CERTO quando não tiver mais jeito!",
        icons: "🔄 🛠️ 🎁 ✅"
    },
    {
        title: "Onde levar o Lixo Eletrônico?",
        text: "Chame sempre um adulto para ajudar! Vocês podem levar a um Ponto de Coleta aqui em Diadema ou entregar em lojas que recebem. E nunca, jamais abram pilhas ou baterias!",
        icons: "📍🏪 👨‍👩‍👧 ⚠️"
    },
    {
        title: "Prontos para a nossa missão?",
        text: "Pequenas atitudes fazem grandes mudanças! Agora vocês já são defensores da natureza. Desçam a página, completem os 15 itens do desafio e ganhem o Certificado da Teka!",
        icons: "🚀🌟 🏆 🌱"
    }
];

let currentScene = 0;
let isPlaying = false;
let sceneTimeout = null;

function definirEstadoAnimacaoTeka(estado) {
    const avatar = document.getElementById("tekaVideoAvatar");
    const ondas = document.getElementById("speakingWaves");
    if (!avatar) return;

    avatar.classList.remove("teka-idle", "teka-walking", "teka-talking");

    if (estado === "walking") {
        avatar.classList.add("teka-walking");
        if (ondas) ondas.classList.add("escondido");
    } else if (estado === "talking") {
        avatar.classList.add("teka-talking");
        if (ondas) ondas.classList.remove("escondido");
    } else {
        avatar.classList.add("teka-idle");
        if (ondas) ondas.classList.add("escondido");
    }
}

function selecionarVozFemininaPtBr() {
    if (!('speechSynthesis' in window)) return null;
    const vozes = window.speechSynthesis.getVoices();
    const vozesPt = vozes.filter(v => v.lang.includes('pt'));
    if (vozesPt.length === 0) return null;

    const preferidas = ['luciana', 'francisca', 'maria', 'thalita', 'vitória', 'vitoria', 'google português'];
    for (let nome of preferidas) {
        const encontrada = vozesPt.find(v => v.name.toLowerCase().includes(nome));
        if (encontrada) return encontrada;
    }
    return vozesPt[0];
}

function falarTextoTeka(texto, aoTerminarCallback, animarNoVideo = false) {
    if (!voiceEnabled || !('speechSynthesis' in window)) {
        if (animarNoVideo) definirEstadoAnimacaoTeka("idle");
        if (aoTerminarCallback) {
            sceneTimeout = setTimeout(aoTerminarCallback, 6500);
        }
        return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.05;
    utterance.pitch = 1.15;

    const vozEscolhida = selecionarVozFemininaPtBr();
    if (vozEscolhida) utterance.voice = vozEscolhida;

    utterance.onstart = () => {
        if (animarNoVideo) definirEstadoAnimacaoTeka("talking");
    };

    utterance.onend = () => {
        if (animarNoVideo) definirEstadoAnimacaoTeka("idle");
        if (aoTerminarCallback && isPlaying) {
            sceneTimeout = setTimeout(aoTerminarCallback, 1000);
        }
    };

    utterance.onerror = () => {
        if (animarNoVideo) definirEstadoAnimacaoTeka("idle");
        if (aoTerminarCallback && isPlaying) {
            sceneTimeout = setTimeout(aoTerminarCallback, 5000);
        }
    };

    window.speechSynthesis.speak(utterance);
}

function updateScene(falarAutomaticamente = false) {
    clearTimeout(sceneTimeout);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();

    const s = scenes[currentScene];
    const dialogueBox = document.getElementById("dialogueBox");

    // Efeito de transição suave no balão
    dialogueBox.style.opacity = "0.4";
    dialogueBox.style.transform = "scale(0.97)";

    // Faz a Teka caminhar até o lugar antes de começar a falar!
    definirEstadoAnimacaoTeka("walking");
    tocarSomPassinhos();

    setTimeout(() => {
        document.getElementById("sceneTitle").innerText = s.title;
        document.getElementById("sceneText").innerText = s.text;
        document.getElementById("sceneIcons").innerText = s.icons;

        dialogueBox.style.opacity = "1";
        dialogueBox.style.transform = "scale(1)";

        const progress = ((currentScene + 1) / scenes.length) * 100;
        document.getElementById("progressBar").style.width = progress + "%";
    }, 200);

    // Quando termina os passinhos (750ms), começa a falar animada
    sceneTimeout = setTimeout(() => {
        if (falarAutomaticamente) {
            falarTextoTeka(s.title + ". " + s.text, () => {
                if (isPlaying) {
                    if (currentScene < scenes.length - 1) {
                        currentScene++;
                        updateScene(true);
                    } else {
                        pararVideo();
                    }
                }
            }, true);
        } else {
            definirEstadoAnimacaoTeka("idle");
        }
    }, 750);
}

function falarCenaAtual() {
    const s = scenes[currentScene];
    falarTextoTeka(s.title + ". " + s.text, null, true);
}

function nextScene() {
    currentScene = (currentScene + 1) % scenes.length;
    updateScene(isPlaying);
}

function prevScene() {
    currentScene = (currentScene - 1 + scenes.length) % scenes.length;
    updateScene(isPlaying);
}

function pararVideo() {
    isPlaying = false;
    clearTimeout(sceneTimeout);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    definirEstadoAnimacaoTeka("idle");
    document.getElementById("playPauseBtn").innerText = "▶ Dar Play na História";
}

function togglePlay() {
    const btn = document.getElementById("playPauseBtn");
    if (isPlaying) {
        pararVideo();
    } else {
        isPlaying = true;
        btn.innerText = "⏸ Pausar História";
        updateScene(true);
    }
}

function toggleMute() {
    const muteBtn = document.getElementById("muteBtn");
    voiceEnabled = !voiceEnabled;
    if (!voiceEnabled) {
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
        definirEstadoAnimacaoTeka("idle");
        muteBtn.innerText = "🔇 Mudo";
    } else {
        muteBtn.innerText = "🔊 Som Ativo";
        if (isPlaying) falarCenaAtual();
    }
}

/* =========================================================
   PARTE 3: DESAFIO INTERATIVO (15 FOTOS REAIS) + CERTIFICADO
   ========================================================= */
const desafios = [
    {
        nome: "Celular Quebrado",
        imagem: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=500&q=80",
        icone: "📱",
        respostaCorreta: "eletronico"
    },
    {
        nome: "Casca de Banana",
        imagem: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=500&q=80",
        icone: "🍌",
        respostaCorreta: "organico"
    },
    {
        nome: "Mouse de Computador",
        imagem: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=500&q=80",
        icone: "🖱️",
        respostaCorreta: "eletronico"
    },
    {
        nome: "Garrafa Plástica PET",
        imagem: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=500&q=80",
        icone: "🥤",
        respostaCorreta: "reciclavel"
    },
    {
        nome: "Pilhas Usadas",
        imagem: "https://images.unsplash.com/photo-1619641805634-b867f535071c?auto=format&fit=crop&w=500&q=80",
        icone: "🔋",
        respostaCorreta: "eletronico"
    },
    {
        nome: "Caixa de Papelão",
        imagem: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=500&q=80",
        icone: "📦",
        respostaCorreta: "reciclavel"
    },
    {
        nome: "Fone de Ouvido Velho",
        imagem: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80",
        icone: "🎧",
        respostaCorreta: "eletronico"
    },
    {
        nome: "Resto de Maçã",
        imagem: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&w=500&q=80",
        icone: "🍎",
        respostaCorreta: "organico"
    },
    {
        nome: "Teclado de Computador",
        imagem: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=500&q=80",
        icone: "⌨️",
        respostaCorreta: "eletronico"
    },
    {
        nome: "Latinha de Alumínio",
        imagem: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=500&q=80",
        icone: "🥫",
        respostaCorreta: "reciclavel"
    },
    {
        nome: "Notebook Antigo",
        imagem: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500&q=80",
        icone: "💻",
        respostaCorreta: "eletronico"
    },
    {
        nome: "Cascas de Ovos",
        imagem: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=500&q=80",
        icone: "🥚",
        respostaCorreta: "organico"
    },
    {
        nome: "Cabos e Carregadores",
        imagem: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=500&q=80",
        icone: "🔌",
        respostaCorreta: "eletronico"
    },
    {
        nome: "Controle de Videogame",
        imagem: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=500&q=80",
        icone: "🎮",
        respostaCorreta: "eletronico"
    },
    {
        nome: "Folhas e Restos de Verdura",
        imagem: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80",
        icone: "🥬",
        respostaCorreta: "organico"
    }
];

let indiceAtual = 0;
let bloqueioClique = false;

window.onload = function() {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = selecionarVozFemininaPtBr;
    }
    document.getElementById('contador-total').innerText = desafios.length;
    carregarDesafio();
};

function mostrarFallbackEmoji() {
    const imgEl = document.getElementById('foto-item');
    const iconeEl = document.getElementById('icone-item');
    imgEl.classList.add('escondido');
    iconeEl.classList.remove('escondido');
}

function carregarDesafio() {
    bloqueioClique = false;
    const cartao = document.getElementById('cartao-anima');
    const itemAtual = desafios[indiceAtual];
    const imgEl = document.getElementById('foto-item');
    const iconeEl = document.getElementById('icone-item');

    cartao.style.transform = "scale(0.92)";
    setTimeout(() => {
        iconeEl.classList.add('escondido');
        imgEl.classList.remove('escondido');

        imgEl.src = itemAtual.imagem;
        imgEl.alt = itemAtual.nome;
        iconeEl.innerText = itemAtual.icone;
        document.getElementById('nome-item').innerText = itemAtual.nome;
        document.getElementById('contador-atual').innerText = indiceAtual + 1;
        document.getElementById('feedback-jogo').className = 'escondido';
        cartao.style.transform = "scale(1)";
    }, 150);
}

function verificarResposta(tipoEscolhido) {
    if (bloqueioClique) return;

    const feedback = document.getElementById('feedback-jogo');
    const itemAtual = desafios[indiceAtual];
    const respostaCerta = itemAtual.respostaCorreta;

    if (tipoEscolhido === respostaCerta) {
        bloqueioClique = true;
        tocarSomAcerto();

        const msgSucesso = "🎉 Mandou muito bem! Você descartou " + itemAtual.nome + " na lixeira certa!";
        feedback.innerHTML = msgSucesso;
        feedback.className = "sucesso";

        if (voiceEnabled && !isPlaying && 'speechSynthesis' in window) {
            falarTextoTeka("Mandou muito bem! Lixeira certa!", null, false);
        }
        
        setTimeout(function() {
            if (indiceAtual < desafios.length - 1) {
                indiceAtual++;
                carregarDesafio();
            } else {
                exibirCertificadoFinal();
            }
        }, 1700);
    } else {
        tocarSomErro();
        feedback.innerHTML = "❌ Ops! Essa não é a lixeira adequada para " + itemAtual.nome + ". Tente outra cor!";
        feedback.className = "erro";

        if (voiceEnabled && !isPlaying && 'speechSynthesis' in window) {
            falarTextoTeka("Ops! Tente outra lixeira!", null, false);
        }
    }
}

function exibirCertificadoFinal() {
    document.getElementById('area-jogo-ativa').classList.add('escondido');
    document.getElementById('placar-box').classList.add('escondido');
    document.getElementById('tela-certificado').classList.remove('escondido');

    const hoje = new Date().toLocaleDateString('pt-BR');
    document.getElementById('data-certificado').innerText = "Conquistado em " + hoje;

    tocarFanfarraVitoria();

    if (voiceEnabled && !isPlaying && 'speechSynthesis' in window) {
        setTimeout(() => {
            falarTextoTeka("Parabéns! Você acertou todos os 15 desafios e agora é um Defensor Oficial da Natureza! Digite seu nome no seu certificado!", null, false);
        }, 600);
    }
}

function atualizarNomeCertificado(valor) {
    const campoNome = document.getElementById('nome-no-certificado');
    if (valor.trim() === "") {
        campoNome.innerText = "Super Guardião(ã) do Planeta";
    } else {
        campoNome.innerText = valor.trim();
    }
}

function imprimirCertificado() {
    window.print();
}

function reiniciarJogo() {
    indiceAtual = 0;
    document.getElementById('tela-certificado').classList.add('escondido');
    document.getElementById('area-jogo-ativa').classList.remove('escondido');
    document.getElementById('placar-box').classList.remove('escondido');
    carregarDesafio();
}
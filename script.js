/* =========================================================
   PARTE 1: EFEITOS SONOROS (WEB AUDIO API)
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
   PARTE 2: HISTÓRIA ANIMADA DA TEKA (CENÁRIO PARADO + PALAVRAS APARECENDO)
   ========================================================= */
const scenes = [
    {
        numero: 1,
        title: "Oi, galerinha! Eu sou a Teka!",
        text: "Eu adoro tecnologia! Uso todos os dias para estudar, pesquisar na internet, ouvir música, jogar e criar desenhos super legais! E vocês, também gostam?",
        audioFile: "cena1.mp3",
        cenarioClass: "cenario-1"
    },
    {
        numero: 2,
        title: "Ops! Meu celular quebrou...",
        text: "Celular, fone, televisão, teclado, carregadores... A tecnologia está por toda parte, mas ela não dura para sempre. Meu aparelho parou de funcionar. E agora, criançada?",
        audioFile: "cena2.mp3",
        cenarioClass: "cenario-2"
    },
    {
        numero: 3,
        title: "Posso jogar no lixo comum?",
        text: "Eu quase joguei na lixeira normal de casa, mas parei para pensar! Foi aí que descobri o que é o Lixo Eletrônico, ou E-Lixo: todo aparelho ou cabo que quebrou e não usamos mais.",
        audioFile: "cena3.mp3",
        cenarioClass: "cenario-3"
    },
    {
        numero: 4,
        title: "Por que NÃO vai no lixo comum?",
        text: "Prestem muita atenção nesses 3 motivos: Primeiro, pode contaminar a terra e a água! Segundo, pilhas e baterias são perigosas! E terceiro, muitas peças podem virar coisas novas!",
        audioFile: "cena4.mp3",
        cenarioClass: "cenario-4"
    },
    {
        numero: 5,
        title: "Ambiente e saúde conectados!",
        text: "Quando não jogamos eletrônicos no lixo comum, evitamos a poluição, reaproveitamos materiais preciosos e protegemos a saúde de todas as crianças, adultos e animaizinhos!",
        audioFile: "cena5.mp3",
        cenarioClass: "cenario-5"
    },
    {
        numero: 6,
        title: "Os 4 Caminhos da Teka!",
        text: "Antes de jogar fora, lembrem dos 4 caminhos: 1) REUTILIZAR se ainda funciona; 2) CONSERTAR se tiver reparo; 3) DOAR para quem precisa; ou 4) DESCARTAR CERTO quando não tiver mais jeito!",
        audioFile: "cena6.mp3",
        cenarioClass: "cenario-6"
    },
    {
        numero: 7,
        title: "Onde levar o Lixo Eletrônico?",
        text: "Chame sempre um adulto para ajudar! Vocês podem levar a um Ponto de Coleta aqui em Diadema ou entregar em lojas que recebem. E nunca, jamais abram pilhas ou baterias!",
        audioFile: "cena7.mp3",
        cenarioClass: "cenario-7"
    },
    {
        numero: 8,
        title: "Prontos para a nossa missão?",
        text: "Pequenas atitudes fazem grandes mudanças! Agora vocês já são defensores da natureza. Desçam a página, completem os 15 itens do desafio e ganhem o Certificado da Teka!",
        audioFile: "cena8.mp3",
        cenarioClass: "cenario-8"
    }
];

let currentScene = 0;
let isPlaying = false;
let sceneTimeout = null;
let timerPalavras = null;
let playerVozSalva = new Audio();

function pararTimerPalavras() {
    if (timerPalavras) {
        clearInterval(timerPalavras);
        timerPalavras = null;
    }
}

function mostrarTextoCompletoDaCena(s) {
    pararTimerPalavras();
    const titleEl = document.getElementById("sceneTitle");
    const textEl = document.getElementById("sceneText");
    if (titleEl) titleEl.innerText = s.title;
    if (textEl) textEl.innerText = s.text;
}

// Faz tanto o título quanto o texto explicativo aparecerem palavra por palavra conforme a Teka fala
function animarPalavrasConformeFala(titulo, texto, duracaoTotalMs) {
    pararTimerPalavras();
    const titleEl = document.getElementById("sceneTitle");
    const textEl = document.getElementById("sceneText");
    if (!titleEl || !textEl) return;

    const palavrasTitulo = titulo.trim().split(/\s+/);
    const palavrasTexto = texto.trim().split(/\s+/);
    const totalPalavras = palavrasTitulo.length + palavrasTexto.length;

    const tempoPorPalavra = Math.max(90, Math.min(340, Math.floor((duracaoTotalMs * 0.90) / totalPalavras)));

    titleEl.innerText = "";
    textEl.innerText = "";

    let idx = 0;
    timerPalavras = setInterval(() => {
        if (idx < palavrasTitulo.length) {
            titleEl.innerText += (idx === 0 ? "" : " ") + palavrasTitulo[idx];
        } else {
            const idxTexto = idx - palavrasTitulo.length;
            if (idxTexto < palavrasTexto.length) {
                textEl.innerText += (idxTexto === 0 ? "" : " ") + palavrasTexto[idxTexto];
            }
        }
        idx++;
        if (idx >= totalPalavras) {
            pararTimerPalavras();
        }
    }, tempoPorPalavra);
}

function pararQualquerVoz() {
    pararTimerPalavras();
    if (playerVozSalva) {
        playerVozSalva.pause();
        playerVozSalva.currentTime = 0;
    }
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }
    const guiaJogo = document.getElementById("tekaGuiaJogoBox");
    if (guiaJogo) guiaJogo.classList.remove("teka-jogo-falando");
}

function definirEstadoAnimacaoTeka(estado) {
    const ondas = document.getElementById("speakingWaves");
    if (estado === "talking") {
        if (ondas) ondas.classList.remove("escondido");
    } else {
        if (ondas) ondas.classList.add("escondido");
    }
}

function selecionarVozFemininaPtBr() {
    if (!('speechSynthesis' in window)) return null;
    const vozes = window.speechSynthesis.getVoices();
    const vozesPt = vozes.filter(v => v.lang.toLowerCase().includes('pt'));
    if (vozesPt.length === 0) return null;

    const prioridades = [
        'francisca', 'thalita', 'natural', 'neural', 'online',
        'google português do brasil', 'luciana', 'vitória', 'vitoria', 'maria'
    ];
    for (let termo of prioridades) {
        const encontrada = vozesPt.find(v => v.name.toLowerCase().includes(termo));
        if (encontrada) return encontrada;
    }
    return vozesPt[0];
}

function falarTextoTeka(texto, aoTerminarCallback, animarNoVideo = false, arquivoAudioSalvo = null, animarGuiaJogo = false, cenaObj = null) {
    pararQualquerVoz();

    if (!voiceEnabled) {
        if (cenaObj) mostrarTextoCompletoDaCena(cenaObj);
        if (animarNoVideo) definirEstadoAnimacaoTeka("idle");
        if (aoTerminarCallback) {
            sceneTimeout = setTimeout(aoTerminarCallback, 6000);
        }
        return;
    }

    const guiaJogo = document.getElementById("tekaGuiaJogoBox");

    if (arquivoAudioSalvo) {
        playerVozSalva = new Audio(arquivoAudioSalvo);

        playerVozSalva.onplay = () => {
            if (animarNoVideo) definirEstadoAnimacaoTeka("talking");
            if (animarGuiaJogo && guiaJogo) guiaJogo.classList.add("teka-jogo-falando");
            if (cenaObj) {
                const durMs = (playerVozSalva.duration && !isNaN(playerVozSalva.duration))
                    ? playerVozSalva.duration * 1000
                    : 8500;
                animarPalavrasConformeFala(cenaObj.title, cenaObj.text, durMs);
            }
        };

        playerVozSalva.onended = () => {
            if (cenaObj) mostrarTextoCompletoDaCena(cenaObj);
            if (animarNoVideo) definirEstadoAnimacaoTeka("idle");
            if (animarGuiaJogo && guiaJogo) guiaJogo.classList.remove("teka-jogo-falando");
            if (aoTerminarCallback && isPlaying) {
                sceneTimeout = setTimeout(aoTerminarCallback, 850);
            }
        };

        playerVozSalva.onerror = () => {
            if (animarGuiaJogo && guiaJogo) guiaJogo.classList.remove("teka-jogo-falando");
            falarComSinteseNavegador(texto, aoTerminarCallback, animarNoVideo, animarGuiaJogo, cenaObj);
        };

        playerVozSalva.play().catch(() => {
            falarComSinteseNavegador(texto, aoTerminarCallback, animarNoVideo, animarGuiaJogo, cenaObj);
        });
        return;
    }

    falarComSinteseNavegador(texto, aoTerminarCallback, animarNoVideo, animarGuiaJogo, cenaObj);
}

function falarComSinteseNavegador(texto, aoTerminarCallback, animarNoVideo, animarGuiaJogo = false, cenaObj = null) {
    if (!('speechSynthesis' in window)) {
        if (cenaObj) mostrarTextoCompletoDaCena(cenaObj);
        if (animarNoVideo) definirEstadoAnimacaoTeka("idle");
        if (aoTerminarCallback) sceneTimeout = setTimeout(aoTerminarCallback, 6000);
        return;
    }

    const guiaJogo = document.getElementById("tekaGuiaJogoBox");
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.0;
    utterance.pitch = 1.02;

    const vozEscolhida = selecionarVozFemininaPtBr();
    if (vozEscolhida) utterance.voice = vozEscolhida;

    utterance.onstart = () => {
        if (animarNoVideo) definirEstadoAnimacaoTeka("talking");
        if (animarGuiaJogo && guiaJogo) guiaJogo.classList.add("teka-jogo-falando");
        if (cenaObj) {
            animarPalavrasConformeFala(cenaObj.title, cenaObj.text, 8500);
        }
    };

    utterance.onend = () => {
        if (cenaObj) mostrarTextoCompletoDaCena(cenaObj);
        if (animarNoVideo) definirEstadoAnimacaoTeka("idle");
        if (animarGuiaJogo && guiaJogo) guiaJogo.classList.remove("teka-jogo-falando");
        if (aoTerminarCallback && isPlaying) {
            sceneTimeout = setTimeout(aoTerminarCallback, 850);
        }
    };

    utterance.onerror = () => {
        if (cenaObj) mostrarTextoCompletoDaCena(cenaObj);
        if (animarNoVideo) definirEstadoAnimacaoTeka("idle");
        if (animarGuiaJogo && guiaJogo) guiaJogo.classList.remove("teka-jogo-falando");
        if (aoTerminarCallback && isPlaying) {
            sceneTimeout = setTimeout(aoTerminarCallback, 5000);
        }
    };

    window.speechSynthesis.speak(utterance);
}

// Carrega o cenário do Canva mantendo a imagem totalmente estática e limpa
function carregarImagemCanvaDaCena(numeroCena) {
    const bgImg = document.getElementById("cenarioBgImg");
    if (!bgImg) return;

    const possiveisNomes = [
        numeroCena + ".png",
        numeroCena + ".jpg",
        numeroCena + ".jpeg",
        numeroCena + ".jfif",
        "cenario" + numeroCena + ".png",
        "cenario" + numeroCena + ".jpg",
        "cenario" + numeroCena + ".jpeg",
        "cenario" + numeroCena + ".jfif",
        "cena" + numeroCena + ".png",
        "cena" + numeroCena + ".jpg"
    ];

    let idx = 0;
    function tentarProximoArquivo() {
        if (idx >= possiveisNomes.length) {
            bgImg.classList.add("escondido");
            return;
        }

        const arquivoTeste = possiveisNomes[idx];
        idx++;

        const imgTester = new Image();
        imgTester.onload = () => {
            bgImg.src = arquivoTeste;
            bgImg.classList.remove("escondido");
        };
        imgTester.onerror = tentarProximoArquivo;
        imgTester.src = arquivoTeste;
    }

    tentarProximoArquivo();
}

function aplicarCenarioDaCena(s) {
    const container = document.getElementById("videoContainer");
    if (container) {
        container.className = "video-container " + s.cenarioClass;
    }
    carregarImagemCanvaDaCena(s.numero);
}

function updateScene(falarAutomaticamente = false) {
    clearTimeout(sceneTimeout);
    pararQualquerVoz();

    const s = scenes[currentScene];
    const dialogueBox = document.getElementById("dialogueBox");

    aplicarCenarioDaCena(s);

    const progress = ((currentScene + 1) / scenes.length) * 100;
    document.getElementById("progressBar").style.width = progress + "%";

    if (falarAutomaticamente) {
        document.getElementById("sceneTitle").innerText = "";
        document.getElementById("sceneText").innerText = "";
        dialogueBox.style.opacity = "1";
        dialogueBox.style.transform = "scale(1)";

        sceneTimeout = setTimeout(() => {
            falarTextoTeka(
                s.title + ". " + s.text,
                () => {
                    if (isPlaying) {
                        if (currentScene < scenes.length - 1) {
                            currentScene++;
                            updateScene(true);
                        } else {
                            currentScene = 0;
                            pararVideo(true);
                        }
                    }
                },
                true,
                s.audioFile,
                false,
                s
            );
        }, 300);
    } else {
        mostrarTextoCompletoDaCena(s);
        definirEstadoAnimacaoTeka("idle");
    }
}

function pararVideo(mostrarBotaoFinal = false) {
    isPlaying = false;
    clearTimeout(sceneTimeout);
    pararQualquerVoz();
    definirEstadoAnimacaoTeka("idle");
    mostrarTextoCompletoDaCena(scenes[currentScene]);

    const overlay = document.getElementById("videoOverlay");
    const btn = overlay ? overlay.querySelector(".btn-big-play") : null;
    if (overlay) {
        overlay.classList.remove("escondido");
        if (btn) {
            btn.innerText = mostrarBotaoFinal ? "🔄 Assistir Novamente" : "▶ Continuar História da Teka";
        }
    }
}

function iniciarOuPausarVideo(event) {
    if (event) event.stopPropagation();
    const overlay = document.getElementById("videoOverlay");

    if (isPlaying) {
        pararVideo(false);
    } else {
        isPlaying = true;
        if (overlay) overlay.classList.add("escondido");
        updateScene(true);
    }
}

function clicarPalcoVideo() {
    if (isPlaying) {
        pararVideo(false);
    }
}

/* =========================================================
   PARTE 3: DESAFIO INTERATIVO (SUPORTE TOTAL A .JFIF + VOZ SALVA DA TEKA)
   ========================================================= */
const desafios = [
    { nome: "Celular Quebrado", imagem: "celular.jfif", icone: "📱", respostaCorreta: "eletronico" },
    { nome: "Casca de Banana", imagem: "banana.jfif", icone: "🍌", respostaCorreta: "organico" },
    { nome: "Mouse de Computador", imagem: "mouse.jfif", icone: "🖱️", respostaCorreta: "eletronico" },
    { nome: "Garrafa Plástica PET", imagem: "garrafa.jfif", icone: "🥤", respostaCorreta: "reciclavel" },
    { nome: "Pilhas Usadas", imagem: "pilhas.jfif", icone: "🔋", respostaCorreta: "eletronico" },
    { nome: "Caixa de Papelão", imagem: "papelao.jfif", icone: "📦", respostaCorreta: "reciclavel" },
    { nome: "Fone de Ouvido Velho", imagem: "fone.jfif", icone: "🎧", respostaCorreta: "eletronico" },
    { nome: "Resto de Maçã", imagem: "maca.jfif", icone: "🍎", respostaCorreta: "organico" },
    { nome: "Teclado de Computador", imagem: "teclado.jfif", icone: "⌨️", respostaCorreta: "eletronico" },
    { nome: "Latinha de Alumínio", imagem: "latinha.jfif", icone: "🥫", respostaCorreta: "reciclavel" },
    { nome: "Notebook Antigo", imagem: "notebook.jfif", icone: "💻", respostaCorreta: "eletronico" },
    { nome: "Cascas de Ovos", imagem: "ovos.jfif", icone: "🥚", respostaCorreta: "organico" },
    { nome: "Cabos e Carregadores", imagem: "cabos.jfif", icone: "🔌", respostaCorreta: "eletronico" },
    { nome: "Controle de Videogame", imagem: "controle.jfif", icone: "🎮", respostaCorreta: "eletronico" },
    { nome: "Folhas e Restos de Verdura", imagem: "verdura.jfif", icone: "🥬", respostaCorreta: "organico" }
];

const LISTA_EXTENSOES = ['jfif', 'jpg', 'jpeg', 'png', 'webp', 'JFIF', 'JPG', 'JPEG', 'PNG'];

let indiceAtual = 0;
let bloqueioClique = false;

window.onload = function() {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = selecionarVozFemininaPtBr;
    }
    document.getElementById('contador-total').innerText = desafios.length;
    aplicarCenarioDaCena(scenes[0]);
    mostrarTextoCompletoDaCena(scenes[0]);
    carregarDesafio();
};

function mostrarFallbackEmoji() {
    const imgEl = document.getElementById('foto-item');
    const iconeEl = document.getElementById('icone-item');
    const nomeBase = desafios[indiceAtual].imagem.split('.')[0];
    let idxAtual = parseInt(imgEl.getAttribute('data-tentativa-idx') || '0', 10);

    idxAtual++;
    if (idxAtual < LISTA_EXTENSOES.length) {
        imgEl.setAttribute('data-tentativa-idx', idxAtual.toString());
        imgEl.src = nomeBase + '.' + LISTA_EXTENSOES[idxAtual];
    } else {
        imgEl.classList.add('escondido');
        iconeEl.classList.remove('escondido');
    }
}

function carregarDesafio() {
    bloqueioClique = false;
    const cartao = document.getElementById('cartao-anima');
    const itemAtual = desafios[indiceAtual];
    const imgEl = document.getElementById('foto-item');
    const iconeEl = document.getElementById('icone-item');
    const nomeBase = itemAtual.imagem.split('.')[0];

    cartao.style.transform = "scale(0.92)";
    setTimeout(() => {
        iconeEl.classList.add('escondido');
        imgEl.classList.remove('escondido');

        imgEl.setAttribute('data-tentativa-idx', '0');
        imgEl.src = nomeBase + '.' + LISTA_EXTENSOES[0];
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
    const falaTekaJogo = document.getElementById('fala-teka-jogo');
    const itemAtual = desafios[indiceAtual];
    const respostaCerta = itemAtual.respostaCorreta;

    if (tipoEscolhido === respostaCerta) {
        bloqueioClique = true;
        tocarSomAcerto();

        const msgSucesso = "🎉 Mandou muito bem! Você descartou " + itemAtual.nome + " na lixeira certa!";
        feedback.innerHTML = msgSucesso;
        feedback.className = "sucesso";
        if (falaTekaJogo) {
            falaTekaJogo.innerHTML = '<strong>Teka diz:</strong> "Mandou muito bem! Você descartou na lixeira certa!"';
        }

        if (voiceEnabled && !isPlaying) {
            falarTextoTeka("Mandou muito bem! Você descartou na lixeira certa!", null, false, "acerto.mp3", true);
        }
        
        setTimeout(function() {
            if (indiceAtual < desafios.length - 1) {
                indiceAtual++;
                carregarDesafio();
            } else {
                exibirCertificadoFinal();
            }
        }, 2300);
    } else {
        tocarSomErro();
        feedback.innerHTML = "❌ Ops! Essa não é a lixeira adequada para " + itemAtual.nome + ". Tente outra cor!";
        feedback.className = "erro";
        if (falaTekaJogo) {
            falaTekaJogo.innerHTML = '<strong>Teka diz:</strong> "Ops! Essa não é a lixeira certa. Tente outra cor!"';
        }

        if (voiceEnabled && !isPlaying) {
            falarTextoTeka("Ops! Essa não é a lixeira certa. Tente outra cor!", null, false, "erro.mp3", true);
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

    if (voiceEnabled && !isPlaying) {
        setTimeout(() => {
            falarTextoTeka(
                "Parabéns! Você acertou todos os 15 desafios e agora é um Defensor Oficial da Natureza! Digite seu nome no seu certificado!",
                null,
                false,
                "vitoria.mp3",
                false
            );
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
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

const scenes = [
    { numero: 1, audioFile: "cena1.mp3" },
    { numero: 2, audioFile: "cena2.mp3" },
    { numero: 3, audioFile: "cena3.mp3" },
    { numero: 4, audioFile: "cena4.mp3" },
    { numero: 5, audioFile: "cena5.mp3" },
    { numero: 6, audioFile: "cena6.mp3" },
    { numero: 7, audioFile: "cena7.mp3" },
    { numero: 8, audioFile: "cena8.mp3" },
    { numero: 9, audioFile: "cena9.mp3" },
    { numero: 10, audioFile: "cena10.mp3" },
    { numero: 11, audioFile: "cena11.mp3" },
    { numero: 12, audioFile: "cena12.mp3" },
    { numero: 13, audioFile: "cena13.mp3" },
    { numero: 14, audioFile: "cena14.mp3" }
];

let currentScene = 0;
let isPlaying = false;
let isPlayingEncerramento = false;
let playerVozSalva = new Audio();

function pararQualquerVoz() {
    if (playerVozSalva) {
        playerVozSalva.pause();
        playerVozSalva.currentTime = 0;
    }
    isPlayingEncerramento = false;
    atualizarBotaoEncerramento();
}

function carregarImagemSlide(numeroCena) {
    const bgImg = document.getElementById("cenarioBgImg");
    if (!bgImg) return;
    
    const possiveisNomes = [
        numeroCena + ".jpg",
        numeroCena + ".jpeg",
        "slide" + numeroCena + ".jpg",
        "slide" + numeroCena + ".jpeg"
    ];

    let idx = 0;
    function tentarProximo() {
        if (idx >= possiveisNomes.length) return;
        const arquivo = possiveisNomes[idx];
        idx++;

        const imgTester = new Image();
        imgTester.onload = () => {
            bgImg.src = arquivo;
        };
        imgTester.onerror = tentarProximo;
        imgTester.src = arquivo;
    }

    tentarProximo();
}

function atualizarBotaoPlaySlide() {
    const btn = document.getElementById("btnPlayAudioSlide");
    if (!btn) return;
    btn.innerText = isPlaying ? "⏸ Pausar" : "▶ Ouvir a Teka";
}

function tocarAudioDoSlideAtual() {
    pararQualquerVoz();
    const s = scenes[currentScene];
    
    // Tenta tocar cenaX.mp3 e se não existir, tenta X.mp3
    const possiveisAudios = [
        s.audioFile,
        s.numero + ".mp3",
        "cena" + s.numero + ".MP3",
        s.numero + ".MP3"
    ];

    let idxAudio = 0;

    function tentarProximoAudio() {
        if (idxAudio >= possiveisAudios.length) {
            isPlaying = false;
            atualizarBotaoPlaySlide();
            return;
        }

        const arquivoAudio = possiveisAudios[idxAudio];
        idxAudio++;

        playerVozSalva = new Audio(arquivoAudio);

        playerVozSalva.onended = () => {
            if (isPlaying && currentScene < scenes.length - 1) {
                currentScene++;
                updateScene(true);
            } else {
                isPlaying = false;
                atualizarBotaoPlaySlide();
            }
        };

        playerVozSalva.onerror = tentarProximoAudio;

        playerVozSalva.play().catch(() => {
            tentarProximoAudio();
        });
    }

    tentarProximoAudio();
}

function updateScene(tocarAutomatico = false) {
    pararQualquerVoz();
    const s = scenes[currentScene];

    carregarImagemSlide(s.numero);

    const progress = ((currentScene + 1) / scenes.length) * 100;
    const bar = document.getElementById("progressBar");
    if (bar) bar.style.width = progress + "%";

    atualizarBotaoPlaySlide();

    if (tocarAutomatico && isPlaying) {
        tocarAudioDoSlideAtual();
    }
}

function tocarOuPausarAudioSlide() {
    if (isPlaying) {
        isPlaying = false;
        pararQualquerVoz();
        atualizarBotaoPlaySlide();
    } else {
        isPlaying = true;
        atualizarBotaoPlaySlide();
        tocarAudioDoSlideAtual();
    }
}

function avancarSlide() {
    currentScene = (currentScene + 1) % scenes.length;
    updateScene(isPlaying);
}

function voltarSlide() {
    currentScene = (currentScene - 1 + scenes.length) % scenes.length;
    updateScene(isPlaying);
}

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

let indiceAtual = 0;
let bloqueioClique = false;

window.onload = function() {
    const totalEl = document.getElementById('contador-total');
    if (totalEl) totalEl.innerText = desafios.length;
    updateScene(false);
    carregarDesafio();
};

function carregarDesafio() {
    bloqueioClique = false;
    const cartao = document.getElementById('cartao-anima');
    const itemAtual = desafios[indiceAtual];
    const imgEl = document.getElementById('foto-item');
    const iconeEl = document.getElementById('icone-item');

    if (!cartao || !imgEl || !iconeEl) return;

    cartao.style.transform = "scale(0.92)";
    setTimeout(() => {
        iconeEl.classList.add('escondido');
        imgEl.classList.remove('escondido');

        imgEl.src = itemAtual.imagem;
        imgEl.alt = itemAtual.nome;
        iconeEl.innerText = itemAtual.icone;
        
        imgEl.onerror = function() {
            if (this.src.endsWith('.jfif')) {
                this.src = this.src.replace('.jfif', '.jpg');
            } else {
                imgEl.classList.add('escondido');
                iconeEl.classList.remove('escondido');
            }
        };

        document.getElementById('nome-item').innerText = itemAtual.nome;
        document.getElementById('contador-atual').innerText = indiceAtual + 1;
        document.getElementById('feedback-jogo').className = 'escondido';
        cartao.style.transform = "scale(1)";
    }, 150);
}

function tocarAudioJogo(arquivoMp3) {
    if (!voiceEnabled || isPlaying) return;
    const guiaJogo = document.getElementById("tekaGuiaJogoBox");
    const audioJogo = new Audio(arquivoMp3);
    audioJogo.onplay = () => {
        if (guiaJogo) guiaJogo.classList.add("teka-jogo-falando");
    };
    audioJogo.onended = () => {
        if (guiaJogo) guiaJogo.classList.remove("teka-jogo-falando");
    };
    audioJogo.onerror = () => {
        if (guiaJogo) guiaJogo.classList.remove("teka-jogo-falando");
    };
    audioJogo.play().catch(() => {});
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

        feedback.innerHTML = "🎉 Mandou muito bem! Você descartou " + itemAtual.nome + " na lixeira certa!";
        feedback.className = "sucesso";
        if (falaTekaJogo) {
            falaTekaJogo.innerHTML = '<strong>Teka diz:</strong> "Mandou muito bem! Você descartou na lixeira certa!"';
        }

        tocarAudioJogo("acerto.mp3");
        
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

        tocarAudioJogo("erro.mp3");
    }
}

function exibirCertificadoFinal() {
    document.getElementById('area-jogo-ativa').classList.add('escondido');
    document.getElementById('placar-box').classList.add('escondido');
    document.getElementById('tela-certificado').classList.remove('escondido');

    const hoje = new Date().toLocaleDateString('pt-BR');
    document.getElementById('data-certificado').innerText = "Conquistado em " + hoje;

    tocarFanfarraVitoria();

    setTimeout(() => {
        tocarAudioJogo("vitoria.mp3");
    }, 600);
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
    pararQualquerVoz();
    indiceAtual = 0;
    document.getElementById('tela-certificado').classList.add('escondido');
    document.getElementById('area-jogo-ativa').classList.remove('escondido');
    document.getElementById('placar-box').classList.remove('escondido');
    carregarDesafio();
}

function atualizarBotaoEncerramento() {
    const btn = document.getElementById("btnAudioEncerramento");
    if (!btn) return;
    btn.innerText = isPlayingEncerramento ? "⏸ Pausar Encerramento" : "▶ Ouvir Encerramento da Teka";
}

function tocarOuPausarEncerramento() {
    if (isPlayingEncerramento) {
        pararQualquerVoz();
        return;
    }

    isPlaying = false;
    atualizarBotaoPlaySlide();
    pararQualquerVoz();

    isPlayingEncerramento = true;
    atualizarBotaoEncerramento();

    playerVozSalva = new Audio("encerramento.mp3");
    playerVozSalva.onended = () => {
        isPlayingEncerramento = false;
        atualizarBotaoEncerramento();
    };
    playerVozSalva.onerror = () => {
        isPlayingEncerramento = false;
        atualizarBotaoEncerramento();
    };
    playerVozSalva.play().catch(() => {
        isPlayingEncerramento = false;
        atualizarBotaoEncerramento();
    });
}
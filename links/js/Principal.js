window.addEventListener("load", function (event) {
    desenhaTelaInicial()


});

function desenhaTelaInicial() {


    for (n = 0; n < 10; n++) {
        for (item in todasCartas) {
            document.getElementById('cartasTelaInicial').innerHTML += `<img src="./links/img/carta${todasCartas[item]}.png" class="cartaInicial"></img>`
        }
    }

}


function iniciaJogo() {
    document.getElementById('jogoCompleto').style = 'display:flex;'
    document.getElementById('telaInicial').style = 'display:none;'


    DesenhaTabuleiro();
    DesenhaPecasIniciais();
    carregaCartas();
    carregaSom()


}


var brancasVencemPosicao = false;
var brancasVencemCaptura = false;
var pretasVencemPosicao = false;
var pretasVencemCaptura = false;


function validaFimDeJogo() {


    if (PecasJogando.length == 1) {
        if (PecasJogando[0].nome.includes('ReiBranco')) {
            brancasVencemCaptura = true;

        }
        else if (PecasJogando[0].nome.includes('ReiPreto')) {
            pretasVencemCaptura = true;
        }


    }
    else {
        brancasVencemCaptura = !PecasJogando[1].nome.includes('ReiPreto') && PecasJogando[0].nome.includes('ReiBranco')

        pretasVencemCaptura = !PecasJogando[0].nome.includes('ReiBranco') && PecasJogando[0].nome.includes('ReiPreto')
    }


    brancasVencemPosicao = ReiBranco1.posicao == '3'
    pretasVencemPosicao = ReiPreto1.posicao == '23'


    brancasVencem = brancasVencemCaptura || brancasVencemPosicao

    pretasVencem = pretasVencemCaptura || pretasVencemPosicao


    if (brancasVencem || pretasVencem) {
        let fraseFinal = ''
        if (brancasVencem) {
            fraseFinal = 'AS BRANCAS VENCERAM'
        }
        else if (pretasVencem) {
            fraseFinal = 'AS PRETAS VENCERAM'
        }

        document.getElementById('faseFinal').innerHTML = `<h2>${fraseFinal}</h2>`
        document.getElementById('jogoCompleto').style = 'display:none;'
        document.getElementById('telaInicial').style = 'display:none;'
        document.getElementById('telaFinal').style = 'display:flex;'
        document.getElementById('cartaFinal').innerHTML = `<img src="./links/img/carta${cartas[4]}.png" class="cartaInicial"></img>`

        document.getElementById('audio').innerHTML = `
	<audio autoplay loop src="links/audio/audio1.mp3"
		type="audio/mpeg">

	</audio>
`

    }


}



var PecasJogando = [];
var jogada = 1;
var validaCaminho = 0;
var caminhoInimigo = [];
var aleatorio = ''

var cartaSelecionada = ''
var posicaoCartaSelecionada = ''
var cartaCentral = ''
var cartaAtiva = ''

var todasCartas = ['Cavalo', 'Boi', 'Dragao', 'Gansa', 'Iguana', 'Guaxinim', 'Cachorro', 'Tartaruga', 'Sapo', 'Vibora', 'Caranguejo', 'Galo', 'Coelho', 'Rato', 'Javali', 'Tigre', 'Girafa', 'Macaco', 'Lontra', 'Lagosta', 'CobraDoMar', 'Zibelina', 'Centopeia', 'Panda', 'Urso', 'Garca', 'LouvaADeus', 'CavaloDeFogo', 'Cobra', 'Enguia', 'Fenix', 'Raposa', 'Camundongo', 'Bufalo', 'Elefante', 'Gato', 'Abelha', 'Aranha', 'Cervo', 'Escorpiao', 'Hipopotamo', 'Trex', 'Lobo']
var brancasVencem = false;
var pretasVencem = false;


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}


var cartas = [];


function carregaSom() {


    audio = getRandomInt(2, 10);

    console.log(audio);

    document.getElementById('audio').innerHTML = `
	<audio autoplay loop src="links/audio/audio${audio}.mp3"
		type="audio/mpeg">

	</audio>
`
}


//cartas = ['Lobo', 'Boi', 'Cavalo', 'Lobo', 'Boi']

carregaCartasJogando()

function carregaCartasJogando() {

    while (cartas.length < 5) {
        let cartaSorteada = getRandomInt(0, 40);
        if (!cartas.includes(todasCartas[cartaSorteada])) { cartas.push(todasCartas[cartaSorteada]) }
    }



}






class Peca {
    // Constructor
    constructor(nome, posicao) {
        this.nome = nome;
        this.posicao = posicao;
        this.DesenhaPeca();
    }
    // Method
    DesenhaPeca() {
        var tipoPeca = this.nome.toLowerCase();
        this.tipoPeca = tipoPeca.slice(0, -1);
        var imagem = '';
        var desenha = `<canvas onclick="CaminhoPeca('${this.nome}',${this.posicao})" class="peca" id="${this.nome}" value="${tipoPeca}" width="65" height="85"></canvas>`;
        document.getElementById(`${this.posicao}`).innerHTML = desenha;
        DesenhaTipo(this.nome);

    };
    MovePeca(destino) {
        this.posicao = destino;
        jogada++;
        DesenhaPecasJogando();
        alteraCarta()
        //        this.DesenhaPeca();

        giraTabuleiro();
        selecionaCarta()
        //



    }
};

function alteraCarta() {

    cartas[posicaoCartaSelecionada] = cartaCentral
    cartas[4] = cartaSelecionada
    carregaCartas()


}


function giraPecas() {

    if (jogada % 2 == 0) {

        let listaPecas = document.querySelectorAll('.peca');
        for (let i = 0; i < listaPecas.length; i++) {
            listaPecas[i].style = `
        transform: rotate(180deg);
        `
        }
    }
}


function piscaPecas() {

    let listaPecas = document.querySelectorAll('.peca');
    //DesenhaPecasJogando();
    for (let i = 0; i < listaPecas.length; i++) {
        listaPecas[i].style = `
        animation: piscaPecas 3s 1;
        `
    }
    setTimeout(() => {

        DesenhaPecasJogando();


    }, "300");



}


function giraTabuleiro() {


    piscaPecas()
    if (jogada % 2 == 0) {

        document.getElementById('tabuleiroCompleto').style = `
        animation: girando 0.3s 1;
        transform: rotate(180deg);
        `
        document.getElementById('cartaCentro').style = `
        transform: rotate(180deg);
    `
        document.body.style = 'background: var(--fundoTabuleiroVirado)';




    }
    else {
        document.getElementById('tabuleiroCompleto').style = `
        animation: voltando 0.3s 1;
        transform: rotate(360deg);
    `
        document.getElementById('cartaCentro').style = `
        transform: rotate(360deg);
    `
        document.body.style = 'background: var(--fundoTabuleiro)';

    }
    //piscaPecas()


}

function DesenhaTabuleiro() {
    var tabuleiro = '';
    var casa = 0;
    for (linhas = 0; linhas < 5; linhas++) {
        tabuleiro += `<tr>`;




        if (linhas % 2 != 0) {
            for (colunas = 0; colunas < 5; colunas++) {
                casa++;
                if (colunas % 2 == 0) {
                    tabuleiro += `<td class="casaPreta"  id="${casa}"><input type="button"  class="semCaminho" value=""/></td>`;
                }
                else {
                    tabuleiro += `<td class="casaBranca" id="${casa}"><input type="button"  class="semCaminho" value=""/></td>`;
                }
            }
        }
        else {
            for (colunas = 0; colunas < 5; colunas++) {
                casa++;
                if (casa == 23) {
                    tabuleiro += `<td class="casaPrincipalBranca"  id="${casa}"><input type="button"  class="semCaminho" value=""/></td>`;

                }
                else if (casa == 3) {
                    tabuleiro += `<td class="casaPrincipalPreta"  id="${casa}"><input type="button"  class="semCaminho" value=""/></td>`;

                }

                else if (colunas % 2 == 0) {
                    tabuleiro += `<td class="casaBranca" id="${casa}"><input type="button"  class="semCaminho" value=""/></td>`;
                }
                else {
                    tabuleiro += `<td class="casaPreta" id="${casa}"><input type="button"  class="semCaminho" value=""/></td>`;
                }
            }

        }
        tabuleiro += `</tr>`;
        document.getElementById('tabuleiro').innerHTML = tabuleiro;
    }
};

function DesenhaPecasIniciais() {




    //JOGO NORMAL

    //Peças Brancas

    PecasJogando.push(ReiBranco1 = new Peca('ReiBranco1', 23));
    PecasJogando.push(ReiPreto1 = new Peca('ReiPreto1', 3));

    PecasJogando.push(PeaoBranco01 = new Peca('PeaoBranco01', 21));
    PecasJogando.push(PeaoBranco02 = new Peca('PeaoBranco02', 22));
    PecasJogando.push(PeaoBranco03 = new Peca('PeaoBranco03', 24));
    PecasJogando.push(PeaoBranco04 = new Peca('PeaoBranco04', 25));

    PecasJogando.push(PeaoPreto01 = new Peca('PeaoPreto01', 1));
    PecasJogando.push(PeaoPreto02 = new Peca('PeaoPreto02', 2));
    PecasJogando.push(PeaoPreto03 = new Peca('PeaoPreto03', 4));
    PecasJogando.push(PeaoPreto04 = new Peca('PeaoPreto04', 5));


};

function DesenhaPecasJogando() {
    validaFimDeJogo();
    DesenhaTabuleiro();


    for (const property in PecasJogando) {
        PecasJogando[property].DesenhaPeca();
    }
    giraPecas();


    //DesenhaPecasJogando();
};


function carregaCartas() {

    for (item in cartas) {
        idCarta = parseInt(item)
        idCarta = `carta${idCarta + 1}`
        document.getElementById(idCarta).innerHTML = `<img src="./links/img/carta${cartas[item]}.png" onclick="selecionaCarta('carta${cartas[item]}', '${idCarta}')"></img>`
    }


}

function selecionaCarta(carta = 0, id = 0) {
    let vez = ''
    if (jogada % 2 != 0) { vez = 'branco' }
    else { vez = 'preto' };
    if (id != 0) {
        let jogadorCartas = document.getElementById(id).parentElement.id.toLowerCase()
        let cartaBranca = jogadorCartas.includes(`brancas`) && vez == `branco`;
        let cartaPreta = jogadorCartas.includes(`pretas`) && vez == `preto`;
        if ((cartaBranca || cartaPreta)) {
            cartaAtiva = carta;
            for (item in cartas) {
                idCarta = parseInt(item)
                idCarta = `carta${idCarta + 1}`
                if (idCarta == id) {
                    document.getElementById(idCarta).style = 'box-shadow: 0px 0px 5px 5px var(--selecionado);';
                }
                else {
                    document.getElementById(idCarta).style = 'border: 2px solid black;';
                }
            }


            posicaoCartaSelecionada = id[5] - 1;
            cartaSelecionada = cartas[posicaoCartaSelecionada]
            cartaCentral = cartas[4]

            //cartas[posicaoCarta] = cartaCentral
            //cartas[4] = nomeCarta


            //cartas = ['Dragao', 'Boi', 'Cavalo', 'Gansa', 'Iguana']




        }
    }

    if ((carta == 0 || id == 0)) {
        for (item in cartas) {
            cartaAtiva = '';
            idCarta = parseInt(item)
            idCarta = `carta${idCarta + 1}`
            document.getElementById(idCarta).style = 'border: 2px solid black;';
        }
    }

    DesenhaPecasJogando();

}

function CaminhoPeca(nome, posicao) {
    DesenhaPecasJogando();
    nomeBusca = nome.toLowerCase();
    meuTime = '';
    vez = '';
    casasLivres = [];
    casasInimigas = [];
    casasInimigasNoCaminho = [];
    casasAmigas = [];
    casasOcupadas = [];
    casasAmeacadas = [];
    parar = false;

    VezJogador();
    ValidaPosicoes();

    function VezJogador() { //valida de quem e a vez de jogar
        if (nomeBusca.includes("branco")) { meuTime = 'branco'; }
        else if (nomeBusca.includes("preto")) { meuTime = 'preto'; }
        if (jogada % 2 != 0) { vez = 'branco' }
        else { vez = 'preto' };
    }

    function ValidaPosicoes() { //valida as posições das peças no tabuleiro
        for (const property in PecasJogando) {
            casaInimiga = `${PecasJogando[property].nome} `;
            casaInimiga = casaInimiga.toLowerCase();
            casasOcupadas.push(PecasJogando[property].posicao);
            if (!casaInimiga.includes(meuTime)) { casasInimigas.push(PecasJogando[property].posicao) }
            else { casasAmigas.push(PecasJogando[property].posicao) }
        }
    }

    function ValidaCasasGeral() { //valida casas livres
        if (casasAmigas.indexOf(c) >= 0) {
            casasAmeacadas.push(`${c} `);
            if (posicao != c) {
                parar = true;
                return parar;
            }
        }
        else if (casasInimigas.indexOf(c) >= 0) {
            casasAmeacadas.push(`${c} `);
            casasInimigasNoCaminho.push(`${c} `);
            parar = true;
            return parar;
        }
        casasLivres.push(`${c} `);
    }

    function ValidaRotasInimigas() {
        for (c = 26; c >= 0; c--) {
            if (casasLivres.includes(`${c} `) && c != posicao) {
                caminhoInimigo.push(c);
            }
            else if (casasAmeacadas.includes(`${c} `) && c != posicao) {
                caminhoInimigo.push(c);
            }
        }
    }

    function DesenhaCasasPossiveis() { //desenha casas livres

        DesenhaCasasAtual();

        for (c = 25; c > 0; c--) {
            if (casasLivres.includes(`${c} `)) {
                document.getElementById(c).innerHTML = `<input type = "button"  onclick = "${nome}.MovePeca(${c})" class="caminho" />`;
            }
            else if (casasInimigasNoCaminho.includes(`${c} `)) {
                imgCapturada = '';
                for (const property in PecasJogando) {
                    if (PecasJogando[property].posicao == c) { imgCapturada = PecasJogando[property].tipoPeca }
                };
                document.getElementById(c).innerHTML = `<canvas onclick = "CapturaPeca(${posicao},${c})" class="pecaInimiga" id = "${document.getElementById(c).children[0].id}" value = "${document.getElementById(c).children[0].value}" width="65" height="85"></canvas> `;
                document.getElementById(c).style = `background-color: var(--pecaAmeacada)`;

                DesenhaTipo(document.getElementById(c).children[0].id);
                if (jogada % 2 == 0) {

                    let pecaInimiga = document.querySelectorAll('.pecaInimiga');
                    for (let i = 0; i < pecaInimiga.length; i++) {
                        pecaInimiga[i].style = `
                        transform: rotate(180deg);
                        `
                    }
                }


            }
        }
    }

    function DesenhaCasasAtual() { //desenha casas livres
        document.getElementById(posicao).style = `background-color: var(--pecaAtual)`;
    }

    var primeiraColuna = [1, 6, 11, 16, 21];
    var segundaColuna = [2, 7, 12, 17, 22];
    var ultimaColuna = [5, 10, 15, 20, 25];
    var penultimaColuna = [4, 9, 14, 19, 24];

    if (cartaAtiva == "cartaDragao") {
        //valida movimento

        if (vez == 'branco') {
            //primeira coluna
            if (primeiraColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 6) || c == (posicao - 3)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //segunda coluna
            else if (segundaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 6) || c == (posicao + 4) || c == (posicao - 3)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //penultima coluna
            else if (penultimaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 6) || c == (posicao + 4) || c == (posicao - 7)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (ultimaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 4) || c == (posicao - 7)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 6) || c == (posicao + 4) || c == (posicao - 7) || c == (posicao - 3)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        else {
            //primeira coluna
            if (ultimaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao - 6) || c == ((posicao + 3))) {
                        ValidaCasasGeral()
                    }
                }
            }
            //segunda coluna
            else if (penultimaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao - 6) || c == (posicao - 4) || c == ((posicao + 3))) {
                        ValidaCasasGeral()
                    }
                }
            }
            //penultima coluna
            else if (segundaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao - 6) || c == (posicao - 4) || c == (posicao + 7)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (primeiraColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao - 4) || c == (posicao + 7)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao - 6) || c == (posicao - 4) || c == (posicao + 7) || c == ((posicao + 3))) {
                        ValidaCasasGeral()
                    }
                }
            }
        }


        //desenha casas livres
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }

    else if (cartaAtiva == "cartaBoi") {
        //valida movimento

        if (vez == 'branco') {
            //ultima coluna
            if (ultimaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao + 5)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao + 1) || c == (posicao + 5)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        else {
            //ultima coluna
            if (primeiraColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao + 5)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao - 1) || c == (posicao + 5)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }

        //desenha casas livres
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }

    else if (cartaAtiva == "cartaGansa") {
        //valida movimento


        //primeira coluna
        if (primeiraColuna.includes(posicao)) {
            for (c = 25; c > 0; c--) {
                if (c == (posicao + 1) || c == (posicao + 6)) {
                    ValidaCasasGeral()
                }
            }
        }//ultima coluna
        else if (ultimaColuna.includes(posicao)) {
            for (c = 25; c > 0; c--) {
                if (c == (posicao - 1) || c == (posicao - 6)) {
                    ValidaCasasGeral()
                }
            }
        }
        //geral
        else {
            for (c = 25; c > 0; c--) {
                if (c == (posicao - 1) || c == (posicao + 1) || c == (posicao - 6) || c == (posicao + 6)) {
                    ValidaCasasGeral()
                }
            }
        }


        //desenha casas livres
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }

    else if (cartaAtiva == "cartaCavalo") {
        //valida movimento
        if (vez == 'branco') {
            //ultima coluna
            if (primeiraColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao + 5)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao - 1) || c == (posicao + 5)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        else {
            //ultima coluna
            if (ultimaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao + 5)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao + 1) || c == (posicao + 5)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        //desenha casas livres
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }

    else if (cartaAtiva == "cartaIguana") {
        //valida movimento
        if (vez == 'branco') {
            //primeira e segunda coluna
            if (primeiraColuna.includes(posicao) || segundaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao + 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (ultimaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao - 7)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao - 7) || c == (posicao + 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        else {    //primeira e segunda coluna
            if (ultimaColuna.includes(posicao) || penultimaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 5) || c == (posicao - 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (primeiraColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 5) || c == ((posicao + 7))) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 5) || c == ((posicao + 7)) || c == (posicao - 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        //desenha casas livres
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }

    else if (cartaAtiva == "cartaCapricornio") {
        //valida movimento
        if (vez == 'branco') {
            //primeira e segunda coluna
            if (primeiraColuna.includes(posicao) || segundaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao + 1) || c == (posicao + 10)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (ultimaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao - 2) || c == (posicao + 10)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao - 2) || c == (posicao + 1) || c == (posicao + 10)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        else {
            //primeira e segunda coluna
            if (ultimaColuna.includes(posicao) || penultimaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 5) || c == (posicao - 1) || c == (posicao - 10)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (primeiraColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 5) || c == (posicao + 2) || c == (posicao - 10)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 5) || c == (posicao + 2) || c == (posicao - 1) || c == (posicao - 10)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        //desenha casas livres
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }

    else if (cartaAtiva == "cartaGuaxinim") {
        //valida movimento

        if (vez == 'branco') {
            //ultima e penultima coluna
            if (ultimaColuna.includes(posicao) || penultimaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao + 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //primeira coluna
            else if (primeiraColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao - 3)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao - 3) || c == (posicao + 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        else {
            //primeira e segunda coluna
            if (primeiraColuna.includes(posicao) || segundaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 5) || c == (posicao - 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (ultimaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 5) || c == (posicao + 3)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 5) || c == (posicao + 3) || c == (posicao - 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        //desenha casas livres
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }

    else if (cartaAtiva == "cartaCachorro") {
        //valida movimento

        if (vez == 'branco') {
            //primeira coluna
            if (primeiraColuna.includes(posicao)) {
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 6) || c == (posicao - 1) || c == (posicao + 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        else {
            //ultima coluna
            if (ultimaColuna.includes(posicao)) {
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 6) || c == (posicao + 1) || c == (posicao - 4)) {
                        ValidaCasasGeral()
                    }
                }
            }

        }

        //desenha casas livres
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }

    else if (cartaAtiva == "cartaTartaruga") {
        //valida movimento

        if (vez == 'branco') {
            //primeira coluna
            if (primeiraColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 6) || c == (posicao + 2)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //segunda coluna
            else if (segundaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 6) || c == (posicao + 2) || c == (posicao + 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //penultima coluna
            else if (penultimaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 6) || c == (posicao - 2) || c == (posicao + 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (ultimaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao - 2) || c == (posicao + 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 6) || c == (posicao + 2) || c == (posicao - 2) || c == (posicao + 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        else {
            //ultima coluna
            if (ultimaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao - 6) || c == (posicao - 2)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //penultima coluna
            else if (penultimaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao - 6) || c == (posicao - 2) || c == (posicao - 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //segunda coluna
            else if (segundaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao - 6) || c == (posicao + 2) || c == (posicao - 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //primeira coluna
            else if (primeiraColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 2) || c == (posicao - 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao - 6) || c == (posicao + 2) || c == (posicao - 2) || c == (posicao - 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }


        //desenha casas livres
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }

    else if (cartaAtiva == "cartaSapo") {
        //valida movimento

        if (vez == 'branco') {
            //primeira coluna
            if (primeiraColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //segunda coluna
            else if (segundaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 6) || c == (posicao - 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (ultimaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao - 2) || c == (posicao - 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 6) || c == (posicao - 2) || c == (posicao - 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        else {
            //ultima coluna
            if (ultimaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao - 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //penultima coluna
            else if (penultimaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao - 6) || c == (posicao + 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //primeira coluna
            else if (primeiraColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 2) || c == (posicao + 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao - 6) || c == (posicao + 2) || c == (posicao + 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }


        //desenha casas livres
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }

    else if (cartaAtiva == "cartaVibora") {
        //valida movimento

        if (vez == 'branco') {
            //primeira e segunda coluna
            if (primeiraColuna.includes(posicao) || segundaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 6) || c == (posicao - 5)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (ultimaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao - 2) || c == (posicao - 5)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 6) || c == (posicao - 2) || c == (posicao - 5)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        else {
            //ultima e penultima coluna
            if (penultimaColuna.includes(posicao) || ultimaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao - 6) || c == (posicao + 5)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //primeira coluna
            else if (primeiraColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 2) || c == (posicao + 5)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao - 6) || c == (posicao + 2) || c == (posicao + 5)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }


        //desenha casas livres
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }

    else if (cartaAtiva == "cartaCaranguejo") {
        //valida movimento

        if (vez == 'branco') {
            //primeira coluna
            if (primeiraColuna.includes(posicao) || segundaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao + 2)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima e penultima coluna
            else if (penultimaColuna.includes(posicao) || ultimaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao - 2) || c == (posicao - 5)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao + 2) || c == (posicao - 2)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        else {
            //primeira coluna
            if (primeiraColuna.includes(posicao) || segundaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 5) || c == (posicao + 2)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima e penultima coluna
            else if (penultimaColuna.includes(posicao) || ultimaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao - 2) || c == (posicao + 5)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 5) || c == (posicao + 2) || c == (posicao - 2)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }


        //desenha casas livres
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }

    else if (cartaAtiva == "cartaGalo") {
        //valida movimento


        //primeira coluna
        if (primeiraColuna.includes(posicao)) {
            for (c = 25; c > 0; c--) {
                if (c == (posicao + 1) || c == (posicao - 4)) {
                    ValidaCasasGeral()
                }
            }
        }//ultima coluna
        else if (ultimaColuna.includes(posicao)) {
            for (c = 25; c > 0; c--) {
                if (c == (posicao - 1) || c == (posicao + 4)) {
                    ValidaCasasGeral()
                }
            }
        }
        //geral
        else {
            for (c = 25; c > 0; c--) {
                if (c == (posicao - 1) || c == (posicao + 1) || c == (posicao - 4) || c == (posicao + 4)) {
                    ValidaCasasGeral()
                }
            }
        }


        //desenha casas livres
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }

    else if (cartaAtiva == "cartaCoelho") {
        //valida movimento

        if (vez == 'branco') {
            //primeira coluna
            if (primeiraColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 2) || c == (posicao - 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //penultima coluna
            else if (penultimaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 4) || c == (posicao - 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (ultimaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 4) || c == (posicao + 2) || c == (posicao - 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        else {
            //primeira coluna
            if (primeiraColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao - 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //segunda coluna
            else if (segundaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 4) || c == (posicao - 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (ultimaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao - 2) || c == (posicao + 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 4) || c == (posicao - 2) || c == (posicao - 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }


        //desenha casas livres
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }

    else if (cartaAtiva == "cartaRato") {
        //valida movimento
        if (vez == 'branco') {
            //primeira coluna
            if (primeiraColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao + 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (ultimaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao - 1)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao - 1) || c == (posicao + 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        else {
            //ultima coluna
            if (ultimaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 5) || c == (posicao - 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //primeira coluna
            else if (primeiraColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 5) || c == (posicao + 1)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 5) || c == (posicao + 1) || c == (posicao - 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        //desenha casas livres
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }

    else if (cartaAtiva == "cartaJavali") {
        //valida movimento
        if (vez == 'branco') {
            //primeira coluna
            if (primeiraColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao + 1)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (ultimaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao - 1)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao - 1) || c == (posicao + 1)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        else {
            //ultima coluna
            if (ultimaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 5) || c == (posicao - 1)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //primeira coluna
            else if (primeiraColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 5) || c == (posicao + 1)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 5) || c == (posicao + 1) || c == (posicao - 1)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        //desenha casas livres
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }

    else if (cartaAtiva == "cartaTigre") {
        //valida movimento
        if (vez == 'branco') {
            for (c = 25; c > 0; c--) {
                if (c == (posicao - 5) || c == (posicao + 10)) {
                    ValidaCasasGeral()
                }
            }
        }
        else {
            for (c = 25; c > 0; c--) {
                if (c == (posicao + 5) || c == (posicao - 10)) {
                    ValidaCasasGeral()
                }
            }
        }
        //desenha casas livres
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }

    else if (cartaAtiva == "cartaGirafa") {
        //valida movimento

        if (vez == 'branco') {
            //primeira e segunda coluna
            if (primeiraColuna.includes(posicao) || segundaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 5) || c == (posicao - 3)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima e penultima coluna
            else if (penultimaColuna.includes(posicao) || ultimaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 5) || c == (posicao - 7)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 5) || c == (posicao - 3) || c == (posicao - 7)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        else {
            //primeira coluna
            if (primeiraColuna.includes(posicao) || segundaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao + 7)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima e penultima coluna
            else if (penultimaColuna.includes(posicao) || ultimaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao + 3)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao + 3) || c == (posicao + 7)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }


        //desenha casas livres
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }

    else if (cartaAtiva == "cartaMacaco") {
        //valida movimento

        if (vez == 'branco') {
            //primeira coluna
            if (primeiraColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 6) || c == (posicao - 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (ultimaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao - 6) || c == (posicao + 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 6) || c == (posicao + 4) || c == (posicao - 6) || c == (posicao - 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        else {
            //primeira coluna
            if (primeiraColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 6) || c == (posicao - 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (ultimaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao - 6) || c == (posicao + 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 6) || c == (posicao + 4) || c == (posicao - 6) || c == (posicao - 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }


        //desenha casas livres
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }

    else if (cartaAtiva == "cartaLontra") {
        //valida movimento

        if (vez == 'branco') {
            //primeira coluna
            if (primeiraColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 6) || c == (posicao + 2)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //peniltima coluna
            else if (penultimaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 6) || c == (posicao - 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (ultimaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao - 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 6) || c == (posicao + 2) || c == (posicao - 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        else {
            //primeira coluna
            if (ultimaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao - 6) || c == (posicao - 2)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //peniltima coluna
            else if (segundaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 6) || c == (posicao - 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (primeiraColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 6) || c == (posicao - 2) || c == (posicao - 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }


        //desenha casas livres
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }

    else if (cartaAtiva == "cartaLagosta") {
        //valida movimento

        if (vez == 'branco') {
            //primeira coluna
            if (primeiraColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 11) || c == (posicao - 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (ultimaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao - 6) || c == (posicao + 9)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 11) || c == (posicao + 9) || c == (posicao - 6) || c == (posicao - 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        else {
            //primeira coluna
            if (primeiraColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 6) || c == (posicao - 9)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (ultimaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao - 11) || c == (posicao + 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 6) || c == (posicao + 4) || c == (posicao - 11) || c == (posicao - 9)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }


        //desenha casas livres
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }

    else if (cartaAtiva == "cartaCobraDoMar") {
        //valida movimento

        if (vez == 'branco') {
            //ultima e penultima coluna
            if (ultimaColuna.includes(posicao) || penultimaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 4) || c == (posicao - 5)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (primeiraColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 2) || c == (posicao - 5)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 4) || c == (posicao + 2) || c == (posicao - 5)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        else {
            // coluna
            if (primeiraColuna.includes(posicao) || segundaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao - 4) || c == (posicao + 5)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //primeira coluna
            else if (ultimaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao - 2) || c == (posicao + 5)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao - 4) || c == (posicao - 2) || c == (posicao + 5)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }


        //desenha casas livres
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }

    else if (cartaAtiva == "cartaZibelina") {
        //valida movimento
        if (vez == 'branco') {
            //primeira coluna
            if (primeiraColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao - 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //segunda coluna
            else if (segundaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 4) || c == (posicao - 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (ultimaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao - 2) || c == (posicao + 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 4) || c == (posicao - 2) || c == (posicao - 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        else {
            //primeira coluna
            if (ultimaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //segunda coluna
            else if (penultimaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 4) || c == (posicao - 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (primeiraColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 2) || c == (posicao - 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 4) || c == (posicao + 2) || c == (posicao - 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }


        //desenha casas livres
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }

    else if (cartaAtiva == "cartaCentopeia") {
        //valida movimento
        if (vez == 'branco') {
            //primeira coluna
            if (primeiraColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao + 12)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (ultimaColuna.includes(posicao) || penultimaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao - 1)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao - 1) || c == (posicao + 12)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        else {
            //ultima coluna
            if (ultimaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 5) || c == (posicao - 12)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //primeira coluna
            else if (primeiraColuna.includes(posicao) || segundaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 5) || c == (posicao + 1)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 5) || c == (posicao + 1) || c == (posicao - 12)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        //desenha casas livres
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }

    else if (cartaAtiva == "cartaPanda") {
        //valida movimento
        if (vez == 'branco') {
            //primeira coluna
            if (primeiraColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao - 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (ultimaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao + 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao - 4) || c == (posicao + 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        else {
            //primeira coluna
            if (primeiraColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 5) || c == (posicao - 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (ultimaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 5) || c == (posicao + 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 5) || c == (posicao - 4) || c == (posicao + 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        //desenha casas livres
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }

    else if (cartaAtiva == "cartaUrso") {
        //valida movimento
        if (vez == 'branco') {
            //primeira coluna
            if (primeiraColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao + 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (ultimaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao - 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao - 6) || c == (posicao + 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        else {
            //primeira coluna
            if (primeiraColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 5) || c == (posicao + 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (ultimaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 5) || c == (posicao - 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 5) || c == (posicao - 6) || c == (posicao + 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        //desenha casas livres
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }

    else if (cartaAtiva == "cartaGarca") {
        //valida movimento
        if (vez == 'branco') {
            //primeira coluna
            if (primeiraColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao + 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (ultimaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao + 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao + 4) || c == (posicao + 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        else {
            //primeira coluna
            if (primeiraColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 5) || c == (posicao - 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (ultimaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 5) || c == (posicao - 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 5) || c == (posicao - 6) || c == (posicao - 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        //desenha casas livres
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }

    else if (cartaAtiva == "cartaLouvaADeus") {
        //valida movimento
        if (vez == 'branco') {
            //primeira coluna
            if (primeiraColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 5) || c == (posicao - 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (ultimaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 5) || c == (posicao - 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 5) || c == (posicao - 4) || c == (posicao - 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        else {
            //primeira coluna
            if (primeiraColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao + 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (ultimaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao + 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao + 6) || c == (posicao + 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        //desenha casas livres
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }

    else if (cartaAtiva == "cartaCavaloDeFogo") {
        //valida movimento
        if (vez == 'branco') {
            //primeira coluna
            if (primeiraColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 10) || c == (posicao - 9)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (ultimaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 10) || c == (posicao - 11)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 10) || c == (posicao - 9) || c == (posicao - 11)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        else {
            //primeira coluna
            if (primeiraColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 10) || c == (posicao + 11)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (ultimaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 10) || c == (posicao + 9)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 10) || c == (posicao + 11) || c == (posicao + 9)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        //desenha casas livres
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }

    else if (cartaAtiva == "cartaCobra") {
        //valida movimento
        if (vez == 'branco') {
            //primeira coluna
            if (primeiraColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 4) || c == (posicao + 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (ultimaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 1)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 1) || c == (posicao - 4) || c == (posicao + 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        else {
            //primeira coluna
            if (ultimaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 4) || c == (posicao - 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (primeiraColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 1)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 1) || c == (posicao + 4) || c == (posicao - 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        //desenha casas livres
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }

    else if (cartaAtiva == "cartaEnguia") {
        //valida movimento
        if (vez == 'branco') {
            //primeira coluna
            if (ultimaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 4) || c == (posicao - 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (primeiraColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 1)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 1) || c == (posicao + 4) || c == (posicao - 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        else {
            //primeira coluna
            if (primeiraColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 4) || c == (posicao + 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (ultimaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 1)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 1) || c == (posicao - 4) || c == (posicao + 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        //desenha casas livres
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }

    else if (cartaAtiva == "cartaFenix") {
        //valida movimento
        if (vez == 'preto') {
            //primeira coluna
            if (primeiraColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 6) || c == (posicao + 2)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //segunda coluna
            else if (segundaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 6) || c == (posicao + 2) || c == (posicao + 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //penultima coluna
            else if (penultimaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 6) || c == (posicao - 2) || c == (posicao + 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (ultimaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao - 2) || c == (posicao + 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 6) || c == (posicao + 2) || c == (posicao - 2) || c == (posicao + 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        else {
            //ultima coluna
            if (ultimaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao - 6) || c == (posicao - 2)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //penultima coluna
            else if (penultimaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao - 6) || c == (posicao - 2) || c == (posicao - 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //segunda coluna
            else if (segundaColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao - 6) || c == (posicao + 2) || c == (posicao - 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //primeira coluna
            else if (primeiraColuna.includes(posicao)) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 2) || c == (posicao - 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao - 6) || c == (posicao + 2) || c == (posicao - 2) || c == (posicao - 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }


        //desenha casas livres
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }

    else if (cartaAtiva == "cartaRaposa") {
        //valida movimento

        if (vez == 'preto') {
            //primeira coluna
            if (primeiraColuna.includes(posicao)) {
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 6) || c == (posicao - 1) || c == (posicao + 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        else {
            //ultima coluna
            if (ultimaColuna.includes(posicao)) {
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 6) || c == (posicao + 1) || c == (posicao - 4)) {
                        ValidaCasasGeral()
                    }
                }
            }

        }

        //desenha casas livres
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }

    else if (cartaAtiva == "cartaCamundongo") {
        //valida movimento
        if (vez == 'branco') {
            //primeira coluna
            if (primeiraColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao + 1)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (ultimaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao + 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao + 1) || c == (posicao + 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        else {
            //ultima coluna
            if (ultimaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 5) || c == (posicao - 1)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //primeira coluna
            else if (primeiraColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 5) || c == (posicao - 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 5) || c == (posicao - 1) || c == (posicao - 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        //desenha casas livres
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }

    else if (cartaAtiva == "cartaBufalo") {
        //valida movimento
        if (vez == 'branco') {
            //primeira coluna
            if (primeiraColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 6) || c == (posicao + 1)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (ultimaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 1) || c == (posicao + 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 1) || c == (posicao + 1) || c == (posicao + 4) || c == (posicao + 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        else {
            //ultima coluna
            if (ultimaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 6) || c == (posicao - 1)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //primeira coluna
            else if (primeiraColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 1) || c == (posicao - 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 1) || c == (posicao - 1) || c == (posicao - 4) || c == (posicao - 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        //desenha casas livres
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }

    else if (cartaAtiva == "cartaElefante") {
        //valida movimento
        if (vez == 'preto') {
            //primeira coluna
            if (primeiraColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 6) || c == (posicao + 1)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (ultimaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 1) || c == (posicao + 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 1) || c == (posicao + 1) || c == (posicao + 4) || c == (posicao + 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        else {
            //ultima coluna
            if (ultimaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 6) || c == (posicao - 1)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //primeira coluna
            else if (primeiraColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 1) || c == (posicao - 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 1) || c == (posicao - 1) || c == (posicao - 4) || c == (posicao - 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        //desenha casas livres
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }

    else if (cartaAtiva == "cartaGato") {
        //valida movimento
        if (vez == 'branco') {
            //primeira e segunda coluna
            if (primeiraColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao + 2) || c == (posicao + 10)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (ultimaColuna.includes(posicao) || penultimaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao - 1) || c == (posicao + 10)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao + 2) || c == (posicao - 1) || c == (posicao + 10)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        else {
            //primeira e segunda coluna
            if (ultimaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 5) || c == (posicao - 2) || c == (posicao - 10)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (primeiraColuna.includes(posicao) || segundaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 5) || c == (posicao + 1) || c == (posicao - 10)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 5) || c == (posicao - 2) || c == (posicao + 1) || c == (posicao - 10)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        //desenha casas livres
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }

    else if (cartaAtiva == "cartaAbelha") {
        //valida movimento
        if (vez == 'branco') {
            //primeira coluna
            if (ultimaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao + 8)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (primeiraColuna.includes(posicao) || segundaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao + 1)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 5) || c == (posicao + 1) || c == (posicao + 8)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        else {
            //primeira coluna
            if (primeiraColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 5) || c == (posicao - 8)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (ultimaColuna.includes(posicao) || penultimaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 5) || c == (posicao - 1)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 5) || c == (posicao - 1) || c == (posicao - 8)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        //desenha casas livres
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }

    else if (cartaAtiva == "cartaAranha") {
        //valida movimento
        if (vez == 'preto') {
            if (nomeBusca.includes("peao")) {
                if (ultimaColuna.includes(posicao)) {
                    for (c = 64; c > 0; c--) {
                        if (c == (posicao + 4)) {
                            ValidaCasasGeral()
                        }
                    }
                }
                else if (primeiraColuna.includes(posicao)) {
                    for (c = 64; c > 0; c--) {
                        if (c == (posicao + 6)) {
                            ValidaCasasGeral()
                        }
                    }
                }
                //geral
                else {
                    for (c = 64; c > 0; c--) {
                        if (c == (posicao + 6) || c == (posicao + 4)) {
                            ValidaCasasGeral()
                        }
                    }
                }
            }
            else {

                //primeira coluna
                if (primeiraColuna.includes(posicao) || segundaColuna.includes(posicao)) {
                    for (c = 64; c > 0; c--) {
                        if (c == (posicao + 2)) {
                            ValidaCasasGeral()
                        }
                    }
                }
                //penultima coluna
                else if (penultimaColuna.includes(posicao) || ultimaColuna.includes(posicao)) {
                    for (c = 64; c > 0; c--) {
                        if (c == (posicao - 2)) {
                            ValidaCasasGeral()
                        }
                    }
                }
                //geral
                else {
                    for (c = 64; c > 0; c--) {
                        if (c == (posicao + 2) || c == (posicao - 2)) {
                            ValidaCasasGeral()
                        }
                    }
                }


            }
        }
        else {
            if (nomeBusca.includes("peao")) {
                if (primeiraColuna.includes(posicao)) {
                    for (c = 64; c > 0; c--) {
                        if (c == (posicao - 4)) {
                            ValidaCasasGeral()
                        }
                    }
                }
                else if (ultimaColuna.includes(posicao)) {
                    for (c = 64; c > 0; c--) {
                        if (c == (posicao - 6)) {
                            ValidaCasasGeral()
                        }
                    }
                }
                //geral
                else {
                    for (c = 64; c > 0; c--) {
                        if (c == (posicao - 6) || c == (posicao - 4)) {
                            ValidaCasasGeral()
                        }
                    }
                }
            }
            else {

                //primeira coluna
                if (primeiraColuna.includes(posicao) || segundaColuna.includes(posicao)) {
                    for (c = 64; c > 0; c--) {
                        if (c == (posicao + 2)) {
                            ValidaCasasGeral()
                        }
                    }
                }
                //penultima coluna
                else if (penultimaColuna.includes(posicao) || ultimaColuna.includes(posicao)) {
                    for (c = 64; c > 0; c--) {
                        if (c == (posicao - 2)) {
                            ValidaCasasGeral()
                        }
                    }
                }
                //geral
                else {
                    for (c = 64; c > 0; c--) {
                        if (c == (posicao + 2) || c == (posicao - 2)) {
                            ValidaCasasGeral()
                        }
                    }
                }


            }
        }


        //desenha casas livres
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }

    else if (cartaAtiva == "cartaCervo") {
        //valida movimento
        if (vez == 'preto') {
            if (nomeBusca.includes("peao")) {
                if (ultimaColuna.includes(posicao) || penultimaColuna.includes(posicao)) {
                    for (c = 64; c > 0; c--) {
                        if (c == (posicao + 3)) {
                            ValidaCasasGeral()
                        }
                    }
                }
                else if (primeiraColuna.includes(posicao) || segundaColuna.includes(posicao)) {
                    for (c = 64; c > 0; c--) {
                        if (c == (posicao + 7)) {
                            ValidaCasasGeral()
                        }
                    }
                }
                //geral
                else {
                    for (c = 64; c > 0; c--) {
                        if (c == (posicao + 7) || c == (posicao + 3)) {
                            ValidaCasasGeral()
                        }
                    }
                }
            }
            else {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 5)) {
                        ValidaCasasGeral()
                    }
                }



            }
        }
        else {

            if (nomeBusca.includes("peao")) {
                if (primeiraColuna.includes(posicao) || segundaColuna.includes(posicao)) {
                    for (c = 64; c > 0; c--) {
                        if (c == (posicao - 3)) {
                            ValidaCasasGeral()
                        }
                    }
                }
                else if (ultimaColuna.includes(posicao) || penultimaColuna.includes(posicao)) {
                    for (c = 64; c > 0; c--) {
                        if (c == (posicao - 7)) {
                            ValidaCasasGeral()
                        }
                    }
                }
                //geral
                else {
                    for (c = 64; c > 0; c--) {
                        if (c == (posicao - 7) || c == (posicao - 3)) {
                            ValidaCasasGeral()
                        }
                    }
                }
            }
            else {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao - 5)) {
                        ValidaCasasGeral()
                    }
                }



            }


        }


        //desenha casas livres
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }

    else if (cartaAtiva == "cartaEscorpiao") {
        //valida movimento
        if (vez == 'preto') {
            if (nomeBusca.includes("peao")) {
                //primeira coluna
                if (primeiraColuna.includes(posicao) || segundaColuna.includes(posicao)) {
                    for (c = 64; c > 0; c--) {
                        if (c == (posicao + 2)) {
                            ValidaCasasGeral()
                        }
                    }
                }
                //penultima coluna
                else if (penultimaColuna.includes(posicao) || ultimaColuna.includes(posicao)) {
                    for (c = 64; c > 0; c--) {
                        if (c == (posicao - 2)) {
                            ValidaCasasGeral()
                        }
                    }
                }
                //geral
                else {
                    for (c = 64; c > 0; c--) {
                        if (c == (posicao + 2) || c == (posicao - 2)) {
                            ValidaCasasGeral()
                        }
                    }
                }
            }
            else {
                //primeira coluna
                if (primeiraColuna.includes(posicao)) {
                    for (c = 64; c > 0; c--) {
                        if (c == (posicao + 11)) {
                            ValidaCasasGeral()
                        }
                    }
                }
                //penultima coluna
                else if (ultimaColuna.includes(posicao)) {
                    for (c = 64; c > 0; c--) {
                        if (c == (posicao + 9)) {
                            ValidaCasasGeral()
                        }
                    }
                }
                //geral
                else {
                    for (c = 64; c > 0; c--) {
                        if (c == (posicao + 11) || c == (posicao + 9)) {
                            ValidaCasasGeral()
                        }
                    }
                }


            }
        }
        else {



            if (nomeBusca.includes("peao")) {
                //primeira coluna
                if (primeiraColuna.includes(posicao) || segundaColuna.includes(posicao)) {
                    for (c = 64; c > 0; c--) {
                        if (c == (posicao + 2)) {
                            ValidaCasasGeral()
                        }
                    }
                }
                //penultima coluna
                else if (penultimaColuna.includes(posicao) || ultimaColuna.includes(posicao)) {
                    for (c = 64; c > 0; c--) {
                        if (c == (posicao - 2)) {
                            ValidaCasasGeral()
                        }
                    }
                }
                //geral
                else {
                    for (c = 64; c > 0; c--) {
                        if (c == (posicao + 2) || c == (posicao - 2)) {
                            ValidaCasasGeral()
                        }
                    }
                }
            }
            else {
                //primeira coluna
                if (ultimaColuna.includes(posicao)) {
                    for (c = 64; c > 0; c--) {
                        if (c == (posicao - 11)) {
                            ValidaCasasGeral()
                        }
                    }
                }
                //penultima coluna
                else if (primeiraColuna.includes(posicao)) {
                    for (c = 64; c > 0; c--) {
                        if (c == (posicao - 9)) {
                            ValidaCasasGeral()
                        }
                    }
                }
                //geral
                else {
                    for (c = 64; c > 0; c--) {
                        if (c == (posicao - 11) || c == (posicao - 9)) {
                            ValidaCasasGeral()
                        }
                    }
                }
            }

        }



        //desenha casas livres
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }

    else if (cartaAtiva == "cartaHipopotamo") {
        //valida movimento
        if (vez == 'preto') {
            if (nomeBusca.includes("peao")) {
                for (c = 64; c > 0; c--) {
                    if (c == (posicao + 5)) {
                        ValidaCasasGeral()
                    }
                }
            }
            else {
                if (ultimaColuna.includes(posicao) || penultimaColuna.includes(posicao)) {
                    for (c = 64; c > 0; c--) {
                        if (c == (posicao + 8)) {
                            ValidaCasasGeral()
                        }
                    }
                }
                else if (primeiraColuna.includes(posicao) || segundaColuna.includes(posicao)) {
                    for (c = 64; c > 0; c--) {
                        if (c == (posicao + 12)) {
                            ValidaCasasGeral()
                        }
                    }
                }
                //geral
                else {
                    for (c = 64; c > 0; c--) {
                        if (c == (posicao + 12) || c == (posicao + 8)) {
                            ValidaCasasGeral()
                        }
                    }
                }


            }
        }
        else {

            if (nomeBusca.includes("peao")) {



                for (c = 64; c > 0; c--) {
                    if (c == (posicao - 5)) {
                        ValidaCasasGeral()
                    }
                }


            }
            else {

                if (primeiraColuna.includes(posicao) || segundaColuna.includes(posicao)) {
                    for (c = 64; c > 0; c--) {
                        if (c == (posicao - 8)) {
                            ValidaCasasGeral()
                        }
                    }
                }
                else if (ultimaColuna.includes(posicao) || penultimaColuna.includes(posicao)) {
                    for (c = 64; c > 0; c--) {
                        if (c == (posicao - 12)) {
                            ValidaCasasGeral()
                        }
                    }
                }
                //geral
                else {
                    for (c = 64; c > 0; c--) {
                        if (c == (posicao - 12) || c == (posicao - 8)) {
                            ValidaCasasGeral()
                        }
                    }
                }




            }


        }


        //desenha casas livres
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }
    else if (cartaAtiva == "cartaTrex") {
        //valida movimento
        if (vez == 'branco') {
            //primeira coluna
            if (primeiraColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 10) || c == (posicao - 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (ultimaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 10) || c == (posicao + 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 4) || c == (posicao - 10) || c == (posicao - 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        else {
            //primeira coluna
            if (primeiraColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 10) || c == (posicao - 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (ultimaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 10) || c == (posicao + 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 4) || c == (posicao + 10) || c == (posicao - 4)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        //desenha casas livres
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }
    else if (cartaAtiva == "cartaLobo") {
        //valida movimento
        if (vez == 'branco') {
            //primeira coluna
            if (primeiraColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 10) || c == (posicao + 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (ultimaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao - 10) || c == (posicao - 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 6) || c == (posicao - 10) || c == (posicao - 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        else {
            //primeira coluna
            if (primeiraColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 10) || c == (posicao + 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //ultima coluna
            else if (ultimaColuna.includes(posicao)) {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 10) || c == (posicao - 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
            //geral
            else {
                for (c = 25; c > 0; c--) {
                    if (c == (posicao + 6) || c == (posicao + 10) || c == (posicao - 6)) {
                        ValidaCasasGeral()
                    }
                }
            }
        }
        //desenha casas livres
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }




    for (c in casasInimigasNoCaminho) {

        for (item in PecasJogando) {

            if (casasInimigasNoCaminho[0] == PecasJogando[item].posicao) {
                if (PecasJogando[item].nome.includes('Rei')) {
                    xequeDe = nome;
                    xeque = true

                    xequeEm = PecasJogando[item].nome;

                }

            }
        }


    }

};

function CapturaPeca(ataque, defesa) {
    for (const property in PecasJogando) {
        if (PecasJogando[property].posicao == defesa) {
            pecaCapturada = PecasJogando[property];
        }
        else if (PecasJogando[property].posicao == ataque) {
            pecaCapturante = PecasJogando[property];
        }
    }
    const index = PecasJogando.indexOf(pecaCapturada);
    PecasJogando.splice(index, 1);
    const index2 = PecasJogando.indexOf(pecaCapturante);
    nomeAtacante = document.getElementById(ataque).children[0].id;
    pecaCapturante.MovePeca(defesa);
}

function DesenhaTipo(nome) {
    nomeMin = nome.toLowerCase();
    if (nomeMin.includes('cavalopreto')) { RecortaImagem(`${nome}`, 1008, 1051, 75, 93) }
    else if (nomeMin.includes('peaopreto')) { RecortaImagem(`${nome}`, 1210, 1058, 70, 85) }
    else if (nomeMin.includes('peaobranco')) { RecortaImagem(`${nome}`, 1209, 864, 68, 84) }
    else if (nomeMin.includes('cavalobranco')) { RecortaImagem(`${nome}`, 1008, 855, 74, 93) }
    else if (nomeMin.includes('bispobranco')) { RecortaImagem(`${nome}`, 808, 855, 83, 104) }
    else if (nomeMin.includes('bispopreto')) { RecortaImagem(`${nome}`, 808, 1049, 82, 107) }
    else if (nomeMin.includes('torrepreto')) { RecortaImagem(`${nome}`, 619, 1051, 67, 93) }
    else if (nomeMin.includes('torrebranco')) { RecortaImagem(`${nome}`, 618, 855, 68, 93) }
    else if (nomeMin.includes('rainhapreto')) { RecortaImagem(`${nome}`, 413, 1050, 82, 95) }
    else if (nomeMin.includes('rainhabranco')) { RecortaImagem(`${nome}`, 413, 855, 82, 95) }
    else if (nomeMin.includes('reipreto')) { RecortaImagem(`${nome}`, 214, 1051, 86, 94) }
    else if (nomeMin.includes('reibranco')) { RecortaImagem(`${nome}`, 214, 855, 86, 94) }
}

function RecortaImagem(id, inicioX, incioY, largura, altura) {
    const canvas = document.getElementById(id);
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = "links/img/novasPecas.png";
    img.onload = function () {
        sx = inicioX  //(eixo x da imagem de origem) - Este parâmetro diz de onde você deseja recortar ou começar a recortar a imagem a partir do eixo x.
        sy = incioY//eixo y da imagem de origem) - Este parâmetro diz de onde você deseja recortar ou começar a recortar a imagem a partir do eixo y.
        sWidth = largura//- A largura da imagem a partir de sx.
        sHeight = altura//- A altura da imagem a partir de sy.
        dWidth = 65//- Comprimento das imagens que devem ser apresentadas no ecrã.
        dHeight = 85//- A altura das imagens que devem ser apresentadas no ecrã.
        ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, dWidth, dHeight);
    };
}




setTimeout(() => {



}, "1000");

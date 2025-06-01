window.addEventListener("load", function (event) {
    desenhaTelaInicial()


});


function desenhaTelaInicial() {


    document.body.style = 'background: var(--fundoTelaInicial)';

}


var PecasJogando = [];
var PecasReservas = [];
var jogada = 1;
var roqueTorreBranco1 = true;
var roqueTorreBranco2 = true;
var roqueReiBranco = true;
var roqueTorrePreto1 = true;
var roqueTorrePreto2 = true;
var roqueReiPreto = true;
var validaCaminho = 0;
var caminhoInimigo = [];
var xeque = false;
var aleatorio = ''



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
        if (!this.nome.includes('Rei')) { Transformar(this.posicao, destino, this.nome) }
        else {
            this.DesenhaPeca();
            DesenhaPecasJogando();
            jogada++;
            giraTabuleiro();

        }
    }
}


function iniciaJogo() {


    document.getElementById('jogoCompleto').style = 'display:flex;'
    document.getElementById('telaInicial').style = 'display:none;'

    document.body.style = 'background: var(--fundoTabuleiro)';

    DesenhaTabuleiro();
    DesenhaPecasIniciais();
    carregaCartas();
    carregaSom()


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
        document.body.style = 'background: var(--fundoTabuleiroVirado)';




    }
    else {
        document.getElementById('tabuleiroCompleto').style = `
        animation: voltando 0.3s 1;
        transform: rotate(360deg);
    `
        document.body.style = 'background: var(--fundoTabuleiro)';

    }
    //piscaPecas()


}




function DesenhaTabuleiro() {
    var tabuleiro = '';
    var casa = 0;
    for (linhas = 0; linhas < 8; linhas++) {
        tabuleiro += `<tr>`;
        if (linhas % 2 != 0) {
            for (colunas = 0; colunas < 8; colunas++) {
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
            for (colunas = 0; colunas < 8; colunas++) {
                casa++;
                if (colunas % 2 == 0) {
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
    //Peças Brancas
    PecasJogando.push(PeaoBranco01 = new Peca('PeaoBranco01', 49));
    PecasJogando.push(PeaoBranco02 = new Peca('PeaoBranco02', 50));
    PecasJogando.push(PeaoBranco03 = new Peca('PeaoBranco03', 51));
    PecasJogando.push(PeaoBranco04 = new Peca('PeaoBranco04', 52));
    PecasJogando.push(PeaoBranco05 = new Peca('PeaoBranco05', 53));
    PecasJogando.push(PeaoBranco06 = new Peca('PeaoBranco06', 54));
    PecasJogando.push(PeaoBranco07 = new Peca('PeaoBranco07', 55));
    PecasJogando.push(PeaoBranco08 = new Peca('PeaoBranco08', 56));
    PecasJogando.push(PeaoBranco09 = new Peca('PeaoBranco09', 57));
    PecasJogando.push(PeaoBranco10 = new Peca('PeaoBranco10', 58));
    PecasJogando.push(PeaoBranco11 = new Peca('PeaoBranco11', 59));
    PecasJogando.push(PeaoBranco12 = new Peca('PeaoBranco12', 60));
    PecasJogando.push(PeaoBranco13 = new Peca('PeaoBranco13', 62));
    PecasJogando.push(PeaoBranco14 = new Peca('PeaoBranco14', 63));
    PecasJogando.push(PeaoBranco15 = new Peca('PeaoBranco15', 64));
    PecasJogando.push(ReiBranco1 = new Peca('ReiBranco1', 61));
    //Peças Pretas
    PecasJogando.push(PeaoPreto01 = new Peca('PeaoPreto01', 9));
    PecasJogando.push(PeaoPreto02 = new Peca('PeaoPreto02', 10));
    PecasJogando.push(PeaoPreto03 = new Peca('PeaoPreto03', 11));
    PecasJogando.push(PeaoPreto04 = new Peca('PeaoPreto04', 12));
    PecasJogando.push(PeaoPreto05 = new Peca('PeaoPreto05', 13));
    PecasJogando.push(PeaoPreto06 = new Peca('PeaoPreto06', 14));
    PecasJogando.push(PeaoPreto07 = new Peca('PeaoPreto07', 15));
    PecasJogando.push(PeaoPreto08 = new Peca('PeaoPreto08', 8));
    PecasJogando.push(PeaoPreto09 = new Peca('PeaoPreto09', 16));
    PecasJogando.push(PeaoPreto10 = new Peca('PeaoPreto10', 1));
    PecasJogando.push(PeaoPreto11 = new Peca('PeaoPreto11', 2));
    PecasJogando.push(PeaoPreto12 = new Peca('PeaoPreto12', 3));
    PecasJogando.push(PeaoPreto13 = new Peca('PeaoPreto13', 4));
    PecasJogando.push(PeaoPreto14 = new Peca('PeaoPreto14', 6));
    PecasJogando.push(PeaoPreto15 = new Peca('PeaoPreto15', 7));
    PecasJogando.push(ReiPreto1 = new Peca('ReiPreto1', 5));
    //Peças Reserva
    PecasReservas.push('Torre01')
    PecasReservas.push('Torre02')
    PecasReservas.push('Torre03')
    PecasReservas.push('Torre04')
    PecasReservas.push('Bispo01')
    PecasReservas.push('Bispo02')
    PecasReservas.push('Bispo03')
    PecasReservas.push('Bispo04')
    PecasReservas.push('Cavalo01')
    PecasReservas.push('Cavalo02')
    PecasReservas.push('Cavalo03')
    PecasReservas.push('Cavalo04')
    PecasReservas.push('Rainha01')
    PecasReservas.push('Rainha02')
    PecasReservas.push('Peao01')
    PecasReservas.push('Peao02')
};

function DesenhaPecasJogando() {
    DesenhaTabuleiro();
    for (const property in PecasJogando) {
        PecasJogando[property].DesenhaPeca();
    }
    if (xeque) {
        Xeque();
    };
    giraPecas();

    CalculaProbabilidade();
};

function CalculaProbabilidade() {

    //console.log(PecasReservas.length)
    let torre = 0;
    let cavalo = 0;
    let peao = 0;
    let bispo = 0;
    let rainha = 0;

    for (item in PecasReservas) {

        if (PecasReservas[item].includes('Torre')) {
            torre++
        }
        else if (PecasReservas[item].includes('Cavalo')) {
            cavalo++
        }
        else if (PecasReservas[item].includes('Peao')) {
            peao++
        }
        else if (PecasReservas[item].includes('Bispo')) {
            bispo++
        }
        else if (PecasReservas[item].includes('Rainha')) {
            rainha++
        }

    }
    total = PecasReservas.length;
    peao = peao * 100 / total;
    torre = torre * 100 / total;
    cavalo = cavalo * 100 / total;
    bispo = bispo * 100 / total;
    rainha = rainha * 100 / total;

    resultado = `
<p>Peão     -> ${peao.toFixed(1)} %</p>
<p>Cavalo   -> ${cavalo.toFixed(1)} %</p>
<p>Bispo    -> ${bispo.toFixed(1)} %</p>
<p>Torre    -> ${torre.toFixed(1)} %</p>
<p>Rainha   -> ${rainha.toFixed(1)} %</p>
`
    //document.getElementById('indicadores').innerHTML = resultado;



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
            //console.log(c);
            parar = true;
            return parar;
        }
        casasLivres.push(`${c} `);
    }

    function ValidaCaminhoPeao() {
        if (casasAmigas.indexOf(c) >= 0) {
            if (posicao != c) {
                parar = true;
                return parar;
            }
        }
        else if (casasInimigas.indexOf(c) >= 0) {
            parar = true;
            return parar;
        }
        casasLivres.push(`${c} `);
    }

    function ValidaCapturaPeao() {
        if (casasInimigas.indexOf(c) >= 0) {
            casasInimigasNoCaminho.push(`${c} `);
        }
        else {
            casasAmeacadas.push(`${c} `)
        }
    }

    function ValidaRotasInimigas() {
        for (c = 65; c >= 0; c--) {
            if (casasLivres.includes(`${c} `) && c != posicao) {
                caminhoInimigo.push(c);
            }
            else if (casasAmeacadas.includes(`${c} `) && c != posicao) {
                caminhoInimigo.push(c);
            }
        }
    }

    function DesenhaCasasPossiveis() { //desenha casas livres
        for (c = 64; c > 0; c--) {
            if (casasLivres.includes(`${c} `)) {
                document.getElementById(c).innerHTML = `<input type = "button"  onclick = "${nome}.MovePeca(${c})" class="caminho" />`;
            }
            else if (casasInimigasNoCaminho.includes(`${c} `)) {
                imgCapturada = '';
                for (const property in PecasJogando) {
                    if (PecasJogando[property].posicao == c) { imgCapturada = PecasJogando[property].tipoPeca }
                };
                document.getElementById(c).innerHTML = `<canvas class="pecaInimiga" onclick="CapturaPeca(${posicao},${c})" id="${document.getElementById(c).children[0].id}" value = "${document.getElementById(c).children[0].value}" width="65" height="85"></canvas> `;
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

    function DesenhaCasasPossiveisPeao() {
        for (c = 64; c > 0; c--) {
            if (casasLivres.includes(`${c} `)) {
                if (c <= 8 || c >= 57) {
                    document.getElementById(c).innerHTML = `<input type = "button"  onclick = "PromocaoPeao(${posicao}, ${c});" class="caminho" /> `;
                }
                else {
                    document.getElementById(c).innerHTML = `<input type = "button"  onclick = "${nome}.MovePeca(${c})" class="caminho" /> `;
                }
            }
            else if (casasInimigasNoCaminho.includes(`${c} `)) {
                imgCapturada = '';
                for (const property in PecasJogando) {
                    if (PecasJogando[property].posicao == c) { imgCapturada = PecasJogando[property].tipoPeca }
                };
                if (c <= 8 || c >= 57) {
                    document.getElementById(c).innerHTML = `<canvas class="pecaInimiga" onclick="CapturaPeca(${posicao},${c})" id="${document.getElementById(c).children[0].id}" value = "${document.getElementById(c).children[0].value}" width="65" height="85"></canvas> `;
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
                else {
                    document.getElementById(c).innerHTML = `<canvas class="pecaInimiga" onclick="CapturaPeca(${posicao},${c})" id="${document.getElementById(c).children[0].id}" value = "${document.getElementById(c).children[0].value}" width="65" height="85"></canvas> `;
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

    }

    if (nomeBusca.includes("peaobranco") && !xeque) {
        //valida movimento
        parar = false;
        for (c = posicao; c > 0; c--) {
            if (c >= 32) {
                if (c == (posicao - 8) || c == (posicao - 16)) {
                    ValidaCaminhoPeao()
                    if (parar) { break }
                }
            }
            else {
                if (c == (posicao - 8)) {
                    ValidaCaminhoPeao()
                    if (parar) { break }
                }
            }
        }
        parar = false;
        //valida captura
        for (c = posicao; c > 0; c--) {
            //primeira coluna
            if (posicao == 1 || posicao == 9 || posicao == 17 || posicao == 25 || posicao == 33 || posicao == 41 || posicao == 49 || posicao == 57) {
                if (c == (posicao - 7)) {
                    ValidaCapturaPeao()
                }
            }
            //ultima coluna
            else if (posicao == 8 || posicao == 16 || posicao == 24 || posicao == 32 || posicao == 40 || posicao == 48 || posicao == 56 || posicao == 64) {
                if (c == (posicao - 9)) {
                    ValidaCapturaPeao()
                }
            }
            //geral
            else {
                if (c == (posicao - 7) || c == (posicao - 9)) {
                    ValidaCapturaPeao()
                }
            }
        }
        //desenha casas livres
        if (vez == meuTime) {
            DesenhaCasasPossiveisPeao()
        }
        else {
            for (c = 65; c >= 0; c--) {
                if (casasAmeacadas.includes(`${c} `) && c != posicao) {
                    caminhoInimigo.push(c);
                }
            }
        }
    }

    if (nomeBusca.includes("peaopreto")) {
        //valida movimento
        parar = false;
        for (c = posicao; c <= 64; c++) {
            if (c <= 32) {
                if (c == (posicao + 8) || c == (posicao + 16)) {
                    ValidaCaminhoPeao()
                    if (parar) { break }
                }
            }
            else {
                if (c == (posicao + 8)) {
                    ValidaCaminhoPeao()
                    if (parar) { break }
                }
            }
        }
        //valida captura
        for (c = posicao; c <= 64; c++) {
            //primeira coluna
            if (posicao == 1 || posicao == 9 || posicao == 17 || posicao == 25 || posicao == 33 || posicao == 41 || posicao == 49 || posicao == 57) {
                if (c == (posicao + 9)) {
                    ValidaCapturaPeao()
                }
            }
            //ultima coluna
            else if (posicao == 8 || posicao == 16 || posicao == 24 || posicao == 32 || posicao == 40 || posicao == 48 || posicao == 56 || posicao == 64) {
                if (c == (posicao + 7)) {
                    ValidaCapturaPeao()
                }
            }
            //geral
            else {
                if (c == (posicao + 7) || c == (posicao + 9)) {
                    ValidaCapturaPeao()
                }
            }
        }
        //desenha casas livres
        if (vez == meuTime) {
            DesenhaCasasPossiveisPeao()
        }
        else {
            for (c = 65; c >= 0; c--) {
                if (casasAmeacadas.includes(`${c} `) && c != posicao) {
                    caminhoInimigo.push(c);
                }
            }
        }
    }

    if (nomeBusca.includes("rei")) {
        if (vez == meuTime) {
            function ValidaCasasRei() {
                if (caminhoInimigo.indexOf(c) >= 0) {
                }
                else if (casasInimigas.indexOf(c) >= 0) {
                    casasInimigasNoCaminho.push(`${c} `);
                }
                else if (casasAmigas.indexOf(c) < 0) {
                    casasLivres.push(`${c} `);
                }
            }
            ValidaCaminhosInimigos(meuTime);
            var casasLivres = [];
            var casasInimigas = [];
            var casasInimigasNoCaminho = [];
            var casasAmigas = [];
            for (const property in PecasJogando) {
                casaInimiga = `${PecasJogando[property].nome} `;
                casaInimiga = casaInimiga.toLowerCase();
                if (!casaInimiga.includes(meuTime)) { casasInimigas.push(PecasJogando[property].posicao) }
                else { casasAmigas.push(PecasJogando[property].posicao) }
            };
            //valida movimento
            for (c = 64; c > 0; c--) {
                //primeira coluna
                if (posicao == 1 || posicao == 9 || posicao == 17 || posicao == 25 || posicao == 33 || posicao == 41 || posicao == 49 || posicao == 57) {
                    if (c == (posicao - 8) || c == (posicao - 7)) {
                        ValidaCasasRei()
                    }
                    else if (c == (posicao + 8) || c == (posicao + 1) || c == (posicao + 9)) {
                        ValidaCasasRei()
                    }
                }
                //ultima coluna
                else if (posicao == 8 || posicao == 16 || posicao == 24 || posicao == 32 || posicao == 40 || posicao == 48 || posicao == 56 || posicao == 64) {
                    if (c == (posicao - 8) || c == (posicao - 1) || c == (posicao - 9)) {
                        ValidaCasasRei()
                    }
                    else if (c == (posicao + 8) || c == (posicao + 7)) {
                        ValidaCasasRei()
                    }
                }
                //geral
                else {
                    if (c == (posicao - 8) || c == (posicao - 1) || c == (posicao - 9) || c == (posicao - 7)) {
                        ValidaCasasRei()
                    }
                    else if (c == (posicao + 8) || c == (posicao + 1) || c == (posicao + 9) || c == (posicao + 7)) {
                        ValidaCasasRei()
                    }
                }
            }

            //desenha casas livres
            DesenhaCasasPossiveis();
        }
        else {
            function ValidaCasasReiInimigo() {
                if (casasInimigas.indexOf(c) >= 0) {
                    casasInimigasNoCaminho.push(`${c} `);
                }
                else if (casasAmigas.indexOf(c) < 0) {
                    casasLivres.push(`${c} `);
                }
            }
            for (c = 64; c > 0; c--) {
                //primeira coluna
                if (posicao == 1 || posicao == 9 || posicao == 17 || posicao == 25 || posicao == 33 || posicao == 41 || posicao == 49 || posicao == 57) {
                    if (c == (posicao - 8) || c == (posicao - 7)) {
                        ValidaCasasReiInimigo()
                    }
                    else if (c == (posicao + 8) || c == (posicao + 1) || c == (posicao + 9)) {
                        ValidaCasasReiInimigo()
                    }
                }
                //ultima coluna
                else if (posicao == 8 || posicao == 16 || posicao == 24 || posicao == 32 || posicao == 40 || posicao == 48 || posicao == 56 || posicao == 64) {
                    if (c == (posicao - 8) || c == (posicao - 1) || c == (posicao - 9)) {
                        ValidaCasasReiInimigo()
                    }
                    else if (c == (posicao + 8) || c == (posicao + 7)) {
                        ValidaCasasReiInimigo()
                    }
                }
                //geral
                else {
                    if (c == (posicao - 8) || c == (posicao - 1) || c == (posicao - 9) || c == (posicao - 7)) {
                        ValidaCasasReiInimigo()
                    }
                    else if (c == (posicao + 8) || c == (posicao + 1) || c == (posicao + 9) || c == (posicao + 7)) {
                        ValidaCasasReiInimigo()
                    }
                }
            }

            for (c = 65; c >= 0; c--) {
                if (casasLivres.includes(`${c} `) && c != posicao) {
                    caminhoInimigo.push(c);
                }
            }

        }
    }

    if (nomeBusca.includes("bispo")) {
        var corCasa = document.getElementById(posicao).className;
        //diagonal superior direita
        parar = false;
        for (c = posicao; c > 0; c = c - 7) {
            if (posicao == 64) { break }
            var corCaminho = document.getElementById(c).className;
            if (corCaminho == corCasa && posicao != c) {
                ValidaCasasGeral()
                if (parar) { break }
            }
        }
        //diagonal superior esquerda
        parar = false;
        for (c = posicao; c > 0; c = c - 9) {
            var corCaminho = document.getElementById(c).className;
            if (corCaminho == corCasa && posicao != c) {
                ValidaCasasGeral()
                if (parar) { break }
            }
        }
        //diagonal inferior direita
        parar = false;
        for (c = posicao; c < 65; c = c + 9) {
            var corCaminho = document.getElementById(c).className;
            if (corCaminho == corCasa && posicao != c) {
                ValidaCasasGeral()
                if (parar) { break }
            }
        }
        //diagonal inferior esquerda
        parar = false;
        for (c = posicao; c < 65; c = c + 7) {
            if (posicao == 1) { break }
            var corCaminho = document.getElementById(c).className;
            if (corCaminho == corCasa && posicao != c) {
                ValidaCasasGeral()
                if (parar) { break }
            }
        }
        //desenha casas livres
        if (vez == meuTime) {
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }

    if (nomeBusca.includes("cavalo")) {
        var primeiraColuna = [1, 9, 17, 25, 33, 41, 49, 57];
        var segundaColuna = [2, 10, 18, 26, 34, 42, 50, 58];
        var ultimaColuna = [8, 16, 24, 32, 40, 48, 56, 64];
        var penultimaColuna = [7, 15, 23, 31, 39, 47, 55, 63];
        //primeira coluna
        if (primeiraColuna.includes(posicao)) {
            for (c = 64; c > 0; c--) {
                if (c == (posicao - 15) || c == (posicao - 6) || c == (posicao + 10) || c == (posicao + 17)) {
                    ValidaCasasGeral()
                }
            }
        }
        //segunda coluna
        else if (segundaColuna.includes(posicao)) {
            for (c = 64; c > 0; c--) {
                if (c == (posicao - 15) || c == (posicao - 17) || c == (posicao - 6) || c == (posicao + 10) || c == (posicao + 15) || c == (posicao + 17)) {
                    ValidaCasasGeral()
                }
            }
        }
        //penultima coluna
        else if (penultimaColuna.includes(posicao)) {
            for (c = 64; c > 0; c--) {
                if (c == (posicao - 15) || c == (posicao - 17) || c == (posicao - 10) || c == (posicao + 6) || c == (posicao + 15) || c == (posicao + 17)) {
                    ValidaCasasGeral()
                }
            }
        }
        //ultima coluna
        else if (ultimaColuna.includes(posicao)) {
            for (c = 64; c > 0; c--) {
                if (c == (posicao - 17) || c == (posicao - 10) || c == (posicao + 6) || c == (posicao + 15)) {
                    ValidaCasasGeral()
                }
            }
        }
        //geral
        else {
            for (c = 64; c > 0; c--) {
                if (c == (posicao - 15) || c == (posicao - 17) || c == (posicao - 6) || c == (posicao + 10) || c == (posicao - 10) || c == (posicao + 6) || c == (posicao + 15) || c == (posicao + 17)) {
                    ValidaCasasGeral()
                }
            }
        }
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    };

    if (nomeBusca.includes("torre")) {
        //reta superior
        parar = false;
        for (c = posicao - 8; c > 0; c = c - 8) {
            ValidaCasasGeral()
            if (parar) { break }
        }
        //reta inferior
        parar = false;
        for (c = posicao + 8; c < 65; c = c + 8) {
            ValidaCasasGeral()
            if (parar) { break }
        }
        //direita
        linhaDireita = 0;
        if (posicao > 0 && posicao < 9) { linhaDireita = 1; }
        else if (posicao < 17) { linhaDireita = 2; }
        else if (posicao < 25) { linhaDireita = 3; }
        else if (posicao < 33) { linhaDireita = 4; }
        else if (posicao < 41) { linhaDireita = 5; }
        else if (posicao < 49) { linhaDireita = 6; }
        else if (posicao < 57) { linhaDireita = 7; }
        else if (posicao < 65) { linhaDireita = 8; };
        parar = false;
        for (c = posicao + 1; c <= (8 * linhaDireita); c++) {
            ValidaCasasGeral()
            if (parar) { break }
        }
        //esquerda
        linhaEsquerda = 0;
        if (posicao > 0 && posicao < 9) { linhaEsquerda = 0; }
        else if (posicao < 17) { linhaEsquerda = 1; }
        else if (posicao < 25) { linhaEsquerda = 2; }
        else if (posicao < 33) { linhaEsquerda = 3; }
        else if (posicao < 41) { linhaEsquerda = 4; }
        else if (posicao < 49) { linhaEsquerda = 5; }
        else if (posicao < 57) { linhaEsquerda = 6; }
        else if (posicao < 65) { linhaEsquerda = 7; };;
        parar = false;
        for (c = posicao - 1; (8 * linhaEsquerda) < c; c--) {
            ValidaCasasGeral()
            if (parar) { break }
        }
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    };

    if (nomeBusca.includes("rainha")) {
        var corCasa = document.getElementById(posicao).className;
        //diagonal superior direita
        parar = false;
        for (c = posicao; c > 0; c = c - 7) {
            if (posicao == 64) { break }
            var corCaminho = document.getElementById(c).className;
            if (corCaminho == corCasa && posicao != c) {
                ValidaCasasGeral()
                if (parar) { break }
            }
        }
        //diagonal superior esquerda
        parar = false;
        for (c = posicao; c > 0; c = c - 9) {
            var corCaminho = document.getElementById(c).className;
            if (corCaminho == corCasa && posicao != c) {
                ValidaCasasGeral()
                if (parar) { break }
            }
        }
        //diagonal inferior direita
        parar = false;
        for (c = posicao; c < 65; c = c + 9) {
            var corCaminho = document.getElementById(c).className;
            if (corCaminho == corCasa && posicao != c) {
                ValidaCasasGeral()
                if (parar) { break }
            }
        }
        //diagonal inferior esquerda
        parar = false;
        for (c = posicao; c < 65; c = c + 7) {
            if (posicao == 1) { break }
            var corCaminho = document.getElementById(c).className;
            if (corCaminho == corCasa && posicao != c) {
                ValidaCasasGeral()
                if (parar) { break }
            }
        }
        //reta superior
        parar = false;
        for (c = posicao - 8; c > 0; c = c - 8) {
            ValidaCasasGeral()
            if (parar) { break }
        }
        //reta inferior
        parar = false;
        for (c = posicao + 8; c < 65; c = c + 8) {
            ValidaCasasGeral()
            if (parar) { break }
        }
        //direita
        linhaDireita = 0;
        if (posicao > 0 && posicao < 9) { linhaDireita = 1; }
        else if (posicao < 17) { linhaDireita = 2; }
        else if (posicao < 25) { linhaDireita = 3; }
        else if (posicao < 33) { linhaDireita = 4; }
        else if (posicao < 41) { linhaDireita = 5; }
        else if (posicao < 49) { linhaDireita = 6; }
        else if (posicao < 57) { linhaDireita = 7; }
        else if (posicao < 65) { linhaDireita = 8; };
        parar = false;
        for (c = posicao + 1; c <= (8 * linhaDireita); c++) {
            ValidaCasasGeral()
            if (parar) { break }
        }
        //esquerda
        linhaEsquerda = 0;
        if (posicao > 0 && posicao < 9) { linhaEsquerda = 0; }
        else if (posicao < 17) { linhaEsquerda = 1; }
        else if (posicao < 25) { linhaEsquerda = 2; }
        else if (posicao < 33) { linhaEsquerda = 3; }
        else if (posicao < 41) { linhaEsquerda = 4; }
        else if (posicao < 49) { linhaEsquerda = 5; }
        else if (posicao < 57) { linhaEsquerda = 6; }
        else if (posicao < 65) { linhaEsquerda = 7; };;
        parar = false;
        for (c = posicao - 1; (8 * linhaEsquerda) < c; c--) {
            ValidaCasasGeral()
            if (parar) { break }
        }
        //desenha casas livres
        if (vez == meuTime) {
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
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

function CapturaPecaComPromocao(ataque, defesa) {
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
    PromocaoPeao(ataque, defesa);
}

function PromocaoPeao(de, para) {
    document.getElementById('promocao').style.display = 'block';
    var imgCapturada = '';
    if (meuTime == 'branco') { imgCapturada = 'Branco' }
    else { imgCapturada = 'Preto' }
    document.getElementById('promocao').innerHTML = `<canvas onclick = "viraCavalo(${de}, ${para})" class="promocao${imgCapturada}" id = "cavalo${imgCapturada}" value = "Cavalo" width="65" height="85"></canvas> `;
    document.getElementById('promocao').innerHTML += `<canvas onclick = "viraBispo(${de}, ${para})" class="promocao${imgCapturada}" id = "bispo${imgCapturada}" value = "Bispo" width="65" height="85"></canvas> `;
    document.getElementById('promocao').innerHTML += `<canvas onclick = "viraTorre(${de}, ${para})" class="promocao${imgCapturada}" id = "torre${imgCapturada}" value = "Torre" width="65" height="85"></canvas> `;
    document.getElementById('promocao').innerHTML += `<canvas onclick = "viraRainha(${de}, ${para})" class="promocao${imgCapturada}" id = "rainha${imgCapturada}" value = "Rainha" width="65" height="85"></canvas> `;
    DesenhaTipo(`cavalo${imgCapturada}`);
    DesenhaTipo(`bispo${imgCapturada}`);
    DesenhaTipo(`torre${imgCapturada}`);
    DesenhaTipo(`rainha${imgCapturada}`);
}

function viraCavalo(de, para) {
    for (const property in PecasJogando) {

        if (PecasJogando[property].posicao == de) {
            var pecaCapturada = PecasJogando[property];
        }
    }
    const index = PecasJogando.indexOf(pecaCapturada);
    PecasJogando.splice(index, 1);
    var time = `${pecaCapturada.nome}`;
    time = time.toLowerCase();

    num = time[time.length - 2] + time[time.length - 1];

    if (time.includes('branco')) {
        switch (num) {
            case '01':
                PecasJogando.unshift(CavaloBranco01 = new Peca('CavaloBranco01', para));
                break;
            case '02':
                PecasJogando.unshift(CavaloBranco02 = new Peca('CavaloBranco02', para));
                break;
            case '03':
                PecasJogando.unshift(CavaloBranco03 = new Peca('CavaloBranco03', para));
                break;
            case '04':
                PecasJogando.unshift(CavaloBranco04 = new Peca('CavaloBranco04', para));
                break;
            case '05':
                PecasJogando.unshift(CavaloBranco05 = new Peca('CavaloBranco05', para));
                break;
            case '06':
                PecasJogando.unshift(CavaloBranco06 = new Peca('CavaloBranco06', para));
                break;
            case '07':
                PecasJogando.unshift(CavaloBranco07 = new Peca('CavaloBranco07', para));
                break;
            case '08':
                PecasJogando.unshift(CavaloBranco08 = new Peca('CavaloBranco08', para));
                break;
            case '09':
                PecasJogando.unshift(CavaloBranco09 = new Peca('CavaloBranco09', para));
                break;
            case '10':
                PecasJogando.unshift(CavaloBranco10 = new Peca('CavaloBranco10', para));
                break;
            case '11':
                PecasJogando.unshift(CavaloBranco11 = new Peca('CavaloBranco11', para));
                break;
            case '12':
                PecasJogando.unshift(CavaloBranco12 = new Peca('CavaloBranco12', para));
                break;
            case '13':
                PecasJogando.unshift(CavaloBranco13 = new Peca('CavaloBranco13', para));
                break;
            case '14':
                PecasJogando.unshift(CavaloBranco14 = new Peca('CavaloBranco14', para));
                break;
            case '15':
                PecasJogando.unshift(CavaloBranco15 = new Peca('CavaloBranco15', para));
                break;
            default:
                break;
        }
    }
    else {
        switch (num) {
            case '01':
                PecasJogando.unshift(CavaloPreto01 = new Peca('CavaloPreto01', para));
                break;
            case '02':
                PecasJogando.unshift(CavaloPreto02 = new Peca('CavaloPreto02', para));
                break;
            case '03':
                PecasJogando.unshift(CavaloPreto03 = new Peca('CavaloPreto03', para));
                break;
            case '04':
                PecasJogando.unshift(CavaloPreto04 = new Peca('CavaloPreto04', para));
                break;
            case '05':
                PecasJogando.unshift(CavaloPreto05 = new Peca('CavaloPreto05', para));
                break;
            case '06':
                PecasJogando.unshift(CavaloPreto06 = new Peca('CavaloPreto06', para));
                break;
            case '07':
                PecasJogando.unshift(CavaloPreto07 = new Peca('CavaloPreto07', para));
                break;
            case '08':
                PecasJogando.unshift(CavaloPreto08 = new Peca('CavaloPreto08', para));
                break;
            case '09':
                PecasJogando.unshift(CavaloPreto09 = new Peca('CavaloPreto09', para));
                break;
            case '10':
                PecasJogando.unshift(CavaloPreto10 = new Peca('CavaloPreto10', para));
                break;
            case '11':
                PecasJogando.unshift(CavaloPreto11 = new Peca('CavaloPreto11', para));
                break;
            case '12':
                PecasJogando.unshift(CavaloPreto12 = new Peca('CavaloPreto12', para));
                break;
            case '13':
                PecasJogando.unshift(CavaloPreto13 = new Peca('CavaloPreto13', para));
                break;
            case '14':
                PecasJogando.unshift(CavaloPreto14 = new Peca('CavaloPreto14', para));
                break;
            case '15':
                PecasJogando.unshift(CavaloPreto15 = new Peca('CavaloPreto15', para));
                break;
            default:
                break;


        }
    }
    DesenhaPecasJogando();
};

function viraBispo(de, para) {
    for (const property in PecasJogando) {

        if (PecasJogando[property].posicao == de) {
            var pecaCapturada = PecasJogando[property];
        }
    }
    const index = PecasJogando.indexOf(pecaCapturada);
    PecasJogando.splice(index, 1);
    var time = `${pecaCapturada.nome}`;
    time = time.toLowerCase();

    num = time[time.length - 2] + time[time.length - 1];

    if (time.includes('branco')) {
        switch (num) {
            case '01':
                PecasJogando.unshift(BispoBranco01 = new Peca('BispoBranco01', para));
                break;
            case '02':
                PecasJogando.unshift(BispoBranco02 = new Peca('BispoBranco02', para));
                break;
            case '03':
                PecasJogando.unshift(BispoBranco03 = new Peca('BispoBranco03', para));
                break;
            case '04':
                PecasJogando.unshift(BispoBranco04 = new Peca('BispoBranco04', para));
                break;
            case '05':
                PecasJogando.unshift(BispoBranco05 = new Peca('BispoBranco05', para));
                break;
            case '06':
                PecasJogando.unshift(BispoBranco06 = new Peca('BispoBranco06', para));
                break;
            case '07':
                PecasJogando.unshift(BispoBranco07 = new Peca('BispoBranco07', para));
                break;
            case '08':
                PecasJogando.unshift(BispoBranco08 = new Peca('BispoBranco08', para));
                break;
            case '09':
                PecasJogando.unshift(BispoBranco09 = new Peca('BispoBranco09', para));
                break;
            case '10':
                PecasJogando.unshift(BispoBranco10 = new Peca('BispoBranco10', para));
                break;
            case '11':
                PecasJogando.unshift(BispoBranco11 = new Peca('BispoBranco11', para));
                break;
            case '12':
                PecasJogando.unshift(BispoBranco12 = new Peca('BispoBranco12', para));
                break;
            case '13':
                PecasJogando.unshift(BispoBranco13 = new Peca('BispoBranco13', para));
                break;
            case '14':
                PecasJogando.unshift(BispoBranco14 = new Peca('BispoBranco14', para));
                break;
            case '15':
                PecasJogando.unshift(BispoBranco15 = new Peca('BispoBranco15', para));
                break;
            default:
                break;
        }
    }
    else {
        switch (num) {
            case '01':
                PecasJogando.unshift(BispoPreto01 = new Peca('BispoPreto01', para));
                break;
            case '02':
                PecasJogando.unshift(BispoPreto02 = new Peca('BispoPreto02', para));
                break;
            case '03':
                PecasJogando.unshift(BispoPreto03 = new Peca('BispoPreto03', para));
                break;
            case '04':
                PecasJogando.unshift(BispoPreto04 = new Peca('BispoPreto04', para));
                break;
            case '05':
                PecasJogando.unshift(BispoPreto05 = new Peca('BispoPreto05', para));
                break;
            case '06':
                PecasJogando.unshift(BispoPreto06 = new Peca('BispoPreto06', para));
                break;
            case '07':
                PecasJogando.unshift(BispoPreto07 = new Peca('BispoPreto07', para));
                break;
            case '08':
                PecasJogando.unshift(BispoPreto08 = new Peca('BispoPreto08', para));
                break;
            case '09':
                PecasJogando.unshift(BispoPreto09 = new Peca('BispoPreto09', para));
                break;
            case '10':
                PecasJogando.unshift(BispoPreto10 = new Peca('BispoPreto10', para));
                break;
            case '11':
                PecasJogando.unshift(BispoPreto11 = new Peca('BispoPreto11', para));
                break;
            case '12':
                PecasJogando.unshift(BispoPreto12 = new Peca('BispoPreto12', para));
                break;
            case '13':
                PecasJogando.unshift(BispoPreto13 = new Peca('BispoPreto13', para));
                break;
            case '14':
                PecasJogando.unshift(BispoPreto14 = new Peca('BispoPreto14', para));
                break;
            case '15':
                PecasJogando.unshift(BispoPreto15 = new Peca('BispoPreto15', para));
                break;
            default:
                break;


        }
    }
    DesenhaPecasJogando();
    document.getElementById('promocao').style.display = 'none';
};

function viraTorre(de, para) {
    for (const property in PecasJogando) {

        if (PecasJogando[property].posicao == de) {
            var pecaCapturada = PecasJogando[property];
        }
    }
    const index = PecasJogando.indexOf(pecaCapturada);
    PecasJogando.splice(index, 1);
    var time = `${pecaCapturada.nome}`;
    time = time.toLowerCase();

    num = time[time.length - 2] + time[time.length - 1];

    if (time.includes('branco')) {
        switch (num) {
            case '01':
                PecasJogando.unshift(TorreBranco01 = new Peca('TorreBranco01', para));
                break;
            case '02':
                PecasJogando.unshift(TorreBranco02 = new Peca('TorreBranco02', para));
                break;
            case '03':
                PecasJogando.unshift(TorreBranco03 = new Peca('TorreBranco03', para));
                break;
            case '04':
                PecasJogando.unshift(TorreBranco04 = new Peca('TorreBranco04', para));
                break;
            case '05':
                PecasJogando.unshift(TorreBranco05 = new Peca('TorreBranco05', para));
                break;
            case '06':
                PecasJogando.unshift(TorreBranco06 = new Peca('TorreBranco06', para));
                break;
            case '07':
                PecasJogando.unshift(TorreBranco07 = new Peca('TorreBranco07', para));
                break;
            case '08':
                PecasJogando.unshift(TorreBranco08 = new Peca('TorreBranco08', para));
                break;
            case '09':
                PecasJogando.unshift(TorreBranco09 = new Peca('TorreBranco09', para));
                break;
            case '10':
                PecasJogando.unshift(TorreBranco10 = new Peca('TorreBranco10', para));
                break;
            case '11':
                PecasJogando.unshift(TorreBranco11 = new Peca('TorreBranco11', para));
                break;
            case '12':
                PecasJogando.unshift(TorreBranco12 = new Peca('TorreBranco12', para));
                break;
            case '13':
                PecasJogando.unshift(TorreBranco13 = new Peca('TorreBranco13', para));
                break;
            case '14':
                PecasJogando.unshift(TorreBranco14 = new Peca('TorreBranco14', para));
                break;
            case '15':
                PecasJogando.unshift(TorreBranco15 = new Peca('TorreBranco15', para));
                break;
            default:
                break;
        }
    }
    else {
        switch (num) {
            case '01':
                PecasJogando.unshift(TorrePreto01 = new Peca('TorrePreto01', para));
                break;
            case '02':
                PecasJogando.unshift(TorrePreto02 = new Peca('TorrePreto02', para));
                break;
            case '03':
                PecasJogando.unshift(TorrePreto03 = new Peca('TorrePreto03', para));
                break;
            case '04':
                PecasJogando.unshift(TorrePreto04 = new Peca('TorrePreto04', para));
                break;
            case '05':
                PecasJogando.unshift(TorrePreto05 = new Peca('TorrePreto05', para));
                break;
            case '06':
                PecasJogando.unshift(TorrePreto06 = new Peca('TorrePreto06', para));
                break;
            case '07':
                PecasJogando.unshift(TorrePreto07 = new Peca('TorrePreto07', para));
                break;
            case '08':
                PecasJogando.unshift(TorrePreto08 = new Peca('TorrePreto08', para));
                break;
            case '09':
                PecasJogando.unshift(TorrePreto09 = new Peca('TorrePreto09', para));
                break;
            case '10':
                PecasJogando.unshift(TorrePreto10 = new Peca('TorrePreto10', para));
                break;
            case '11':
                PecasJogando.unshift(TorrePreto11 = new Peca('TorrePreto11', para));
                break;
            case '12':
                PecasJogando.unshift(TorrePreto12 = new Peca('TorrePreto12', para));
                break;
            case '13':
                PecasJogando.unshift(TorrePreto13 = new Peca('TorrePreto13', para));
                break;
            case '14':
                PecasJogando.unshift(TorrePreto14 = new Peca('TorrePreto14', para));
                break;
            case '15':
                PecasJogando.unshift(TorrePreto15 = new Peca('TorrePreto15', para));
                break;
            default:
                break;


        }
    }
    DesenhaPecasJogando();
};

function viraRainha(de, para) {
    for (const property in PecasJogando) {

        if (PecasJogando[property].posicao == de) {
            var pecaCapturada = PecasJogando[property];
        }
    }
    const index = PecasJogando.indexOf(pecaCapturada);
    PecasJogando.splice(index, 1);
    var time = `${pecaCapturada.nome}`;
    time = time.toLowerCase();

    num = time[time.length - 2] + time[time.length - 1];

    if (time.includes('branco')) {
        switch (num) {
            case '01':
                PecasJogando.unshift(RainhaBranco01 = new Peca('RainhaBranco01', para));
                break;
            case '02':
                PecasJogando.unshift(RainhaBranco02 = new Peca('RainhaBranco02', para));
                break;
            case '03':
                PecasJogando.unshift(RainhaBranco03 = new Peca('RainhaBranco03', para));
                break;
            case '04':
                PecasJogando.unshift(RainhaBranco04 = new Peca('RainhaBranco04', para));
                break;
            case '05':
                PecasJogando.unshift(RainhaBranco05 = new Peca('RainhaBranco05', para));
                break;
            case '06':
                PecasJogando.unshift(RainhaBranco06 = new Peca('RainhaBranco06', para));
                break;
            case '07':
                PecasJogando.unshift(RainhaBranco07 = new Peca('RainhaBranco07', para));
                break;
            case '08':
                PecasJogando.unshift(RainhaBranco08 = new Peca('RainhaBranco08', para));
                break;
            case '09':
                PecasJogando.unshift(RainhaBranco09 = new Peca('RainhaBranco09', para));
                break;
            case '10':
                PecasJogando.unshift(RainhaBranco10 = new Peca('RainhaBranco10', para));
                break;
            case '11':
                PecasJogando.unshift(RainhaBranco11 = new Peca('RainhaBranco11', para));
                break;
            case '12':
                PecasJogando.unshift(RainhaBranco12 = new Peca('RainhaBranco12', para));
                break;
            case '13':
                PecasJogando.unshift(RainhaBranco13 = new Peca('RainhaBranco13', para));
                break;
            case '14':
                PecasJogando.unshift(RainhaBranco14 = new Peca('RainhaBranco14', para));
                break;
            case '15':
                PecasJogando.unshift(RainhaBranco15 = new Peca('RainhaBranco15', para));
                break;
            default:
                break;
        }
    }
    else {
        switch (num) {
            case '01':
                PecasJogando.unshift(RainhaPreto01 = new Peca('RainhaPreto01', para));
                break;
            case '02':
                PecasJogando.unshift(RainhaPreto02 = new Peca('RainhaPreto02', para));
                break;
            case '03':
                PecasJogando.unshift(RainhaPreto03 = new Peca('RainhaPreto03', para));
                break;
            case '04':
                PecasJogando.unshift(RainhaPreto04 = new Peca('RainhaPreto04', para));
                break;
            case '05':
                PecasJogando.unshift(RainhaPreto05 = new Peca('RainhaPreto05', para));
                break;
            case '06':
                PecasJogando.unshift(RainhaPreto06 = new Peca('RainhaPreto06', para));
                break;
            case '07':
                PecasJogando.unshift(RainhaPreto07 = new Peca('RainhaPreto07', para));
                break;
            case '08':
                PecasJogando.unshift(RainhaPreto08 = new Peca('RainhaPreto08', para));
                break;
            case '09':
                PecasJogando.unshift(RainhaPreto09 = new Peca('RainhaPreto09', para));
                break;
            case '10':
                PecasJogando.unshift(RainhaPreto10 = new Peca('RainhaPreto10', para));
                break;
            case '11':
                PecasJogando.unshift(RainhaPreto11 = new Peca('RainhaPreto11', para));
                break;
            case '12':
                PecasJogando.unshift(RainhaPreto12 = new Peca('RainhaPreto12', para));
                break;
            case '13':
                PecasJogando.unshift(RainhaPreto13 = new Peca('RainhaPreto13', para));
                break;
            case '14':
                PecasJogando.unshift(RainhaPreto14 = new Peca('RainhaPreto14', para));
                break;
            case '15':
                PecasJogando.unshift(RainhaPreto15 = new Peca('RainhaPreto15', para));
                break;
            default:
                break;


        }
    }
    DesenhaPecasJogando();
};

function fazRoque(destino) {
    if (destino == 63) {
        TorreBranco2.MovePeca(62);
        ReiBranco1.MovePeca(63);
        jogada++;
    }
    else if (destino == 7) {
        TorrePreto2.MovePeca(6);
        ReiPreto1.MovePeca(7);
        jogada++;
    }
    else if (destino == 59) {
        TorreBranco1.MovePeca(60);
        ReiBranco1.MovePeca(59);
        jogada++;
    }
    else if (destino == 3) {
        TorrePreto1.MovePeca(4);
        ReiPreto1.MovePeca(3);
        jogada++;
    }
}

function ValidaCaminhosInimigos(time) {
    caminhoInimigo = [];
    for (const property in PecasJogando) {
        if (!PecasJogando[property].nome.toLowerCase().includes(`${time}`)) {
            //console.log(PecasJogando[property].nome)
            CaminhoPeca(PecasJogando[property].nome, PecasJogando[property].posicao)
        }
    }
    meuTime = time;
};

function Xeque() {
    console.log(`Xeque! na jogada -> ${jogada} `);
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

function Transformar(posicao, destino, nome) {
    aleatorio = Math.floor(Math.random() * PecasReservas.length);
    var nomeAntigo = nome;
    var novoNome = PecasReservas[aleatorio];
    var index = PecasReservas.indexOf(novoNome);

    if (novoNome.includes('Torre')) {
        viraTorre(posicao, destino);
    }
    else if (novoNome.includes('Bispo')) {
        viraBispo(posicao, destino);
    }
    else if (novoNome.includes('Cavalo')) {
        viraCavalo(posicao, destino);
    }
    else if (novoNome.includes('Rainha')) {
        viraRainha(posicao, destino);
    }
    PecasReservas.push(nomeAntigo);

    //PecasReservas.splice(index, 1);


    DesenhaPecasJogando();
    jogada++;
    giraTabuleiro();


}


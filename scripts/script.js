const jogadorDaVez = document.querySelector(".jogadorDaVez");
const espacos = document.querySelectorAll("[data-espaco]");
const campoMensagemFinal = document.querySelector(".mensagemFinal");

const wins = [
    ["0","1","2"],
    ["0","3","6"],
    ["0","4","8"],
    ["1","4","7"],
    ["2","5","8"],
    ["2","4","6"],
    ["3","4","5"],
    ["6","7","8"]
];

var playerX = [];
var playerO = [];
let jogadaId;

var player = "X";
var espacoOcupado = 0;
semVencedor = true;
espacos.forEach(espaco => {
    espaco.addEventListener('click', () => {
        jogadaId = espaco.id;
        espaco.innerHTML = player;
        espacoOcupado++;
        if(player === "X"){
            playerX.push(jogadaId);
            verificaVencedor(playerX)
            venceu(semVencedor, player);
            player = "O"
        }else{
            playerO.push(jogadaId);
            verificaVencedor(playerO)
            venceu(semVencedor, player);
            player = "X"
        }
        jogadorDaVez.innerHTML = `É a vez do jogador ${player}`;
    });
});


function verificaVencedor(jogadas){
    let jogadaEncontrada;
    let num_de_testes = 0;
    wins.every(win => {
        let soma = 0;
        for(let jogada = 0; jogada < jogadas.length; jogada++){
            jogadaEncontrada = win.indexOf(jogadas[jogada]);
            if(jogadaEncontrada != -1){
                soma++
            }
        }
        num_de_testes++
        if(soma >= 3 && espacoOcupado <= 9){
            semVencedor = false;
            return semVencedor;
        } else if (soma != 3 && espacoOcupado == 9 && num_de_testes == 8){
            campoMensagemFinal.innerHTML = `
                <p>Deu <em>velha</em></p>
                <button type="reset" id="jogarNovamente">jogar novamente</button>
                <button type="button" id="finalizar">finalizar</button>
            `;
            funcionalidadeBotoes();
        } else{
            semVencedor = true;
            return semVencedor;
        }
    });
}

function venceu(continuar, jogador){
    if(continuar == false){
        campoMensagemFinal.innerHTML = `
            <p>O <em>jogador ${jogador}</em> venceu!</p>
            <button type="reset" id="jogarNovamente">jogar novamente</button>
            <button type="button" id="finalizar">finalizar</button>
        `;
        funcionalidadeBotoes();
    }
}

function funcionalidadeBotoes(){
    const botaoJogarNovamente = document.getElementById("jogarNovamente");
    const botaoFinalizar = document.getElementById("finalizar");

    botaoJogarNovamente.addEventListener('click', () => {
        window.location.href = "index.html";
    });
    botaoFinalizar.addEventListener('click', () => {
        window.location.href = "pages/despedida.html"
    });
}

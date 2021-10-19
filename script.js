let order = [];
let clickedOrder = [];
let score = 0;

/*
/ ordem das cores:
/ 0 => verde
/ 1 => vermelho
/ 2 => azul
/ 3 => amarelo
*/

const green = document.querySelector('.green');
const red = document.querySelector('.red');
const blue = document.querySelector('.blue');
const yellow = document.querySelector('.yellow');

// Cria ordem aleatória de cores
let shuffleOrder = () => {

    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order) {

        let elementColor = createElementColor(order[i]);
        ligthColor(elementColor, Number(i) + 1);
    }
}

// Liga a próxima cor
let ligthColor = (element, number) => {

    number = number * 500;

    setTimeout( () => {

        element.classList.add('selected');
    }, number - 250);
    
    setTimeout( () => {

        element.classList.remove('selected');
    }, number);
}

// Verifica ordem dos botões clicados
let checkOrder = () => {

    for(let i in clickedOrder) {

        if(clickedOrder[i] != order[i]) {

            loose();
            break;
        }
    }

    if(clickedOrder.length == order.length) {

        alert(`Pontuação ${score}\nVocê acertou! Iniciando próximo nível...`);
        nextLevel();
    }
}

// Atua no click do jogador
let click = (color) => {

    clickedOrder[clickedOrder.length] = color;
    createElementColor(color).classList.add('selected');

    setTimeout( () => {

        createElementColor(color).classList.remove('selected');

        checkOrder();
    }, 250);
}

// Retorna a cor
let createElementColor = (color) => {

    if(color == 0) {

        return green;
    }
    else if(color == 1) {

        return red;
    }
    else if(color == 2) {

        return blue;
    }
    else if(color == 3) {

        return yellow;
    }
}

// Próximo nível
let nextLevel = () => {

    score ++;
    shuffleOrder();
}

// Game over
let loose = () => {

    alert(`Pontuação: ${score}\nGame Over!!`);

    order = [];
    clickedOrder = [];
    score = 0;

    playGame();
}

// Novo jogo
let playGame = () => {

    alert('Iniciar novo jogo...');
    score = 0;
    countDown();
    setTimeout( () => {

        nextLevel();
    }, 4000);
}

// Contagem regressiva para inicio do jogo
var count = 4;
var tempo = document.getElementById("tempo");

function countDown() {
     if (count > 0){
        count -= 1;
        if (count == 0) {
            count = "Play Game";
        }else if(count < 4){
            count = "0" + count;
        }
        tempo.innerText = count;
        setTimeout(countDown, 1000); 
    }
}

// Eventos de click do jogo
green.onclick = () => click(0);
red.onclick = () => click(1);
blue.onclick = () => click(2);
yellow.onclick = () => click(3);

playGame();
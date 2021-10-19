let orderColor;
let orderPressed;
let round;
let score;
let level;

const green = document.querySelector('.green');
const blue = document.querySelector('.blue');
const yellow = document.querySelector('.yellow');
const red = document.querySelector('.red');

// Evento de cada cor
green.onclick = () => pressed(0);
blue.onclick = () => pressed(1);
yellow.onclick = () => pressed(2);
red.onclick = () => pressed(3);

let resetGame = (async() => {
    orderColor = [];
    orderPressed = [];
    round = 0;
    score = 0;
    level = 0;
});

// Identifica a jogada do usuário
let pressed = (async(el) => {
    orderPressed.push(el);
    await lightColor(el, 100)
        .then(checkOrder());
});

let gameOver = (async() => {
    document.querySelector('.undercover').style.display = "block";
    await resetGame();
});

// Verifica a ordem de cores pressionada pelo player
let checkOrder = (async() => {
    let idx = orderPressed.length - 1;
    if (orderColor[idx] !== orderPressed[idx]) {
        await gameOver();

    } else {
        score++;
        document.getElementById('score').innerHTML = score;

    }
    if (orderColor.length === orderPressed.length) {
        setTimeout(() => {
            nextLevel();
        }, 1000);
    }
});

// Liga a luz da cor
let turnOff = (element, time) => {
    let color = element.classList[1];
    setTimeout(() => {
        element.classList.remove(`${color}-hover`);
    }, time);
}

// Desliga a luz da cor
let turnOn = (async(element, time) => {
    let color = element.classList[1];
    setTimeout(() => {
        element.classList.add(`${color}-hover`);
    }, time);
})

// Destaca a cor selecionada
let lightColor = (async(el, time) => {
    let element = document.getElementsByTagName("DIV")[el];
    await turnOn(element, 0).then(
        turnOff(element, time)
    );
});

// Cria a sequência de cores
let shuffle = (async() => {
    orderPressed = [];
    let color = Math.floor(Math.random() * 4);
    orderColor.push(color);
});

let showColors = () => {

    for (let el in orderColor) {
        setTimeout(async() => {
            await lightColor(orderColor[el], 1000 - (level * 100));
        }, (1200 * el + 1500));
    }
}

let nextLevel = (async() => {
    if (orderColor.length % 10 === 0) {
        level++;
        document.getElementById('level').innerHTML = level;
    }
    round++;
    await shuffle()
        .then(showColors());
});

let restart = () => {
    document.querySelector('.undercover').style.display = "none";
    document.querySelector('.cover').style.display = "block";
};

let start = (async() => {;
    document.querySelector('.cover').style.display = "none";
    setTimeout(async() => {
        await resetGame()
            .then(nextLevel());
    }, 500);
});

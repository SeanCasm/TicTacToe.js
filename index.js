const player = document.getElementById("player");
const divParent = document.getElementById("parent");
const content = document.getElementById("content");

let gridBtns = [];
let actualPlayer = 1;
let circles = 0;
let squares = 0;
let gameEnds=false;

let circleLine = [{}];
let squareLine = [{}];
let table = [
    ['f', 'f', 'f'],
    ['f', 'f', 'f'],
    ['f', 'f', 'f']
];


const repeatButton = () => {
    for (let i = 0; i <= 2; i++) {
        for (let j = 0; j <= 2; j++) {
            let btn = document.createElement("button");
            gridBtns.push(btn);
            btn.addEventListener("click", onClickEvent);
            btn.classList.add('gridBtn');
            btn.col = j;
            btn.row = i;
            divParent.appendChild(btn);
        }
    }
}
const onClickEvent = (e) => {
    draw(e);
    playerSwap();
}
const playerSwap = () => {
    
    if(gameEnds) return;

    actualPlayer = actualPlayer == 1 ? 2 : 1;
    player.innerHTML = `Turn of: Player ${actualPlayer}`;
}
const draw = (e) => {
    const div = document.createElement("div");
    const col = e.target.col;
    const row = e.target.row;
    switch (actualPlayer) {
        case 1:
            div.classList.add('circle'); //add css style
            table[row][col] = 'o';
            break;
        case 2:
            div.classList.add('square'); //add css style
            table[row][col] = 'x';
            break;
    }
    divParent.replaceChild(div, e.target);
    checkInLine();
}

const checkInLine = () => {
    squares = circles = 0;
    for (let i = 0; i <= 2; i++) {//horizontal
        for (let j = 0; j <= 2; j++) {
            if (checkGrid(i, j)) return;
        }
        squares = circles = 0;
    }

    for (let j = 0; j <= 2; j++) { //vertical
        for (let i = 0; i <= 2; i++) {
            if (checkGrid(i, j)) return;
        }
        squares = circles = 0;
    }

    for (let i = 2; i >= 0; i--) { // diagonal 1
        if (checkGrid(i, Math.abs(i - 2))) return;
    }
    squares = circles = 0;
    for (let i = 0; i <= 2; i++) { //diagonal 2
        if (checkGrid(i, i)) return;
    }

}
const checkGrid = (i = 0, j = 0) => {

    switch (table[i][j]) {
        case 'o':
            circles++;
            circleLine.push({ i, j });
            break;
        case 'x':
            squares++;
            squareLine.push({ i, j });
            break;
    }
    if (circles == 3 || squares == 3) {
        player.innerHTML = `Player ${actualPlayer} WINS!!!`;
        player.classList.add('win');
        desireButtons();
        gameEnds=true;
        content.classList.add('hide-content');
        return true;
    }
    squareLine = [];
    circleLine = [];
    return false;
}
const desireButtons = () => {
    gridBtns.forEach(btn=>{
        btn.classList.remove('gridBtn');
        btn.classList.add('btnWin');
        btn.removeEventListener('click',onClickEvent );
    });
}
repeatButton();
playerSwap();
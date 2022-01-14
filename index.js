const player = document.getElementById("player");
const divParent = document.getElementById("parent");
let gridBtns = [];
let actualPlayer = 1;
let circles = 0;
let crosses = 0;

let circleLine = [{}];
let crossLine = [{}];
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
    playerSwap();
    draw(e);
}
const playerSwap = () => {
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
            div.classList.add('cross'); //add css style
            table[row][col] = 'x';
            break;
    }
    divParent.replaceChild(div, e.target);
    checkInLine();
}

const checkInLine = () => {
    crosses = circles = 0;
    for (let i = 0; i <= 2; i++) {//horizontal
        for (let j = 0; j <= 2; j++) {
            if (checkGrid(i, j)) return;
        }
        crosses = circles = 0;
    }

    for (let j = 0; j <= 2; j++) { //vertical
        for (let i = 0; i <= 2; i++) {
            if (checkGrid(i, j)) return;
        }
        crosses = circles = 0;
    }

    for (let i = 2; i >= 0; i--) { // diagonal 1
        if (checkGrid(i, Math.abs(i - 2))) return;
    }
    crosses = circles = 0;
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
            crosses++;
            crossLine.push({ i, j });
            break;
    }
    if (circles == 3 || crosses == 3) {
        player.innerHTML = `Player ${actualPlayer} WINS!!!`;
        player.classList.add('win');
        desireButtons();
        animateInLine(circles == 3);
        return true;
    }
    crossLine = [];
    circleLine = [];
    return false;
}
const animateInLine = (circleLine = false) => {
    if (circleLine) {
        
    }
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
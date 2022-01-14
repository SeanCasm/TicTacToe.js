const player = document.getElementById("player");
let actualPlayer = 1;
let circles = 0;
let crosses = 0;

const divParent = document.getElementById("parent");

let table = [
    ['f', 'f', 'f'],
    ['f', 'f', 'f'],
    ['f', 'f', 'f']
];


const repeatButton = () => {
    for (let i = 0; i <= 2; i++) {
        for (let j = 0; j <= 2; j++) {
            let btn = document.createElement("button");
            btn.addEventListener("click", () => onClick(btn));
            btn.col = j;
            btn.row = i;
            divParent.appendChild(btn);
        }
    }
}
const onClick = (btn) => {
    playerSwap();
    draw(btn);
}
const playerSwap = () => {
    player.innerHTML = `Turn of: Player ${actualPlayer}`;
    actualPlayer = actualPlayer == 1 ? 2 : 1;
}
const draw = (btn) => {
    const div = document.createElement("div");
    const col = btn.col;
    const row = btn.row;
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
    divParent.replaceChild(div, btn);
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
        if (checkGrid(i,Math.abs(i-2))) return;
    }
    crosses = circles = 0;
    for (let i = 0; i <= 2; i++) { //diagonal 2
        if (checkGrid(i,i)) return;
    }

}
const checkGrid = (i = 0, j = 0) => {

    switch (table[i][j]) {
        case 'o':
            circles++;
            break;
        case 'x':
            crosses++;
            break;
    }

    if (circles == 3 || crosses == 3) {
        player.innerHTML = `Player ${actualPlayer} WINS!!!`;
        return true;
    }
    return false;
}
repeatButton();
playerSwap();
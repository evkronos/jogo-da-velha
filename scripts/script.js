let startPlayer = "X";
let currentPlayer = "X";
let xWins = 0;
let oWins = 0;
const a1 = document.getElementById("a1");
const a2 = document.getElementById("a2");
const a3 = document.getElementById("a3");
const b1 = document.getElementById("b1");
const b2 = document.getElementById("b2");
const b3 = document.getElementById("b3");
const c1 = document.getElementById("c1");
const c2 = document.getElementById("c2");
const c3 = document.getElementById("c3");
const scoreX = document.getElementById("xResult");
const scoreO = document.getElementById("oResult");
const jogadorInicial = document.getElementById("jogadorInicial");
jogadorInicial.innerHTML = `Jogador Inicial: ${startPlayer}`;

a1.addEventListener("click", () => makeMove(a1));
a2.addEventListener("click", () => makeMove(a2));
a3.addEventListener("click", () => makeMove(a3));
b1.addEventListener("click", () => makeMove(b1));
b2.addEventListener("click", () => makeMove(b2));
b3.addEventListener("click", () => makeMove(b3));
c1.addEventListener("click", () => makeMove(c1));
c2.addEventListener("click", () => makeMove(c2));
c3.addEventListener("click", () => makeMove(c3));

function makeMove(cell) {
    console.log(`Cell clicked: ${cell.textContent}, Current Player: ${currentPlayer}`);
    if (cell.value === "") {
        cell.value = currentPlayer;
        cell.disabled = true;
        if (checkWin()) {
            setTimeout(() => {
                alert(`${currentPlayer} wins!`);
                if (currentPlayer === "X") {
                    xWins++;
                } else {
                    oWins++;
                }
                updateScore();
                resetGame();
            }, 500);
        } else if (isDraw()) {
            alert("Deu velha!");
            resetGame();
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }
}

function checkWin() {
    const winningCombinations = [
        [a1, a2, a3],
        [b1, b2, b3],
        [c1, c2, c3],
        [a1, b1, c1],
        [a2, b2, c2],
        [a3, b3, c3],
        [a1, b2, c3],
        [a3, b2, c1]
    ];
    console.log(winningCombinations)

    return winningCombinations.some(combination => {
        let match = combination.every(cell => cell.value === currentPlayer);
        if (match) {
            combination.forEach(cell => cell.style.backgroundColor = "lightgreen");
        } else {
            combination.forEach(cell => cell.style.backgroundColor = "");
        }

        return match;
    });
}

function isDraw() {
    const cells = [a1, a2, a3, b1, b2, b3, c1, c2, c3];
    return cells.every(cell => cell.value !== "");
}

function resetGame() {
    const cells = [a1, a2, a3, b1, b2, b3, c1, c2, c3];
    cells.forEach(cell => {
        cell.value = ""
        cell.disabled = false;
        cell.style.backgroundColor = "";
    });
    startPlayer = startPlayer === "X" ? "O" : "X";
    currentPlayer = startPlayer;
    jogadorInicial.innerHTML = `Jogador Inicial: ${startPlayer}`;
}

function updateScore() {
    scoreX.innerHTML = `X: ${xWins}`;
    scoreO.innerHTML = `O: ${oWins}`;
}
document.getElementById("reset").addEventListener("click", resetGame);
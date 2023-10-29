"use strict";

let numberTurn;
let isCircleTurn;
let board;

class Board {
    // Erstellt eine Klasse für ein Spielbrett.
    // Es können Werte für die Felder gespeichert werden.
    // Die Werte sind null (kein Kreis und kein Kreuz),
    // 1 (Kreuz) und 0 (Kreis).
    // Außerdem wird gespeichert, wie viele Kreuze und Kreise
    // sich in den Reihen, Spalten und Diagonalen befinden. 
    constructor(fields) {
        this.fields = fields;
        this.row1 = { "cross": 0, "circle": 0 };
        this.row2 = { "cross": 0, "circle": 0 };
        this.row3 = { "cross": 0, "circle": 0 };
        this.column1 = { "cross": 0, "circle": 0 };
        this.column2 = { "cross": 0, "circle": 0 };
        this.column3 = { "cross": 0, "circle": 0 };
        this.diagonal1 = { "cross": 0, "circle": 0 };
        this.diagonal2 = { "cross": 0, "circle": 0 };
    }
}

function initializeGame() {
    // Bereitet das Spiel vor.
    numberTurn = 1;
    board = createBoardInformation();
    initializeGraphicalBoard();
    drawSquaresInitial();
    // Kreuz fängt an.
    isCircleTurn = false;
    // Nun können Kreuze und Kreise gesetzt werden.
    setTimeout(() => computerTurn(), 200);
    activateSetCrossesAndCircles();
}

function initializeGraphicalBoard() {
    // Erstellt die Leinwände für das Spielbrett
    // über die Funktion createCanvas
    // und fügt sie boardContainer hinzu.
    const boardContainer = document.getElementById("boardContainer");
    for (let i = 0; i < 9; i++) {
        const canvas = createCanvas("myCanvas" + i);
        boardContainer.appendChild(canvas);
        if (i === 2 || i === 5) {
            const lineBreak = document.createElement("br");
            boardContainer.appendChild(lineBreak);
            lineBreak.id = "br" + i
        }
    }
}

function createCanvas(id) {
    // Erstellt Leinwände für das Spielbrett.
    const canvas = document.createElement("canvas");
    canvas.id = id;
    canvas.width = 140;
    canvas.height = 140;
    return canvas;
}

function drawSquaresInitial() {
    // Zeichnet am Anfang des Spiels 9 leere Quadrate.
    for (let i=0; i < 9; i++) {
        const myCanvas = 'myCanvas' + i;
        const canvas = document.getElementById(myCanvas);
        const context = canvas.getContext('2d');
        context.strokeWidth = 1;
        context.fillStyle = "yellow";
        context.strokeStyle = "schwarz";
        context.fillRect(0, 0, 140, 140);
        context.strokeRect(0, 0, 140, 140);
    }
}

function createBoardInformation() {
    // Erstellt ein Objekt board um die
    // Zustände des Spielbretts zu speichern.
    let emptyBoard = [];
    for (let i = 0; i < 9; i++) {
        emptyBoard.push(null);
    }
    const board = new Board(emptyBoard);
return board;
}

function drawSymbol(field) {
    // Zeichnet entweder ein Kreuz oder einen Kreis.
    const myCanvas = 'myCanvas' + field;
    const canvas = document.getElementById(myCanvas);
    const context = canvas.getContext('2d');
    context.strokeStyle = 'schwarz';
    context.lineWidth = 5;
    if (isCircleTurn === true) {
        context.moveTo(20, 70);
        context.arc(70, 70, 50, Math.PI, 3 * Math.PI);
    } else if (isCircleTurn === false) {
        context.moveTo(20, 20);
        context.lineTo(120, 120);
        context.moveTo(20, 120);
        context.lineTo(120, 20);
    }
    context.stroke();
}

function activateSetCrossesAndCircles() {
    // Fügt Event-Listener für das Klickereignis auf die Quadrate zu.
    for (let i = 0; i < 9; i++) {
        const canvas = document.getElementById('myCanvas' + i);
        canvas.addEventListener("click", function(event) {
            // Ändert das Spielbrett
            if (board.fields[i] == null) {
                changeOfBoard(i);
                isCircleTurn = false;
                // Prüft, ob Bedingungen für das Spielende erfüllt sind.
                let endOfGame = checkforEndOfGame();
                // Spielende wird aktiviert.
                if (endOfGame[0] === true) {
                    isCircleTurn = null;
                    outputEndOfGame(endOfGame[1]);
                }
                setTimeout(function() {
                    computerTurn();
                    endOfGame = checkforEndOfGame();
                    // Spielende wird aktiviert.
                    if (endOfGame[0] === true) {
                        isCircleTurn = null;
                        outputEndOfGame(endOfGame[1]);
                    }
                    }, 100);
                // Prüft, ob Bedingungen für das Spielende erfüllt sind.
            }
        });
    }
}

function computerTurn() {
    const isActionNeeded = checkForTwoInARowAndCompleteIt("cross");
    const isReactionNeeded = checkForTwoInARowAndCompleteIt("circle");
    if (isActionNeeded != true && isReactionNeeded != true) {
        if (numberTurn == 1) {
            changeOfBoard(0);
            numberTurn++;
        }
        else if (numberTurn == 2 && board.fields[8] == null) {
            changeOfBoard(8);
            numberTurn++;
        }
        else if (numberTurn == 2 && board.fields[8] == 0) {
            changeOfBoard(4);
            numberTurn++;
        }
        else {
            for (let i = 0; i < 9; i++) {
                if (board.fields[i] == null) {
                    changeOfBoard(i);
                    break;
                }
            }
        }
    }
    isCircleTurn = true;
}

function checkForTwoInARowAndCompleteIt (symbol) {
    if (board.row1[symbol] == 2) {
        if (board.fields[0] == null) {
            changeOfBoard(0);
            return true;
        }
        else if (board.fields[1] == null) {
            changeOfBoard(1);
            return true;
        }
        else if (board.fields[2] == null) {
            changeOfBoard(2);
            return true;
        }
    }
    if (board.row2[symbol] == 2) {
        if (board.fields[3] == null) {
            changeOfBoard(3);
            return true;
        }
        else if (board.fields[4] == null) {
            changeOfBoard(4);
            return true;
        }
        else if (board.fields[5] == null) {
            changeOfBoard(5);
            return true;
        }
    }
    if (board.row3[symbol] == 2) {
        if (board.fields[6] == null) {
            changeOfBoard(6);
            return true;
        }
        else if (board.fields[7] == null) {
            changeOfBoard(7);
            return true;
        }
        else if (board.fields[8] == null) {
            changeOfBoard(8);
            return true;
        }
    }
    if (board.column1[symbol] == 2) {
        if (board.fields[0] == null) {
            changeOfBoard(0);
            return true;
        }
        else if (board.fields[3] == null) {
            changeOfBoard(3);
            return true;
        }
        else if (board.fields[6] == null) {
            changeOfBoard(6);
            return true;
        }
    }
    if (board.column2[symbol] == 2) {
        if (board.fields[1] == null) {
            changeOfBoard(1);
            return true;
        }
        else if (board.fields[4] == null) {
            changeOfBoard(4);
            return true;
        }
        else if (board.fields[7] == null) {
            changeOfBoard(7);
            return true;
        }
    }
    if (board.column3[symbol] == 2) {
        if (board.fields[2] == null) {
            changeOfBoard(2);
            return true;
        }
        else if (board.fields[5] == null) {
            changeOfBoard(5);
            return true;
        }
        else if (board.fields[8] == null) {
            changeOfBoard(8);
            return true;
        }
    }
    if (board.diagonal1[symbol] == 2) {
        if (board.fields[0] == null) {
            changeOfBoard(0);
            return true;
        }
        else if (board.fields[4] == null) {
            changeOfBoard(4);
            return true;
        }
        else if (board.fields[8] == null) {
            changeOfBoard(8);
            return true;
        }
    }
    if (board.diagonal2[symbol] == 2) {
        if (board.fields[2] == null) {
            changeOfBoard(2);
            return true;
        }
        else if (board.fields[4] == null) {
            changeOfBoard(4);
            return true;
        }
        else if (board.fields[6] == null) {
            changeOfBoard(6);
            return true;
        }
    }
}

function changeOfBoard(field) {
    // Setzt ein Kreuz oder einen Kreis
    drawSymbol(field);
    // Ändert das Objekt board.
    if (isCircleTurn === true) {
        board.fields[field] = 0;
        incrementLine(field, "circle");
    } else {
        board.fields[field] = 1;
        incrementLine(field, "cross");
    }
}

function incrementLine(field, symbol) {
    if (field == 0) {
        board.row1[symbol]++;
        board.column1[symbol]++;
        board.diagonal1[symbol]++;
    }
    if (field == 1) {
        board.row1[symbol]++;
        board.column2[symbol]++;
    }
    if (field == 2) {
        board.row1[symbol]++;
        board.column3[symbol]++;
        board.diagonal2[symbol]++;
    }
    if (field == 3) {
        board.row2[symbol]++;
        board.column1[symbol]++;
    }
    if (field == 4) {
        board.row2[symbol]++;
        board.column2[symbol]++;
        board.diagonal1[symbol]++;
        board.diagonal2[symbol]++;
    }
    if (field == 5) {
        board.row2[symbol]++;
        board.column3[symbol]++;
    }
    if (field == 6) {
        board.row3[symbol]++;
        board.column1[symbol]++;
        board.diagonal2[symbol]++;
    }
    if (field == 7) {
        board.row3[symbol]++;
        board.column2[symbol]++;

    }
    if (field == 8) {
        board.row3[symbol]++;
        board.column3[symbol]++;
        board.diagonal1[symbol]++;
    }
}

function checkforEndOfGame() {
    let text = "";
    let endOfGame = false;
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    // Gewinnbedingungen für Spieler 1 (Kreuz)
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board.fields[a] === 1 && board.fields[b] === 1 && board.fields[c] === 1) {
            text = "Spieler 1 hat gewonnen!";
            endOfGame = true;
            break;
        }
    }
    // Gewinnbedingungen für Spieler 2 (Kreis)
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board.fields[a] === 0 && board.fields[b] === 0 && board.fields[c] === 0) {
            text = "Spieler 2 hat gewonnen!";
            endOfGame = true;
            break;
        }
    }
    // Überprüfung auf ein Unentschieden
    if (!endOfGame && !board.fields.includes(null)) {
        text = "Das Spiel ist zu Ende. Keiner hat gewonnen.";
        endOfGame = true;
    }
    return [endOfGame, text];
}

function outputEndOfGame(textEndOfGame) {
    // Erzeugt eine Textausgabe zum Spielende.
    document.getElementById("outputEnd").innerHTML = textEndOfGame;
    // Frage nach erneutem Spiel.
    document.getElementById("outputEnd").innerHTML 
        += "<br>Willst du noch mal spielen?";
    document.getElementById("outputEnd").innerHTML 
        += '&nbsp;&nbsp;<input value="Ja" onclick="resetGame()" type="button"></input>';
}

function resetGame() {
    // setzt das Spiel zurück damit
    // es noch mal gespielt werden kann
    removeCanvases();
    initializeGame();
}

function removeCanvases() {
    // Entfernt die Kacheln und die Meldung zum Spielende.
    const boardContainer = document.getElementById("boardContainer");
    document.getElementById("outputEnd").innerHTML = '';
    const br2 = document.getElementById("br2");
    boardContainer.removeChild(br2);
    const br5 = document.getElementById("br5");
    boardContainer.removeChild(br5); 
    for (let i = 0; i < 9; i++) {
        const myCanvas = "myCanvas" + i;
        const canvas = document.getElementById(myCanvas);
        boardContainer.removeChild(canvas);
    }
}

initializeGame();
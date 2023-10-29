"use strict";

class Board {
    // Erstellt eine Klasse für ein Spielbrett.
    // Es können Werte für die Felder gespeichert werden.
    constructor(fields) {
        this.fields = fields;
        this.row1 = 0;
        this.row2 = 0;
        this.row3 = 0;
        this.column1 = 0;
        this.column2 = 0;
        this.column3 = 0;
        this.diagonal1 = 0;
        this.diagonal2 = 0;
    }
}

function initializeGame() {
    // Bereitet das Spiel vor.
    board = createBoardInformation();
    initializeGraphicalBoard();
    setNumberPlayers(); 
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

function setNumberPlayers() {
    // Fragt, ob eine oder zwei Personen spielen wollen.
    const meldungStart = document.getElementById("meldungStart");
    const meldungNumberPlayers = document.createElement("p");
    meldungNumberPlayers.id ="meldungNumberPlayers";
    meldungStart.appendChild(meldungNumberPlayers);
    document.getElementById("meldungNumberPlayers").innerHTML = "<br>Ein-Spieler- oder Zwei-Spieler-Spiel?<br><br>";
    const buttonOnePlayer = createButton("buttonOnePlayer", "ein Spieler");
    meldungNumberPlayers.appendChild(buttonOnePlayer);
    buttonOnePlayer.addEventListener("click", function(event) {
        numberPlayers = 1;
        meldungStart.removeChild(meldungNumberPlayers);
        crossesOrCircles();
    });
    const buttonTwoPlayers = createButton("buttonTwoPlayers", "zwei Spieler");
    meldungNumberPlayers.appendChild(buttonTwoPlayers);
    buttonTwoPlayers.addEventListener("click", function(event) {
        numberPlayers = 2;
        meldungStart.removeChild(meldungNumberPlayers);
        setStartingPlayer();
    });
}

function crossesOrCircles() {
    const meldungStart = document.getElementById("meldungStart");
    const crossesOrCircles = document.createElement("p");
    crossesOrCircles.id = "crossesOrCircles";
    meldungStart.appendChild(crossesOrCircles);
    const text = "<br>Möchtest du Kreuze oder Kreise setzen?<br><br>";
    crossesOrCircles.innerHTML = text;
    const buttonCrosses = createButton("buttonCrosses", "Kreuze");
    crossesOrCircles.appendChild(buttonCrosses);
    buttonCrosses.addEventListener("click", function(event) {
        isSymbolOfHumanPlayerCircle = false;
        drawSquaresInitial();
        computerTurn();
        isCircleTurn = false;
        //setStartingPlayer();
        //meldungStart.removeChild(crossesOrCircles);
    });
    const buttonCircles = createButton("buttonCircles", "Kreise");
    crossesOrCircles.appendChild(buttonCircles);
    buttonCircles.addEventListener("click", function(event) {
        isSymbolOfHumanPlayerCircle = true;
        drawSquaresInitial();
        computerTurn();
        isCircleTurn = false;
        //setStartingPlayer();
        //meldungStart.removeChild(crossesOrCircles)
    });
}

function createButton(buttonName, value) {
    const button = document.createElement("input");
    button.id = buttonName;
    button.type = "button";
    button.value = value;
    return button;
}

function setStartingPlayer() {   
    const meldungStart = document.getElementById("meldungStart");  
    const meldungStartingPlayer = document.createElement("p");
    meldungStartingPlayer.id = "meldungStartingPlayer";
    meldungStart.appendChild(meldungStartingPlayer);
    document.getElementById("meldungStartingPlayer").innerHTML = "<br>Wer soll anfangen? Kreuz, Kreis oder zufällig?<br><br>";
    const buttonCross = createButton("buttonCross", "Kreuz");
    meldungStartingPlayer.appendChild(buttonCross);
    const buttonCircle = createButton("buttonCircle", "Kreis");
    meldungStartingPlayer.appendChild(buttonCircle);
    const buttonRandom = createButton("buttonRandom", "zufällig");
    meldungStartingPlayer.appendChild(buttonRandom);
    let text = '';
    buttonCross.addEventListener("click", function(event) {
        isCircleTurn = false;
        if (numberPlayers == 2) {
            text = "Spieler 1 beginnt!";
            activateSetCrossesAndCircles();
        }
        else if (isSymbolOfHumanPlayerCircle == true) {
            text = "Der Computer beginnt!";
        }
        else if (isSymbolOfHumanPlayerCircle == false) {
            text = "Du beginnst!";
            activateSetCrossesAndCircles();
        }
        document.getElementById("meldungStartingPlayer").innerHTML = text;
        drawSquaresInitial();   
    });
    buttonCircle.addEventListener("click", function(event) {
        isCircleTurn = true;
        if (numberPlayers == 2) {
            text = "Spieler 2 beginnt!";
            activateSetCrossesAndCircles();
        }
        else if (isSymbolOfHumanPlayerCircle == true) {
            text = "Du beginnst!";
            activateSetCrossesAndCircles();
        }
        else if (isSymbolOfHumanPlayerCircle == false) {
            text = "Der Computer beginnt!";
        }
        meldungStartingPlayer.innerHTML = text;
        drawSquaresInitial();
        activateSetCrossesAndCircles();
    });
    buttonRandom.addEventListener("click", function(event) {;
        const random = Math.floor(Math.random()*2);
        if (random == 0) {
            isCircleTurn = false;
            if (numberPlayers == 2) {
                text = "Spieler 1 beginnt!";
                activateSetCrossesAndCircles();
            }
            else if (isSymbolOfHumanPlayerCircle == true) {
                text = "Der Computer beginnt!";
                computerTurn();
            }
            else if (isSymbolOfHumanPlayerCircle == false) {
                text = "Du beginnst!";
                activateSetCrossesAndCircles();
            }
            meldungStartingPlayer.innerHTML = text;
        }     
        else {
            isCircleTurn = true;
            if (numberPlayers == 2) {
                text = "Spieler 2 beginnt!";
            }
            else if (isSymbolOfHumanPlayerCircle == true) {
                text = "Du beginnst!";
            }
            else if (isSymbolOfHumanPlayerCircle == false) {
                text = "Der Computer beginnt!";
            }
            meldungStartingPlayer.innerHTML = text;
        }       
        drawSquaresInitial();
        activateSetCrossesAndCircles();
    });
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
                // Wechselt den Spieler.
                isCircleTurn = changeTurnsPlayers();
                // Prüft, ob Bedingungen für das Spielende erfüllt sind.
                const endOfGame = checkforEndOfGame();
                // Spielende wird aktiviert.
                if (endOfGame[0] === true) {
                    isCircleTurn = null;
                    outputEndOfGame(endOfGame[1]);
                }
            }
        });
    }
}

function computerTurn() {
    if (checkForTwoInARow()) {
        return;
    }
    if (isSymbolOfHumanPlayerCircle == false) {
        drawSymbol(1);
        drawSymbol(4);
        drawSymbol(7);
    }
    if (isSymbolOfHumanPlayerCircle == true) {
        drawSymbol(0);
        drawSymbol(8);
        drawSymbol(6);
        drawSymbol(7);
    }
}

function checkForTwoInARow () {
    if (board.row1 == 2) {
        if (board.fields[0] == null) {
            drawSymbol(0);
        }
        if (board.fields[1] == null) {
            drawSymbol(1);
        }
        if (board.fields[2] == null) {
            drawSymbol(2);
        }
        return true;
    }
    else if (board.row2 == 2) {
        if (board.fields[3] == null) {
            drawSymbol(3);
        }
        if (board.fields[4] == null) {
            drawSymbol(4);
        }
        if (board.fields[5] == null) {
            drawSymbol(5);
        }
        return true;
    }
    else if (board.row3 == 2) {
        if (board.fields[6] == null) {
            drawSymbol(6);
        }
        if (board.fields[7] == null) {
            drawSymbol(7);
        }
        if (board.fields[8] == null) {
            drawSymbol(8);
        }
        return true;
    }
    else if (board.column1 == 2) {
        if (board.fields[0] == null) {
            drawSymbol(0);
        }
        if (board.fields[3] == null) {
            drawSymbol(3);
        }
        if (board.fields[6] == null) {
            drawSymbol(6);
        }
        return true;
    }
    else if (board.column2 == 2) {
        if (board.fields[1] == null) {
            drawSymbol(1);
        }
        if (board.fields[4] == null) {
            drawSymbol(4);
        }
        if (board.fields[7] == null) {
            drawSymbol(7);
        }
        return true;
    }
    else if (board.column3 == 2) {
        if (board.fields[2] == null) {
            drawSymbol(2);
        }
        if (board.fields[5] == null) {
            drawSymbol(5);
        }
        if (board.fields[8] == null) {
            drawSymbol(8);
        }
        return true;
    }
    else if (board.diagnoal1 == 2) {
        if (board.fields[2] == null) {
            drawSymbol(2);
        }
        if (board.fields[4] == null) {
            drawSymbol(4);
        }
        if (board.fields[6] == null) {
            drawSymbol(6);
        }
        return true;
    }
    else if (board.diagonal2 == 2) {
        if (board.fields[0] == null) {
            drawSymbol(0);
        }
        if (board.fields[4] == null) {
            drawSymbol(4);
        }
        if (board.fields[8] == null) {
            drawSymbol(8);
        }
        return true;
    }

}

function changeOfBoard(field) {
    // Setzt ein Kreuz oder einen Kreis
    drawSymbol(field);
    // Ändert das Objekt board.
    if (isCircleTurn === true) {
        board.fields[field] = 0;
    } else {
        board.fields[field] = 1;
    }
    if (numberPlayers == 1) {
        if (field == 0) {
            board.row1 += 1;
            board.column1 += 1;
            board.diagnonal1 += 1;
        }
        else if (field == 1) {
            board.row1 += 1;
            board.column2 += 1;
        } 
        if (field == 2) {
            board.row1 += 1;
            board.column3 += 1;
            board.diagnonal2 += 1;
        }
        if (field == 3) {
            board.row2 += 1;
            board.column1 += 1;
        } 
        if (field == 4) {
            board.row2 += 1;
            board.column2 += 1;
            board.diagnonal1 += 1;
            board.diagnonal2 += 1;
        } 
        if (field == 5) {
            board.row2 += 1;
            board.column3 += 1;
        } 
        if (field == 6) {
            board.row3 += 1;
            board.column1 += 1;
            board.diagnonal2 += 1;
        } 
        if (field == 7) {
            board.row3 += 1;
            board.column2 += 1;
        }
        if (field == 8) {
            board.row3 += 1;
            board.column3 += 1;
            board.diagnonal1 += 1;
        } 
    }
}

function changeTurnsPlayers() {
    // ändert welcher Spieler am Zug ist
    if (isCircleTurn === true) {
        isCircleTurn = false;
    }
    else {
        isCircleTurn = true;
    }
    return isCircleTurn;
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
            if (numberPlayers == 2) {
                text = "Spieler 1 hat gewonnen!";
            }
            else if (isSymbolOfHumanPlayerCircle == true) {
                text = "Der Computer hat gewonnen!";
            }
            else if (isSymbolOfHumanPlayerCircle == false) {
                text = "Du hast gewonnen";
            }
            endOfGame = true;
            break;
        }
    }
    // Gewinnbedingungen für Spieler 2 (Kreis)
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board.fields[a] === 0 && board.fields[b] === 0 && board.fields[c] === 0) {
            if (numberPlayers == 2) {
                text = "Spieler 2 hat gewonnen!";
            }
            else if (isSymbolOfHumanPlayerCircle == true) {
                text = "Du hast gewonnen!";
            }
            else if (isSymbolOfHumanPlayerCircle == false) {
                text = "Der Computer hat gewonnen";
            }
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

function outputEndOfGame(endOfGame) {
    // Erzeugt eine Textausgabe zum Spielende.
    const meldungStart = document.getElementById("meldungStart");
    const meldungStartingPlayer = document.getElementById("meldungStartingPlayer");
    meldungStart.removeChild(meldungStartingPlayer);
    document.getElementById("meldungEnd").innerHTML = endOfGame;
    // Frage nach erneutem Spiel.
    if (numberPlayers == 2) {
        document.getElementById("meldungEnd").innerHTML 
            += "<br>Wollt ihr noch mal spielen?";
    }
    else {
        document.getElementById("meldungEnd").innerHTML 
            += "<br>Willst du noch mal spielen?";
    }
    document.getElementById("meldungEnd").innerHTML 
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
    document.getElementById("meldungEnd").innerHTML = '';
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

let numberPlayers;
let isCircleTurn;
let isSymbolOfHumanPlayerCircle;
let board;
initializeGame();
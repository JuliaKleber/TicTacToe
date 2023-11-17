"use strict";

// Wird benötigt um die Größen der Kacheln anzupassen.
const widthTiles = 130;
// Wird benötigt um die Größe der Symbole in den Kacheln anzupassen.
const symbolPadding = 20;
// Bestimmt wer am Zug ist.
let isCircleTurn;
// Speichert Informationen zum Zustand des Spielbretts.
let board;
// Speichert, ob ein oder zwei Menschen spielen
let numberHumanPlayers;
// Legt fest wer das Spiel beginnt, falls es nur einen menschlichen Spieler gibt.
let isComputerStartPlayer;
// Wird für die Strategie der KI benötigt, falls es nur einen menschlichen Spieler gibt.
let numberTurnKI;
// Bestimmt die Zeitverzögerung der Computerspielzüge.
const timeDelay = 350;

class Board {
  // Erstellt eine Klasse für ein Spielbrett.
  // Es können Werte für die Felder gespeichert werden.
  // Die Werte sind null (kein Kreis und kein Kreuz),
  // 1 (Kreuz) und 0 (Kreis).
  // Außerdem wird gespeichert, wie viele Kreuze und Kreise
  // sich in den Reihen, Spalten und Diagonalen befinden,
  // falls es nur einen menschlichen Spieler gibt.
  constructor(fields) {
    this.fields = fields;
    this.row1 = { cross: 0, circle: 0 };
    this.row2 = { cross: 0, circle: 0 };
    this.row3 = { cross: 0, circle: 0 };
    this.column1 = { cross: 0, circle: 0 };
    this.column2 = { cross: 0, circle: 0 };
    this.column3 = { cross: 0, circle: 0 };
    this.diagonal1 = { cross: 0, circle: 0 };
    this.diagonal2 = { cross: 0, circle: 0 };
  }
}


const initializeGamePart2 = () => {
  // Bereitet das Spiel vor.

  // Entweder startet der Computer
  // mit einer kleinen Zeitverzögerung
  // mit dem Setzen von Kreuzen
  // oder der Spieler startet.
  isComputerStartPlayer === true
  ? setTimeout(computerTurnCross, timeDelay)
  : humanTurnOn();
};

const initializeGraphicalBoard = () => {
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
      lineBreak.id = "br" + i;
    }
  }
};

const createCanvas = (id) => {
  // Erstellt Leinwände für das Spielbrett.
  const canvas = document.createElement("canvas");
  canvas.id = id;
  canvas.width = widthTiles;
  canvas.height = widthTiles;
  return canvas;
};

const drawSquaresInitial = () => {
  // Zeichnet am Anfang des Spiels 9 leere Kacheln.
  for (let i = 0; i < 9; i++) {
    const myCanvas = "myCanvas" + i;
    const canvas = document.getElementById(myCanvas);
    const context = canvas.getContext("2d");
    context.strokeWidth = 1;
    context.fillStyle = "yellow";
    context.strokeStyle = "black";
    context.fillRect(1, 1, widthTiles - 1, widthTiles - 1);
    context.strokeRect(1, 1, widthTiles - 1, widthTiles - 1);
  }
};

const createBoardInformation = () => {
  // Erstellt ein Instanz des Objekts board um
  // Informationen zum Spielbrett zu speichern.
  const emptyBoard = [];
  for (let i = 0; i < 9; i++) {
    emptyBoard.push(null);
  }
  const board = new Board(emptyBoard);
  return board;
};

const selectStartingPlayer = () => {
  // Es wird ein Paragraph p erstellt mit der Frage wer das Spiel beginnen soll.
  // Außerdem werden drei Buttons, "Ich", "Computer" und "zufällig" erstellt.
  const outputStart = document.getElementById("outputStart");
  outputStart.className = "show";
  const questionStartPlayer = document.createElement("p");
  questionStartPlayer.id = "questionStartPlayer";
  outputStart.appendChild(questionStartPlayer);
  questionStartPlayer.innerHTML = "Wer soll anfangen?<br>";
  const buttonHuman = createButton("buttonHuman", "Ich");
  questionStartPlayer.appendChild(buttonHuman);
  const buttonComputer = createButton("buttonComputer", "Computer");
  questionStartPlayer.appendChild(buttonComputer);
  const buttonRandom = createButton("buttonRandom", "zufällig");
  questionStartPlayer.appendChild(buttonRandom);
  let text = "";
  // Wenn einer der Buttons geklickt wird,
  // erscheint ein Text mit der Information wer das Spiel beginnt.
  // Mit der Spielvorbereitung wird fortgefahren
  // indem initializeGamePart2 aufgerufen wird.
  buttonHuman.addEventListener("click", (event) => {
    text += "Du beginnst! Dein Symbol ist Kreuz.";
    questionStartPlayer.innerHTML = text;
    isComputerStartPlayer = false;
    initializeGamePart2();
  });
  buttonComputer.addEventListener("click", (event) => {
    text += "Der Computer beginnt! Dein Symbol ist Kreis.";
    questionStartPlayer.innerHTML = text;
    isComputerStartPlayer = true;
    initializeGamePart2();
  });
  buttonRandom.addEventListener("click", (event) => {
    const random = Math.floor(Math.random() * 2);
    if (random === 0) {
      text += "Du beginnst! Dein Symbol ist Kreuz.";
      questionStartPlayer.innerHTML = text;
      isComputerStartPlayer = false;
      initializeGamePart2();
    } else {
      text += "Der Computer beginnt! Dein Symbol ist Kreis.";
      questionStartPlayer.innerHTML = text;
      isComputerStartPlayer = true;
      initializeGamePart2();
    }
  });
};

const createButton = (buttonName, value) => {
  // Mit dieser Funktion wird ein Button erstellt.
  const button = document.createElement("input");
  button.id = buttonName;
  button.type = "button";
  button.value = value;
  return button;
};

const humanTurnOn = () => {
  // Fügt Event-Listener für das Klickereignis auf die Kacheln hinzu.
  const boardContainer = document.getElementById("boardContainer");
  boardContainer.addEventListener("click", humanTurn);
};

const humanTurnOff = () => {
  // Entfernt Event-Listener für das Klickereignis auf die Kacheln.
  const boardContainer = document.getElementById("boardContainer");
  boardContainer.removeEventListener("click", humanTurn);
};

const humanTurn = (event) => {
  // Der Spieler ist am Zug.
  // Das Spielbrett wird aktualisiert,
  // gegebenenfalls wird das Ende des Spiels ausgelöst,
  // der aktive Spieler wird gewechselt.
  const clickedElement = event.target.tagName;
  if (clickedElement === "CANVAS") {
    // Bestimmt auf welches Feld geklickt wurde.
    const field = Number(event.target.id.slice(-1));
    // Falls sich schon ein Symbol in der geklickten Kachel befindet,
    // passiert nichts.
    if (board.fields[field] === null) {
      // Aktualisiert das Spielbrett.
      changeOfBoard(field);
      // Event Handler für das Klickereignis auf
      // die Kacheln des Spielbretts wird entfernt.
      humanTurnOff();
      // Prüft, ob Bedingungen für das Spielende erfüllt sind.
      const endOfGame = checkForEndOfGame();
      // Gegebenenfalls wird das Ende des Spiels ausgelöst.
      // Dann wird eine Meldung zum Spielende ausgegeben.
      // Gegebenenfalls wird das Spielbrett zurückgesetzt.
      endOfGame[0] === true && outputEndOfGame(endOfGame[1]);
      // Der Computergegner ist nun an der Reihe.
      isComputerStartPlayer === true
      ? setTimeout(computerTurnCross, timeDelay)
      : setTimeout(computerTurnCircle, timeDelay);
    }
  }
};

const computerTurnCross = () => {
  // Das Symbol wird zu Kreuz gewechselt.
  isCircleTurn = false;
  // Prüft, ob sich schon zwei Kreuze in einer Reihe befinden.
  // Falls ja, wird ein drittes Kreuz gesetzt
  // und isActionNeeded wird auf true gesetzt.
  const isActionNeeded = checkForTwoInARowAndCompleteIt("cross");
  let isReactionNeeded = false;
  // Prüft, ob sich zwei Kreise in einer Reihe befinden.
  // Falls ja, wird ein Kreuz in die Reihe gesetzt
  // und isReactionNeeded wird auf true gesetzt.
  isActionNeeded != true &&
  (isReactionNeeded = checkForTwoInARowAndCompleteIt("circle"));
  // Falls isActionNeeded und isReactionNeeded beide false sind,
  // versucht der Computer Kreuze so zu setzen, dass er gewinnen kann.
  if (isActionNeeded != true && isReactionNeeded != true) {
    if (numberTurnKI === 1) {
      changeOfBoard(0);
      numberTurnKI++;
    } else if (numberTurnKI === 2 && board.fields[8] === null) {
      changeOfBoard(8);
      numberTurnKI++;
    } else if (numberTurnKI === 2 && board.fields[8] === 0) {
      changeOfBoard(4);
      numberTurnKI++;
    } else if (
      numberTurnKI === 3 &&
      board.fields[8] === 1 &&
      board.fields[2] === null &&
      board.fields[1] === null &&
      board.fields[5] === 0
      ) {
        changeOfBoard(2);
        numberTurnKI++;
      } else if (
        numberTurnKI === 3 &&
      board.fields[8] === 1 &&
      board.fields[6] === null
    ) {
      changeOfBoard(6);
      numberTurnKI++;
    } else if (
      numberTurnKI === 3 &&
      board.fields[4] === 1 &&
      board.fields[1] === null &&
      board.fields[2] === null &&
      board.fields[7] === null
      ) {
        changeOfBoard(1);
        numberTurnKI++;
      } else if (
        numberTurnKI === 3 &&
        board.fields[4] === 1 &&
        board.fields[3] === null
        ) {
          changeOfBoard(3);
      numberTurnKI++;
    } else {
      for (let i = 0; i < 9; i++) {
        if (board.fields[i] === null) {
          changeOfBoard(i);
          break;
        }
      }
    }
  }
  // Prüft, ob Bedingungen für das Spielende erfüllt sind.
  const endOfGame = checkForEndOfGame();
  // Gegebenenfalls wird das Ende des Spiels ausgelöst.
  if (endOfGame[0] === true) {
    isCircleTurn = null;
    outputEndOfGame(endOfGame[1]);
  }
  // Ansonsten wird der aktive Spieler gewechselt.
  else {
    isCircleTurn = true;
    humanTurnOn();
  }
};

const computerTurnCircle = () => {
  // Das Symbol wird zu Kreis gewechselt.
  isCircleTurn = true;
  // Prüft, ob sich schon zwei Kreise in einer Reihe befinden.
  // Falls ja, wird ein dritter Kreis gesetzt
  // und isActionNeeded wird auf true gesetzt.
  const isActionNeeded = checkForTwoInARowAndCompleteIt("circle");
  let isReactionNeeded = false;
  // Prüft, ob sich zwei Kreuze in einer Reihe befinden.
  // Falls ja, wird ein Kreis in die Reihe gesetzt
  // und isReactionNeeded wird auf true gesetzt.
  isActionNeeded != true &&
  (isReactionNeeded = checkForTwoInARowAndCompleteIt("cross"));
  // Falls isActionNeeded und isReactionNeeded beide false sind,
  // versucht der Computer Kreise so zu setzen, dass er gewinnen kann.
  if (isActionNeeded != true && isReactionNeeded != true) {
    if (numberTurnKI === 1 && board.fields[4] === 1) {
      changeOfBoard(0);
      numberTurnKI++;
    } else if (numberTurnKI === 1) {
      changeOfBoard(4);
      numberTurnKI++;
    } else if (
      numberTurnKI === 2 &&
      board.fields[0] === 0 &&
      board.fields[8] === null
      ) {
        changeOfBoard(8);
        numberTurnKI++;
      } else if (
        numberTurnKI === 2 &&
        board.fields[0] === 0 &&
        board.fields[6] === null
    ) {
      changeOfBoard(6);
      numberTurnKI++;
    } else if (
      numberTurnKI === 2 &&
      board.fields[0] === 0 &&
      board.fields[2] === null
      ) {
        changeOfBoard(2);
        numberTurnKI++;
      } else if (
        numberTurnKI === 2 &&
        (board.fields[0] === 1 || board.fields[2] === 1) &&
      board.fields[1] === null
    ) {
      changeOfBoard(1);
      numberTurnKI++;
    } else if (
      numberTurnKI === 2 &&
      (board.fields[6] === 1 || board.fields[8] === 1) &
      (board.fields[7] === null)
      ) {
        changeOfBoard(7);
        numberTurnKI++;
      } else if (numberTurnKI === 3 && board.fields[6] === null) {
        changeOfBoard(6);
        numberTurnKI++;
      } else if (numberTurnKI === 3 && board.fields[2] === null) {
        changeOfBoard(2);
        numberTurnKI++;
      } else if (numberTurnKI === 3 && board.fields[8] === null) {
        changeOfBoard(8);
        numberTurnKI++;
      } else {
        for (let i = 0; i < 9; i++) {
          if (board.fields[i] === null) {
            changeOfBoard(i);
          break;
        }
      }
    }
  }
  // Prüft, ob Bedingungen für das Spielende erfüllt sind.
  const endOfGame = checkForEndOfGame();
  // Gegebenenfalls wird das Ende des Spiels ausgelöst.
  if (endOfGame[0] === true) {
    isCircleTurn = null;
    outputEndOfGame(endOfGame[1]);
  }
  // Ansonsten wird der aktive Spieler gewechselt.
  else {
    isCircleTurn = false;
    humanTurnOn();
  }
};

const checkForTwoInARowAndCompleteIt = (symbol) => {
  // Es wird geprüft, ob sich zwei gleiche Symbole
  // in den Reihen, Spalten und Diagonalen befinden.
  // Sobald eine Reihe, Spalte oder Diagonale gefunden wurde,
  // auf die das zutrifft, wird das Symbol,
  // das an die Funktion übergeben wurde,
  // auf das noch leere Feld dieser Reihe, Spalte
  // oder Diagonale gesetzt und die Funktion wird beendet.
  // In diesem Fall wird true zurückgegeben.
  if (board.row1[symbol] === 2) {
    if (board.fields[0] === null) {
      changeOfBoard(0);
      return true;
    } else if (board.fields[1] === null) {
      changeOfBoard(1);
      return true;
    } else if (board.fields[2] === null) {
      changeOfBoard(2);
      return true;
    }
  }
  if (board.row2[symbol] === 2) {
    if (board.fields[3] === null) {
      changeOfBoard(3);
      return true;
    } else if (board.fields[4] === null) {
      changeOfBoard(4);
      return true;
    } else if (board.fields[5] === null) {
      changeOfBoard(5);
      return true;
    }
  }
  if (board.row3[symbol] === 2) {
    if (board.fields[6] === null) {
      changeOfBoard(6);
      return true;
    } else if (board.fields[7] === null) {
      changeOfBoard(7);
      return true;
    } else if (board.fields[8] === null) {
      changeOfBoard(8);
      return true;
    }
  }
  if (board.column1[symbol] === 2) {
    if (board.fields[0] === null) {
      changeOfBoard(0);
      return true;
    } else if (board.fields[3] === null) {
      changeOfBoard(3);
      return true;
    } else if (board.fields[6] === null) {
      changeOfBoard(6);
      return true;
    }
  }
  if (board.column2[symbol] === 2) {
    if (board.fields[1] === null) {
      changeOfBoard(1);
      return true;
    } else if (board.fields[4] === null) {
      changeOfBoard(4);
      return true;
    } else if (board.fields[7] === null) {
      changeOfBoard(7);
      return true;
    }
  }
  if (board.column3[symbol] === 2) {
    if (board.fields[2] === null) {
      changeOfBoard(2);
      return true;
    } else if (board.fields[5] === null) {
      changeOfBoard(5);
      return true;
    } else if (board.fields[8] === null) {
      changeOfBoard(8);
      return true;
    }
  }
  if (board.diagonal1[symbol] === 2) {
    if (board.fields[0] === null) {
      changeOfBoard(0);
      return true;
    } else if (board.fields[4] === null) {
      changeOfBoard(4);
      return true;
    } else if (board.fields[8] === null) {
      changeOfBoard(8);
      return true;
    }
  }
  if (board.diagonal2[symbol] === 2) {
    if (board.fields[2] === null) {
      changeOfBoard(2);
      return true;
    } else if (board.fields[4] === null) {
      changeOfBoard(4);
      return true;
    } else if (board.fields[6] === null) {
      changeOfBoard(6);
      return true;
    }
  }
};

const changeOfBoard = (field) => {
  // Zeichnet ein Kreuz oder einen Kreis.
  drawSymbol(field);
  // Aktualisiert das Objekt board.
  if (isCircleTurn === true) {
    board.fields[field] = 0;
    incrementLine(field, "circle");
  } else {
    board.fields[field] = 1;
    incrementLine(field, "cross");
  }
};

const drawSymbol = (field) => {
  // Zeichnet entweder ein Kreuz oder einen Kreis.
  const myCanvas = "myCanvas" + field;
  const canvas = document.getElementById(myCanvas);
  const context = canvas.getContext("2d");
  context.strokeStyle = "black";
  context.lineWidth = 5;
  // Zeichnet einen Kreis
  if (isCircleTurn === true) {
    context.moveTo(symbolPadding, widthTiles / 2);
    context.arc(
      widthTiles / 2,
      widthTiles / 2,
      (widthTiles - 2 * symbolPadding) / 2,
      Math.PI,
      3 * Math.PI
      );
      // Zeichnet ein Kreuz
    } else if (isCircleTurn === false) {
      context.moveTo(symbolPadding, symbolPadding);
      context.lineTo(widthTiles - symbolPadding, widthTiles - symbolPadding);
      context.moveTo(symbolPadding, widthTiles - symbolPadding);
      context.lineTo(widthTiles - symbolPadding, symbolPadding);
    }
    context.stroke();
  };

  const incrementLine = (field, symbol) => {
    // Aktualisiert den Wert für die Anzahl der Symbole
    // in den Reihen, Spalten und Diagonalen des Boards.
    if (field === 0) {
      board.row1[symbol]++;
      board.column1[symbol]++;
      board.diagonal1[symbol]++;
    }
    if (field === 1) {
      board.row1[symbol]++;
      board.column2[symbol]++;
    }
    if (field === 2) {
      board.row1[symbol]++;
      board.column3[symbol]++;
      board.diagonal2[symbol]++;
    }
    if (field === 3) {
      board.row2[symbol]++;
      board.column1[symbol]++;
    }
    if (field === 4) {
    board.row2[symbol]++;
    board.column2[symbol]++;
    board.diagonal1[symbol]++;
    board.diagonal2[symbol]++;
  }
  if (field === 5) {
    board.row2[symbol]++;
    board.column3[symbol]++;
  }
  if (field === 6) {
    board.row3[symbol]++;
    board.column1[symbol]++;
    board.diagonal2[symbol]++;
  }
  if (field === 7) {
    board.row3[symbol]++;
    board.column2[symbol]++;
  }
  if (field === 8) {
    board.row3[symbol]++;
    board.column3[symbol]++;
    board.diagonal1[symbol]++;
  }
};

const checkForEndOfGame = () => {
  // Prüft, ob einer der Spieler drei gleiche Symbole in einer Reihe setzen konnte
  // oder ob alle Felder Symbole enthalten ohne,
  // dass drei gleiche Symbole in einer Reiche zu finden sind.
  let text = "";
  let endOfGame = false;
  // In dem Array winPatterns sind 8 Arrays gespeichert,
  // die die Reihen, Spalten und Diagonalen des Spielbretts representieren.
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  // Gewinnbedingungen für Spieler 1 (Kreuz)
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      board.fields[a] === 1 &&
      board.fields[b] === 1 &&
      board.fields[c] === 1
      ) {
        isComputerStartPlayer
        ? (text = "Der Computer hat gewonnen!")
        : (text = "Du hast gewonnen!");
        endOfGame = true;
        break;
      }
    }
    // Gewinnbedingungen für Spieler 2 (Kreis)
    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        board.fields[a] === 0 &&
        board.fields[b] === 0 &&
        board.fields[c] === 0
        ) {
          isComputerStartPlayer
          ? (text = "Du hast gewonnen!")
          : (text = "Der Computer hat gewonnen!");
      endOfGame = true;
      break;
    }
  }
  // Überprüfung auf ein Unentschieden
  if (!endOfGame && !board.fields.includes(null)) {
    text = "Das Spiel ist zu Ende. Keiner hat gewonnen.";
    endOfGame = true;
  }
  // Gibt true zurück, falls das Spielende erreicht wurde;
  // und dann auch einen entsprechenenden Text dazu,
  // der in der Funktion outputEndOfGame ausgegeben wird.
  // Sonst werden false und ein leerer String zurückgegeben.
  return [endOfGame, text];
};

const outputEndOfGame = (textEndOfGame) => {
  // Erzeugt eine Textausgabe zum Spielende.
  document.getElementById("outputStart").className = "hidden";
  document.getElementById("outputEnd").className = "show";
  document.getElementById("outputEnd").innerHTML = textEndOfGame;
  // Frage nach erneutem Spiel.
  document.getElementById("outputEnd").innerHTML +=
  "<br>Willst du noch mal spielen?";
  document.getElementById("outputEnd").innerHTML +=
  '&nbsp;&nbsp;<input value="Ja" onclick="resetGame()" type="button"></input>';
};

const resetGame = () => {
  // setzt das Spiel zurück damit
  // es noch mal gespielt werden kann.
  removeCanvases();
  initializeGamePart1();
};

const removeCanvases = () => {
  // Entfernt die Kacheln und die Meldung zum Spielende.
  const outputStart = document.getElementById("outputStart");
  const questionStartPlayer = document.getElementById("questionStartPlayer");
  outputStart.removeChild(questionStartPlayer);
  const boardContainer = document.getElementById("boardContainer");
  document.getElementById("outputEnd").innerHTML = "";
  document.getElementById("outputEnd").className = "hidden";
  const br2 = document.getElementById("br2");
  boardContainer.removeChild(br2);
  const br5 = document.getElementById("br5");
  boardContainer.removeChild(br5);
  for (let i = 0; i < 9; i++) {
    const myCanvas = "myCanvas" + i;
    const canvas = document.getElementById(myCanvas);
    boardContainer.removeChild(canvas);
  }
};

const initializeGamePart = () => {
  // Bereitet das Spiel vor.

  // Wird für die Strategie der KI benötigt.
  numberTurnKI = 1;
  // Kreuz fängt an.
  isCircleTurn = false;
  // Initialisiert das Objekt board um die
  // Information über das Spielbrett zu speichern.
  board = createBoardInformation();
  // Erstellt die leeren Leinwände für das Spiel
  initializeGraphicalBoard();
  // Zeichnet die Kacheln.
  drawSquaresInitial();
  // Fragt, welcher Spieler anfangen soll.
  if (numberHumanPlayers === 1) ? selectStartingPlayer() : activateBoardForClick();
};

initializeGamePart();

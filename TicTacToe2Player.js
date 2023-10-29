"use strict";

const widthTiles = 140;
const symbolPadding = 20;
let isCircleTurn;
let board;

class Board {
  // Erstellt eine Klasse für ein Spielbrett.
  // Es können Werte für die Felder gespeichert werden.
  // Die Werte sind null (kein Kreis und kein Kreuz),
  // 1 (Kreuz) und 0 (Kreis).
  constructor(fields) {
    this.fields = fields;
  }
}

const initializeGame = () => {
  // Bereitet das Spiel vor.

  // Initialisiert das Objekt board um die
  // Information über das Spielbrett zu speichern.
  board = createBoardInformation();
  // Erstellt die leeren Leinwände für das Spiel
  initializeGraphicalBoard();
  // Zeichnet die Kacheln.
  drawSquaresInitial();
  // Kreuz fängt an.
  isCircleTurn = false;
  // Aktiviert das Spielbrett für das Setzen von Kreisen und Kreuzen.
  activateBoardForClick();
};

const initializeGraphicalBoard = () => {
  // Erstellt die Leinwände für das Spielbrett
  // über die Funktion createCanvas
  // und fügt sie boardContainer hinzu.
  const boardContainer = document.getElementById("boardContainer");
  for (let i = 0; i < 9; i++) {
    const canvas = createCanvas("canvas" + i);
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
    const nameCanvas = "canvas" + i;
    const canvas = document.getElementById(nameCanvas);
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
  let emptyBoard = [];
  for (let i = 0; i < 9; i++) {
    emptyBoard.push(null);
  }
  const board = new Board(emptyBoard);
  return board;
};

const activateBoardForClick = () => {
  // Fügt Event-Listener für das Klickereignis auf das Spielbrett hinzu.
  const boardContainer = document.getElementById("boardContainer");
  boardContainer.addEventListener("click", clickHandler);
};

const clickHandler = (event) => {
  // Das Spielbrett wird aktualisiert,
  // der aktive Spieler wird gewechselt,
  // gegebenenfalls wird das Ende des Spiels ausgelöst.

  // Prüft, ob auf eine der Spielbrettkacheln geklickt wurde.
  const clickedElement = event.target;
  if (clickedElement.tagName === "CANVAS") {
    // Bestimmt auf welches Feld geklickt wurde.
    const field = Number(event.target.id.slice(-1));
    // Falls sich schon ein Symbol in der geklickten Kachel befindet,
    // passiert nichts.
    if (board.fields[field] == null) {
      // Aktualisiert das Spielbrett.
      updateBoard(field);
      // Wechselt den aktiven Spieler.
      isCircleTurn = changeTurnPlayers();
      // Prüft, ob Bedingungen für das Spielende erfüllt sind.
      const endOfGame = checkforEndOfGame();
      // Gegebenenfalls wird das Ende des Spiels ausgelöst.
      if (endOfGame[0] === true) {
        // Spielbrett wird deaktiviert.
        isCircleTurn = null;
        // Eine Meldung zum Spielende wird ausgegeben.
        // Gegebenenfalls wird das Spielbrett zurückgesetzt.
        outputEndOfGame(endOfGame[1]);
      }
    }
  }
};

const updateBoard = (field) => {
  // Zeichnet ein Kreuz oder einen Kreis.
  drawSymbol(field);
  // Aktualisiert das Objekt board.
  isCircleTurn === true ? (board.fields[field] = 0) : (board.fields[field] = 1);
};

const drawSymbol = (field) => {
  // Zeichnet entweder ein Kreuz oder einen Kreis.
  const nameCanvas = "canvas" + field;
  const canvas = document.getElementById(nameCanvas);
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

const changeTurnPlayers = () => {
  // ändert welcher Spieler am Zug ist
  isCircleTurn === true ? (isCircleTurn = false) : (isCircleTurn = true);
  return isCircleTurn;
};

const checkforEndOfGame = () => {
  // Prüft, ob einer der Spieler drei gleiche Symbole in einer Reihe setzen konnte
  // oder ob alle Felder Symbole enthalten ohne,
  // dass drei gleiche Symbole in einer Reiche zu finden sind.
  let text = "";
  let endOfGame = false;
  // In dem Array Patterns sind 8 Arrays gespeichert,
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
      text = "Spieler 1 hat gewonnen!";
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
  // gibt true zurück, falls das Spielende erreicht wurde
  // und dann auch einen entsprechenenden Text dazu,
  // der in der Funktion outputEndOfGame ausgegeben wird.
  // Sonst wird false und ein leerer String zurückgegeben.
  return [endOfGame, text];
};

const outputEndOfGame = (textEndOfGame) => {
  // Erzeugt eine Textausgabe zum Spielende.
  document.getElementById("outputEnd").className = "show";
  document.getElementById("outputEnd").innerHTML = textEndOfGame;
  // Frage nach erneutem Spiel.
  document.getElementById("outputEnd").innerHTML +=
    "<br>Wollt ihr noch mal spielen?";
  document.getElementById("outputEnd").innerHTML +=
    '<br><br><input value="Ja" onclick="resetGame()" type="button"></input>';
};

const resetGame = () => {
  // Setzt das Spiel zurück damit
  // es noch mal gespielt werden kann.
  removeCanvases();
  initializeGame();
};

const removeCanvases = () => {
  // Entfernt die Kacheln und die Meldung zum Spielende.
  const boardContainer = document.getElementById("boardContainer");
  document.getElementById("outputEnd").innerHTML = "";
  document.getElementById("outputEnd").className = "hidden";
  const br2 = document.getElementById("br2");
  boardContainer.removeChild(br2);
  const br5 = document.getElementById("br5");
  boardContainer.removeChild(br5);
  for (let i = 0; i < 9; i++) {
    const nameCanvas = "canvas" + i;
    const canvas = document.getElementById(nameCanvas);
    boardContainer.removeChild(canvas);
  }
};

initializeGame();

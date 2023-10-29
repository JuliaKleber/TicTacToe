"use strict";

let turn = "cross";

function addButton() {
  const board = document.getElementById("board");
  const button = document.createElement("button");
  board.appendChild(button);
}

function createBoard() {
  const board = document.getElementById("board");
  for (let i = 0; i < 9; i++) {
    addButton();
  }
}

function initializeEventListener() {
  const board = document.getElementById("board");
  board.addEventListener("click", function (event) {
    const target = event.target;
    if (target.tagName === "BUTTON" && !target.textContent) {
      turn === "cross"
        ? (target.textContent = "x")
        : (target.textContent = "o");
      changeTurns();
    }
  });
}

function changeTurns() {
  turn === "cross" ? (turn = "circle") : (turn = "cross");
}

createBoard();
initializeEventListener();
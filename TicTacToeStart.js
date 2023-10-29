"use strict";

const setNumberPlayers = () => {
  // Fragt, ob eine oder zwei Personen spielen wollen.
  const meldungStart = document.getElementById("meldungStart");
  const meldungNumberPlayers = document.createElement("p");
  meldungNumberPlayers.id = "meldungNumberPlayers";
  meldungStart.appendChild(meldungNumberPlayers);
  document.getElementById("meldungNumberPlayers").innerHTML =
    "<br>Ein-Spieler- oder Zwei-Spieler-Spiel?<br><br>";
  const buttonOnePlayer = createButton("buttonOnePlayer", "ein Spieler");
  meldungNumberPlayers.appendChild(buttonOnePlayer);
  buttonOnePlayer.addEventListener("click", (event) => {
    window.location.href = "TicTacToe1Player.html";
  });
  const buttonTwoPlayers = createButton("buttonTwoPlayers", "zwei Spieler");
  meldungNumberPlayers.appendChild(buttonTwoPlayers);
  buttonTwoPlayers.addEventListener("click", (event) => {
    window.location.href = "TicTacToe2Player.html";
  });
};

const createButton = (buttonName, value) => {
  const button = document.createElement("input");
  button.id = buttonName;
  button.type = "button";
  button.value = value;
  return button;
};

setNumberPlayers();

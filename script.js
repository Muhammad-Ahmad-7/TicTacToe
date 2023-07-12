const resetBtn = document.getElementById("reset-btn");
const boxText = document.getElementsByClassName("boxtext");
let audioTurn = new Audio("ting.mp3");
let audioGameOver = new Audio("gameover.mp3");
let isGameOver = false;
const urlParams = new URLSearchParams(window.location.search);
const player1 = decodeURIComponent(urlParams.get("name1"));
const player2 = decodeURIComponent(urlParams.get("name2"));
let currentPlayer = "X"; // Set initial player
resetBtn.addEventListener("click", () => {
  Array.from(boxText).forEach((element) => {
    element.innerText = "";
    document.getElementById("info-para").innerHTML = "Turn For " + player1;
    document.getElementById("bhai-saab").style.width = "0px";
    currentPlayer = "X";
    isGameOver = false;
    Array.from(boxText).forEach((element) => {
      element.parentElement.classList.remove("winning-box");
    });
  });
});
document.getElementById("info-para").innerHTML = "Turn For " + player1;
Array.from(boxText).forEach((element) => {
  element.addEventListener("click", () => {
    if (element.innerHTML === "") {
      audioTurn.play();
      element.innerHTML = currentPlayer;
      currentPlayer = currentPlayer === "X" ? "0" : "X";
      checkWin();
      if (!isGameOver) {
        if (currentPlayer == "X") {
          document.getElementById("info-para").innerHTML =
            "Turn For " + player1;
        } else {
          document.getElementById("info-para").innerHTML =
            "Turn For " + player2;
        }
      } else {
        audioGameOver.play();
        document.getElementById("bhai-saab").style.width = "150px";
      }
    }
  });
});

function checkWin() {
  const boxText = document.getElementsByClassName("boxtext");
  let wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  wins.forEach((e) => {
    // console.log(element);
    if (
      boxText[e[0]].innerText === boxText[e[1]].innerText &&
      boxText[e[2]].innerText === boxText[e[0]].innerText &&
      boxText[e[0]].innerText !== ""
    ) {
      if(document.querySelector("#info-para").innerText =
        boxText[e[0]].innerText == 'X'){
            document.getElementById('info-para').innerHTML = player1 + " Won";
        } else {
            document.getElementById('info-para').innerHTML = player2 + " Won";
        }
      isGameOver = true;
      boxText[e[0]].parentElement.classList.add("winning-box");
      boxText[e[1]].parentElement.classList.add("winning-box");
      boxText[e[2]].parentElement.classList.add("winning-box");
    }
  });
}

//instead of script tag in body, could put in head and add this:
//document.addEventListener('DOMContentLoaded', ()=>{})
//ideas:
//rebuild in react with components and state
//style to be a slime clearing game?
//aliens? space? with crazy physics?
const grid = document.querySelector(".grid");
const scoreBoard = document.querySelector("#scoreBoard");
const startButton = document.querySelector("#startButton");
const width = 8;
let score = 0;
const squares = [];
//colours array, alternatively can use images, 70x70px
//url(images/item.png)
//replace backgroundColour with backgroundImage
const colours = [
  "rgb(236, 88, 88)",
  "rgb(254, 255, 168)",
  "rgb(113, 210, 255)",
  "rgb(173, 255, 173)",
  "rgb(160, 149, 255)",
  "violet",
];

//build the game board: ----------------

function randomColourGenerator() {
  return Math.floor(Math.random() * colours.length);
}
function buildBoard() {
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement("div");
    square.setAttribute("draggable", true);
    square.setAttribute("id", i);
    let randomColour = randomColourGenerator();
    square.style.backgroundColor = colours[randomColour];
    grid.appendChild(square);
    squares.push(square);
  }
}
buildBoard();

//drag functionalities for the boxes. Create drag events:
//start, over, enter, leave, drop, end.
let currentColour;
let replacedColour;
let currentSquareId;
let replacedSquareId;

squares.forEach((square) => {
  square.addEventListener("dragstart", dragStart);
});

squares.forEach((square) => {
  square.addEventListener("dragover", dragOver);
});
squares.forEach((square) => {
  square.addEventListener("dragenter", dragEnter);
});

squares.forEach((square) => {
  square.addEventListener("dragleave", dragLeave);
});
squares.forEach((square) => {
  square.addEventListener("drop", dragDrop);
});
squares.forEach((square) => {
  square.addEventListener("dragend", dragEnd);
});

startButton.addEventListener("click", startGame);

//functions called upon these events-----------------
function dragStart() {
  currentColour = this.style.backgroundColor;
  currentSquareId = parseInt(this.id);
}
function dragOver(e) {
  e.preventDefault();
}
function dragEnter(e) {
  e.preventDefault();
}
function dragLeave() {
  this.style.backgroundColor = "";
}
function dragDrop() {
  replacedColour = this.style.backgroundColor;
  replacedSquareId = parseInt(this.id);
  this.style.backgroundColor = currentColour;
  squares[currentSquareId].style.backgroundColor = replacedColour;
}

function dragEnd() {
  //-------valid move functionality-------
  let validMoves = [
    currentSquareId - 1,
    currentSquareId - width,
    currentSquareId + 1,
    currentSquareId + width,
  ];
  let validMove = validMoves.includes(replacedSquareId);

  if (replacedSquareId && validMove) {
    replacedSquareId = null;
  } else if (replacedSquareId && !validMove) {
    squares[replacedSquareId].style.backgroundColor = replacedColour;
    squares[currentSquareId].style.backgroundColor = currentColour;
  } else {
    squares[currentSquareId].style.backgroundColor = currentColour;
  }
}
//-----------move down blocks & regenerate -------------
//lower blocks when some are cleared
function moveDown() {
  for (i = 0; i <= 55; i++) {
    if (squares[i + width].style.backgroundColor === "") {
      squares[i + width].style.backgroundColor =
        squares[i].style.backgroundColor;
      squares[i].style.backgroundColor = "";
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);
      if (isFirstRow && squares[i].style.backgroundColor === "") {
        let randomColour = randomColourGenerator();
        squares[i].style.backgroundColor = colours[randomColour];
      }
    }
  }
}
moveDown();

//check valid moves and move the blocks, change the score:
//-------check matches functionality THREE -------

//-------------check matches functionality FOUR -------------

function checkRowForFour() {
  for (i = 0; i <= 60; i++) {
    let row = [i, i + 1, i + 2, i + 3];
    let chosenColour = squares[i].style.backgroundColor;
    const isBlank = squares[i].style.backgroundColor === "";
    const nonValidIndex = [
      5,
      6,
      7,
      13,
      14,
      15,
      21,
      22,
      23,
      29,
      30,
      31,
      37,
      38,
      39,
      45,
      46,
      47,
      53,
      54,
      55,
    ];
    if (nonValidIndex.includes(i)) {
      continue;
    }
    if (
      row.every(
        (index) =>
          squares[index].style.backgroundColor === chosenColour && !isBlank
      )
    ) {
      score += 4;
      scoreBoard.innerHTML = score;
      row.forEach((index) => {
        squares[index].style.backgroundColor = "";
      });
    }
  }
}
// checkRowForFour();

function checkColumnForFour() {
  //up to 47, the size of the grid

  for (i = 0; i <= 39; i++) {
    let column = [i, i + width, i + width * 2, i + width * 3];
    let chosenColour = squares[i].style.backgroundColor;
    const isBlank = squares[i].style.backgroundColor === "";

    if (
      column.every(
        (index) =>
          squares[index].style.backgroundColor === chosenColour && !isBlank
      )
    ) {
      score += 4;
      scoreBoard.innerHTML = score;
      column.forEach((index) => {
        squares[index].style.backgroundColor = "";
      });
    }
  }
}
// checkColumnForFour();
//-------check matches functionality THREE -------

function checkRowForThree() {
  for (i = 0; i <= 61; i++) {
    let row = [i, i + 1, i + 2];
    let chosenColour = squares[i].style.backgroundColor;
    const isBlank = squares[i].style.backgroundColor === "";
    const nonValidIndex = [
      6,
      7,
      14,
      15,
      22,
      23,
      30,
      31,
      38,
      39,
      46,
      47,
      54,
      55,
    ];
    if (nonValidIndex.includes(i)) {
      continue;
    }
    if (
      row.every(
        (index) =>
          squares[index].style.backgroundColor === chosenColour && !isBlank
      )
    ) {
      score += 3;
      scoreBoard.innerHTML = score;
      row.forEach((index) => {
        squares[index].style.backgroundColor = "";
      });
    }
  }
}
// checkRowForThree();

function checkColumnForThree() {
  //up to 47, the size of the grid
  for (i = 0; i <= 47; i++) {
    let column = [i, i + width, i + width * 2];
    let chosenColour = squares[i].style.backgroundColor;
    const isBlank = squares[i].style.backgroundColor === "";

    if (
      column.every(
        (index) =>
          squares[index].style.backgroundColor === chosenColour && !isBlank
      )
    ) {
      score += 3;
      scoreBoard.innerHTML = score;
      column.forEach((index) => {
        squares[index].style.backgroundColor = "";
      });
    }
  }
}
// checkColumnForThree();

function startGame() {
  timerId = setInterval(function () {
    checkRowForFour();
    checkColumnForFour();
    checkRowForThree();
    checkColumnForThree();
    moveDown();
  }, 800);
  // if (score > 100) {
  //   clearInterval(timerId);
  // }
}

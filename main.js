//instead of script tag in body, could put in head and add this:
//document.addEventListener('DOMContentLoaded', ()=>{})

const grid = document.querySelector(".grid");
const width = 8;
const squares = [];
const colours = [
  "red",
  "rgb(254, 255, 168)",
  "rgb(113, 210, 255)",
  "rgb(173, 255, 173)",
  "rgb(160, 149, 255)",
  "violet",
];

//build the game board:
function buildBoard() {
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement("div");
    square.setAttribute("draggable", true);
    square.setAttribute("id", i);
    let randomColour = Math.floor(Math.random() * colours.length);
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

//functions called upon these events
function dragStart() {
  currentColour = this.style.backgroundColor;
  currentSquareId = parseInt(this.id);
  console.log(currentColour);
  console.log(this.id, "dragstart");
}
function dragOver(e) {
  e.preventDefault();
  console.log(this.id, "dragover");
}
function dragEnter(e) {
  e.preventDefault();
  console.log(this.id, "dragenter");
}
function dragLeave() {
  console.log(this.id, "dragleave");
}
function dragDrop() {
  console.log(this.id, "dragdrop");
  replacedColour = this.style.backgroundColor;
  replacedSquareId = parseInt(this.id);
  this.style.backgroundColor = currentColour;
  squares[currentSquareId].style.backgroundColor = replacedColour;
}

function dragEnd() {
  console.log(this.id, "dragend");
}

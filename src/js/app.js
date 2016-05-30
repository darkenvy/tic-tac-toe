console.log('Hello frontend');

// ======= Create Event Listeners =====//

document.addEventListener('DOMContentLoaded', function(){
  for (var i=0; i<=8; i++) {
    document.getElementById(i).addEventListener('mouseover', function(event){
      onMouse(event);
    });
    document.getElementById(i).addEventListener('mouseout', function(event){
      offMouse(event);
    });
    document.getElementById(i).addEventListener('click', function(event){
      clicked(event);
    });
  }
  // ================================= //
  document.getElementById("1P").addEventListener('click', function(event){
    event.preventDefault();
    console.log(event.path[0]);
    document.getElementById("1P").style.backgroundColor = "lightblue";
    document.getElementById("2P").style.backgroundColor = "white";
    mode = 0;
  });
  document.getElementById("2P").addEventListener('click', function(event){
    event.preventDefault();
    document.getElementById("1P").style.backgroundColor = "white";
    document.getElementById("2P").style.backgroundColor = "lightblue";
    mode = 1;
  });
});

// ===== Event Listener Function Calls ===== //

function onMouse(cell) {
  var path = event.path[1].childNodes[1]
  if (path.textContent == "") {
    path.style.backgroundColor = "lightgrey";
  }
}

function offMouse(cell) {
  event.path[1].childNodes[1].style.backgroundColor = "white";
}











// ============== Main ================== //

var turn = 0;
var mode = 0;
var board = [
[null,null,null],
[null,null,null],
[null,null,null]]

function clicked(cell) {
  var path = cell.path[1];
  // If cell is empty...
  if (getCell(path.id) == null) {
    playMove(0, path);
    // If in single player, play computer
    if (mode == 0) {
      computerPlay();
    }
  }
}


// =============== Mini Functions ================= //

function getCell(num) {
  // console.log("num: " + num);
  return board[Math.floor(num / 3)][num % 3];
}

function getNum(x,y) {
  return (x*3)+y;
}

function getSymbol(player=0) {
  if (mode == 1 && (turn % 2) == 1) {
    return "O";
  }
  else if (mode == 0 && player == 1) {
    return "O";
  }
  return "X";
}

function randomCell() {
  return Math.floor(Math.random()*9)
}

function randomPlay() {
  while (turn < 9) {
    rand = randomCell();
    if (getCell(rand) == null) {
      // place symbol
      playMove(1,null, rand);
      break;
    }
  }
}

// ==================================== //


function playMove(player, htmlpath, computerCell=null) {
  // If the computer is playing, it neds to pass in the cell number
  // so that a html path can be generated
  if (htmlpath === null) {
    htmlpath = document.getElementById(computerCell);
    // console.log(htmlpath);
  }

  // Get Symbol and set it to the database's board
  var symbol = getSymbol(player);
  board[Math.floor((htmlpath.id) / 3)][(htmlpath.id) % 3] = symbol; // getSymbol() = symbol ?? Doesn't work

  // color symbol before placing it
  if (symbol == "X") {
    htmlpath.classList.add("x");
  }
  else {
    htmlpath.classList.add("o");
  }

  // Place symbol on html
  htmlpath.childNodes[1].textContent = symbol;
  turn ++;
  console.log("turn: " + turn);

}



function computerPlay() {
  if (turn < 8) {
    console.log("Earlygame Random Move")
    randomPlay();
    return;
  }

  // if (aiCalc() == 1) {
  //   console.log("PERFORMING RANDOM MOVE")
  //   randomPlay();
  //   return;
  // }

}



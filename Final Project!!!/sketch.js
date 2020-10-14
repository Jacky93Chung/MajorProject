// Minesweeper
// Jacky Chung
// October 2020
//
// Extra for Experts:
// right click on mouse
// have 2 different 2d array grid


let GRIDSIZE; // length x width of the grid
let cellSize; //size of each little square
let grid;  // the grid

let state ="medium"; 


// sets up the game
function setup() {
  createCanvas(windowWidth, windowHeight);

  if (state === "easy"){ // shows a 9x9 grid
    GRIDSIZE = 3; 
    document.addEventListener("contextmenu", event => event.preventDefault());
  
    // determine his height or width is larger
    if (width < height) {
      cellSize = width / GRIDSIZE;
    }
    else {
      cellSize = height/ GRIDSIZE - 10 ;
    }

  
  
    grid = placemine(GRIDSIZE);  //grid for which square has mine

    
  }
  if (state === "medium"){ // shows a 9x9 grid
    GRIDSIZE = 9; 
    document.addEventListener("contextmenu", event => event.preventDefault());
  
    // determine his height or width is larger
    if (width < height) {
      cellSize = width / GRIDSIZE;
    }
    else {
      cellSize = height/ GRIDSIZE - 10 ;
    }

  
  
    grid = placemine(GRIDSIZE);  //grid for which square has mine

    
  }
  if  (state === "hard"){ // shows a 9x9 grid
    GRIDSIZE = 12; 
    document.addEventListener("contextmenu", event => event.preventDefault());
  
    // determine his height or width is larger
    if (width < height) {
      cellSize = width / GRIDSIZE;
    }
    else {
      cellSize = height/ GRIDSIZE - 10 ;
    }

  
  
    grid = placemine(GRIDSIZE);  //grid for which square has mine

    
  }
}

//shows functions on the page
function draw() {
  background(220);

  showMap();
  displayGrid();
  
  gameover();
 
}

// determine which side of the mouse is clicked
function mousePressed() {
  let spaceX = floor((mouseX - (width/2- cellSize*(GRIDSIZE/2)))/cellSize);
  let spaceY = floor((mouseY  - (height/2- cellSize*(GRIDSIZE/2)))/cellSize);

  if (state !== "blowAllMine"){
    if (mouseButton === LEFT){
      digBomb(spaceX ,spaceY);

    }
  
    else if (mouseButton === RIGHT){
      flagBomb(spaceX , spaceY);
    }
  }
  
}

//when left mouse is clicked, send signal that player decides to dig this square
function digBomb(spaceX, spaceY) {
  if (spaceX >= 0 && spaceX < GRIDSIZE && spaceY >= 0 && spaceY < GRIDSIZE) {
    
    if (grid[spaceY][spaceX].isMine === false && grid[spaceY][spaceX].flag === false && grid[spaceY][spaceX].status === "Not Clicked"){
      grid[spaceY][spaceX].status = "pressed";

    }
    
    else if ( grid[spaceY][spaceX].isMine === true && grid[spaceY][spaceX].status === "Not Clicked" && grid[spaceY][spaceX].flag === false) {
      grid[spaceY][spaceX].status = "blow up";
    }
  }
}

//when right mouse is clicked, sends signal that this square should be flagged
function flagBomb(spaceX, spaceY) {
  if (spaceX >= 0 && spaceX < GRIDSIZE && spaceY >= 0 && spaceY < GRIDSIZE) {
    
    if (grid[spaceY][spaceX].status === "Not Clicked" && grid[spaceY][spaceX].flag === false) {
     
      grid[spaceY][spaceX].flag = true;
      
    }
    
    else if (grid[spaceY][spaceX].flag === true){
      
      grid[spaceY][spaceX].flag = false;
    }
  }
  
}


// select which square is a mine at random 
function placemine(){
  let grid = [];
  let chanceOfHavingMine = 30; //set the chance of having a mine
  for (let y=0; y<GRIDSIZE; y++) {
    grid.push([]);
    for (let x=0; x<GRIDSIZE; x++) {
      
      if (random(100) < chanceOfHavingMine) {
        grid[y].push(new Square(true));
      }
      else {
        grid[y].push(new Square(false));
        
      }
    }
  }
  


  return grid;  
}


// determine how many mines are closeby
function showMap(){
  let  mineMap = [];
  for (let y=0; y<GRIDSIZE; y++) {
    mineMap.push([]);
    for (let x=0; x<GRIDSIZE; x++) {
      
      let closeMine = 0;
      
      if (x > 0 && x < GRIDSIZE - 1 && y > 0 && y < GRIDSIZE - 1) {
        for(let i=-1;i<=1;i++){
          for (let j=-1;j<=1;j++){
            if (grid[y+i][x+j].isMine === true){
              closeMine = closeMine+1;
            }
          }  
        }
        grid[y][x].closeMine = closeMine;
      }
      else if (x === 0 && y === 0) {
        for(let i=0;i<=1;i++){
          for (let j=0;j<=1;j++){
            if (grid[y+i][x+j].isMine === true){
              closeMine = closeMine+1;
            }
          }  
        }
        grid[y][x].closeMine = closeMine;
      }
      else if (x === 0 && y === GRIDSIZE - 1) {
        for(let i= -1 ;i<=0;i++){
          for (let j=0;j<=1;j++){
            if (grid[y+i][x+j].isMine === true){
              closeMine = closeMine+1;
            }
          }  
        }
        grid[y][x].closeMine = closeMine;
      }
      else if (x === GRIDSIZE - 1  && y === 0) {
        for(let i=0;i<=1;i++){
          for (let j=-1;j<=0;j++){
            if (grid[y+i][x+j].isMine === true){
              closeMine = closeMine+1;
            }
          }  
        }
        grid[y][x].closeMine = closeMine;
      }
      else if (x === GRIDSIZE - 1 && y=== GRIDSIZE - 1) {
        for(let i=-1;i<=0;i++){
          for (let j=-1;j<=0;j++){
            if (grid[y+i][x+j].isMine === true){
              closeMine = closeMine+1;
            }
          }  
        }
        grid[y][x].closeMine = closeMine;
      }

      else if (x > 0 && x < GRIDSIZE - 1 && y === 0) {
        for(let i=0;i<=1;i++){
          for (let j=-1;j<=1;j++){
            if (grid[y+i][x+j].isMine === true){
              closeMine = closeMine+1;
            }
          }  
        }
        grid[y][x].closeMine = closeMine;
      }
      else if (x > 0 && x < GRIDSIZE - 1 && y === GRIDSIZE - 1) {
        for(let i=-1;i<=0;i++){
          for (let j=-1;j<=1;j++){
            if (grid[y+i][x+j].isMine === true){
              closeMine = closeMine+1;
            }
          }  
        }
        grid[y][x].closeMine = closeMine;
      }
      else if (x === 0 && y > 0 && y < GRIDSIZE - 1) {
        for(let i=-1;i<=1;i++){
          for (let j=0;j<=1;j++){
            if (grid[y+i][x+j].isMine === true){
              closeMine = closeMine+1;
            }
          }  
        }
        grid[y][x].closeMine = closeMine;
      }
      else if (x === GRIDSIZE - 1 && y > 0 && y < GRIDSIZE - 1) {
        for(let i=-1;i<=1;i++){
          for (let j= -1 ;j<=0;j++){
            if (grid[y+i][x+j].isMine === true){
              closeMine = closeMine+1;
            }
          }  
        }
        grid[y][x].closeMine = closeMine;
      }
      
    }
  }
}

  


 


//"signal Center of the Grid" Control all color on grid
function displayGrid() {
  

  for (let y = 0; y<GRIDSIZE; y++) {
    for (let x= 0; x<GRIDSIZE; x++) {
      strokeWeight(1);
      
      // when square is safe show number - how many mine are closeby
      if (grid[y][x].status === "pressed"){
        fill("white");
        rect(x*cellSize + windowWidth/2 - cellSize*(GRIDSIZE/2), y*cellSize+ windowHeight/2 - cellSize*(GRIDSIZE/2), cellSize, cellSize);
        fill("black");
        textSize(cellSize * 0.8);
        textAlign(CENTER, CENTER);
        text(grid[y][x].closeMine, x*cellSize + windowWidth/2 - cellSize*(GRIDSIZE/2) +cellSize/2, y*cellSize+ windowHeight/2 - cellSize*(GRIDSIZE/2) + cellSize/2);
      }
      
      // determine which square should be orange (flag)
      else if (grid[y][x].flag === true ){
        fill("orange");
        rect(x*cellSize + windowWidth/2 - cellSize*(GRIDSIZE/2), y*cellSize+ windowHeight/2 - cellSize*(GRIDSIZE/2), cellSize, cellSize);
      }
      
      // change square to red if bomb
      else if (grid[y][x].status === "blow up"){
        fill("red");
        rect(x*cellSize + windowWidth/2 - cellSize*(GRIDSIZE/2), y*cellSize+ windowHeight/2 - cellSize*(GRIDSIZE/2), cellSize, cellSize);
        state = "blowAllMine";
      }
      
      // All squares are green when untouched
      else{
        fill("green");
        rect(x*cellSize + windowWidth/2 - cellSize*(GRIDSIZE/2), y*cellSize+ windowHeight/2 - cellSize*(GRIDSIZE/2), cellSize, cellSize);
      }
      
    }
    
  }
}



// if bomb is pressed, find all other bomb automactically and explode them
function gameover(){
  if (state === "blowAllMine"){
    for (let y = 0; y<GRIDSIZE; y++) {
      for (let x= 0; x<GRIDSIZE; x++) {
        if( grid[y][x].isMine === true ){
          fill("red");
          rect(x*cellSize + windowWidth/2 - cellSize*(GRIDSIZE/2), y*cellSize+ windowHeight/2 - cellSize*(GRIDSIZE/2), cellSize, cellSize);
        }
      }
    }

  }
}

class Square{
  constructor (isMine){
    this.isMine = isMine;
    this.closeMine ;
    this.status = "Not Clicked";
    this.flag = false;
  }
}
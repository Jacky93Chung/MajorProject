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
let chanceOfHavingMine;  //set the chance of having a mine
let state ="mainMenu"; 


// sets up the game
function setup() {
  createCanvas(windowWidth, windowHeight); 
  document.addEventListener("contextmenu", event => event.preventDefault());
}

//shows functions on the page
function draw() {
  background(220);
  if (state === "mainMenu"){
    userChooseLevel();
  }
  if (state ==="easy"|| state === "medium" || state === "hard" || state === "blowAllMine"){
    setUpGrid();
    displayGrid();
    showMap();
    gameover();
  }
 
}

function userChooseLevel() {

  //Easy Button
  rect(width/3/2 - 100 ,height/1.7 ,200,50);
  textSize(25);
  textAlign(CENTER, CENTER);
  text("Easy",width/3/2 - 100,height/1.7 ,200,50);

  //Medium Button
  rect(width*2/3 - width/3/2 - 100,height/1.7 ,200,50);
  textSize(25);
  textAlign(CENTER, CENTER);
  text("Medium",width*2/3 - width/3/2 - 100,height/1.7 ,200,50);

  //Hard Button
  rect(width - width/3/2 - 100, height/1.7 ,200,50);
  textSize(25);
  textAlign(CENTER, CENTER);
  text("Hard",width - width/3/2 - 100, height/1.7 ,200,50);

  //Easy Pop-up Button
  if (mouseX > width/3/2 - 100 && mouseX < width/3/2 + 100 && mouseY > height/1.7 && mouseY < height/1.7 +50 ){
    rect(width/3/2 - 120 ,height/1.7 - 20  ,240,90);
    textSize(35);
    textAlign(CENTER, CENTER);
    text("Easy",width/3/2 - 120,height/1.7 - 20,240,90);
    
  }

  //Medium Pop-up Button
  if (mouseX > width*2/3 - width/3/2 - 100 && mouseX < width*2/3 - width/3/2 + 100 && mouseY > height/1.7 && mouseY < height/1.7 +50 ){
    rect(width*2/3 - width/3/2 - 120 ,height/1.7 - 20  ,240,90);
    textSize(35);
    textAlign(CENTER, CENTER);
    text("Medium",width*2/3 - width/3/2 - 120 ,height/1.7 - 20  ,240,90);
    
  }

  //Hard Pop-up Button
  if (mouseX > width - width/3/2 - 100 && mouseX < width - width/3/2 + 100 && mouseY > height/1.7 && mouseY < height/1.7 +50 ){
    rect(width - width/3/2 - 120 ,height/1.7 - 20  ,240,90);
    textSize(35);
    textAlign(CENTER, CENTER);
    text("Hard",width - width/3/2 - 120 ,height/1.7 - 20  ,240,90);
  }
}

function setUpGrid(){
  if (state === "easy"){ // shows a 3x3 grid
    GRIDSIZE = 3; 
    chanceOfHavingMine = 20;
  }
  if (state === "medium"){ // shows a 9x9 grid
    GRIDSIZE = 9; 
    chanceOfHavingMine = 25;

  }
  if  (state === "hard"){ // shows a 12x12 grid
    GRIDSIZE = 12; 
    chanceOfHavingMine = 30;
  }
  
  
  // determine his height or width is larger
  if (width < height) {
    cellSize = width / GRIDSIZE;
  }
  else {
    cellSize = height/ GRIDSIZE - 10 ;
  }
  
  grid = placemine(GRIDSIZE);  //grid for which square has mine
}


// determine which side of the mouse is clicked
function mousePressed() {
  let spaceX = floor((mouseX - (width/2- cellSize*(GRIDSIZE/2)))/cellSize);
  let spaceY = floor((mouseY  - (height/2- cellSize*(GRIDSIZE/2)))/cellSize);
  
  if(state === "mainMenu"){
    if (mouseButton === LEFT && mouseX > width/3/2 - 100 && mouseX < width/3/2 + 100 && mouseY > height/1.7 && mouseY < height/1.7 +50){
      state = "easy";  
    }
    if (mouseButton === LEFT && mouseX > width*2/3 - width/3/2 - 100 && mouseX < width*2/3 - width/3/2 + 100 && mouseY > height/1.7 && mouseY < height/1.7 +50 ){
      state = "medium";  
    }
    if (mouseButton === LEFT && mouseX > width - width/3/2 - 100 && mouseX < width - width/3/2 + 100 && mouseY > height/1.7 && mouseY < height/1.7 +50){
      state = "hard";  
    }
  }
  if (state === "easy"||state ==="medium"||state ==="hard"){
    if (mouseButton === LEFT){
      digBomb(spaceX,spaceY);

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
  for (let y=0; y<GRIDSIZE; y++) {
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

function checkWin(){
  if (state === "easy"||state === "medium"||state === "hard"){

    let gameOver = 0;
    let mineTotal = 0;

    for (let y = 0; y<GRIDSIZE; y++) {
      for (let x= 0; x<GRIDSIZE; x++) {

        if (grid[y][x].isMine === true){
          mineTotal = mineTotal +1;
        }

        if(grid[y][x].status !== "Not Clicked"){
          gameOver = gameOver + 1;
        }
      }
    }
    if (gameOver === GRIDSIZE * GRIDSIZE - mineTotal){
      state = "userWin";
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
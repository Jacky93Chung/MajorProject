// Minesweeper
// Jacky Chung
// October 2020
//
// Extra for Experts:
// right click on mouse
// have 2 different 2d array grid

let timesRun;
let GRIDSIZE; // length x width of the grid
let cellSize; //size of each little square
let grid;  // the grid
let chanceOfHavingMine;  //set the chance of having a mine
let state ="mainMenu"; 
let mode;
let totalMine;
let timeWhenBlown;
let runCount;
let beginTime;
let timeOnTimer;
let userFinishTime;
//Images
let backgroundImage;
let flagImage;
let mineImage;
let wordImage;
let titleMineImage;
let timerImage;
let exitImage;

function preload() {
  backgroundImage = loadImage("assets/background.jpg");
  flagImage = loadImage("assets/flag.png");
  mineImage = loadImage("assets/spike.png");
  wordImage = loadImage("assets/word.png");
  titleMineImage = loadImage("assets/titlemine.png");
  timerImage = loadImage ("assets/timer.png");
  exitImage = loadImage("assets/exit.png");
}

// sets up the game
function setup() {
  createCanvas(windowWidth, windowHeight); 
  document.addEventListener("contextmenu", event => event.preventDefault());
}


//shows functions on the page
function draw() {
  background(220);
  image(backgroundImage,0,0,width,height);
  if (state === "mainMenu"){
    image(wordImage,width/2 -(width*2/5)/2, height/4,width*2/5, height/4);
    image(titleMineImage,width/3 -height/3.5, height/4,height/5, height/5);
    image(titleMineImage,width/2 + height/2.18, height/4,height/5, height/5);
    userChooseLevel();
    setting();
  }
  if (state ==="easy"|| state === "medium" || state === "hard" || state === "blowAllMine"){
    if (timesRun === 0){
      setUpGrid();
      showMap();
    }
    timer();
    displayGrid();
    allMine();
    checkWin();
    timesRun = timesRun + 1;
    setting();
  }
  if (state === "blowAllMine"){
    
    gameover();
  }

  if (state === "gameOver"){
    displayGrid();
    gameover();
    EndGameButton();
  }
  if (state === "userWin"){
    displayGrid();
    userTime();
    EndGameButton();
  }
}

// let startTime;
// function timer(){
//   millis();
//   startTime = 
// }

function userChooseLevel() {

  //Easy Button
  fill(255);
  rect(width/3/2 - 100 ,height/1.7 ,200,50);
  fill(0);
  textSize(25);
  textAlign(CENTER, CENTER);
  text("Easy",width/3/2 - 100,height/1.7 ,200,50);

  //Medium Button
  fill(255);
  rect(width*2/3 - width/3/2 - 100,height/1.7 ,200,50);
  fill(0);
  textSize(25);
  textAlign(CENTER, CENTER);
  text("Medium",width*2/3 - width/3/2 - 100,height/1.7 ,200,50);

  //Hard Button
  fill(255);
  rect(width - width/3/2 - 100, height/1.7 ,200,50);
  fill(0);
  textSize(25);
  textAlign(CENTER, CENTER);
  text("Hard",width - width/3/2 - 100, height/1.7 ,200,50);


  //Easy Pop-up Button
  if (mouseX > width/3/2 - 100 && mouseX < width/3/2 + 100 && mouseY > height/1.7 && mouseY < height/1.7 +50 ){
    fill(255);
    rect(width/3/2 - 120 ,height/1.7 - 20  ,240,90);
    fill(0);
    textSize(35);
    textAlign(CENTER, CENTER);
    text("Easy",width/3/2 - 120,height/1.7 - 20,240,90); 
  }

  //Medium Pop-up Button
  if (mouseX > width*2/3 - width/3/2 - 100 && mouseX < width*2/3 - width/3/2 + 100 && mouseY > height/1.7 && mouseY < height/1.7 +50 ){
    fill(255);
    rect(width*2/3 - width/3/2 - 120 ,height/1.7 - 20  ,240,90);
    fill(0);
    textSize(35);
    textAlign(CENTER, CENTER);
    text("Medium",width*2/3 - width/3/2 - 120 ,height/1.7 - 20  ,240,90); 
  }

  //Hard Pop-up Button
  if (mouseX > width - width/3/2 - 100 && mouseX < width - width/3/2 + 100 && mouseY > height/1.7 && mouseY < height/1.7 +50 ){
    fill(255);
    rect(width - width/3/2 - 120 ,height/1.7 - 20  ,240,90);
    fill(0);
    textSize(35);
    textAlign(CENTER, CENTER);
    text("Hard",width - width/3/2 - 120 ,height/1.7 - 20  ,240,90);
  }
}

function EndGameButton(){
  fill(255);
  rect(width*19/24,height/2 + 50,200,50);
  fill(0);
  textSize(25);
  textAlign(CENTER, CENTER);
  text("Main Menu", width*19/24, height/2 + 50,200,50);

  if (mouseX > width*19/24 && mouseX < width*19/24 + 200 && mouseY > height/2 + 50 && mouseY < height/2 + 100){
    fill(255);
   
    rect(width*19/24 - 20,height/2 + 30,240,90);
    fill(0);
    textSize(35);
    textAlign(CENTER, CENTER);
    text("Main Menu",width*19/24 - 20,height/2 + 30,240,90);
  }

  fill(255);
  rect(width*19/24, height/2 + 180 ,200,50);
  fill(0);
  textSize(25);
  textAlign(CENTER, CENTER);
  text("Try Again", width*19/24, height/2 + 180,200,50);

  if (mouseX > width*19/24 && mouseX < width*19/24 + 200 && mouseY > height/2 + 180 && mouseY < height/2 + 230){
    fill(255);
    rect(width*19/24 - 20, height/2 + 160,240,90);
    fill(0);
    textSize(35);
    textAlign(CENTER, CENTER);
    text("Try Again",width*19/24 - 20 , height/2 + 160,240,90);
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


function allMine(){
  fill(0);
  textSize(35);
  text(totalMine, width*9.3/10,height/10,width/20,height/15);
  image(flagImage,width*9.3/10 - 60 ,height/10,width/25,height/15);
}

// determine which side of the mouse is clicked
function mousePressed() {
 
  let spaceX = floor((mouseX - (width/2- cellSize*(GRIDSIZE/2)))/cellSize);
  let spaceY = floor((mouseY  - (height/2- cellSize*(GRIDSIZE/2)))/cellSize);
  
  if(state === "mainMenu"){
    if (mouseButton === LEFT && mouseX > width/3/2 - 100 && mouseX < width/3/2 + 100 && mouseY > height/1.7 && mouseY < height/1.7 +50){
      state = "easy"; 
      mode = "easy";
      timesRun = 0;
      runCount = 0;
      beginTime = millis();
    }
    if (mouseButton === LEFT && mouseX > width*2/3 - width/3/2 - 100 && mouseX < width*2/3 - width/3/2 + 100 && mouseY > height/1.7 && mouseY < height/1.7 +50 ){
      state = "medium";  
      mode = "medium";
      timesRun = 0;
      runCount = 0;
      beginTime = millis();
    }
    if (mouseButton === LEFT && mouseX > width - width/3/2 - 100 && mouseX < width - width/3/2 + 100 && mouseY > height/1.7 && mouseY < height/1.7 +50){
      state = "hard";  
      mode = "hard";
      timesRun = 0;
      runCount = 0;
      beginTime = millis();
    }
  }

  else if (state === "easy"|| state ==="medium"|| state ==="hard"){
    if (mouseButton === LEFT && mouseX > width/15 && mouseX< width/15 + 30 &&  mouseY>height*9/10 && mouseY < height*9/10+ 30 ){
      state = "mainMenu";
    }
    else if (mouseButton === LEFT){
      digBomb(spaceX,spaceY);

    }
    else if (mouseButton === RIGHT){
    
      flagBomb(spaceX , spaceY);
    
      
    }
    
    
  }

  else if (state === "gameOver" || state === "userWin"){
    if (mouseButton === LEFT && mouseX > width*19/24 && mouseX < width*19/24 + 200 && mouseY > height/2 + 50 && mouseY < height/2 + 100){
      state = "mainMenu";
    }
    
    if (mouseButton === LEFT && mouseX > width*19/24 && mouseX < width*19/24 + 200 && mouseY > height/2 + 180 && mouseY < height/2 + 230){
      beginTime = millis();
      state = mode;
      timesRun = 0;
    }
  }
  
}

function timer(){
  timeOnTimer = millis() - beginTime;
  text(ceil(timeOnTimer/1000)- 1,width/10 + 60,height/10 +5,50,50);
  image(timerImage,width/10,height/10,50,50);
}

//when left mouse is clicked, send signal that player decides to dig this square
function digBomb(spaceX, spaceY) {
  if (spaceX >= 0 && spaceX < GRIDSIZE && spaceY >= 0 && spaceY < GRIDSIZE) {
  
    if (grid[spaceY][spaceX].isMine === false && grid[spaceY][spaceX].flag === false && grid[spaceY][spaceX].status === "Not Clicked"){
      grid[spaceY][spaceX].status = "pressed";

    }
    
    else if (grid[spaceY][spaceX].isMine === true && grid[spaceY][spaceX].status === "Not Clicked" && grid[spaceY][spaceX].flag === false) {
      grid[spaceY][spaceX].status  = "blow up";
    } 
  } 
} 
 
//when right mouse is clicked, se nds signal that this square should be flagged
function flagBomb(spaceX, spaceY)  {
  if (spaceX >= 0 && spaceX < GRIDSIZE && spaceY >= 0 && spaceY < GRIDSIZE) {
    
    if (grid[spaceY][spaceX].status === "Not Clicked" && grid[spaceY][spaceX].flag === false) {
      if(totalMine>0){
        grid[spaceY][spaceX].flag = true;
        totalMine = totalMine - 1;
      
      }
    }
    
    else if (grid[spaceY][spaceX].flag === true){
      
      grid[spaceY][spaceX].flag = false;
      totalMine = totalMine + 1;
    }
  }
  
}


// select which square is a mine at random 
function placemine(){
  let grid = [];
  totalMine = 0;
  for (let y=0; y<GRIDSIZE; y++) {
    grid.push([]);
    for (let x=0; x<GRIDSIZE; x++) {
      
      if (random(100) < chanceOfHavingMine) {
        grid[y].push(new Square(true));
        totalMine = totalMine + 1;
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

function setting(){
  if (state === "easy" || state === "medium" || state === "hard") {
    image(exitImage,width/15, height*9/10,30,30);
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
        image(flagImage,x*cellSize + windowWidth/2 - cellSize*(GRIDSIZE/2), y*cellSize+ windowHeight/2 - cellSize*(GRIDSIZE/2), cellSize, cellSize);
      }
      
      // change square to red if bomb
      else if (grid[y][x].status === "blow up"){
        
        fill("red");
        rect(x*cellSize + windowWidth/2 - cellSize*(GRIDSIZE/2), y*cellSize+ windowHeight/2 - cellSize*(GRIDSIZE/2), cellSize, cellSize);
        image(mineImage,x*cellSize + windowWidth/2 - cellSize*(GRIDSIZE/2), y*cellSize+ windowHeight/2 - cellSize*(GRIDSIZE/2), cellSize, cellSize);
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
      state = "userWin" ;
      
    }  
  }
}

function userTime(){
  if (runCount === 0){
    userFinishTime = timeOnTimer;
    runCount = runCount+ 1;
  }
  fill("black");
  console.log(width/20,height/15);
  textSize(40);
  text(ceil(userFinishTime/1000),width/10 + 60,height/10 +5,50,50);
  image(timerImage,width/10,height/10,50,50);
  text("Your Time:" +" "+ ceil(userFinishTime/1000), width*1.3/10,height*7/10);
}

// if bomb is pressed, find all other bomb automactically and explode them
function gameover(){
  for (let y = 0; y<GRIDSIZE; y++) {
    for (let x= 0; x<GRIDSIZE; x++) {
      if( grid[y][x].isMine === true ){
        fill("red");
        rect(x*cellSize + windowWidth/2 - cellSize*(GRIDSIZE/2), y*cellSize+ windowHeight/2 - cellSize*(GRIDSIZE/2), cellSize, cellSize);
        image(mineImage,x*cellSize + windowWidth/2 - cellSize*(GRIDSIZE/2), y*cellSize+ windowHeight/2 - cellSize*(GRIDSIZE/2), cellSize, cellSize);
      }
    }
  }
  state = "gameOver";
}

class Square{
  constructor (isMine){
    this.isMine = isMine;
    this.closeMine ;
    this.status = "Not Clicked";
    this.flag = false;
  }
}
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
let state = "mainMenu"; //determine which state
let mode;
let totalMine; 
let timeWhenBlown;
let runCount;

//timer variables
let beginTime;
let timeOnTimer;  
let userFinishTime;  
let help = false; // help page variable
let highscoreE;  //High score for easy mode
let highscoreM;  //High score for medium mode
let highscoreH; //High score for hard mode

let part; //page variable for help tab

//Images
let backgroundImage;
let flagImage;
let mineImage;
let wordImage;
let titleMineImage;
let timerImage;
let exitImage;
let helpImage;
let crossImage;
let arrowImage;
let arrow2Image;
let bombSound;
let mouseClickRightImage;
let mouseClickLeftImage;


function preload() {    //Preload Images/sounds
  backgroundImage = loadImage("assets/background.jpg");
  flagImage = loadImage("assets/flag.png");
  mineImage = loadImage("assets/spike.png");
  wordImage = loadImage("assets/word.png");
  titleMineImage = loadImage("assets/titlemine.png");
  timerImage = loadImage ("assets/timer.png");
  exitImage = loadImage("assets/exit.png");
  helpImage = loadImage("assets/information.png");
  crossImage = loadImage("assets/cross.png");
  arrowImage = loadImage("assets/arrow.png");
  arrow2Image = loadImage("assets/arrow2.png");
  mouseClickRightImage = loadImage("assets/mouseclick(right).png");
  mouseClickLeftImage = loadImage("assets/mouseclick(left).png");
  // soundFormats('mp3','ogg');
  // bombSound = loadSound("assets/bombsound.mp3");
}

// sets up the game
function setup() {
  createCanvas(windowWidth, windowHeight); 
  document.addEventListener("contextmenu", event => event.preventDefault());
  highscoreE = getItem("easyHighScore");
  
}


//shows functions on the page
function draw() {
  if (help === true){
    helpTab();
  }
  else {
    background(220);
    image(backgroundImage,0,0,width,height);
    image(helpImage,width*0.5/15, height*9/10,30,30);
    //main menu mode
    if (state === "mainMenu"){
      image(wordImage,width/2 - width*2/5/2, height/4,width*2/5, height/4);
      image(titleMineImage,width/2 - width*2/5/2 - height/4, height/4,height/5, height/5);
      image(titleMineImage,width/2 - width*2/5/2 + width*2/5 + height/4 - height/5, height/4,height/5, height/5);
      userChooseLevel();
      leave();
    }
    //easy,medium,hard,blwallmine mode
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
      leave();
    }
    //blow all mine mode
    if (state === "blowAllMine"){
      
      gameover();
    }
    //user lose mode
    if (state === "gameOver"){
      displayGrid();
      gameover();
      EndGameButton();
      feelsBad();
    }
    //user win mode
    if (state === "userWin"){
      
      displayGrid();
      userTime();
      EndGameButton();
      wellDone();
    }
  }
}

function helpTab(){    //the information tab
  if (part === 1){     // help page 1
  
    background(220);
    image(backgroundImage,0,0,width,height); 
    image(crossImage, width * 9.3/10, height *0.05,40,40);
    image(arrowImage, width *9.3/10, height/2 - 25,50,50);
    textSize (60);
    text("How to Play", width /2 - 20, height*1.5/10);
    textSize (40);
    text("Step 1: Pick a random square",width/2 - 20,height*3/10);
    text("Step 2: Try and find out which squares are safe",width/2 - 20,height*4/10);
    text("Step 3: Flag the ones that you think are bombs",width/2 - 20,height*5/10);
    text("Step 4: Clear all the safe squares to win",width/2 - 20,height*6/10);
  }
  else if (part === 2){      // help page 2
    background(220);
    image(backgroundImage,0,0,width,height); 
    image(crossImage, width * 9.3/10, height *0.05,40,40);
    image(arrow2Image, width *0.7/10, height/2 - 25,50,50);
    textSize (60);
    text("Help", width /2 - 20, height*1.5/10);
    textSize(40);
    textAlign(LEFT);
    text ("=   Normal",width*3.2/10,height*2.5/8);
    text("=   Flagged",width*3.2/10,height*4.5/8);
    text("=   Blown Up",width*3.2/10,height*3.5/8);
    text("=   To Dig square",width*6.4/10,height*3/8);
    text("=   To Flag Square",width*6.4/10,height*5/8);
    text ("=   Safe" ,width*3.2/10,height*5.5/8);
    textSize(30);
    text ("(The number represents the amount of mines around the square)",width*1/10,height*6/8);
    rectMode(CENTER);
    fill("green");
    rect(width*2.5/10,height*2.5/8,width/30,width/30);
    fill("red");
    rect(width*2.5/10,height*3.5/8,width/30,width/30);
    imageMode(CENTER);
    image(mineImage,width*2.5/10,height*3.5/8,width/30,width/30);
    image(mouseClickRightImage,width*5.7/10,height*5/8,width/20,width/20);
    image(mouseClickLeftImage,width*5.7/10,height*3/8,width/20,width/20);
    fill("yellow");
    rect(width*2.5/10,height*4.5/8,width/30,width/30);
    image(flagImage,width*2.5/10,height*4.5/8,width/30,width/30);
    fill("white");
    rect(width*2.5/10,height*5.5/8,width/30,width/30);
    fill("black");
    textSize(width/35);
    textAlign(CENTER);
    text("6",width*2.5/10,height*5.5/8);
    fill("black");
    imageMode(CORNER);
    
    rectMode(CORNER);

  }

}

function userChooseLevel() { //buttons for easy medium hard

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

function EndGameButton(){  //buttons for try again and main menu
  //main menu button
  fill(255);
  rect(width*19/24,height/2 + 50,200,50);
  fill(0);
  textSize(25);
  textAlign(CENTER, CENTER);
  text("Main Menu", width*19/24, height/2 + 50,200,50);

  //main menu pop-up button
  if (mouseX > width*19/24 && mouseX < width*19/24 + 200 && mouseY > height/2 + 50 && mouseY < height/2 + 100){
    fill(255);
   
    rect(width*19/24 - 20,height/2 + 30,240,90);
    fill(0);
    textSize(35);
    textAlign(CENTER, CENTER);
    text("Main Menu",width*19/24 - 20,height/2 + 30,240,90);
  }
  //try again button
  fill(255);
  rect(width*19/24, height/2 + 180 ,200,50);
  fill(0);
  textSize(25);
  textAlign(CENTER, CENTER);
  text("Try Again", width*19/24, height/2 + 180,200,50);

  //try again pop-up button
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

//determines total numbers of mine in the grid
function allMine(){
  fill(0);
  textSize(35);
  text(totalMine, width*9.3/10,height/10,width/20,height/15);
  image(flagImage,width*9.3/10 - 60 ,height/10,width/25,height/15);
}

// determine mouse function is happening
function mousePressed() {
  //information button response
  if (mouseX > width*0.5/15 && mouseX < width*0.5/15 + 30 && mouseY > height*9/10 && mouseY < height*9/10 + 30){
    help = true;
    part = 1;
  }
  //help tab change to page 2 response
  else if (part === 1 && help === true && mouseX > width *9.3/10 && mouseX< width *9.3/10 +50 && mouseY > height/2 -25 && mouseY < height + 25){
    part = 2;
  }
  //help tab change back to page 1 response
  else if (part === 2 && help === true && mouseX > width*0.7/10 && mouseX < width*0.7/10 + 50 && mouseY > height/2 - 25 && mouseY < height/2 +25){
    part = 1;
  }
  //help tab exit response
  else if (help === true && mouseX > width * 9.3/10 && mouseX < width * 9.3/10 + 40 && mouseY > height *0.05 && mouseY < height *0.05 + 40){
    help = false;
  }
  if (help === false){
    let spaceX = floor((mouseX - (width/2- cellSize*(GRIDSIZE/2)))/cellSize);
    let spaceY = floor((mouseY  - (height/2- cellSize*(GRIDSIZE/2)))/cellSize);
  
    if(state === "mainMenu"){
      //start timer sensor
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
      //exit button response
      if (mouseButton === LEFT && mouseX > width/15 && mouseX< width/15 + 30 &&  mouseY>height*9/10 && mouseY < height*9/10+ 30 ){
        state = "mainMenu";
      }

      //dig bomb response
      else if (mouseButton === LEFT && mouseX > width*0.5/15 + 30){
        digBomb(spaceX,spaceY);

      }
      //flag bomb response
      else if (mouseButton === RIGHT){
        flagBomb(spaceX , spaceY);
    
      
      }
    
    
    }

    else if (state === "gameOver" || state === "userWin"){
      //main menu button response
      if (mouseButton === LEFT && mouseX > width*19/24 && mouseX < width*19/24 + 200 && mouseY > height/2 + 50 && mouseY < height/2 + 100){
        state = "mainMenu";
      }
      //try again button response
      if (mouseButton === LEFT && mouseX > width*19/24 && mouseX < width*19/24 + 200 && mouseY > height/2 + 180 && mouseY < height/2 + 230){
        beginTime = millis();
        state = mode;
        timesRun = 0;
      } 
    }
  } 
}
//timer
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
        totalMine = totalMine - 1; //total mine counter left goes down when flagged
      
      }
    }
    
    else if (grid[spaceY][spaceX].flag === true){
      grid[spaceY][spaceX].flag = false;
      totalMine = totalMine + 1; //total mine counter left goes back up when unflagged
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

// function bombsound(){
//   bombSound.play();
// }

//door leave
function leave(){
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
        // bombSound.play();
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

//check if the player has won(click all non-bomb square)
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

//timer function
function userTime(){
  
  if (runCount === 0){
    userFinishTime = timeOnTimer;
    runCount = runCount+ 1;
  }
  fill("black");
  textSize(40);
  text(ceil(userFinishTime/1000),width/10 + 60,height/10 +5,50,50);
  image(timerImage,width/10,height/10,50,50);
  text("Your Time:" +" "+ ceil(userFinishTime/1000), width*1.3/10,height*7/10);

  //determine if the user beat the highscore or not for all modes
  if (mode === "easy"){
    if (highscoreE === null) {
      highscoreE = ceil(userFinishTime/1000);
      text("New High Score!!",width*1.3/10,height*6/10);
    }
    else if (ceil(userFinishTime/1000)< highscoreE){
      storeItem("easyHighScore",ceil(userFinishTime/1000));
      text("New High Score!!",width*1.3/10,height*6/10);
    }
    text("High Score:" +" "+ highscoreE, width*1.3/10,height*8/10);
    
  }
  if (mode === "medium"){
    highscoreM = getItem("mediumHighScore");
    if (highscoreM === null) {
      highscoreM = ceil(userFinishTime/1000) ;
      text("New High Score!!",width*1.3/10,height*6/10);
    }
    else if (ceil(userFinishTime/1000)< highscoreM){
      storeItem("mediumHighScore",ceil(userFinishTime/1000));
      text("New High Score!!",width*1.3/10,height*6/10);
    }
    text("High Score:" +" "+ highscoreM, width*1.3/10,height*8/10);
  }
  if (mode === "hard"){
    highscoreH = getItem("hardHighScore");
    if (highscoreH === null) {
      highscoreH = ceil(userFinishTime/1000) ;
      text("New High Score!!",width*1.3/10,height*6/10);
    }
    else if (ceil(userFinishTime/1000)< highscoreH){
      storeItem("hardHighScore",ceil(userFinishTime/1000));
      text("New High Score!!",width*1.3/10,height*6/10);
    }
    text("High Score:" +" "+ highscoreH, width*1.3/10,height*8/10);
  }

}

//words pop-up when game is lost
function feelsBad(){
  textSize(40);
  text("So Close!",width*19/24 +100,height/3);
  textSize(40);
  text("Try Again!",width*19/24 +100,height*2/5);
}
//words pop - up when game is won
function wellDone(){
  textSize(40);
  text("You Did It!",width*19/24 +100,height/3);
  textSize(40);
  text("Nice Work!",width*19/24 +100,height*2/5);
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

//clase set up 
class Square{
  constructor (isMine){
    this.isMine = isMine;
    this.closeMine ;
    this.status = "Not Clicked";
    this.flag = false;
  }
}

//end
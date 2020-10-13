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
let mineMap;  //the 2d grid for where mines are
let state ="start9Grid"; 

 
// sets up the game
function setup() {
  createCanvas(windowWidth, windowHeight);

 
  if (state === "start9Grid"){ // shows a 9x9 grid
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

    mineMap = showMap(GRIDSIZE); // grid for how many mines are closeby
  
  }
}

//shows functions on the page
function draw() {
  background(220);
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
  
    if (mouseButton === RIGHT){
      flagBomb(spaceX , spaceY);
    }
  }
  
}

//when left mouse is clicked, send signal that player decides to dig this square
function digBomb(spaceX, spaceY) {
  if (spaceX >= 0 && spaceX < GRIDSIZE && spaceY >= 0 && spaceY < GRIDSIZE) {
    
    if (grid[spaceY][spaceX] === "no mine" && grid[spaceY][spaceX] !== "flaged" ||grid[spaceY][spaceX] === "pressed" && grid[spaceY][spaceX] !== "flaged" ) {
      grid[spaceY][spaceX] = "pressed";

    }
    
    else if ( grid[spaceY][spaceX] === "mine" ||grid[spaceY][spaceX] === "blow up ") {
      grid[spaceY][spaceX] = "blow up";
    }
  }
}

//when right mouse is clicked, sends signal that this square should be flagged
function flagBomb(spaceX, spaceY) {
  if (spaceX >= 0 && spaceX < GRIDSIZE && spaceY >= 0 && spaceY < GRIDSIZE) {
    
    if (grid[spaceY][spaceX] !== "blow up" && grid[spaceY][spaceX] !== "pressed" && grid[spaceY][spaceX] !== "no mineflaged" && grid[spaceY][spaceX] !== "mineflaged" ) {
     
      if (grid[spaceY][spaceX] === "mine"){
        grid[spaceY][spaceX] ="mineflaged";
      }
      
      else if (grid[spaceY][spaceX] === "no mine"){
        grid[spaceY][spaceX] ="no mineflaged";
      }
    }
    
    else if (grid[spaceY][spaceX] === "mine" || grid[spaceY][spaceX] === "no mine" || grid[spaceY][spaceX] === "no mineflaged" || grid[spaceY][spaceX] === "mineflaged"  ){
      
      if (grid[spaceY][spaceX] === "mineflaged"){
        grid[spaceY][spaceX] ="mine";
      }
     
      else if (grid[spaceY][spaceX] === "no mineflaged"){
        grid[spaceY][spaceX] ="no mine";
      }
    }
  }
  
}


// select which square is a mine at random 
function placemine(){
  let grid = [];
  let chanceOfHavingMine = 30; //set the chance of having a mine
  for (let i=0; i<GRIDSIZE; i++) {
    grid.push([]);
    for (let j=0; j<GRIDSIZE; j++) {
      
      if (random(100) < chanceOfHavingMine) {
        grid[i].push("mine");
      }

      else {
        grid[i].push("no mine");
        
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
      
      if (x>= 0 && x< GRIDSIZE && y - 1>= 0 && y + 1  < GRIDSIZE) {
        for(let i=-1;i<=1;i++){
          for (let j=-1;j<=1;j++){
            if (grid[y+i][x+j] === "mine"){
              closeMine = closeMine+1;
            }
          }  
        }
        mineMap[y].push(closeMine);
      }
      
      else if (x>= 0 && x < GRIDSIZE && y + 1> 0 && y + 1  < GRIDSIZE) {
        for(let i=0;i<=1;i++){
          for (let j=-1;j<=1;j++){
            if (grid[y+i][x+j] === "mine"){
              closeMine = closeMine+1;
            }
          }  
        }
        mineMap[y].push(closeMine);
      }
      
      else{
        for(let i=-1;i<=0;i++){
          for (let j=-1;j<=1;j++){
            if (grid[y+i][x+j] === "mine"){
              closeMine = closeMine+1;
            }
          }
        }
        mineMap[y].push(closeMine);
      } 
    }
  }
  
  return mineMap;
}


//"signal Center of the Grid" Control all color on grid
function displayGrid() {
  

  for (let y = 0; y<GRIDSIZE; y++) {
    for (let x= 0; x<GRIDSIZE; x++) {
      strokeWeight(1);
      
      // when square is safe show number - how many mine are closeby
      if (grid[y][x] === "pressed"){
        fill("white");
        rect(x*cellSize + windowWidth/2 - cellSize*(GRIDSIZE/2), y*cellSize+ windowHeight/2 - cellSize*(GRIDSIZE/2), cellSize, cellSize);
        fill("black");
        textSize(cellSize * 0.8);
        textAlign(CENTER, CENTER);
        text(mineMap[y][x],x*cellSize + windowWidth/2 - cellSize*(GRIDSIZE/2) +cellSize/2, y*cellSize+ windowHeight/2 - cellSize*(GRIDSIZE/2) + cellSize/2);
      }
      
      // determine which square should be orange (flag)
      else if (grid[y][x] === "mineflaged" || grid[y][x] === "no mineflaged"){
        fill("orange");
        rect(x*cellSize + windowWidth/2 - cellSize*(GRIDSIZE/2), y*cellSize+ windowHeight/2 - cellSize*(GRIDSIZE/2), cellSize, cellSize);
      }
      
      // change square to red if bomb
      else if (grid[y][x] === "blow up"){
        fill("red");
        rect(x*cellSize + windowWidth/2 - cellSize*(GRIDSIZE/2), y*cellSize+ windowHeight/2 - cellSize*(GRIDSIZE/2), cellSize, cellSize);
        state ="blowAllMine";
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
    for (let i = 0; i<GRIDSIZE; i++) {
      for (let j= 0; j<GRIDSIZE; j++) {
        if( grid[j][i] === "mine" ||grid[j][i] === "mineflaged" ){
          fill("red");
          rect(i*cellSize + windowWidth/2 - cellSize*(GRIDSIZE/2), j*cellSize+ windowHeight/2 - cellSize*(GRIDSIZE/2), cellSize, cellSize);
        }
      }
    }

  }
}
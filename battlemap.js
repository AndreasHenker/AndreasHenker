const img = new Image();
img.onload = function() {
  alert("Map Size: \n"+ Math.round(this.width/32) +" x "+ Math.round(this.height/32) +" squares.");
}

let img_array = ["./maps/ambush01.jpg", "./maps/ambush02.jpg"]


function changeMap(i){
  let img_src = img_array[i];
  let img_elem = document.getElementById("map_img");
  img_elem.src = img_src;
}

function clickBattleSqr(){
  let squares_on_grid = document.querySelectorAll(".battlesquare");
  console.log(squares_on_grid.length);
}

function clearGrid(){
  let grid = document.getElementById("battlegrid");
  grid.innerHTML = "";
  clickBattleSqr();
}

function showCoordinats(element){
    console.log(element.id);
    console.log(element.textContent);
}

function resize(new_width, cols, new_height, rows, size=32, battlemap=document.getElementById("battlemap")){
  window.alert(new_width+"/"+new_height+" canvas"+ cols+"/"+rows);
  
  let map_img = document.getElementById("map_img");
  map_img.width = `${new_width}px`;
  map_img.height = `${new_height}px`;
  window.alert(cols +" "+ rows);
  let grid = document.getElementById("battlegrid");
  grid.style.gridTemplateColumns = `repeat(${cols}, 1fr);`;
  grid.style.gridTemplateRows = `repeat(${rows}, 1fr);`;
  
  battlemap.width = new_width;
  battlemap.style.gridTemplateColumns = `${new_width}px`;
  battlemap.style.gridTemplateRows = `${new_height}px`;

  let add_to_grid ="";
  for(let i = 1; i <= cols*(rows+1); i++ ){
    add_to_grid += `<div id="bsqr${i}" onclick="showCoordinats(this)" class="battlesquare">${i}</div>`;
  }
  grid.innerHTML += add_to_grid;
  let the_Grid = document.querySelectorAll(".battlesquare");
  console.log(the_Grid.length + " squares in grid.");
}

function createGrid(){
  let size = 32;
  let map = document.getElementById("map_img");
  let adj_width = Math.round(map.naturalWidth/size)*size;
  let adj_height = Math.round(map.naturalHeight/size)*size; 
  let cols = Math.round(map.naturalWidth/size);
  let rows = Math.round(map.naturalHeight/size);
  console.log(map.naturalWidth+"/"+map.naturalHeight);
  console.log(map.naturalWidth/size+"/"+map.naturalHeight/size);
  console.log(cols+"/"+rows+": "+cols*rows+" squares.")
  console.log(adj_width+"/"+adj_height);
  let battlemap = document.getElementById("battlemap");
  clearGrid();
  resize(adj_width, cols, adj_height, rows, 32, battlemap);
}
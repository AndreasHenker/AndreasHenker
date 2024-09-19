const img = new Image();
img.onload = function() {
  alert("Map Size: \n"+ Math.round(this.width/32) +" x "+ Math.round(this.height/32) +" squares.");
}
img.src = "./maps/ambush01.jpg";
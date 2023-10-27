var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieGroup, bala, balaImg, balaGroup;
var life = 10;
var score = 0;
var gameState = 1;

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombieImg = loadImage("assets/zombie.png")
  bgImg = loadImage("assets/bg.jpeg")
  balaImg = loadImage("assets/bala.jpg")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //Añadir la clase de fondo
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//Crear el sprite del jugador
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

   zombieGroup = createGroup();
   balaGroup = createGroup();

   heading = createElement("h1");
   scoreboard = createElement("h1");


}

function draw() {
  background(0); 

  heading.html("Vida: "+life)
  heading.style('color:red'); 
  heading.position(150,20)

  scoreboard.html("Puntuación: "+score)
  scoreboard.style('color:red'); 
  scoreboard.position(width-200,20)

  if(gameState===1){

  if(frameCount %40 === 0){
  drawZombie();
}  


  //Mover al jugador arriba y abajo y hacer que el juego móvil sea compatible de forma táctil.
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//Liberar las balas y cambiar la imagen del tirador a la posición de disparo cuando la barra espaciadora se presiona.
if(keyWentDown("Enter")){
   player.addImage(shooter_shooting)
}
if(keyWentDown("Enter")){
   shootBullet();
}
if(balaGroup.isTouching(zombieGroup)){
  zombie.destroy();
  bala.destroy();
}
//El jugador regresa a la imagen de posición original una vez que dejamos de presionar la barra de espacio.
else if(keyWentUp("Enter")){
  player.addImage(shooterImg)
}
}
drawSprites();

}

function drawZombie(){
  zombie = createSprite(800,random(20,780),40,40);
  zombie.addImage(zombieImg);
  zombie.scale = 0.1;
  zombie.velocityX = -8;
  zombie.lifetime = 400;
  zombieGroup.add(zombie); 
}

function shootBullet(){
  bala= createSprite(150, width/2, 50,20)
  bala.y= player.y-20
  bala.addImage(balaImg)
  bala.scale=0.12
  bala.velocityX= 7
  balaGroup.add(bala)
}
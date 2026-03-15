const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let lanes=[120,240];
let lane=0;

let speed=5;
let score=0;
let running=false;

let playerImg=new Image();
playerImg.src="/static/assets/player.png";

let enemyImg=new Image();
enemyImg.src="/static/assets/enemy.png";

let coinImg=new Image();
coinImg.src="/static/assets/coin.png";

let player={
x:lanes[lane],
y:480,
w:60,
h:100
};

let enemies=[];
let coins=[];

function startGame(){

document.getElementById("menu").style.display="none";

running=true;

gameLoop();

}

function spawnCar(){

let l=lanes[Math.floor(Math.random()*2)];

enemies.push({
x:l,
y:-120,
w:60,
h:100
});

}

function spawnCoins(){

let l=lanes[Math.floor(Math.random()*2)];

for(let i=0;i<4;i++){

coins.push({
x:l,
y:-40-(i*60),
size:30
});

}

}

setInterval(spawnCar,1500);
setInterval(spawnCoins,3000);

function drawRoad(){

ctx.fillStyle="#333";
ctx.fillRect(0,0,400,600);

ctx.strokeStyle="white";
ctx.lineWidth=6;

for(let i=0;i<600;i+=40){

ctx.beginPath();
ctx.moveTo(200,i+(score%40));
ctx.lineTo(200,i+20+(score%40));
ctx.stroke();

}

}

function drawPlayer(){

ctx.drawImage(playerImg,player.x,player.y,player.w,player.h);

}

function drawEnemies(){

for(let i=0;i<enemies.length;i++){

let e=enemies[i];

e.y+=speed;

ctx.drawImage(enemyImg,e.x,e.y,e.w,e.h);

if(
player.x < e.x + e.w &&
player.x + player.w > e.x &&
player.y < e.y + e.h &&
player.y + player.h > e.y
){
gameOver();
}

}

}

function drawCoins(){

for(let i=0;i<coins.length;i++){

let c=coins[i];

c.y+=speed;

ctx.drawImage(coinImg,c.x,c.y,c.size,c.size);

if(
player.x < c.x + c.size &&
player.x + player.w > c.x &&
player.y < c.y + c.size &&
player.y + player.h > c.y
){

coins.splice(i,1);
score+=50;

}

}

}

function drawScore(){

ctx.fillStyle="white";
ctx.font="20px Arial";

ctx.fillText("Score "+score,10,30);

}

function gameLoop(){

if(!running) return;

ctx.clearRect(0,0,400,600);

drawRoad();
drawPlayer();
drawEnemies();
drawCoins();
drawScore();

score++;

if(score%500==0){
speed+=1;
}

requestAnimationFrame(gameLoop);

}

function moveLeft(){
lane=0;
player.x=lanes[lane];
}

function moveRight(){
lane=1;
player.x=lanes[lane];
}

canvas.addEventListener("touchstart",function(e){

let x=e.touches[0].clientX;

if(x<window.innerWidth/2){
moveLeft();
}else{
moveRight();
}

});

document.addEventListener("keydown",function(e){

if(e.key==="ArrowLeft") moveLeft();
if(e.key==="ArrowRight") moveRight();

});

function gameOver(){

running=false;

if(window.TelegramGameProxy){
TelegramGameProxy.shareScore(score);
}

alert("Game Over Score "+score);

location.reload();

}
//Tamanho do Quadro/Screen:

const altura = 800;            //Altura da Tela
const largura = 800;           //Largura da Tela

//Parâmetros para a Bola:

let xBolinha = (largura/2);    //Coordenada de início X da Bola
let yBolinha = (altura/2);     //Coordenada de início Y da Bola
let diametro = 20;             //Diâmetro da Bola

//Parâmetros da Barra do Jogador:

let xBarra = 0;                //Coordenada de início X da Barra
let yBarra = (altura/2);       //Coordenada de início Y da Barra
let widthBarra = 10;           //Largura da Barra
let heightBarra = 75;          //Altura da Barra
let speedBarra = 10;           //Velocidade da Barra

//Parâmetros da Barra do Oponente:

let xOponente = (largura-10);  //Coordenada de início X da Oponente
let yOponente = (altura/2);    //Coordenada de início Y da Oponente
let widthOponente = 10;        //Largura da Oponente
let heightOponente = 75;       //Altura da Oponente
let speedOponente = 10;        //Velocidade do Oponente

//Velocidade da Bola:

let xSpeed = 2;                //Velocidade da Bola no eixo X  
let ySpeed = 3;                //Velocidade da Bola no eixo Y
let xSpeedStart = 2;
let ySpeedStart = 3;

let increase = 0.01;           //Aumentar a velocidade da Bola

//Placar:

let pontosPlayer = 0;
let pontosOponente = 0;

//Sons do Jogo:

let raquete;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquete = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(largura, altura);
  //trilha.loop();
}


function draw() {
  //MainScreen();
  
  background(0);
  Bases();
  Ball();
  ColisaoBarra();
  MotionBarra();
  MotionBall();
  MotionOponente();
  Interacao();
  BugBolinha();
  Placar();
  Vencedor();
  
}

function BugBolinha(){
  if(xBolinha - 10 < 0){
    xbolinha = 23;
  }
}


function mouseClicked(){
  xBolinha = width/2;
  yBolinha = height/2;
  xSpeed = xSpeedStart;
  ySpeed = ySpeedStart;
  pontosPlayer = 0;
  pontosOponente = 0;
}


function Stop(){
  xSpeed = 0;
  ySpeed = 0;
  xBolinha = width/2;
  yBolinha = (height/2)+100;
}


function Vencedor(){
  if(pontosPlayer == 10){
    fill(255);
    text("Você Ganhou! :)", width/2, height/2);
    Stop();
  }
  if(pontosOponente == 10){
    fill(200,200,200);
    text("Você Perdeu!  :(", width/2, height/2)
    Stop();
  }
}


function Placar(){
  if(xBolinha < 0){
    pontosOponente += 1; 
    ponto.play();
  }
  if(xBolinha > width){
    pontosPlayer += 1;
    ponto.play();
  }
  textSize(20);
  textAlign(CENTER);
  fill('green');
  rect(width/3-20,100-22, 40, 30, 10);
  rect(width/3*2-20, 100-22, 40, 30, 10);
  fill(255);
  text(pontosOponente, (width/3*2),100);
  text(pontosPlayer, (width/3),100);
}


function MotionOponente(){
  
  if(yOponente<yBolinha){
    
    if(yBolinha>32){
      yOponente = yBolinha-32//speedOponente;
    } else{
      yOponente = 0;
    }
  } 
  if(yOponente > width-75){
      yOponente = width-75;
  }
  
}


function ColisaoBarra(){
  if((xBolinha-20)<xBarra){
     if((yBolinha>yBarra)&&(yBolinha<(yBarra+75))){
       xSpeed *= -1;
       raquete.play();
     }
  }
  
  if((xBolinha+10)>xOponente){
     if((yBolinha>yOponente)&&(yBolinha<(yOponente+75))){
       xSpeed *= -1;
       raquete.play();
     }
  }
}
 

function MotionBarra(){
  /*
  if(ySpeed > 20){
    speedBarra = abs(ySpeed)/2
  }
  */
  
  if(keyIsDown(UP_ARROW)){
    yBarra -= speedBarra;
    if(yBarra < 0){
      yBarra = 0;
    }
  }
  if(keyIsDown(DOWN_ARROW)){
    yBarra += speedBarra;
    if(yBarra > width-75){
      yBarra = width-75;
    }
  }
}


function Bases(){
  rect(xBarra,yBarra,widthBarra,heightBarra);
  rect(xOponente,yOponente,widthOponente,heightOponente);
}


function Ball(){
  circle(xBolinha,yBolinha,diametro);
}


function MotionBall(){
  
  xBolinha += xSpeed;
  yBolinha += ySpeed;
}


function Interacao(){
  if((xBolinha>width)||(xBolinha<0)){
    increase = xSpeed>0?1:-1;
    xSpeed += increase;
    increase = ySpeed>0?1:-1;
    ySpeed += increase;
    xSpeed *= -1;
  }
   
  if((yBolinha+10>height)||(yBolinha-10<1)){
    increase = ySpeed>0?1:-1;
    ySpeed += increase;
    increase = xSpeed>0?1:-1;
    xSpeed += increase;
    ySpeed *= -1;
  }
}
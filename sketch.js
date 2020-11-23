var PLAY = 1;
var END = 0;
var gameState = PLAY;








var photo,photoImage,invisibleGround;
var monkey , monkey_running,monkey_collided
var obstacle, obstacleImage,obstacleGroup;
var score;
var gameOverImg,gameOver;
 var restartImg, restart;
var achievment;
var  jumpSound;








function preload(){
photoImage=loadImage("rppppp.png")
 monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png") 
   obstaceImage = loadImage("obstacle.png");
 monkey_collided=loadImage("sprite_5.png") 
 gameOverImg=loadImage("1114991.jpg")
  restartImg = loadImage("restart.jpg")
  jumpSound=loadSound("jump.mp3")
  achivememt=loadSound("achievement_pop.mp3")
}

function setup() {
  createCanvas(windowWidth,windowHeight)
photo=createSprite(200,200) 
  photo.addImage(photoImage)
  photo.velocityX=-5
 
   
monkey=createSprite(50,520,20,20)  
monkey.addAnimation("running",monkey_running)
   monkey.addAnimation("collided", monkey_collided);
  
monkey.scale=.1
  
   

  invisibleGround = createSprite(200,550,400,10);
  invisibleGround.visible = false;   
    
 obstacleGroup=createGroup()  
  score = 0;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.3
  
  
  
  
  restart = createSprite(300,180);
  restart.addImage(restartImg);
  
 
  
 
 monkey.setCollider("circle",0,0,-180);
 console.debug=true
   
  
 
}

function draw() {
  
 if(photo.x<0){
 photo.x=photo.width/2   
    
    
    
    
    }
  
  if(gameState === PLAY){
        gameOver.visible = false;
restart.visible = false;
     
 
    photo.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
   
    if (photo.x < 0){
      photo.x = photo.width/2;
    }
    
    if(score>0 && score%100 === 0){
       jumpSound.play() 
    }
  
    if(touches>0||keyDown("space")&&monkey.y>=400)
    { monkey.velocityY = -12;
      achivememt.play()
    touches;
    }           
 
    
  monkey.velocityY= monkey.velocityY+.8
      
    

   
  
   
    
  
    //spawn obstacles on the ground
 spawmobu();  
    
    if(obstacleGroup.isTouching(monkey)){
        //trex.velocityY = -12;
       
        gameState = END;
       
      
    }
  } 
   else if (gameState === END) {
  gameOver.visible = true;  
     restart.visible = true;
     
     //change the trex animation
     
      monkey.changeAnimation("collided", monkey_collided);
    
     
      photo.velocityX = 0;
      monkey.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
  
   obstacleGroup.setVelocityXEach(0);
     
     
   if(mousePressedOver(restart)) {
      reset();
    }
   
   }   
 
      
 
    
 
    
 
    
  
 monkey.collide(invisibleGround)
 
 
  
  
drawSprites() 
  text("Score: "+ score, 500,50);
  
  

}
  function reset(){
gameState=PLAY
gameOver.visible=false  
restart.visible=false  
  
 obstacleGroup.destroyEach();  
 
 monkey.changeAnimation ("running",monkey_running)
  
score=0;
  
  

}

function  spawmobu(){
  if (frameCount % 60 === 0) {
obstacle=createSprite(600,510)
 obstacle.addImage(obstaceImage)
obstacle.scale=.2
obstacle.velocityX=-(7+(score/100))
obstacle.lifetime=120
 obstacleGroup.add(obstacle)
  
  
    
  
  
  
  
  
  
  
  
  } 
  
}
   










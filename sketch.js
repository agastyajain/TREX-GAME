var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var rand, cloudimg, cloud;
var obstacle, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var select_obstacle;
var score;
var obstaclegroup;
var cloudgroup;
var PLAY = 1;
var END = 0;
var state = PLAY;
var gameover, gameoverimg;
var restart, restartimg;
var openeyes;
var sound;
var message = "THIS IS TREX GAME";
var high_score;
var previous_score;
var new_score;


function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");
  trexopen = loadAnimation("trex_collided.png");

  groundImage = loadImage("ground2.png");
  invisibleGround = loadImage("ground2.png");

  cloudimg = loadImage("cloud.png");

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");


  gameoverimg = loadImage("gameOver.png");
  restartimg = loadImage("restart.png");


  sound = loadSound("sound1.mp3");
}

function setup() {
  createCanvas(600, 200);
  frameRate(50);
  score = 0;
  high_score = 0;



  //creating trex
  trex = createSprite(50, 180, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("openeyes", trexopen);
  trex.scale = 0.5;
  trex.x = 50;
  //trex.setCollider("circle",0,0,30);
  //trex.debug=true;

  //creating ground
  ground = createSprite(200, 182, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  invisibleGround = createSprite(50, 190, 400, 20);
  invisibleGround.addImage("ground", groundImage);
  invisibleGround.visible = false;

  //states
  gameover = createSprite(200, 90, 20, 20);
  gameover.addImage(gameoverimg);
  gameover.scale = 0.5;

  //restart
  restart = createSprite(200, 120, 20, 20);
  restart.addImage(restartimg);
  restart.scale = 0.5;

  //groups
  obstaclegroup = new Group();
  cloudgroup = new Group();
}

function draw() {
  background("grey");
  rand = Math.round(random(30, 80));
  textSize(20);
  fill("white");
  text("AGASTYA'S TREX GAME",180,30);


  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  trex.velocityY = trex.velocityY + 0.8;
  trex.collide(invisibleGround);
  drawSprites();
  select_obstacle = Math.round(random(1, 6));


  if (state == PLAY) {
    textSize(18);
    text("Highest:" + high_score, 300, 100);
    text("|  Score:" + score, 400, 100);
    spawnclouds();
    spawnobstacles();
    move();
    ground.velocityX = -10;
    gameover.visible = false;
    restart.visible = false;
    score = score + 1;
    if (trex.isTouching(obstaclegroup)) {
      textSize(18);
      // sound.play();
      trex.changeAnimation("openeyes");
      state = END;
    }
  }
  else if (state == END) {

    textSize(18);

    text("|  Score:" + score, 400, 100);

    if (score > high_score) {
      high_score = score;
    }
    text("Highest:" + high_score, 300, 100);
    gameover.visible = true;
    restart.visible = true;
    gameover.addImage(gameoverimg);
    gameover.scale = 0.5;
    obstaclegroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);
    ground.velocityX = 0;
    cloudgroup.setLifetimeEach(-1);
    obstaclegroup.setLifetimeEach(-1);
    if (mousePressedOver(restart)) {
      reset();
    }
  }
  if (score % 50 == 0) {
    // sound.play();
  }
}

function move() {

  if (keyDown("space") && (trex.y > 160)) {
    trex.velocityY = -12;
    // sound.play();

  }
}

function spawnclouds() {
  if (frameCount % 60 == 0) {
    cloud = createSprite(600, rand, 20, 20);
    cloud.velocityX = -(10 + score / 100);
    cloud.addImage(cloudimg);
    cloud.scale = 0.8;
    trex.depth = cloud.depth + 1;
    // console.log(cloud.depth);
    // console.log(trex.depth);
    cloud.lifetime = -(600 / cloud.velocityX);
    cloudgroup.add(cloud);
  }
}

function spawnobstacles() {
  if (frameCount % 60 == 0) {
    obstacle = createSprite(600, 160, 20, 20);
    obstacle.velocityX = -10;
    select_obstacle = Math.round(random(1, 6));
    obstacle.scale = 0.6;
    obstacle.lifetime = -(600 / obstacle.velocityX);
    switch (select_obstacle) {
      case 1: obstacle.addImage("obs", obstacle1);
        break;
      case 2: obstacle.addImage("obs1", obstacle2);
        break;
      case 3: obstacle.addImage("obs2", obstacle3);
        break;
      case 4: obstacle.addImage("obs3", obstacle4);
        break;
      case 5: obstacle.addImage("obs4", obstacle5);
        break;
      case 6: obstacle.addImage("obs5", obstacle6);
        break;
      default: obstacle.addImage("obs6", obstacle1);
        break;

    }
    obstaclegroup.add(obstacle);
  }

}

function reset() {
  state = PLAY;
  score = 0;
  move();
  cloudgroup.destroyEach();
  obstaclegroup.destroyEach();
  trex.changeAnimation("running");
  spawnclouds();
  spawnobstacles();

}


const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;
var boladecanhao;
var canvas, angle, tower, ground, canhao, boat;
var matrizball = []
var matrizboat = []
function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;

  var options = {
    isStatic: true
  }

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower);
  angleMode(DEGREES)
  angle = 20
  canhao = new Cannon(180, 110, 130, 100, angle)

}

function draw() {
  image(backgroundImg, 0, 0, 1200, 600);
  Engine.update(engine);

  for (var i = 0; i < matrizball.length; i = i + 1) {
    showcannonball(matrizball[i], i)
    boatcollided(i)

  }
  showboat()
  canhao.exibir()
  rect(ground.position.x, ground.position.y, width * 2, 1);

  push();
  imageMode(CENTER);
  image(towerImage, tower.position.x, tower.position.y, 160, 310);
  pop();
}
function keyPressed() {
  if (keyCode === 32) {
    boladecanhao = new Cannonball(canhao.x, canhao.y)
    Matter.Body.setAngle(boladecanhao.body, canhao.angle)
    matrizball.push(boladecanhao)
    boladecanhao.trajetoria = []
  }
}

function keyReleased() {
  if (keyCode === 32) {
    matrizball[matrizball.length - 1].shoot()

  }
}
function showcannonball(bola, index) {
  if (bola) {
    boladecanhao.exibir()
    if (bola.body.position.x>=width||bola.body.position.y>=height-50) {
      bola.remove(index)
    }
  }
}
function showboat() {
  if (matrizboat.length > 0) {
    if (matrizboat[matrizboat.length - 1] === undefined || matrizboat[matrizboat.length - 1].body.position.x < width - 300) {
      var positions = [-30, -40, -50, -60]
      var aleatorio = random(positions)
      boat = new Boat(width - 79, height - 60, 170, 170, aleatorio)
      matrizboat.push(boat)
    }
    for (var i = 0; i < matrizboat.length; i = i + 1) {
      if (matrizboat[i]) {
        Matter.Body.setVelocity(boat.body, { x: -0.3, y: 0 })
        matrizboat[i].exibir()
      } else {
        matrizboat[i]
      }

    }
  } else {
    boat = new Boat(width - 79, height - 60, 170, 170, -80)
    matrizboat.push(boat)
  }

}
function boatcollided(index) {
  for (var i = 0; i < matrizboat.length; i = i + 1) {
    if (matrizball[index] !== undefined && matrizboat[i] !== undefined) {
      var collision = Matter.SAT.collides(matrizball[index].body, matrizboat[i].body)
      if (collision.collided) {
        matrizboat[i].remove(i)
        Matter.World.remove(world, matrizball[index].body)
        delete matrizball[index]
      }
    }
  }
}

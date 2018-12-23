const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//keypresses
let spaceBar = false;
let leftArrow = false;
let rightArrow = false;
let upArrow = false;
let downArrow = false;

document.body.onkeydown = function(e) {
  if (e.keyCode == 32) bullet.shoot();

  if (e.keyCode == 37) leftArrow = true;
  else if (e.keyCode == 39) rightArrow = true;

  if (e.keyCode == 38) upArrow = true;
  else if (e.keyCode == 40) downArrow = true;
};
document.body.onkeyup = function(e) {
  if (e.keyCode == 37) leftArrow = false;
  else if (e.keyCode == 39) rightArrow = false;

  if (e.keyCode == 38) upArrow = false;
  else if (e.keyCode == 40) downArrow = false;
};
// ================   Objects  ================ //
function Ship(x, y, width, height, xSpeed, ySpeed) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.xSpeed = xSpeed;
  this.ySpeed = ySpeed;

  this.update = function() {
    //keypress
    if (rightArrow && this.x < canvas.width - this.width) this.x += 5;
    else if (leftArrow && this.x > 0) this.x -= 5;

    if (upArrow && this.y > 0) this.y -= 5;
    else if (downArrow && this.y < canvas.height - this.height) this.y += 5;
    this.draw();
  };
  this.draw = function() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fill();
  };
}

function Bullet(x, y, width, height, xSpeed, ySpeed) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.xSpeed = xSpeed;
  this.ySpeed = ySpeed;
  // functions
  this.update = function() {
    this.y -= this.ySpeed;
    this.detectHit();
    this.draw();
  };

  this.draw = function() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fill();
  };

  this.shoot = function() {
    for (let i = 0; i < 1; i++) {
      bulletArray.push(new Bullet(ship.x + 15, ship.y - 20, 6, 6, 0, 6));
    }
  };
  this.detectHit = function() {
    for (let i = 0; i < obstaclesArray.length; i++) {
      let ob = obstaclesArray[i];
      if (
        this.x < ob.x + ob.width &&
        this.x + this.width > ob.x &&
        this.y < ob.y + ob.height &&
        this.height + this.y > ob.y
      ) {
        //increment score

        //remove obstacle that got hit from array
        obstaclesArray.splice(i, 1);
      }
    }
  };
}

function Obstacles(width, height) {
  this.x = Math.floor(Math.random() * canvas.width) + 1;
  this.y = Math.floor(Math.random() * (canvas.height / 2)) + 1;
  this.width = width;
  this.height = height;

  this.update = function() {
    this.draw();
  };

  this.draw = function() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fill();
  };
}
// ================     ================ //

// Declare

let ship = new Ship(canvas.height / 2 - 15, canvas.height - 15, 30, 10, 5, 5);
let bullet = new Bullet();
let obstacles = new Obstacles();

//        arrays        //
let bulletArray = [];
let obstaclesArray = [];

for (let i = 0; i < 5; i++) {
  obstaclesArray.push(new Obstacles(25, 25));
}

//animation loop
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //bullets
  for (let i = 0; i < bulletArray.length; i++) {
    let bullets = bulletArray[i];
    bullets.update();
    if (bullets.y < 0) bulletArray.splice(0, 1);
  }

  for (let i = 0; i < obstaclesArray.length; i++) {
    let obstacles = obstaclesArray[i];
    obstacles.update();
  }
  obstacles.update();
  ship.update();
}

animate();

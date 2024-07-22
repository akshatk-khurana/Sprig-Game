/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Sprig Dash
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const bg = "b"
const enemy = "e"

setLegend(
  [player, bitmap`
6666666666666666
6666666666666666
6666666666666666
666FFFFFFFFFF666
666FFFFFFFFFF666
666FFFFFFFFFF666
666FFF9999FFF666
666FFF9999FFF666
666FFF9999FFF666
666FFF9999FFF666
666FFFFFFFFFF666
666FFFFFFFFFF666
666FFFFFFFFFF666
6666666666666666
6666666666666666
6666666666666666`],
  [bg, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [enemy, bitmap `
................
................
................
................
................
................
................
................
.......55.......
......5555......
.....555555.....
....55555555....
...5555555555...
..555555555555..
.55555555555555.
5555555555555555`]
)

setBackground(bg)

setSolids([player])

let level = 0
const levels = [
  map `
.........................
.........................
.........................
.........................
.........................
.........................
.........................
.........................
....p...e....e....e......`
]

setMap(levels[level])

setPushables({
  [player]: [player]
})

const jumpHeight = 3;
const moveSpeed = 1;
let gameRunning = true;
let score = 0;
let coolDown = false;

displayScore();

onInput("j", () => {
  if (!coolDown && gameRunning) {
    getFirst(player).y -= jumpHeight
    coolDown = true;
  }
})

afterInput(() => {
  setTimeout(() => {
    if (gameRunning) {
      getFirst(player).y += jumpHeight
      coolDown = false;
    }
  }, 300);
})


setInterval(() => {
  if (gameRunning) {
    generateEnemy();
  }
}, 1500)

setInterval(() => {
  const enemies = getAll(enemy);
  enemies.forEach(e => {
    e.x -= moveSpeed;
  });
}, 150);

setInterval(() => {
  const enemies = getAll(enemy);
  enemies.forEach(e => {
    if (e.x == 0) {
      score++;
      displayScore();
      e.remove()
    }
  });
}, 10)

setInterval(() => {
  if (gameRunning) {
    checkCollision();
  }
}, 300)

function deleteEnemies() {
  const enemies = getAll(enemy);
  enemies.forEach(e => {
    e.remove()
  })
}

function generateEnemy() {
  let amount = Math.floor(Math.random() * (2 - 1 + 1) + 1);
  
  for (let i = 0; i < amount; i++) {
    addSprite(24-i, 8, enemy);
  }
}

function checkCollision() {
  const enemies = getAll(enemy);
  const playerObj = getFirst(player);

  enemies.forEach(enemy => {
    if (enemy.x === playerObj.x && enemy.y === playerObj.y) {
      playerObj.remove();
      gameRunning = false;
      deleteEnemies();
      displayGameOver();
      return
    }
  });
}

function displayScore() {
  clearText();
  addText(`${score}`, {
        x: 1,
        y: 5,
        color: color`2`
  })
}
  

function displayGameOver() {
  clearText()
  addText("Game Over", {
    x: 5,
    y: 6,
    color: color`3`
  })

  addText(`Score: ${score}`, {
    x: 5,
    y: 8,
    color: color`2`
  })
}
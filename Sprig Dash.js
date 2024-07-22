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

const jumpHeight = 2;
let gameRunning = true;
let score = 0;
let coolDown = false;

onInput("j", () => {
  if (!coolDown) {
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
  const enemies = getAll(enemy);
  enemies.forEach(e => {
    e.x -= 1
    if (e.x == 0) {
      score++;
      addText(`${score}`, {
        x: 2,
        y: 4,
        color: color`2`
      })
      e.remove()
    }
  });
}, 200);


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

function displayGameOver() {
  clearText()
  addText("Game Over", {
    x: 6,
    y: 6,
    color: color`3`
  })

  addText(`Score: ${score}`, {
    x: 6,
    y: 8,
    color: color`2`
  })
}
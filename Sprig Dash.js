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
  [ player, bitmap`
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
  [ bg, bitmap`
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
  [ enemy, bitmap `
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
p..e.e.e.e.e.eee.e.......`
]

setMap(levels[level])

setPushables({
  [ player ]: [ player ]
})


let coolDown = false;

onInput("d", () => {
    getFirst(player).x += 1
})

onInput("j", () => {
  if (!coolDown) {
    getFirst(player).y -= 1
    coolDown = true;
  }
})

afterInput(() => {
  setTimeout(() => {
    getFirst(player).y += 1
    coolDown = false;
  }, 200);
})

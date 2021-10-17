const arenas = document.querySelector(".arenas");
const randomButton = document.querySelector('.button')


const player1 = {
  player: 1,
  name: "LiuKang",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/liukang.gif",
  weapon: ["fist"],
  attack: function () {
    console.log("this.name" + "fight!");
  },
};

const player2 = {
  player: 2,
  name: "SubZero",
  hp: 110,
  img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
  weapon: ["wrench"],
  attack: function () {
    console.log("this.name" + "fight!");
  },
};

function createNewElement(tag, className) {
  const newTag = document.createElement(tag);

  if (className) {
    newTag.classList.add(className);
  }

  return newTag;
}

function createPlayer(fighter) {
  const player = createNewElement("div", 'player' + fighter.player);
  const progressBar = createNewElement("div", "progressbar");
  const character = createNewElement("div", "character");
  const life = createNewElement("div", "life");
  const name = createNewElement("div", "name");
  const img = createNewElement("img");

  life.style.width = fighter.hp + "%";
  name.innerText = fighter.name;
  img.src = fighter.img;

  player.appendChild(progressBar);
  player.appendChild(character);
  progressBar.appendChild(life);
  progressBar.appendChild(name);
  character.appendChild(img);

  return player
}


function changeHP(player) {
  console.log("changeHp", player);
  const playerLife = document.querySelector(".player" + player.player + " .life");
  const randomNumber = Math.ceil(Math.random() * 10)
  player.hp -= randomNumber;
  playerLife.style.width = player.hp + "%";

  if (player.hp > 0) {
    arenas.appendChild(playerWin(player.name));
    randomButton.disabled = true
  }
}

function playerLose(name) {
  const loseTitle = createNewElement('div', 'loseTitle')
  loseTitle.innerText = name + ' lose'

  return loseTitle
}

function playerWin(name) {
  const winTitle = createNewElement("div", "loseTitle");
  winTitle.innerText = name + " win!";

  return winTitle;
}

randomButton.addEventListener('click', function () {
  console.log('click happen')
  changeHP(player1)
  changeHP(player2);
})

arenas.appendChild(createPlayer(player1))
arenas.appendChild(createPlayer(player2));



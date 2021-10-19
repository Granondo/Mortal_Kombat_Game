const arenas = document.querySelector(".arenas");
const randomButton = document.querySelector(".button");

function getRandom(number) {
  return Math.ceil(Math.random() * number);
}

const player1 = {
  player: 1,
  name: "LiuKang",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/liukang.gif",
  weapon: ["fist"],
  attack: function () {
    console.log("this.name" + "fight!");
  },
  changeHP: changeHP,
  elHP: elHP,
  renderHP: renderHP,
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
  changeHP: changeHP,
  elHP: elHP,
  renderHP: renderHP,
};

function createNewElement(tag, className) {
  const newTag = document.createElement(tag);

  if (className) {
    newTag.classList.add(className);
  }

  return newTag;
}

function createPlayer(fighter) {
  const player = createNewElement("div", "player" + fighter.player);
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

  return player;
}

function changeHP(amount) {
  this.hp -= amount;

  if (this.hp <= 0) {
    this.hp = 0;
  }
}

function elHP() {
  return document.querySelector(".player" + this.player + " .life");
}

function renderHP() {
  this.elHP().style.width = this.hp + "%";
}

function showResult(name) {
  const winTitle = createNewElement("div", "loseTitle");
  if (name) {
    winTitle.innerText = name + " win!";
  } else {
    winTitle.innerText = "Draw";
  }
  return winTitle;
}

function createReloadButton () {

}

randomButton.addEventListener("click", function () {
  console.log("click happen");
  player1.changeHP(getRandom(20));
  player2.changeHP(getRandom(20));

  player1.renderHP();
  player2.renderHP();

  if (player1.hp === 0 || player2.hp === 0) {
    randomButton.disabled = true;
  }

  if (player1.hp === 0 && player1.hp < player2.hp) {
    arenas.appendChild(showResult(player2.name));
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    arenas.appendChild(showResult(player1.name));
  } else if (player2.hp === 0 && player1.hp === 0) {
    arenas.appendChild(showResult());
  }
});

arenas.appendChild(createPlayer(player1));
arenas.appendChild(createPlayer(player2));

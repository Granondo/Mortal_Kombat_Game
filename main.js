import logs from "./log.js";

const arenas = document.querySelector(".arenas");
const formFight = document.querySelector(".control");
const chat = document.querySelector(".chat");
// const randomButton = document.querySelector(".button");

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};
const ATTACK = ["head", "body", "foot"];

function getRandom(number) {
  return Math.ceil(Math.random() * number);
}

const player1 = {
  player: 1,
  name: "LiuKang",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/liukang.gif",
  weapon: ["fist"],
  attack,
  changeHP,
  elHP,
  renderHP,
};

const player2 = {
  player: 2,
  name: "SubZero",
  hp: 110,
  img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
  weapon: ["wrench"],
  attack,
  changeHP,
  elHP,
  renderHP,
};

function attack() {
  console.log("this.name" + " fight!");
}

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

function createReloadButton() {
  const reloadButtonDiv = createNewElement("div", "reloadWrap");
  const reloadButton = createNewElement("button", "button");

  reloadButton.innerText = "Restart";

  reloadButton.addEventListener("click", function () {
    window.location.reload();
  });

  reloadButtonDiv.appendChild(reloadButton);
  arenas.appendChild(reloadButtonDiv);
}

// randomButton.addEventListener("click", function () {
//   console.log("click happen");
//   player1.changeHP(getRandom(20));
//   player2.changeHP(getRandom(20));

//   player1.renderHP();
//   player2.renderHP();

//   if (player1.hp === 0 || player2.hp === 0) {
//     randomButton.disabled = true;
//     createReloadButton()
//   }

//   if (player1.hp === 0 && player1.hp < player2.hp) {
//     arenas.appendChild(showResult(player2.name));
//   } else if (player2.hp === 0 && player2.hp < player1.hp) {
//     arenas.appendChild(showResult(player1.name));
//   } else if (player2.hp === 0 && player1.hp === 0) {
//     arenas.appendChild(showResult());
//   }
// });

arenas.appendChild(createPlayer(player1));
arenas.appendChild(createPlayer(player2));

function enemyAttack() {
  const hit = ATTACK[getRandom(3) - 1];
  const defence = ATTACK[getRandom(3) - 1];
  console.log("hit", hit);
  console.log("defence", defence);

  return {
    value: getRandom(HIT[hit]),
    hit,
    defence,
  };
}

function playerAttack() {
  const attack = {};
  for (let item of formFight) {
    if (item.checked && item.name === "hit") {
      attack.value = getRandom(HIT[item.value]);
      attack.hit = item.value;
    }

    if (item.checked && item.name === "defence") {
      attack.defence = item.value;
    }

    item.checked = false;
  }

  return attack;
}

function showWhoIsWin() {
  if (player1.hp === 0 || player2.hp === 0) {
    formFight.style.method = "none";
    createReloadButton();
  }

  if (player1.hp === 0 && player1.hp < player2.hp) {
    arenas.appendChild(showResult(player2.name));
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    arenas.appendChild(showResult(player1.name));
  } else if (player2.hp === 0 && player1.hp === 0) {
    arenas.appendChild(showResult());
  }
}

function startTime() {
  const date = new Date();
  const normalize = (number) =>
    number.toString().length > 1 ? number : `0{number}`;
  const time = `${normalize(date.getHours())} : ${normalize(
    date.getMinutes()
  )} : ${normalize(date.getSeconds())}`;
  const start = logs.start
    .replace("[time]", time)
    .replace("[player1]", player1.name)
    .replace("[player2]", player2.name);

   chat.insertAdjacentHTML("afterbegin", start);
}

function generateLogs(type, player1, player2) {
  const attack = logs[type][getRandom(18)]
    .replace("[playerKick]", player1.name)
    .replace("[playerDefence]", player2.name);

  const defense = logs[type][getRandom(8)]
  .replace("[playerKick]", player1.name)
  .replace("[playerDefence]", player2.name);

  switch (type) {
    case "hit":
      const element = `<p>${attack}</p>`;
      chat.insertAdjacentHTML("afterbegin", element);

    case 'defence':
      const element2 = `<p>${defense}</p>`;
      chat.insertAdjacentHTML("afterbegin", element2);

  }

}

formFight.addEventListener("submit", function (event) {


  event.preventDefault();
  console.dir(formFight);
  const enemy = enemyAttack();
  const player = playerAttack();

  if (player.defence !== enemy.hit) {
    player1.changeHP(enemy.value);
    player1.renderHP();
    generateLogs("hit", player2, player1);
  }

  if (enemy.defence !== player.hit) {
    player2.changeHP(player.value);
    player2.renderHP();
    generateLogs("hit", player1, player2);
  }

  showWhoIsWin();

  console.log("player", player);
  console.log("enemy", enemy);
});

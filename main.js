
import {player1, player2} from './players.js'
import {generateLogs} from './generateLogs.js'
import { getRandom } from './getRandom.js';

const arenas = document.querySelector(".arenas");
const formFight = document.querySelector(".control");
export const chat = document.querySelector(".chat");
// const randomButton = document.querySelector(".button");

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};
const ATTACK = ["head", "body", "foot"];


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



const showResult = (name) => {
  const winTitle = createNewElement("div", "loseTitle");
  if (name) {
    winTitle.innerText = name + " wins!";
  } else {
    winTitle.innerText = "Draw";
  }
  return winTitle;
};

const createReloadButton = () => {
  const reloadButtonDiv = createNewElement("div", "reloadWrap");
  const reloadButton = createNewElement("button", "button");

  reloadButton.innerText = "Restart";

  reloadButton.addEventListener("click", function () {
    window.location.reload();
  });

  reloadButtonDiv.appendChild(reloadButton);
  arenas.appendChild(reloadButtonDiv);
};

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

const enemyAttack = () => {
  const hit = ATTACK[getRandom(3) - 1];
  const defence = ATTACK[getRandom(3) - 1];

  return {
    value: getRandom(HIT[hit]),
    hit,
    defence,
  };
};

const playerAttack = () => {
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
};


const showWhoIsWin = () => {
  if (player1.hp === 0 || player2.hp === 0) {
    formFight.style.method = "none";
    createReloadButton();
  }

  if (player1.hp === 0 && player1.hp < player2.hp) {
    arenas.appendChild(showResult(player2.name));
    generateLogs("end", player2, player1);
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    arenas.appendChild(showResult(player1.name));
    generateLogs("end", player1, player2);
  } else if (player2.hp === 0 && player1.hp === 0) {
    arenas.appendChild(showResult());
    generateLogs("draw");
  }
};

formFight.addEventListener("submit", function (event) {
  event.preventDefault();
  console.dir(formFight);
  const enemy = enemyAttack();
  const player = playerAttack();

  if (player.defence !== enemy.hit) {
    player1.changeHP(enemy.value);
    player1.renderHP();
    generateLogs("hit", player2, player1, enemy.value, player1.hp);
  } else {
    generateLogs("defense", player2, player1, enemy.value);
  }

  if (enemy.defence !== player.hit) {
    player2.changeHP(player.value);
    player2.renderHP();
    generateLogs("hit", player1, player2, enemy.value, player2.hp);
  } else {
    generateLogs("defense", player1, player2, enemy.value);
  }

  showWhoIsWin();

  console.log("player", player);
  console.log("enemy", enemy);
});

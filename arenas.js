import { Player } from "./players.js";
import { generateLogs } from "./generateLogs.js";
import { getRandom, createNewElement } from "./utils.js";
import { HIT, ATTACK } from "./constants.js";
import request  from "./request.js";

//
//  НА КЛАССАХ
//


// class Fighters {
//   getPlayers = async () => {
//     const body = fetch(
//       "https://reactmarathon-api.herokuapp.com/api/mk/players"
//     ).then((response) => response.json());
//     return body;
//   };
//   start = async () => {
//     const players = await this.getPlayers();

//     const p1 = players[getRandom(players.length) - 1];
//     const p2 = players[getRandom(players.length) - 1];
//     console.log("p1", p1);
//     console.log("p2", p2);
//     player1 = new Player({
//       ...p1,
//       player: 1,
//       rootSelector: 'arenas'
//     });
//     player2 = new Player({
//       ...p2,
//       player: 2,
//       rootSelector: "arenas",
//     });

//     console.log(player1);
//     console.log(player2);
//     player1.createPlayer()
//     player2.createPlayer();

//     generateLogs('start', player1, player2)
//   };
// }

// const game = new Fighters();

// game.start();
class Game {
  constructor() {
    this.arenas = document.querySelector(".arenas");
    this.formFight = document.querySelector(".formFight");
    this.startButton = document.querySelector(".startButton");
    this.chat = document.querySelector(".chat");
  }

  showWhoIsWin = (player1, player2) => {
    if (player1.hp === 0 || player2.hp === 0) {
      this.formFight.style.method = "none";
      this.createReloadButton();
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
      arenas.appendChild(showResult(player2.name));
      generateLogs("end", player2.name, player1.name);
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
      arenas.appendChild(this.showResult(player1.name));
      generateLogs("end", player1.name, player2.name);
    } else if (player2.hp === 0 && player1.hp === 0) {
      arenas.appendChild(this.showResult());
      generateLogs("draw");
    }
  };

  enemyAttack = () => {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];

    return {
      value: getRandom(HIT[hit]),
      hit,
      defence,
    };
  };

  playerAttack = () => {
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

  createReloadButton = () => {
    const reloadButtonDiv = createNewElement("div", "reloadWrap");
    const reloadButton = createNewElement("button", "button");

    reloadButton.innerText = "Restart";

    reloadButton.addEventListener("click", function () {
      document.location.reload();
    });

    reloadButtonDiv.appendChild(reloadButton);
    // arenas.appendChild(reloadButtonDiv);
    return reloadButtonDiv;
  };

  showResult = (name) => {
    const winTitle = createNewElement("div", "loseTitle");
    if (name) {
      winTitle.innerText = name + " wins!";
    } else {
      winTitle.innerText = "Draw";
    }
    return winTitle;
  };
  whoIsAttack = () => {
    const enemy = enemyAttack();
    const player = playerAttack();

    if (player.defence !== enemy.hit) {
      player1.changeHP(enemy.value);
      player1.renderHP();
      generateLogs("hit", player2, player1, enemy.value, player1.hp);
    } else {
      generateLogs("defence", player2, player1, enemy.value);
    }

    if (enemy.defence !== player.hit) {
      player2.changeHP(player.value);
      player2.renderHP();
      generateLogs("hit", player1, player2, enemy.value, player2.hp);
    } else {
      generateLogs("defence", player1, player2, enemy.value);
    }
  };
  createPlayer(fighter) {
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

  start =  async () => {

    const player = JSON.parse(localStorage.getItem("player1"));

    const enemy = await request.getRandomEnemy()

    const player1 = new Player ({
      player : 1,
      ...player
    })

     const player2 = new Player({
       player: 1,
       ...enemy,
     });

    this.formFight.addEventListener("submit", function (event) {
      event.preventDefault();
      console.dir(formFight);

      const enemy = enemyAttack();
      const player = playerAttack();
  console.log(enemy);
      showWhoIsWin();

    });

    this.arenas.appendChild(this.createPlayer(player1));
    this.arenas.appendChild(this.createPlayer(player2));
    generateLogs("start", player1, player2);
  };
}

const NewGame = new Game()

export default NewGame

export const { chat } = NewGame;
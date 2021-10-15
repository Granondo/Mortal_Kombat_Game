const player1 = {
  name: "LiuKang",
  hp: 80,
  img: "http://reactmarathon-api.herokuapp.com/assets/liukang.gif",
  weapon: ["fist"],
  attack: function () {
    console.log("this.name" + "fight!");
  },
};

const player2 = {
  name: "SubZero",
  hp: 70,
  img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
  weapon: ["wrench"],
  attack: function () {
    console.log("this.name" + "fight!");
  },
};

function createPlayer(classStyle , fighter) {
  const player = document.createElement("div");
  const progressBar = document.createElement("div");
  const character = document.createElement("div");
  const life = document.createElement("div");
  const name = document.createElement("div");
  const img = document.createElement("img");

  player.classList.add(classStyle);
  progressBar.classList.add("progressbar");
  life.classList.add("life");
  name.classList.add("name");
  character.classList.add("character");

  life.style.width = fighter.hp + '%'
  name.innerText = fighter.name;
  img.src = fighter.img

  player.appendChild(progressBar);
  player.appendChild(character);
  progressBar.appendChild(life);
  progressBar.appendChild(name);
  character.appendChild(img)

  const arenas = document.querySelector(".arenas");
  arenas.appendChild(player);
}

createPlayer("player1", player1);
createPlayer("player2", player2);

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

export { player1, player2};
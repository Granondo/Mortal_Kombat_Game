const player1 = {
  name: 'player1',
  hp: 400,
  img: '',
  weapon: ['fist'],
  attack: function () {
    console.log('this.name' + 'fight!')
  }
}

const player2 = {
  name: "player2",
  hp: 400,
  img: "",
  weapon: ["wrench"],
  attack: function () {
    console.log("this.name" + "fight!");
  },
};

function createPlayer(name, hp, image) {

}

createPlayer("player1", "SCORPION", 50);
createPlayer("player2", "SUB-ZERO", 80);

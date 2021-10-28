class Player {
  constructor(props) {
    this.player = props.player;
    this.name = props.name;
    this.hp = props.hp;
    this.img = `http://reactmarathon-api.herokuapp.com/assets/${props.img}.gif`;
    this.weapon = props.weapon;
  }

  attack = () => {
    console.log("this.name" + " fight!");
  }

    changeHP = (amount) => {
      this.hp -= amount;

      if (this.hp <= 0) {
        this.hp = 0;
      }
    };

    elHP = () => {
      return document.querySelector(".player" + this.player + " .life");
    };
    renderHP = () => {
      this.elHP().style.width = this.hp + "%";
    };
  };

const player1 = new Player({
  player: 1,
  name: "LiuKang",
  hp: 100,
  img: 'liukang',
  weapon: ["fist"],
});

const player2 = new Player ({
  player: 2,
  name: "SubZero",
  hp: 110,
  img: "subzero",
  weapon: ["wrench"],
})


export { player1, player2 };

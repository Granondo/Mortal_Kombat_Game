export class Request {
  getAll = async () => {
    const all = await fetch(
      "https://reactmarathon-api.herokuapp.com/api/mk/players"
    ).then((response) => response.json());

    return all;
  };

  getRandomEnemy = async () => {
    const enemy = await fetch(
      "https://reactmarathon-api.herokuapp.com/api/mk/player/choose"
    ).then(response => response.json())

    return enemy
  };




}

const request = new Request

export default request

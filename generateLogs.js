import logs from "./log.js";
import {chat} from './main.js'
import { getRandom } from "./utils.js";

const date = new Date();
const normalize = (number) =>
  number.toString().length > 1 ? number : `0${number}`;
const time = `${normalize(date.getHours())} : ${normalize(date.getMinutes())}`;

const generateLogs = (type, player1, player2, damage, currentHP) => {
  let text = logs[type];

  switch (type) {
    case "start":
      text = text
        .replace("[time]", time)
        .replace("[player1]", player1.name)
        .replace("[player2]", player2.name);
      break;
    case "hit":
      console.log(text.length);
      text = text[getRandom(text.length - 1)]
        .replace("[playerKick]", player1.name)
        .replace("[playerDefence]", player2.name);
      text = `${time} | ${text} -${damage} [${currentHP}/100]`;
      break;
    case "defence":
      text = text[getRandom(text.length - 1)]
        .replace("[playerKick]", player1.name)
        .replace("[playerDefence]", player2.name);
        text = `${time} | ${text}`;
      break;
    case "draw":
      text = `${time} | ${text}`;
      break;
    case "end":
      text = text[getRandom(text.length - 1)]
        .replace("[playerWins]", player1.name)
        .replace("[playerLose]", player2.name);
      text = `${time} | ${text}`;
      break;
    default:
      text = `${time} Игра была равна, играли два...`;
      break;
  }

  const element = `<p>${text}</p>`;
  chat.insertAdjacentHTML("afterbegin", element);
};

export  {generateLogs};

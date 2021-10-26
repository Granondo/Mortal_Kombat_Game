import logs from "./log.js";

const generateLogs = (type, player1, player2, damage, currentHP) => {
  const text = logs[type];

  switch (type) {
    case "start":
      text = text
        .replace("[time]", time)
        .replace("[player1]", player1.name)
        .replace("[player2]", player2.name);
      break;
    case "hit":
      text = text
        .getRandom(text.length - 1)
        .replace("[playerKick]", player1.name)
        .replace("[playerDefence]", player2.name);
      text = `${time} | ${text} ${damage} [${currentHP}/100]`;
      break;
    case "defence":
      text = text
        .getRandom(text.length - 1)
        .replace("[playerKick]", player1.name)
        .replace("[playerDefence]", player2.name);
      break;
    case "draw":
      text = `${time} | ${text}`;
      break;
    case "end":
      text = text
        .getRandom(text.length - 1)
        .replace("[playerWins]", player1.name)
        .replace("[playerLose]", player2.name);
      text = `${time} | ${text}`;
      break;
    default:
      text = "Игра была равна, играли два...";
      break;
  }

  const element = `<p>${text}</p>`;
  chat.insertAdjacentHTML("afterbegin", element);
};

export default generateLogs;

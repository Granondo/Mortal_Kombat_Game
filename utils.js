export const getRandom = (number) => {
  return Math.ceil(Math.random() * number);
}

export const createNewElement = (tag, className) => {
  const newTag = document.createElement(tag);

  if (className) {
    newTag.classList.add(className);
  }

  return newTag;
}

export const convertToLowerCase = (str) => str.trim().toLowerCase();

export const capitalize = (str) => {
  return str
    .split('-')
    .map(function (text) {
      return text[0].toUpperCase() + text.substr(1).toLowerCase();
    })
    .join(' ');
};

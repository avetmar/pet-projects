const ps = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!$%&|[](){}:;.,*+-#@<>~",
};

const passwordLength = document.querySelector(".pass-length input");
const passwordDetails = document.querySelector(".pass-length .details span");

const generatePassword = () => {
  const length = +passwordLength.value;
  console.log(length);
};

passwordLength.oninput = generatePassword;

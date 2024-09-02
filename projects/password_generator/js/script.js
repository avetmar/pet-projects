const ps = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!$%&|[](){}:;.,*+-#@<>~",
};

const passwordLength = document.querySelector(".pass-length input");
const passwordDetails = document.querySelector(".pass-length .details span");
const passwordIndicator = document.querySelector(".pass-indicator");
const passwordInput = document.querySelector(".input-box input");
const copyButton = document.querySelector(".input-box span");

const randomIntegr = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
const shuffleString = (str) =>
  str
    .split("")
    .sort(function () {
      return 0.5 - Math.random();
    })
    .join("");

const updatePassworIndicator = (l) => {
  passwordDetails.textContent = l;
  passwordIndicator.classList.remove("strong", "medium");

  if (l >= 16) {
    passwordIndicator.classList.add("strong");
  } else if (l >= 8) {
    passwordIndicator.classList.add("medium");
  }
};

const copyPassword = () => {
  navigator.clipboard.writeText(passwordInput.value);
  copyButton.textContent = "check";
  copyButton.style.color = "#42a048";
  setTimeout(function () {
    copyButton.textContent = "copy_all";
    copyButton.style.color = "#707070";
  }, 1000);
};

const restorePasswordOptions = () => {
  if (localStorage.getItem("passwordOption")) {
    const passwordOption = JSON.parse(localStorage.getItem("passwordOption"));
    uppercase.checked = passwordOption["uppercase"];
    numbers.checked = passwordOption["numbers"];
    symbols.checked = passwordOption["symbols"];
    passwordLength.value = passwordOption.lenght;
  }
};

const savePasswordOoptions = () => {
  const passwordOption = {};
  passwordOption["lenght"] = +passwordLength.value;
  passwordOption["uppercase"] = uppercase.checked;
  passwordOption["numbers"] = numbers.checked;
  passwordOption["symbols"] = symbols.checked;
  localStorage.setItem("passwordOption", JSON.stringify(passwordOption));
};

const generatePassword = () => {
  savePasswordOoptions();
  const length = +passwordLength.value;
  updatePassworIndicator(length);

  let passString = shuffleString(ps.lowercase);
  if (uppercase.checked) {
    passString = shuffleString(passString + ps.uppercase);
  }
  if (numbers.checked) {
    passString = shuffleString(passString + ps.numbers);
  }
  if (symbols.checked) {
    passString = shuffleString(passString + ps.symbols);
  }

  let randomPassword = "";

  for (let i = 0; i < length; i++) {
    passString = shuffleString(passString);
    let random = randomIntegr(0, passString.length - 1);
    randomPassword += passString[random];
  }
  passwordInput.value = randomPassword;
};

restorePasswordOptions();
passwordLength.oninput = generatePassword;
document.querySelector(".generate-btn").addEventListener("click", generatePassword);
generatePassword();
copyButton.addEventListener("click", copyPassword);

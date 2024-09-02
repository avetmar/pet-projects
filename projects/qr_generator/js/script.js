const wrapper = document.querySelector(".wrapper");
const form = wrapper.querySelector(".form");
const input = wrapper.querySelector(".form input");
const btn = wrapper.querySelector(".form button");
const img = wrapper.querySelector(".qr-code img");

let currentValueInput;

form.addEventListener("submit", (event) => {
  event.preventDefault();

  //block dublicate generation
  const inputValue = input.value.trim();
  if (!inputValue || inputValue === currentValueInput) return;
  currentValueInput = inputValue;

  btn.textContent = "Creating QR code...";
  img.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${inputValue}`;

  img.addEventListener("load", () => {
    wrapper.classList.add("active");
    btn.textContent = "Generate QR code";
  });

  img.addEventListener("error", () => {
    alert("Error loading image QR code. Please try again");
    location.reload();
  });
});

input.addEventListener("input", function () {
  if (!this.value.trim() && wrapper.classList.contains("active")) {
    wrapper.classList.remove("active");
  }
});

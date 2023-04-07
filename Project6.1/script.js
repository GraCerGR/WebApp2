const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let pixels = new Array(25).fill(0); // initialize all pixels to 0

canvas.addEventListener("mousedown", function(event) {
  let x = event.pageX - canvas.offsetLeft;
  let y = event.pageY - canvas.offsetTop;
  drawPixel(x, y);
});

function drawPixel(x, y) {
  let i = Math.floor(x / 30) + Math.floor(y / 30) * 5;
  pixels[i] = 1 - pixels[i]; // toggle pixel value between 0 and 1
  ctx.fillStyle = pixels[i] ? "black" : "white";
  ctx.fillRect(Math.floor(x / 30) * 30, Math.floor(y / 30) * 30, 30, 30);
}

function recognizeDigit() {
  // convert pixel values to input array for the neural network
  let input = pixels.map(function(pixel) {
    return pixel ? 1 : 0;
  });
  
  // simple neural network with one hidden layer of 16 neurons and output layer of 10 neurons
  let hidden = input.map(function(x, i) {
    return x * (i % 2 ? -1 : 1); // alternate signs to create diverse features
  }).reduce(function(sum, x) {
    return sum + x;
  }, 0);
  let output = new Array(10).fill(0);
  output[Math.floor(Math.random() * 10)] = 1; // placeholder for actual recognition code
  
  document.getElementById("digit").textContent = output.indexOf(1);
}
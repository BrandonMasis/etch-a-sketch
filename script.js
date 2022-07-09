// canvas.innerHTML = grid(100);
const canvas = document.getElementById("canvas");
const squares = document.querySelectorAll(".square");
const swatches = document.querySelectorAll(".swatch");
const eraser = document.getElementById("eraser");
const picker = document.querySelector("dino-color-picker");
const rainbow = document.getElementById("rainbow");
const slider = document.getElementById("gridSize");
const sliderValue = document.getElementById("sliderValue");
const dropper = document.getElementById("dropper");
const currentColorDisplay = document.getElementById("currentColor");

function randomValue() {
  return Math.floor(Math.random() * 255);
}

function randomIndex() {
  return Math.floor(Math.random() * 3);
}

function randomColor(rv, ri) {
  // rgb(255, 117, 25)
  const array = [];

  array.splice(ri(), 0, "228");
  array.splice(ri(), 0, "79");
  array.splice(ri(), 0, `${rv()}`);

  return `rgb(${array[0]},${array[1]},${array[2]})`;
}

let currentColor = "rgb(62 56 56)";
currentBrightness = "brightness(100%)";
let coloring = true;
rainbowMode = false;

function grid(size) {
  let result = "";
  let row = `<div class="row">`;
  let square = '<div class="square"></div>';

  for (let i = 0; i < size; i++) {
    row += square;
  }
  row += "</div>";
  for (let i = 0; i < size; i++) {
    result += row;
  }

  canvas.innerHTML = result;

  // re assign event listeners
  const squares = document.querySelectorAll(".square");
  for (let square of squares) {
    square.addEventListener("click", (e) => {
      if (coloring === true) {
        coloring = false;
      } else {
        coloring = true;
      }
    });

    square.addEventListener("click", (e) => {
      if (dropperActive) {
        rainbowMode = false;
        rainbow.style.border = "";
        currentColor = square.style.backgroundColor;
        currentColorDisplay.style.backgroundColor = currentColor;
      } else if (rainbowMode) {
        square.style.backgroundColor = randomColor(randomValue, randomIndex);
      } else {
        square.style.backgroundColor = currentColor;
      }
      dropperActive = false;
      dropper.style.border = "";
    });

    square.addEventListener("mouseenter", (e) => {
      if (coloring) {
        if (rainbowMode) {
          square.style.backgroundColor = randomColor(randomValue, randomIndex);
        } else {
          square.style.backgroundColor = currentColor;
        }
      } else {
        return;
      }
    });
  }

  eraser.addEventListener("click", () => {
    for (let square of squares) {
      square.style.backgroundColor = "rgb(31, 26, 26)";
    }
  });
}

grid(16); // default grid to 16x16

for (let swatch of swatches) {
  swatch.addEventListener("click", (e) => {
    coloring = false;
    currentColor = swatch.getAttribute("data-color");
  });
}

//rainbow mode = randomColor(randomValue, randomIndex)

////////
function colorPicker() {
  let rgba = `rgb(${picker._rgba[0]},${picker._rgba[1]},${picker._rgba[2]})`;
  return rgba;
}

picker.addEventListener("change", () => {
  currentColor = colorPicker();
  currentColorDisplay.style.backgroundColor = currentColor;
  rainbowMode = false;
});

rainbow.addEventListener("click", () => {
  if (rainbowMode === true) {
    rainbowMode = false;
    rainbow.style.border = "";
  } else {
    rainbowMode = true;
    rainbow.style.border = "solid yellowgreen 5px";
  }
});

slider.onchange = () => {
  sliderValue.innerText = `Grid size ${slider.value}x${slider.value}`;
  grid(slider.value);
};

let dropperActive = false;

dropper.addEventListener("click", () => {
  coloring = false;
  rainbowMode = false;
  rainbow.style.border = "";
  if (dropperActive === false) {
    dropperActive = true;
    dropper.style.border = "greenyellow solid 5px";
  } else {
    dropperActive = false;
    dropper.style.border = "";
  }
});

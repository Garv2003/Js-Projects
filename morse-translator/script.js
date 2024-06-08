const textAreaInput = document.querySelector("#textAreaInput");
const morseAreaInput = document.querySelector("#morseAreaInput");
const textClipboard = document.querySelector("#textClipboard");
const morseClipboard = document.querySelector("#morseClipboard");
const morseMainChart = document.getElementById("morseMainChart");
const accordions = document.querySelectorAll(".accordion-label");

const MORSE_CODE = {
  ".-": "A",
  "-...": "B",
  "-.-.": "C",
  "-..": "D",
  ".": "E",
  "..-.": "F",
  "--.": "G",
  "....": "H",
  "..": "I",
  ".---": "J",
  "-.-": "K",
  ".-..": "L",
  "--": "M",
  "-.": "N",
  "---": "O",
  ".--.": "P",
  "--.-": "Q",
  ".-.": "R",
  "...": "S",
  "-": "T",
  "..-": "U",
  "...-": "V",
  ".--": "W",
  "-..-": "X",
  "-.--": "Y",
  "--..": "Z",
  "-----": "0",
  ".----": "1",
  "..---": "2",
  "...--": "3",
  "....-": "4",
  ".....": "5",
  "-....": "6",
  "--...": "7",
  "---..": "8",
  "----.": "9",
};

const odolBodolFunc = (keys, values) => {
  let obj = {};
  for (let i = 0; i < keys.length; i++) {
    obj[values[i]] = keys[i];
  }
  return obj;
};
const morseKeys = Object.keys(MORSE_CODE);
const morseValues = Object.values(MORSE_CODE);
const odolBodolMorse = odolBodolFunc(morseKeys, morseValues);

const checkInputValidation = (input, inputArea) => {
  inputArea.value = inputArea.value.replace(input, "");

  if (inputArea.value == morseAreaInput.value) {
    if (input === "") {
    } else {
      inputArea.style.borderColor = "red";
      setTimeout(() => {
        inputArea.style.borderColor = "#3273dc";
      }, 400);
    }
  } else {
    inputArea.style.borderColor = "red";
    setTimeout(() => {
      inputArea.style.borderColor = "#3273dc";
    }, 400);
  }
};

const showOutput = (input, areaInput, tTMMTT) => {
  if (input) {
    areaInput.value = tTMMTT;
  } else {
    areaInput.value = "";
  }
};

const textToMorseOrMorseToText = (letters, morseCode, inputArea) => {
  let tTMMTT = [];

  for (let x = 0; x < letters.length; x++) {
    tTMMTT[x] = [];
    for (let y = 0; y < letters[x].length; y++) {
      if (morseCode[letters[x][y]]) {
        tTMMTT[x].push(morseCode[letters[x][y]]);
      } else {
        checkInputValidation(letters[x][y], inputArea);
      }
    }
  }
  return tTMMTT;
};

const onTextInput = (e) => {
  const textInput = e.value.toUpperCase();
  const word = textInput.split(" ");
  const letters = word.map((char) => char.split(""));
  const textToMorse = textToMorseOrMorseToText(
    letters,
    odolBodolMorse,
    textAreaInput
  );
  const textToMorseMain = textToMorse.map((word) => word.join(" ")).join("   ");
  showOutput(textInput, morseAreaInput, textToMorseMain);
};

const onMorseInput = (e) => {
  const morseInput = e.value;
  const word = morseInput.split("   ");
  const letters = word.map((char) => char.split(" "));
  const morseToText = textToMorseOrMorseToText(
    letters,
    MORSE_CODE,
    morseAreaInput
  );

  const morseToTextMain = morseToText.map((word) => word.join("")).join(" ");

  showOutput(morseInput, textAreaInput, morseToTextMain);
};

textClipboard.addEventListener("click", function () {
  copyClipboard(textAreaInput);
});
morseClipboard.addEventListener("click", function () {
  copyClipboard(morseAreaInput);
});

function copyClipboard(areaInput) {
  if (textAreaInput.value || morseAreaInput.value) {
    areaInput.select();
    areaInput.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert("Copied the text: " + areaInput.value);
  } else {
    alert("Type something to copy");
  }
}

Object.entries(MORSE_CODE).forEach(([key, value]) => {
  const colros = [
    "#FAFAFA",
    "#fcfcfc",
    "#f7f5f6",
    "#e3e4e5",
    "#d9dfe0",
    "#fdfff5",
    "#e5e9e1",
    "#dde4e3",
    "#d2d2df",
    "#d6d7d2",
    "#dee1e9",
    "#dcdcdc",
    "#fafafa",
    "#dae4ee",
    "#e5edf1",
    "#e2e3eb",
    "#f7f7f7",
    "#f4f5f0",
    "#eff3f0",
    "#f8f8ff",
  ];

  const randomInd = Math.floor(Math.random() * colros.length + 1);
  const randomCol = colros[randomInd];

  morseMainChart.innerHTML += `<div style="background-color: ${randomCol}" class="chart-item">
							 		<strong> ${value}</strong> 
									<strong class="symbol"> ${key} </strong> 	
								<div>`;
});

Array.from(accordions).forEach((accordion) => {
  accordion.addEventListener("click", function () {
    this.classList.toggle("is-open");
    const content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});

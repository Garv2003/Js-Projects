const currentTimElement = document.getElementById("current-time");
const zoneIdSelector = document.getElementById("zone-id-selector");
const convertBtn = document.getElementById("convert-btn");
const targetDateElement = document.getElementById("result-date");

window.setInterval(showCurrentDate, 1000);

function showCurrentDate() {
  const localDate = new Date();

  let options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZoneName: "short",
  };

  currentTimElement.innerText =
    "CURRENT DATE TIME : " +
    new Intl.DateTimeFormat("en-US", options).format(localDate);
}

convertBtn.onclick = () => {
  let selectedIndex = zoneIdSelector.selectedIndex;
  let selectedOption = zoneIdSelector.options[selectedIndex];
  let selectedZone = selectedOption.value;
  let localDate = new Date();
  targetDateElement.innerText =
    selectedZone +
    " : " +
    localDate.toLocaleString("en-US", { timeZone: selectedZone.trim() });
};

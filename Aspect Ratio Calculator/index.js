const ratioWidth = document.getElementById("ratio-width");
const ratioHeight = document.getElementById("ratio-height");
const width = document.getElementById("width");
const height = document.getElementById("height");

const calculateWidth = () => {
  const aspectRatio = ratioWidth.value / ratioHeight.value;
  width.value = parseFloat((height.value * aspectRatio).toFixed(2));
};

const calculateHeight = () => {
  const aspectRatio = ratioWidth.value / ratioHeight.value;
  height.value = parseFloat((width.value / aspectRatio).toFixed(2));
};

height.addEventListener("input", calculateWidth);
width.addEventListener("input", calculateHeight);
ratioHeight.addEventListener("input", calculateWidth);
ratioWidth.addEventListener("input", calculateHeight);

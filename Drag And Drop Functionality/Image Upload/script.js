const dropArea = document.querySelector("#drop-area");
const inputFile = document.querySelector("#input-file");
const imageView = document.querySelector("#img-view");

inputFile.addEventListener("change", uploadimage);

function uploadimage() {
  let imgLink = URL.createObjectURL(inputFile.files[0]);
  imageView.style.backgroundImage = `url(${imgLink})`;
  imageView.style.backgroundSize = "cover";
  imageView.style.backgroundPosition = "center";
  imageView.style.backgroundRepeat = "no-repeat";
  imageView.style.border = "none";
  imageView.textContent = "";
}

dropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
});

dropArea.addEventListener("drop", (event) => {
  event.preventDefault();
  let imgLink = URL.createObjectURL(event.dataTransfer.files[0]);
  imageView.style.backgroundImage = `url(${imgLink})`;
  imageView.style.backgroundSize = "cover";
  imageView.style.backgroundPosition = "center";
  imageView.style.backgroundRepeat = "no-repeat";
  imageView.style.border = "none";
  imageView.textContent = "";
});

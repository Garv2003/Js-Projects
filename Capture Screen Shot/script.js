const screenshotBtn = document.getElementById("screenshotBtn");

screenshotBtn.addEventListener("click", TakeScreenShot);

async function TakeScreenShot() {
  screenshotBtn.classList.add("hidden");
  const canvas = await html2canvas(document.documentElement, {
    scale: window.devicePixelRatio,
    logging: true,
    useCORS: true,
    windowWidth: window.innerWidth,
    windowHeight: window.innerWidth,
  });

  const image = canvas
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
  let link = document.createElement("a");
  link.download = "screenshot.png";
  link.href = image;
  link.click();
  screenshotBtn.classList.remove("hidden");
}

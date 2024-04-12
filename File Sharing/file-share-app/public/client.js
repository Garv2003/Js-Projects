const fileInputElement = document.getElementById("file-input");
const shareButton = document.getElementById("share-btn");
const dynamicContent = document.querySelector(".dynamic-content");
const socket = io();

window.addEventListener("load", () => {
  let newFile = {
    buffer: [],
    metadata: null,
  };

  socket.on("file-metadata", (metadata) => {
    // received metadata ⚡️
    newFile.metadata = metadata;
    newFile.buffer = [];

    console.log("received metadata ⚡️");
  });

  socket.on("file-chunk", (chunk) => {
    /** Use the dynamicContent.innerHTML to show an HTML element to the user when a chunk is received.
    You can track, calculate and display progress
    dynamicContent.innerHTML = <b></b>
    **/

    newFile.buffer.push(chunk);

    if (newFile.buffer.length === newFile.metadata.bufferSize) {
      // complete file has been received
      let receivedFile = new Blob(newFile.buffer);
      downloadFile(receivedFile, newFile.metadata.filename);

      newFile = {};
      alert("Yayy! File received 🎉");
    }
  });
});

function downloadFile(blob, name = "shared.txt") {
  const blobUrl = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = blobUrl;
  link.download = name;
  document.body.appendChild(link);

  link.dispatchEvent(
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    })
  );

  document.body.removeChild(link);
}
shareButton.addEventListener("click", async () => {
  if (fileInputElement.files.length === 0) {
    alert("Choose the file you want to send 📁");
    return;
  }

  let file = fileInputElement.files[0];
  let reader = new FileReader();

  reader.onload = () => {
    let buffer = new Uint8Array(reader.result);
    initFileShare({ filename: file.name, bufferSize: buffer.length }, buffer);
  };

  reader.readAsArrayBuffer(file);
});

function initFileShare(metadata, buffer) {
  socket.emit("file-metadata", metadata);

  let chunkSize = 1024;
  let initialChunk = 0;

  while (initialChunk < metadata.bufferSize) {
    let filePiece = buffer.slice(0, chunkSize);
    console.log(metadata.bufferSize, filePiece.length);

    socket.emit("file-chunk", filePiece);

    initialChunk++;
  }
}

function downloadFile(blob, name = "shared.txt") {
  const blobUrl = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = blobUrl;
  link.download = name;
  document.body.appendChild(link);

  link.dispatchEvent(
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    })
  );

  document.body.removeChild(link);
}

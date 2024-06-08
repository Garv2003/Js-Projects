const addBtns = document.querySelectorAll(".add-btn:not(.solid)");
const saveItemBtns = document.querySelectorAll(".solid");
const addItemContainers = document.querySelectorAll(".add-container");
const addItems = document.querySelectorAll(".add-item");

const listColumns = document.querySelectorAll(".dragndrop-item-list");
const backlogList = document.getElementById("backlog-list");
const progressList = document.getElementById("progress-list");
const completeList = document.getElementById("complete-list");
const onHoldList = document.getElementById("on-hold-list");

let isUpdatedOnLoad = false;

let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArray = [];

let draggedItem;
let isDragging;
let currentColumn;

function getSavedColumns() {
  if (localStorage.getItem("backlogItems")) {
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    completeListArray = JSON.parse(localStorage.completeItems);
    onHoldListArray = JSON.parse(localStorage.onHoldItems);
  } else {
    backlogListArray = ["this is backlog", "testing backlog"];
    progressListArray = ["this is progress", "on the way"];
    completeListArray = ["this is complete", "Yahh!, completed"];
    onHoldListArray = ["Hold me for some time"];
  }
}

function updateSavedColumns() {
  listArray = [
    backlogListArray,
    progressListArray,
    completeListArray,
    onHoldListArray,
  ];
  const listNames = ["backlog", "progress", "complete", "onHold"];

  listNames.forEach((listName, index) => {
    localStorage.setItem(`${listName}Items`, JSON.stringify(listArray[index]));
  });
}

function createItemElm(columnEl, column, item, index) {
  const listEl = document.createElement("li");
  listEl.classList.add("drag-item");
  listEl.textContent = item;
  listEl.draggable = true;
  listEl.setAttribute("ondragstart", "drag(event)");
  listEl.contentEditable = true;
  listEl.id = index;
  listEl.setAttribute("onfocusout", `updateItem(${index}, ${column})`);
  columnEl.appendChild(listEl);
}

function updateDOM() {
  if (!isUpdatedOnLoad) {
    getSavedColumns();
  }

  backlogList.textContent = "";
  backlogListArray.forEach((backlogItem, index) => {
    createItemElm(backlogList, 0, backlogItem, index);
  });

  progressList.textContent = "";
  progressListArray.forEach((progressItem, index) => {
    createItemElm(progressList, 1, progressItem, index);
  });

  completeList.textContent = "";
  completeListArray.forEach((completeItem, index) => {
    createItemElm(completeList, 2, completeItem, index);
  });

  onHoldList.textContent = "";
  onHoldListArray.forEach((onHoldItem, index) => {
    createItemElm(onHoldList, 3, onHoldItem, index);
  });

  isUpdatedOnLoad = true;
  updateSavedColumns();
}

function updateItem(itemIndex, columnIndex) {
  const selectedArray = listArray[columnIndex];
  const selectedColumnEl = listColumns[columnIndex].children;
  const selectedItemText = selectedColumnEl[itemIndex].textContent;

  if (!isDragging) {
    if (!selectedItemText) {
      selectedArray.splice(itemIndex, 1);
    } else {
      selectedArray.splice(itemIndex, 1, selectedItemText);
    }
    updateDOM();
  }
}

function addItemToColumn(columnIndex) {
  const itemText = addItems[columnIndex].textContent;
  const selectedArray = listArray[columnIndex];
  selectedArray.push(itemText);
  addItems[columnIndex].textContent = "";

  updateDOM();
}

function showAddContainer(columnIndex) {
  addBtns[columnIndex].style.display = "none";
  saveItemBtns[columnIndex].style.display = "block";
  addItemContainers[columnIndex].style.display = "block";
}

function saveItem(columnIndex) {
  addBtns[columnIndex].style.display = "block";
  saveItemBtns[columnIndex].style.display = "none";
  addItemContainers[columnIndex].style.display = "none";

  addItemToColumn(columnIndex);
}

function rebuildArrays() {
  const eachListArrays = [backlogList, progressList, completeList, onHoldList];

  backlogListArray = [];
  progressListArray = [];
  completeListArray = [];
  onHoldListArray = [];

  backlogListArray = Array.from(backlogList.children).map(
    (item) => item.textContent
  );
  progressListArray = Array.from(progressList.children).map(
    (item) => item.textContent
  );
  completeListArray = Array.from(completeList.children).map(
    (item) => item.textContent
  );
  onHoldListArray = Array.from(onHoldList.children).map(
    (item) => item.textContent
  );

  updateDOM();
}

function drag(e) {
  draggedItem = e.target;
  isDragging = true;
}

function allowDrop(e) {
  e.preventDefault();
}

function dragEnter(columnIndex) {
  listColumns[columnIndex].classList.add("over");
  currentColumn = columnIndex;
}

function dropItem(e) {
  e.preventDefault();
  listColumns.forEach((column) => {
    column.classList.remove("over");
  });

  const parent = listColumns[currentColumn];
  parent.appendChild(draggedItem);

  isDragging = false;
  rebuildArrays();
}

updateDOM();

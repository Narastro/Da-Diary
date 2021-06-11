const toDoForm = document.querySelector(".toDoForm"),
  toDoInput = toDoForm.querySelector(".toDoInput"),
  toDoList = document.querySelector(".toDoList"),
  doneList = document.querySelector(".completeToDoList"),
  defaultTodo = document.querySelector(".toDoWhat"),
  defaultDone = document.querySelector(".DoneWhat"),
  todoNum = document.querySelector(".todoNum"),
  doneNum = document.querySelector(".doneNum");

const TODOS_LS = "toDos",
  DONE_LS = "dones";

let toDos = [],
  dones = [],
  idNumbers = 1;

function deleteDone(event) {
  const btn = event.target;
  const li = btn.parentNode;
  doneList.removeChild(li);
  const cleanDone = dones.filter(function (done) {
    return done.id !== parseInt(li.id);
  });
  dones = cleanDone;
  handledefault();
  saveToDos();
}

function completeToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = idNumbers;
  idNumbers += 1;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteDone);
  span.innerText = text + " ";

  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  doneList.appendChild(li);
  const doneObj = {
    text: text,
    id: newId,
  };
  dones.push(doneObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  handledefault();
  toDoInput.value = "";
}

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  handledefault();
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  localStorage.setItem(DONE_LS, JSON.stringify(dones));
}

function handledefault() {
  defaultTodo.style.opacity = 1;
  defaultDone.style.opacity = 1;
  todoNum.innerText = 0;
  doneNum.innerText = 0;

  if (toDoList.hasChildNodes()) {
    const num = toDoList.childNodes.length;
    defaultTodo.style.opacity = 0;
    todoNum.innerText = num;
  }
  if (doneList.hasChildNodes()) {
    const num = doneList.childNodes.length;
    defaultDone.style.opacity = 0;
    doneNum.innerText = num;
  }
}

function paintToDo(text) {
  const li = document.createElement("li");
  const comBtn = document.createElement("button");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = idNumbers;
  idNumbers += 1;
  delBtn.innerText = "❌";
  comBtn.innerText = "✔";
  delBtn.addEventListener("click", deleteToDo);
  comBtn.addEventListener("click", () => {
    completeToDo(text), deleteToDo(event);
  });
  span.innerText = text + " ";

  li.appendChild(span);
  li.appendChild(comBtn);
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  handledefault();
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  const loadedDones = localStorage.getItem(DONE_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
    handledefault();
  }
  if (loadedDones !== null) {
    const parsedDones = JSON.parse(loadedDones);
    parsedDones.forEach(function (done) {
      completeToDo(done.text);
    });
    handledefault();
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();

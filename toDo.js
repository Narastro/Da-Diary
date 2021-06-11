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

// 완료한 일 삭제하는 함수
const deleteDone = (event) => {
  const btn = event.target;
  const li = btn.parentNode;

  doneList.removeChild(li);
  dones = dones.filter((done) => done.id !== parseInt(li.id));

  handledefault();
  saveToDos();
};

// 할 일 삭제하는 함수
const deleteToDo = (event) => {
  const btn = event.target;
  const li = btn.parentNode;

  toDoList.removeChild(li);
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));

  handledefault();
  saveToDos();
};

// 완료한 일 추가하는 함수
const completeToDo = (text) => {
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
    text,
    id: newId,
  };

  dones.push(doneObj);
  saveToDos();
};

// 할 일 추가하는 함수
const paintToDo = (text) => {
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
    text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos();
};

// 현재 객체를 로컬스토리지에 저장하는 함수
const saveToDos = () => {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  localStorage.setItem(DONE_LS, JSON.stringify(dones));
};

// 디폴트 메세지 및 갯수를 출력해주는 함수
const handledefault = () => {
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
};

// 입력 버튼을 눌렀을 때 처리하는 함수
const handleSubmit = (event) => {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  handledefault();
  toDoInput.value = "";
};

// 로컬스토리지에 저장된 값을 불러오는 함수
const loadToDos = () => {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  const loadedDones = localStorage.getItem(DONE_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach((toDo) => {
      paintToDo(toDo.text);
    });
    handledefault();
  }
  if (loadedDones !== null) {
    const parsedDones = JSON.parse(loadedDones);
    parsedDones.forEach((done) => {
      completeToDo(done.text);
    });
    handledefault();
  }
};

// 초기 함수
function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();

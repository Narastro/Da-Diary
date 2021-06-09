const toDoForm = document.querySelector(".toDoForm"),
  toDoInput = toDoForm.querySelector(".toDoInput"),
  toDoList = document.querySelector(".js-toDoList");
const TODOS_LS = "toDos";

let toDos = [],
  idNumbers = 1;

//이벤트 발생시 지우는 함수
function deleteToDo(event) {
  //이벤트의 타겟중 부모노드를 찾음
  const btn = event.target;
  const li = btn.parentNode;
  //toDoList 중 부모노드의 자식들을 지움
  toDoList.removeChild(li);
  //toDos에 대해 다음과 같은 함수를 실행하는 것을 cleanToDos라 정의
  const cleanToDos = toDos.filter(function (toDo) {
    //이벤트의 타겟이 되는 부모노드의 id와 같지 않은 애들만 리턴함
    //즉 타겟만 지워지고 나머지 애들이 있는 것을 cleanToDos
    return toDo.id !== parseInt(li.id);
  });
  //save
  //toDos를 cleanToDos로 교체해줌
  toDos = cleanToDos;
  //저장
  saveToDos();
}

//로컬 스토리지에 toDos객체를 스트링화해서 저장하는 함수
function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

//화면에 텍스트를 띄우는 함수
function paintToDo(text) {
  //li,button,span을 만드는 변수를 선언
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  //새로운 값은 toDos길이+1의 id를 가짐
  const newId = idNumbers;
  idNumbers += 1;
  //button안에 x표시
  delBtn.innerText = "❌";
  //버튼 클릭시 deleteToDo 함수를 실행시킴
  delBtn.addEventListener("click", deleteToDo);
  //입력된 값을 span에 저장
  span.innerText = text + " ";
  //버튼과 span을 각각 li 밑으로 들어가게 만듬

  li.appendChild(span);
  li.appendChild(delBtn);
  //li의 id는 newId로 설정
  li.id = newId;
  //toDoList 밑으로 li를 보냄
  toDoList.appendChild(li);
  //toDos에 넣을 객체
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  //저장
  saveToDos();
}

//이벤트 발생시 제출된 값을 paintToDo 돌리는 함수
function handleSubmit(event) {
  //디폴트값으로 돌아가는 것을 막아줌
  event.preventDefault();
  //인풋에 제출된 값을 변수로 선언
  const currentValue = toDoInput.value;
  //그 값을 paint함
  paintToDo(currentValue);
  //다시 입력하기 좋게 적힌 값을 지움
  toDoInput.value = "";
}

//toDos 객체에 저장된 값을 불러오는 함수
function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    //자바스크립트는 로컬스토리지에서 불러온 데이터를 스트링으로 저장하려고 하니까 객체형태로 바꿔준거임
    const parsedToDos = JSON.parse(loadedToDos);
    //객체에 있는 각각 요소의 text에 대해 paintToDo함수를 실행시킴
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  //html form에 제출되는 이벤트가 발생될시 handleSubmit함수를 실행시킴
  toDoForm.addEventListener("submit", handleSubmit);
}

init();

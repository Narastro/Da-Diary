const preChatYou = document.querySelector(".meassage-row--you"),
      preChatYouTime = preChatYou.querySelector(".message__time"),
      preChatMe = document.querySelector(".message-row--own"),
      preChatMeTime = preChatMe.querySelector(".message__time");

const chatDay = document.querySelector(".chat__timestamp");

const chatForm = document.querySelector(".reply"),
  chatInput = chatForm.querySelector("input"),
  chat = document.querySelector(".message-row__column");

const CHAT = "chat";

let chat_LS = [];

function getTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    return `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes}`;
}

//화면에 텍스트를 띄우는 함수
function paintChat(text) {

  const div = document.createElement("div");
  const span_c = document.createElement("span");
  const span_t = document.createElement("span");

    const time = getTime();

  div.classList.add("message-row_content");
  div.classList.add("message__info");
  span_c.classList.add("message__buble");
  span_t.classList.add("message__time")

  span_c.innerText= text;
  span_t.innerText= time;

  div.appendChild(span_c);
  div.appendChild(span_t);

  chat.appendChild(div);

}

//이벤트 발생시
function handleSubmit(event) {
    //디폴트값으로 돌아가는 것을 막아줌
  event.preventDefault();
  //인풋에 제출된 값을 변수로 선언
  const currentValue = chatInput.value;
  //그 값을 paint함
  paintChat(currentValue);
  //다시 입력하기 좋게 적힌 값을 지움
  chatInput.value = "";

}

function handleTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const time =  `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes}`;
    preChatYouTime.innerText=time;
    preChatMeTime.innerText=time;

}

function getDay(){
    const date = new Date();
    const weeks = ['월','화','수','목','금','토','일'];
    const week = date.getDay();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getUTCFullYear();

    chatDay.innerText=`${year}년 ${month+1}월 ${day}일 ${weeks[week-1]}요일`;

}

function init() {
  chatForm.addEventListener("submit", handleSubmit);
  handleTime();
  getDay();
}

init(); 
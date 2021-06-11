const dDay = document.querySelector(".jsDday"),
  dDayTitle = document.createElement("span"),
  dDayDate = document.getElementById("dDayDate"),
  dDaybtn = document.querySelector(".dDaybtn"),
  defaultMessage = document.querySelector(".defaultMent");

dDay.appendChild(dDayTitle);

const TIME = 1000 * 60 * 60 * 24;
const TIME_MINUTES = 1000 * 60 * 60;
const TIME_SECONDS = 1000 * 60;

// You're gonna need this
function getTime() {
  // Don't delete this.
  const wantDay = new Date(`${dDayDate.value}:00:00:00+0900`);
  const today = new Date();
  const timeGap = wantDay.getTime() - today.getTime();
  const day = Math.floor(timeGap / TIME);
  const hours = Math.floor((timeGap % TIME) / TIME_MINUTES);
  const minutes = Math.floor((timeGap % TIME_MINUTES) / TIME_SECONDS);
  const seconds = Math.floor((timeGap % TIME_SECONDS) / 1000);

  dDayTitle.innerText = `${day}일 ${hours < 10 ? `0${hours}` : hours}시간 ${
    minutes < 10 ? `0${minutes}` : minutes
  }분 ${seconds < 10 ? `0${seconds}` : seconds}초 남음`;
}

const handleSubmit = (event) => {
  defaultMessage.remove();
  setInterval(getTime, 1000);
};

function init() {
  dDaybtn.addEventListener("click", handleSubmit);
}

init();

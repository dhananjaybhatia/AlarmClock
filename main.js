const currentTime = document.querySelector("h1");
const content = document.querySelector(".content");
const selectMenu = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector("button");

let alarmTime,
  isAlarmSet = false;
const ringtone = new Audio("img/Good Morning.mp3");

ringtone.crossOrigin = "anonymous"; // If your audio file is on a different origin

// Populate hour dropdown
for (let i = 1; i <= 12; i++) {
  const hour = i < 10 ? "0" + i : i;
  const option = `<option value="${hour}">${hour}</option>`;
  selectMenu[0].insertAdjacentHTML("beforeend", option);
}

// Populate minute dropdown
for (let i = 0; i < 60; i++) {
  const minute = i < 10 ? "0" + i : i;
  const option = `<option value="${minute}">${minute}</option>`;
  selectMenu[1].insertAdjacentHTML("beforeend", option);
}

// Populate AM/PM dropdown
["AM", "PM"].forEach((ampm) => {
  const option = `<option value="${ampm}">${ampm}</option>`;
  selectMenu[2].insertAdjacentHTML("beforeend", option);
});

// Update time every second
setInterval(() => {
  const date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  let ampm = h >= 12 ? "PM" : "AM";

  h = h % 12;
  h = h ? h : 12; // If hour is 0, set it to 12

  // Adding 0 before hr, min, sec if this value is less than 10
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  currentTime.innerText = `${h}:${m}:${s} ${ampm}`;
  if (alarmTime === `${h}:${m} ${ampm}`) {
    ringtone.play().catch((error) => console.log("Playback prevented:", error));
  }
}, 1000);

function setAlarm() {
  if (isAlarmSet) {
    // If isAlarmSet is true
    alarmTime = ""; // Clear the value of alarmTime
    ringtone.pause(); // Pause the ringtone
    ringtone.currentTime = 0; // Reset audio to start
    content.classList.remove("disable");
    setAlarmBtn.innerText = "Set Alarm";
    return (isAlarmSet = false); // Return isAlarmSet value to false
  }
  // Getting hour, minute, ampm select tag value
  const time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;

  if (
    time.includes("hour") ||
    time.includes("minute") ||
    time.includes("AM/PM")
  ) {
    return alert("Please select a valid time!!");
  }
  isAlarmSet = true;
  alarmTime = time;
  content.classList.add("disable");
  setAlarmBtn.innerText = "Clear Alarm";
}

setAlarmBtn.addEventListener("click", setAlarm);

// Ensuring Audio Context is Resumed on User Interaction
document.addEventListener("click", () => {
  if (ringtone.context && ringtone.context.state === "suspended") {
    ringtone.context.resume();
  }
});

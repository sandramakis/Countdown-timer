"use strict";

let countdown;
const displayTimer = document.querySelector(".timer--display");
const readyTime = document.querySelector(".ready--time");
const buttons = document.querySelectorAll(`[data-time]`);

// timer ftn
function timer(seconds) {
  clearInterval(countdown); //if there is a countdown, clear it upon initialization

  const now = Date.now();
  const then = now + seconds * 1000; // future time expected for the time to stop in seconds

  displayTimeLeft(seconds);
  endTime(then); //timestamp == the future time

  countdown = setInterval(() => {
    const secondsLeft = Math.floor((then - Date.now()) / 1000);
    const hoursLeft = Math.floor((then - Date.now()) / 3600000);
    const minutesLeft = Math.floor((then - Date.now()) / 60000);
    console.log(minutesLeft);

    if (secondsLeft < 0 && hoursLeft < 0) {
      clearInterval(countdown);
      return;
    }

    displayTimeLeft(secondsLeft);
  }, 1000);
}

// Change to 12 hour clock
function hourClock(num) {
  return num > 12 ? num - 12 : num;
}

// Add zero to numbers less than 10
function addZero(num) {
  return num < 10 ? `0${num}` : num;
}

// display seconds left from the first number
function displayTimeLeft(seconds) {
  let mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const hoursRem = Math.floor(seconds / 3600);
  mins = mins >= 60 ? mins % 60 : mins;

  const display = `${hoursRem}: ${addZero(mins)} : ${addZero(secs)}`;

  // display on the page
  displayTimer.textContent = display;
  document.title = display;
}

// expected time for the countdown to end
function endTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  let mins = end.getMinutes();

  readyTime.textContent = `Be back at ${addZero(hour)}:${addZero(mins)}`;
}

// hook the buttons up with the functions
function handleBtn() {
  const secs = this.dataset.time;
  timer(secs);
}

// listen for click events on the buttons
buttons.forEach((button) => button.addEventListener("click", handleBtn));

// listen for a submit on the form
document.custom.addEventListener("submit", function (e) {
  e.preventDefault();

  const minsInput = this.minute.value;
  timer(minsInput * 60);

  this.reset();
});

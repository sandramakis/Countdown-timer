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
    // const hoursLeft = Math.floor((then - Date.now()) / 3600000);

    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }

    displayTimeLeft(secondsLeft);
  }, 1000);
}

// display seconds left from the first number
function displayTimeLeft(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const display = `${mins} : ${secs < 10 ? "0" : ""}${secs}`;
  displayTimer.textContent = display;
  document.title = display;
}

// expected time for the countdown to end
function endTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  let mins = end.getMinutes();
  const adjustedHour = hour > 12 ? hour - 12 : hour;

  readyTime.textContent = `Be back at ${adjustedHour}:${mins < 10 ? 0 : mins}`;
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

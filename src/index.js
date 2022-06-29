"use strict";
exports.__esModule = true;
exports.timeObject = void 0;
var setTimerForm = document.querySelector('#set-timer-form');
var timeAmountText = document.getElementById('set-time-length');
var timeAmount = 10;
var totalTimeInSeconds;
var totalTime;
var increaseBtn = document.querySelector('#increase');
var decreaseBtn = document.querySelector('#decrease');
var intervalChecked = document.querySelector('#intervals-check');
var breakChecked = document.querySelector('#break-check');
var timeObject;
exports.timeObject = timeObject;
var timeHeader = document.createElement('h1');
timeHeader.innerText = "" + timeAmount;
timeAmountText.insertBefore(timeHeader, increaseBtn);
var increaseTime = function () {
    timeAmount += 1;
    timeHeader.innerText = "" + timeAmount;
};
var decreaseTime = function () {
    timeAmount -= 1;
    timeHeader.innerText = "" + timeAmount;
};
increaseBtn.onclick = function () { return increaseTime(); };
decreaseBtn.onclick = function () { return decreaseTime(); };

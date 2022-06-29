"use strict";
exports.__esModule = true;
exports.startCountdown = exports.timer = void 0;
var easytimer_js_1 = require("easytimer.js");
var timer = new easytimer_js_1.Timer();
exports.timer = timer;
// Start countdown on click, with times in seconds from form as arguments
var startCountdown = function (timeInSeconds, intervalOn, addBreak) {
    timer.start({ countdown: true, startValues: { seconds: timeInSeconds }, target: { seconds: 0 } });
    var countdownNumber = timeInSeconds;
    timer.on('secondsUpdated', function () {
        console.log('timer1 ', countdownNumber--);
    });
    //If intervals is checked, restart timer after first interval ends, else stop timer
    timer.on('targetAchieved', function () {
        console.log('timer1 ', "time's up!");
        countdownNumber = timeInSeconds;
        if (intervalOn && addBreak) {
            timer.pause();
            setTimeout(function () {
                timer.reset();
                console.log('pause');
            }, 300000);
        }
        else if (intervalOn && !addBreak) {
            timer.reset();
        }
        else {
            timer.stop();
        }
    });
};
exports.startCountdown = startCountdown;

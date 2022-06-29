import Timer from "easytimer.js";

const radius : number = 6;
let resetTimer : boolean = false;
export let globalAnalogTimerVariable : number = 0;

var a = ['noll','en ','två ','tre ','fyra ', 'fem ','sex ','sju ','åtta ','nio ','tio ','elva ','tolv ','tretton ','fjorton ','femton ','sexton ','sjutton ','arton ','nitton '];
var b = ['tjugo','trettio','fyrtio','femtio'];

document.addEventListener("DOMContentLoaded", function(event){

    let clockMarks = document.querySelector('.clock__marks');

    for (let index : number = 0; index  < 60; index++) {
        let li = document.createElement("li");
        clockMarks.appendChild(li);
    }
})

export const analogClock = (timer : Timer, timeInMinutes : number) => {

    let secondElm    : HTMLDivElement = document.querySelector('.clock__hand--second');
    let minuteElm    : HTMLDivElement = document.querySelector('.clock__hand--minute');
    const talTillOrd : HTMLDivElement = document.querySelector('#talTillOrd');

    //timer.start({countdown: true, startValues: {seconds: timeInMinutes * 60 }});
    timer.addEventListener('secondsUpdated', function (e) {
        //console.log( timer.getTimeValues().minutes, timer.getTimeValues().seconds);


        const minutes : number = timer.getTimeValues().minutes;
        const seconds : number = timer.getTimeValues().seconds;

        const secondsFraction : number = seconds / 60;
        const minutesFraction : number = (secondsFraction + minutes) / 60;

        const secondsRotate = secondsFraction * 360;
        const minutesRotate = minutesFraction * 360;

        secondElm.style.transform = `rotate(${secondsRotate}deg)`;
        minuteElm.style.transform = `rotate(${minutesRotate}deg)`;

        talTillOrd.innerText = (`${toWords(timer.getTimeValues().minutes)} minuter och ${toWords(timer.getTimeValues().seconds)} sekunder kvar`).toUpperCase();
    });
}

export const toWords = (num : number) : string => {

    if (num < 20) return a[num];
    let digit : number = num % 10;

    if (num < 100) return b[~~(num / 10) - 2] + (digit ? "" + a[digit]: "");
}


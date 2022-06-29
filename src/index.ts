import { timer, startCountdown } from './TS-module/startcountdown'
import { test } from './visual';
import { analogClock, toWords, globalAnalogTimerVariable } from './TS-module/analogClock';
import  exportNav  from "../src/TS-module/navigation";


import { StartCountDown, timer as EasyTimer } from "../src/TS-module/startCount";

let setTimerForm: HTMLFormElement = document.querySelector('#set-timer-form');

//console.log(setTimerForm);

let timeAmountText = document.getElementById('set-time-length');
let timeAmount: number = 10;
let totalTimeInSeconds: number;

let increaseBtn: HTMLAnchorElement= document.querySelector('#increase');
let decreaseBtn: HTMLAnchorElement = document.querySelector('#decrease');
let intervalChecked: HTMLInputElement = document.querySelector('#intervals-check');
let breakChecked: HTMLInputElement = document.querySelector('#break-check');


let divToRenderIn : HTMLDivElement = document.querySelector('#divToRenderIn');
let setTimerFormSection : HTMLDivElement = document.querySelector('#setTimeFormSection');
let analogClockDiv : HTMLDivElement = document.querySelector('#analogClock');
let startTimerButton : HTMLDivElement = document.querySelector('#startTimerBtn');
let startDiv : HTMLDivElement = document.querySelector('#app');
let abortButton : HTMLButtonElement = document.querySelector('#stop');
let backToTimer : HTMLButtonElement = document.querySelector('#Back2Timer');
let breakPage : HTMLButtonElement = document.querySelector('#break-page');
let breakPageButton : HTMLButtonElement = document.querySelector('#break-page');
let breakPagePauseButton : HTMLButtonElement = document.querySelector('#pause');

divToRenderIn.appendChild(startDiv);

/* get a reference to the menu div in the html page */

// populate the above div with the ul list thats been created dynamically with exportNav

const deRenderDivToRenderIn = (htmElement : HTMLElement, setNav : boolean) => {
    
    let holderDiv : HTMLDivElement = document.querySelector('#holderDiv');
    const divToRenderInChildren = Array.from(divToRenderIn.children);

    divToRenderInChildren.forEach(child => {

        if(child !== document.querySelector('#menuToggle')){
            const childRef = child;
            divToRenderIn.removeChild(child);
            holderDiv.appendChild(childRef);
        }
    });

    if(setNav) divToRenderIn.appendChild(exportNav());
    divToRenderIn.appendChild(htmElement);
}

let startImage : HTMLAnchorElement = document.querySelector('#startImage');
startImage.addEventListener('click', () => {
    deRenderDivToRenderIn(setTimerForm, false);
});

//startTimerButton.addEventListener('click', () => {
   // deRenderDivToRenderIn(analogClockDiv, true);
    //analogClock(timer, timeAmount);
 //   abortButton.style.display = "flex"
//});

abortButton.addEventListener('click', () => {
    
    // stop the timer
    EasyTimer.stop();

    // Render to a set Timer form
    deRenderDivToRenderIn(setTimerForm, false);

    // Incognitize the abort Button once again
    abortButton.style.display = "none"
})

interface timeInfo {
    timeInMinutes : number;
    intervalOn: boolean;
    addBreak: boolean;
    totalTimeIntervalInSeconds(intervalOn: boolean, addBreak: boolean): number;
}
let timeObject: timeInfo;

const timeHeader = document.createElement('h1');
timeHeader.innerText = `${timeAmount}`;
timeAmountText.insertBefore(timeHeader, increaseBtn);

const increaseTime = () => {
    timeAmount+=1;
    timeHeader.innerText = `${timeAmount}`;
    
};
const decreaseTime = () => {
    timeAmount-=1;
    timeHeader.innerText = `${timeAmount}`;
};

increaseBtn.onclick = () => increaseTime();
decreaseBtn.onclick = () => decreaseTime();

backToTimer.addEventListener('click', () => {
    deRenderDivToRenderIn(setTimerForm, false);
    abortButton.style.display = "none"
});

breakPageButton.addEventListener('click', () => {
    EasyTimer.reset();
})

breakPagePauseButton.addEventListener('click', () => {
    
    console.log('i reached here')
    timer.stop();
    StartCountDown(timeAmount, false, false);
    let analogClock : HTMLDivElement = document.querySelector('#analogClock');
    deRenderDivToRenderIn(analogClock, true);
})

/*
breakPagePauseButton.addEventListener('click', () => {
    EasyTimer.stop();
    console.log("i was clicked")
    StartCountDown(timeAmount, timeObject.intervalOn, timeObject.addBreak);
})
*/

//When submit is clicked, a new timeInfo interface is created. The total amount of seconds is calculated, including break-time
//The startCountdown-function is called with information from the interface as arguments.

startTimerButton.addEventListener('click', (e: Event) => {
    e.preventDefault();
    timeObject = {
        timeInMinutes : timeAmount,
        intervalOn: intervalChecked.checked,
        addBreak: breakChecked.checked,
        totalTimeIntervalInSeconds(intervalOn: boolean, addBreak: boolean): number {
            if (intervalOn && addBreak) {
                timeAmount = timeAmount;
                console.log('total interval plus break time in minutes: ', timeAmount);
                totalTimeInSeconds =timeAmount*60;
                //console.log('total interval plus break time in seconds: ', totalTimeInSeconds);
                return totalTimeInSeconds;
            } else if (intervalOn && !addBreak) {
                //console.log('total interval time in minutes: ', timeAmount);
                totalTimeInSeconds =timeAmount*60;
                //console.log('total interval time in seconds: ', totalTimeInSeconds);
                return totalTimeInSeconds;
            } else if (!intervalOn && addBreak) {
                //console.log("error, can't set break without intervals enabled");
                return (0);
            } else {
                //console.log('total time in minutes, no intervals: ', timeAmount);
                totalTimeInSeconds =timeAmount*60;
                //console.log('total time in seconds, no intervals: ', totalTimeInSeconds);
                return totalTimeInSeconds;
            }
        }     
    }
    let totalTime = timeObject.totalTimeIntervalInSeconds(timeObject.intervalOn, timeObject.addBreak)
    //console.log(timeObject.timeInMinutes);
    //analogClock(timeObject.timeInMinutes);
    //startCountdown(totalTime, timeObject.intervalOn, timeObject.addBreak)
    StartCountDown(totalTime, timeObject.intervalOn, timeObject.addBreak);
    abortButton.style.display = "flex"

    deRenderDivToRenderIn(analogClockDiv, true);
}, false);


export {timeObject}




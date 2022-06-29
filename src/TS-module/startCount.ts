import { Timer } from 'easytimer.js';
import  exportNav from '../TS-module/navigation';

let initSeconds : number = 0;

let digitalTimer: HTMLDivElement = document.querySelector('#digitalTime');
let breakPage : HTMLDivElement = document.querySelector('#break-page');

// Word Clock references
let talTillOrd : HTMLDivElement = document.querySelector('#talTillOrd');

// AnalogClock HTML references
let secondElm    : HTMLDivElement = document.querySelector('.clock__hand--second');
let minuteElm    : HTMLDivElement = document.querySelector('.clock__hand--minute');

// Visual HTML reference
let visualPageInnerDiv    : HTMLDivElement = document.querySelector('#visual-page').querySelector('#progbar');

// Circles HTML reference
let circlesDiv    : HTMLDivElement = document.querySelector('#circles');

// create a new instance of EasyTimer
export const timer : Timer = new Timer();

export const StartCountDown = (numberOfSeconds : number, allowIntervals : boolean, allowFiveMinutesIntervals : boolean) => {

    initSeconds = numberOfSeconds;

    // Init the analog and circle pages
    initAnalogClock();

    // Start the timer in count down mode
    timer.start(
    {
        countdown: true, 
        startValues: { seconds: numberOfSeconds}
    });

    let divCircles = null;
    let zIndexCounter : number = 0;

    // 1. Run this method everytime the seconds change or get updated
    timer.addEventListener('secondsUpdated', function (e) {

        const minutesAndSeconds = `${timer.getTimeValues().minutes}:${timer.getTimeValues().seconds}`;
        //console.log(minutesAndSeconds);

        // Update the digital timer section
        digitalTimer.innerHTML =  `<section id="timer-digital"> 
                                        ${minutesAndSeconds}
                                    </section>`;

        // update visual-page
        visualPageInnerDiv.style.height = `${((timer.getTimeValues().seconds * 100) / numberOfSeconds)}vh`;

        let minutesRadiusPercentage =  ((timer.getTimeValues().seconds * 100) / numberOfSeconds);
        const divToAdd = document.createElement('div');

        //divToAdd.style.width("shape-outside", `circle(${minutesRadiusPercentage}% at 0%)`);
        divToAdd.style.border = "3px solid black";
        divToAdd.style.borderRadius = "50%";
        divToAdd.style.backgroundColor = "white";
        divToAdd.style.borderRadius = "100%";
        divToAdd.style.width = `${minutesAndSeconds}px`;
        divToAdd.style.height = `${minutesAndSeconds}px`;
        divToAdd.style.zIndex = `${zIndexCounter++}`;

        circlesDiv.appendChild(divToAdd);

        // Update the analog clock
        updateAnalogClock();
        
        // update numbers to words section
        talTillOrd.innerText = (`${toWords(timer.getTimeValues().minutes)} minuter \noch ${toWords(timer.getTimeValues().seconds)} \nsekunder \nkvar`).toUpperCase();

        // If the intervals are checked
        if(allowIntervals && !allowFiveMinutesIntervals)
        {
            if(timer.getTimeValues().seconds === 0)
            {
                // Render the break page section 
                deRenderDivToRenderIn(breakPage, false);
            }
        }
        // If allow intervals is true and allow-5-break-intervals is true
        else if (allowIntervals && allowFiveMinutesIntervals)
        {
            if(timer.getTimeValues().seconds === 0)
            {
                
                // render the break page section
                deRenderDivToRenderIn(breakPage, false);
                timer.stop();
                timer.start(
                    {
                        countdown: true, 
                        startValues: { seconds: 5 * 60}
                    });

                // get a reference to the break-count-down paragraph in the break-view section
                let breakCountDown : HTMLDivElement = document.querySelector("#break-countdown");

                timer.addEventListener('secondsUpdated', () => {
                    breakCountDown.innerText = `${timer.getTimeValues().minutes}:${timer.getTimeValues().seconds}`;
                })
            }
        }
    });

    // 2. Run this method everytime the timer runs up
    timer.addEventListener('targetAchieved', function (e) {
        if(!allowIntervals && !allowFiveMinutesIntervals)
        {
            let alarmRinging : HTMLDivElement = document.querySelector('#alarmRinging');
            timer.stop();
            deRenderDivToRenderIn(alarmRinging, false);
        }
    });

    timer.addEventListener('minutesUpdated', (e) => {

        // Update circles-page
        //let minutesRadiusPercentage =  ((timer.getTimeValues().minutes * 100) / (numberOfSeconds / 60));
        //const divToAdd = document.createElement('div');
        //divToAdd.setAttribute("shape-outside", `circle(${minutesRadiusPercentage})`);
        //circlesDiv.appendChild(divToAdd);
    })
}

const initAnalogClock = () => {
    let clockMarks = document.querySelector('.clock__marks');

    for (let index : number = 0; index  < 60; index++) {
        let li = document.createElement("li");
        clockMarks.appendChild(li);
    }
}

const updateAnalogClock = () => {

    const minutes : number = timer.getTimeValues().minutes;
    const seconds : number = timer.getTimeValues().seconds;

    const secondsFraction : number = seconds / 60;
    const minutesFraction : number = (secondsFraction + minutes) / 60;

    const secondsRotate = secondsFraction * 360;
    const minutesRotate = minutesFraction * 360;

    secondElm.style.transform = `rotate(${secondsRotate}deg)`;
    minuteElm.style.transform = `rotate(${minutesRotate}deg)`;

}

const toWords = (num : number) : string => {

    let a = ['noll','en ','två ','tre ','fyra ', 'fem ','sex ','sju ','åtta ','nio ','tio ','elva ','tolv ','tretton ','fjorton ','femton ','sexton ','sjutton ','arton ','nitton '];
    let b = ['tjugo','trettio','fyrtio','femtio'];

    if (num < 20) return a[num];
    let digit : number = num % 10;

    if (num < 100) return b[~~(num / 10) - 2] + (digit ? "" + a[digit]: "");
}

const deRenderDivToRenderIn = (htmElement : HTMLElement, setNav : boolean) => {
    
    let divToRenderIn : HTMLDivElement = document.querySelector('#divToRenderIn');
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

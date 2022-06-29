import { Timer } from 'easytimer.js';
import { analogClock } from './analogClock';

let timer: Timer = new Timer();

let pauseTimer: Timer = new Timer();

let digitalTimer: HTMLHeadingElement = document.querySelector('#digitalTime')

let abortBtn : HTMLButtonElement = document.querySelector('#stop')
let formBG : HTMLFormElement = document.querySelector('form')


// Start countdown on click, with times in seconds from form as arguments
const startCountdown = (timeInSeconds: number, intervalOn: boolean, addBreak: boolean) => {
    timer.start({countdown: true, startValues: {seconds: timeInSeconds}, target: {seconds: 0}});

    analogClock(timer, timeInSeconds);
    pauseTimer.start({countdown: true, startValues: {seconds: 50}, target: {seconds: 0}})
    pauseTimer.pause()
    let countdownNumber:number = timeInSeconds;
    let label: HTMLDivElement  = document.querySelector('#progbar')
    timer.on('secondsUpdated', () => {
        let circleNumber:any;
        let procent = (countdownNumber / timeInSeconds)*100
        //console.log('timer values: ', timer.getTimeValues().seconds, 'procent: ', procent);
        label.style.height = `${procent}vh`;
        let division:any = procent / 11
         circleNumber = parseInt( division ) +1
        let circle: any = document.querySelector(`.circle${circleNumber}`)
        //console.log(’ rad 35 ’, ‘Circlenumber ‘, circleNumber, circle );
        //circle.style.backgroundColor =`#999999`;
        countdownNumber--;

        //console.log('timer1 **', countdownNumber--);
        //console.log('modulus', countdownNumber % 60);
        let seconds:number = countdownNumber % 60
        let minutesFloat: any = countdownNumber / 60
        let minutes:any = parseInt(minutesFloat)
        if ( minutes < 10 && seconds < 10 ) {
            digitalTimer.innerText = `0${minutes} : 0${seconds}`;
        } else if ( minutes < 10 && seconds > 10 ) {
            digitalTimer.innerText = `0${minutes} : ${seconds}`;
        } else if ( minutes > 10 && seconds < 10 ) {
            digitalTimer.innerText = `${minutes}: 0${seconds}`;
        } else {
            digitalTimer.innerText = `${minutes}: ${seconds}`;
        }
        
    })
    //If intervals is checked, restart timer after first interval ends, else stop timer
    timer.on('targetAchieved', () => {
       // console.log('timer1 ',"time's up!");
        countdownNumber = timeInSeconds;
        if (intervalOn && addBreak) {
            timer.pause()
            pauseTimer.reset();
            loadPausePage();
        } else if (intervalOn && !addBreak) {
            timer.reset();
            loadPausePage();
        } else {
            timer.stop();
            
            // get reference to the alarmView element
            let alarmView: HTMLDivElement = document.querySelector('#alarmRinging');
            alarmView.style.display = `flex`;
            divToRenderInCustomFunction(alarmView);
        }
    })

    pauseTimer.on('secondsUpdated', () => {
        //console.log('paus');
    })
    pauseTimer.on('targetAchieved', () => {
        pauseTimer.pause()
        pauseTimer.reset()
        pauseTimer.stop()
        timer.reset();
        //console.log('pause over'); 
    })

    abortBtn.addEventListener('click', () => {
        //console.log('timer stoppad', timer.isRunning());
        timer.stop()
        //console.log('timer stoppad', timer.isRunning());
        
    })
}
//Export the entire timer object and the startcountdown function



// function to clear divToRenderIn
const divToRenderInCustomFunction = (childToAppend : HTMLDivElement) => {
    // get a reference to the div to render in 
    let divToRenderIn : HTMLDivElement = document.querySelector('#divToRenderIn');

    // clear it of all the contents i.e divToRenderIn
    const divToRenderInChildren = Array.from(divToRenderIn.children);
    divToRenderInChildren.forEach(child => {

        child !== document.querySelector('#menuToggle') ? divToRenderIn.removeChild(child) : null;
    });

    // render the alarmView in the divToRenderIn element
    divToRenderIn.appendChild(childToAppend);
}

const loadPausePage = () => {
    let breakPage : HTMLDivElement = document.querySelector('#break-page');
    divToRenderInCustomFunction(breakPage)
}

export { timer, startCountdown }


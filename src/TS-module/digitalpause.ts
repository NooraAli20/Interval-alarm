function render(timer: any, msg?: String ) :string {

    let digiclock:string = ``;
     digiclock = `<p>${timer.getTimeValues().minutes}:${timer.getTimeValues().seconds}</p>`
    

    let digiclocksection:string = `
    <section id="timer-digital">
        ${digiclock}
    </section>
    `;

    return digiclocksection;
}

export { render }


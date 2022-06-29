const exportNav = () : HTMLDivElement => {

    let divToRenderIn : HTMLDivElement = document.querySelector('#divToRenderIn');
    let abortButton : HTMLButtonElement = document.querySelector('#stop');

    const linkData = [
        { ref : document.querySelector('#analogClock'), textLabel : 'ANALOG TIMER'},
        { ref : document.querySelector('#digital-timer'), textLabel : 'DIGITAL TIMER'},
        { ref : document.querySelector('#visual-page'), textLabel : 'VISUAL TIMER'},
        { ref : document.querySelector('#talTillOrd'), textLabel : 'TEXT TIMER'},
        { ref : document.querySelector('#circles'), textLabel : 'CIRCLE TIMER'}
    
    ]

    const div : HTMLDivElement = document.createElement('div');
    div.id = "menuToggle"

    //const label : HTMLLabelElement = document.createElement('label');
    //const span : HTMLSpanElement = document.createElement('span');

    const checkbox : HTMLInputElement = document.createElement('input');
    checkbox.type = 'checkbox';

    //label.appendChild(checkbox);
    //label.appendChild(span);

    //console.log(label);

    div.appendChild(checkbox);

    for (let index : number = 0; index < 3; index++) {
        const span = document.createElement('span');
        div.append(span)
    }

    const ul : HTMLUListElement = document.createElement('ul');
    ul.id = "NavBar";

    for(let i : number = 0; i < linkData.length; i++)
    {
        const a : HTMLAnchorElement = document.createElement('a');
        const li : HTMLLIElement = document.createElement('li');

        a.href = "#";

        //console.log(object)
        a.addEventListener('click', () => {

            const divToRenderInChildren = Array.from(divToRenderIn.children);
            divToRenderInChildren.forEach(child => {
                child !== document.querySelector('#menuToggle') ? divToRenderIn.removeChild(child) : null;
            });

            divToRenderIn.appendChild(linkData[i].ref);
            abortButton.style.display = "flex"
        });

        li.textContent  = `${linkData[i].textLabel}`;
        a.appendChild(li);
        ul.appendChild(a)
    }
    div.appendChild(ul);
    return div;
}

export  default exportNav;
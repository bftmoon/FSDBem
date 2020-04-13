export function init(idPrefix, listener) {
    idPrefix+='-'
    let dropdown = document.getElementById(idPrefix+'dropdown')
    let childs = dropdown.children;
    childs[0].addEventListener('click', e=>{
        childs[1].hidden = !childs[1].hidden
    })
    childs[1].addEventListener('click', e=>{
        let option = document.getElementById(e.target.id);
        let chosen = option.textContent;
        listener(option.attributes.name.value, chosen)
        dropdown.getElementsByTagName("span")[0].textContent=chosen;
        childs[1].hidden = true;
    })
    dropdown.addEventListener('mouseleave', e => {
        childs[1].hidden=true;
    })
}

//todo: import in main

// init('idd', (a,b)=>{
//     console.log(a, b)
// })

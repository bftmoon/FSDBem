function init() {
  $('.like').bind('click', (el) => {
    let counter = el.currentTarget.querySelector('.like__count')
    if (el.target.checked){
      counter.innerText++;
    } else {
      counter.innerText--;
    }
  })
}

export {init}

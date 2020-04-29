function init() {
  let expander = document.querySelectorAll('.checkbox-list__expander');
  expander.forEach(el => {
    el.addEventListener('click', (ev) => {
      let list = ev.currentTarget.nextSibling;
      console.log(list)
      list.hidden = !list.hidden
      console.log(list.hidden, ev.currentTarget.nextSibling.hidden)
      ev.currentTarget.classList.toggle('checkbox-list__expander_opened');
    });
    if (!el.nextSibling.hidden) {
      el.classList.add('checkbox-list__expander_opened');
    }
  })
}

export {init};

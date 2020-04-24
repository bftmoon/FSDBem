document.querySelectorAll('.js-masked-date').forEach(el => {
  el.placeholder = 'ДД.ММ.ГГГГ'
// todo: validation, delete . with number on backspace OR plugin with many masks
  el.addEventListener('input', evt => {
    if (evt.inputType === "insertText") {
      if (isNaN(evt.data) || evt.target.value.length === 11) {
        evt.target.value = evt.target.value.slice(0, -1);
      } else if (evt.target.value.length === 2 || evt.target.value.length === 5) {
        evt.target.value += '.'
      }
    }
  })
});




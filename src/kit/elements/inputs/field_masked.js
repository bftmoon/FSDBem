console.log('hi')

document.querySelectorAll('.field_masked_date').forEach(el=>{
  el.placeholder='ДД.ММ.ГГГГ'
  el.addEventListener('input', evt => {
    if (evt.inputType === "insertText") {
      if (isNaN(evt.data) || evt.target.value.length===11) {
        evt.target.value = evt.target.value.slice(0, -1);
      } else if (evt.target.value.length === 2 || evt.target.value.length === 5) {
        evt.target.value+='.'
      }
    }
  })
});




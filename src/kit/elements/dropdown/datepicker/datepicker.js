import Litepicker from "litepicker";

console.log('hi')

class Datepicker extends Litepicker {
  renderFooter() {
    let a = super.renderFooter();
    let buttonsDiv = document.createElement('div');
    // Get submit button because submit method is private
    let apply = a.lastElementChild;
    let cancel = document.createElement('button');
    apply.innerHTML = 'Подтведить';
    cancel.innerHTML = 'Сбросить';
    cancel.addEventListener('click', () => {
      this.clearSelection();
    });
    buttonsDiv.append(cancel, apply);
    return buttonsDiv;
  }


}

function init(selector, {isRanged = true, isOpened = false}) {
  const picker = new Datepicker({
    element: document.querySelector(selector),
    autoApply: false,
buttonText: {
  previousMonth: '<svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
    '<path d="M16.1755 8.01562V9.98438H3.98801L9.56613 15.6094L8.15988 17.0156L0.144258 9L8.15988 0.984375L9.56613 2.39062L3.98801 8.01562H16.1755Z" fill="#BC9CFF"/>\n' +
    '</svg>\n',
  nextMonth: '<svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
    '<path d="M8.36301 0.984375L16.3786 9L8.36301 17.0156L6.95676 15.6094L12.5349 9.98438H0.347383V8.01562H12.5349L6.95676 2.39062L8.36301 0.984375Z" fill="#BC9CFF"/>\n' +
    '</svg>\n',
},
    lang: 'ru',
    format: 'DD.MM.YYYY',
    singleMode: !isRanged,
    showTooltip: false,

  });
  if (isOpened) picker.show();
  return picker;
}

function initFor2Inputs(selector1, selector2) {
  return new Datepicker({
    element: document.querySelector(selector1),
    elementEnd: document.querySelector(selector2),
    autoApply: false,
    lang: 'ru',
    format: 'DD.MM.YYYY',
    singleMode: false,
    showTooltip: false,
  });
}

export {init, initFor2Inputs};

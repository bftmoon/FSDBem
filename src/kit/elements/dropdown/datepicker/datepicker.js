import 'air-datepicker/dist/js/datepicker'

const commonParams = {
  navTitles: {
    days: 'MM yyyy'
  },
  prevHtml: '<i class="material-icons datepicker-icons">arrow_back</i>',
  nextHtml: '<i class="material-icons datepicker-icons">arrow_forward</i>',
  clearButton: true,
}

function init(selector, {isRange = true, isInline = true}) {
  let dateInput = $(selector)
  let navigator = 'js-' + selector.replace(/[.#]/, '') + '-datepicker';
  let picker = dateInput.datepicker({
    ...commonParams,
    clearButton: true,
    range: isRange,
    classes: navigator,
    multipleDatesSeparator: ' - ',
    inline: isInline,
  }).data('datepicker');
  _setButtons(navigator, picker);
}

function initFor2Inputs(selectorStart, selectorEnd) {
  let firstDateInput = $(selectorStart);
  let secondDateInput = $(selectorEnd);
  let navigator = 'js-' + selectorStart.replace(/[.#]/, '') + '-datepicker';
  let picker = firstDateInput.datepicker({
    ...commonParams,
    range: true,
    classes: navigator,
    onSelect: (formatted, a, b) => {
      console.log(a, b)
      let dates = formatted.split(',');
      firstDateInput.val(dates[0])
      secondDateInput.val(dates.length === 2 ? dates[1] : '')
    }
  }).data('datepicker');
  _setButtons(navigator, picker);
}

function _setButtons(selector, picker) {

  let apply = document.createElement('span');
  apply.innerText = 'Применить';
  apply.classList.add('datepicker--button', 'datepicker--button-apply');
  apply.addEventListener('click', () => picker.hide())

  let cancel = $('.' + selector + ' .datepicker--button');
  cancel.addClass('datepicker--button-cancel');

  cancel.after(apply);
}

export {init, initFor2Inputs}

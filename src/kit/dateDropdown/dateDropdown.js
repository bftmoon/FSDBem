import 'air-datepicker/dist/js/datepicker'


function initSingle(selector, {isRange = true, isInline = true}) {
  let dateInput = $(selector)
  let navigator = 'js-' + selector.replace(/[.#]/, '') + '-datepicker';
  let picker = dateInput.datepicker({
    ...commonParams,
    classes: navigator,
    inline: isInline,
  }).data('datepicker');
  _setButtons(navigator, picker);
}

function init({selector = '.date-dropdown', isInline = false}) {
  let params = {
    navTitles: {
      days: 'MM yyyy'
    },
    prevHtml: '<i class="material-icons datepicker-icons">arrow_back</i>',
    nextHtml: '<i class="material-icons datepicker-icons">arrow_forward</i>',
    clearButton: true,
    range: true,
    multipleDatesSeparator: ' - ',
  }

  let datepicker = $(selector);
  let firstDateInput = datepicker.find('.date-dropdown__first-date');
  let secondDateInput = datepicker.find('.date-dropdown__last-date');

  params.classes = 'js-' + selector.replace(/[.#]/, '') + '-datepicker';
  params.inline = isInline;

  if (secondDateInput.length !== 0) {
    params.onSelect = (formatted) => {
      let dates = formatted.split(' - ');
      firstDateInput.val(dates[0])
      secondDateInput.val(dates.length === 2 ? dates[1] : '')
    }
    secondDateInput.bind('click', () => picker.show())
  } else{
    params.dateFormat = 'd M'
  }

  let picker = firstDateInput.datepicker(params).data('datepicker');
  _setButtons(params.classes, picker);
  return picker;
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

export {init}

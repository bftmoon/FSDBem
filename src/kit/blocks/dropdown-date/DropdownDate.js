import 'air-datepicker/dist/js/datepicker.min'

class DropdownDate {

  constructor({element, isInline}) {
    this._init(element, isInline);
  }

  _init(element, isInline){
    let params = {
      navTitles: {
        days: 'MM yyyy'
      },
      prevHtml: '<i class="material-icons datepicker-icons">arrow_back</i>',
      nextHtml: '<i class="material-icons datepicker-icons">arrow_forward</i>',
      clearButton: true,
      range: true,
      multipleDatesSeparator: ' - ',
      inline: isInline,
      offset: 5
    };

    this._$inputStart = element.find('.date-dropdown__first-date')
    this._$inputEnd = element.find('.date-dropdown__last-date')

    if (this._$inputEnd.length !== 0) {
      this._extractSecondDate = this._extractSecondDate.bind(this);
      params.onSelect = this._extractSecondDate;
      this._$inputEnd.on('click', () => this._picker.show())
    } else {
      params.dateFormat = 'd M'
    }

    this._picker = this._$inputStart.datepicker(params).data('datepicker');
    this._setButtons();
  }

  _extractSecondDate(formatted){
    let dates = formatted.split(' - ');
    this._$inputStart.val(dates[0])
    this._$inputEnd.val(dates.length === 2 ? dates[1] : '')
  }

  _setButtons() {
    let $cancel = this._picker.$datepicker.find('.datepicker--button');
    $cancel.addClass('datepicker--button-cancel');
    $cancel.on('click', ()=>this._$inputEnd.val(''));
    let $apply=$('<button>', {
      type: 'button',
      text: 'Применить',
      class: 'datepicker--button datepicker--button-apply'
    });
    $apply.on('click', ()=>this._picker.hide())
    $cancel.after($apply);
  }
}

export default DropdownDate;

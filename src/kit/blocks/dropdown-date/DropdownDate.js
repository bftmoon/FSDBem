class DropdownDate {
  create($element, isInline = false) {
    const params = {
      navTitles: {
        days: 'MM yyyy',
      },
      prevHtml: '<i class="material-icons datepicker-icons">arrow_back</i>',
      nextHtml: '<i class="material-icons datepicker-icons">arrow_forward</i>',
      clearButton: true,
      range: true,
      multipleDatesSeparator: ' - ',
      inline: isInline,
      offset: 5,
      minDate: new Date(),
    };
    this._$inputStart = $element.find('.js-dropdown-date__input_first');

    this._$inputEnd = $element.find('.js-dropdown-date__input_last');
    this._handleInputStartClick = this._handleInputStartClick.bind(this);
    this._$inputStart.parent().on('click', this._handleInputStartClick);

    if (this._$inputEnd.length !== 0) {
      this._extractSecondDate = this._extractSecondDate.bind(this);
      params.onSelect = this._extractSecondDate;
      this._handleInputEndClick = this._handleInputEndClick.bind(this);
      this._$inputEnd.parent().on('click', this._handleInputEndClick);
    } else {
      params.dateFormat = 'd M';
    }
    import('air-datepicker/dist/js/datepicker.min').then(()=>{
      this._picker = this._$inputStart.datepicker(params).data('datepicker');
      this._setButtons();
    })
  }

  _handleInputStartClick() {
    this._picker.show();
  }

  _handleInputEndClick() {
    this._picker.show();
  }

  _extractSecondDate(formatted) {
    const dates = formatted.split(' - ');
    this._$inputStart.val(dates[0]);
    this._$inputEnd.val(dates.length === 2 ? dates[1] : '');
  }

  _setButtons() {
    this._handleCancelClick = this._handleCancelClick.bind(this);
    this._handleApplyButtonClick = this._handleApplyButtonClick.bind(this);

    const $cancel = this._picker.$datepicker.find('.datepicker--button');
    $cancel.addClass('datepicker--button-cancel');
    $cancel.on('click', this._handleCancelClick);
    const $apply = $('<div>', {
      text: 'Применить',
      class: 'datepicker--button datepicker--button-apply',
    });
    $apply.on('click', this._handleApplyButtonClick);
    $cancel.after($apply);
  }

  _handleCancelClick() {
    this._$inputEnd.val('');
  }

  _handleApplyButtonClick() {
    this._picker.hide();
  }

  static initAll({selector = '.js-dropdown-date', parent = document}) {
    $(parent).find(selector).each((_, element) => new DropdownDate().create($(element)));
  }

  static initAllInline({selector = '.js-dropdown-date-inline', parent = document}) {
    $(parent).find(selector).each((_, element) => new DropdownDate().create($(element), true));
  }

  static initDefault({selector = '.js-dropdown-date', parent = document}) {
    new DropdownDate().create($(parent.querySelector(selector)));
  }
}

export default DropdownDate;

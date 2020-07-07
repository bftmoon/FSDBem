class DropdownDate {
  constructor() {
    this._newDates = '';
    this._oldDates = '';
  }

  create($element, isInline = false) {
    const params = {
      navTitles: {
        days: 'MM yyyy',
      },
      prevHtml: '<i class="datepicker--icons">arrow_back</i>',
      nextHtml: '<i class="datepicker--icons">arrow_forward</i>',
      clearButton: true,
      range: true,
      multipleDatesSeparator: ' - ',
      inline: isInline,
      offset: 5,
      minDate: new Date(),
      showEvent: 'off',
      onSelect: this._onSelect.bind(this)
    };

    $element.find('.js-dropdown-date__iconed-input').on('click', this._handleIconedInputClick.bind(this));
    this._$dateFields = $element.find('.js-dropdown-date__input');

    if (this._$dateFields.length === 2) {
      this._oldDates = [this._$dateFields[0].value, this._$dateFields[1].value].join(' - ');
    } else {
      this._oldDates = this._$dateFields[0].value;
      params.dateFormat = 'd M';
    }

    import('air-datepicker/dist/js/datepicker.min').then(() => {
      this._picker = $(this._$dateFields[0]).datepicker(params).data('datepicker');
      this._setButtons();
    });
  }

  _setButtons() {
    this._$cancel = this._picker.$datepicker.find('.datepicker--button');
    this._$cancel.addClass(['datepicker--button-cancel', 'datepicker--button-hidden']);
    this._$cancel.on('click', this._handleCancelClick.bind(this));
    const $apply = $('<div>', {
      text: 'Применить',
      class: 'datepicker--button datepicker--button-apply',
    });
    $apply.on('click', this._handleApplyClick.bind(this));
    this._$cancel.before($apply);
  }

  _handleIconedInputClick() {
    this._picker.show();
  }

  _handleCancelClick() {
    this._$cancel.addClass('datepicker--button-hidden');
    this._setOldValues();
  }

  _handleApplyClick() {
    const datesArr = this._newDates.split(' - ');
    if (datesArr.length === 2) {
      if (this._$dateFields.length === 2) {
        this._$dateFields[0].value = datesArr[0];
        this._$dateFields[1].value = datesArr[1];
      } else {
        this._$dateFields[0].value = this._newDates;
      }
      this._oldDates = this._newDates;
      this._picker.hide();
    }
  }

  _onSelect(dates) {
    this._newDates = dates;
    this._setOldValues(this._oldDates);
    if (dates !== '') {
      this._$cancel.removeClass('datepicker--button-hidden');
    }
  }

  _setOldValues() {
    if (this._$dateFields.length === 2) {
      const datesArr = this._oldDates.split(' - ');
      this._$dateFields[0].value = datesArr[0];
      this._$dateFields[1].value = datesArr[1];
    } else {
      this._$dateFields[0].value = this._oldDates;
    }
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

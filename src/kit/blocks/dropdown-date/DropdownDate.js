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
      offset: 6,
      minDate: new Date(),
      showEvent: 'off',
      onSelect: this._onSelect.bind(this),
      onHide: this._onHide.bind(this),
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
    this._handleWindowResize = this._handleWindowResize.bind(this);
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
    this._updatePosition();
    $(window).on('resize', this._handleWindowResize);
  }

  _updatePosition() {
    if (this._areResponsiveUpdateRequired()) {
      this._picker.$datepicker.css('left', ($(window).width() - this._picker.$datepicker[0].offsetWidth) / 2 + 'px')
    }
  }

  _areResponsiveUpdateRequired() {
    return !this._picker.opts.inline && (this._picker.$datepicker.offset().left + this._picker.$datepicker[0].offsetWidth) > $(window).width();
  }

  _handleCancelClick() {
    this._picker.clear();
    this._$cancel.addClass('datepicker--button-hidden');
    this._$dateFields[0].value = '';
    this._oldDates = '';
    if (this._$dateFields.length === 2) {
      this._$dateFields[1].value = '';
    }
    return false;
  }

  _handleApplyClick() {
    if (this._newDates.split(' - ').length === 2) {
      this._oldDates = this._newDates;
      this._picker.hide();
    }
  }

  _handleWindowResize() {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      this._updatePosition();
    });
  }

  _onSelect(dates) {
    this._newDates = dates;
    this._setValues(dates);
    if (dates !== '') {
      this._$cancel.removeClass('datepicker--button-hidden');
    }
  }

  _onHide() {
    this._setValues(this._oldDates);
    $(window).off('resize', this._handleWindowResize);
  }

  _setValues(dates) {
    if (this._$dateFields.length === 2) {
      const datesArr = dates.split(' - ');
      this._$dateFields[0].value = datesArr[0];
      this._$dateFields[1].value = datesArr[1] || '';
    } else {
      this._$dateFields[0].value = dates;
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

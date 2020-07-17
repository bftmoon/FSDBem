class DropdownDate {
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

    const $anchor = $element.find('.js-dropdown-date__anchor');
    $element.find('.js-dropdown-date__iconed-input').on('click', this._handleIconedInputClick.bind(this));
    this._$dateFields = $element.find('.js-dropdown-date__input');

    this._oldDates = [];
    ['startUtc', 'endUtc'].forEach((utc) => {
      if ($anchor[0].dataset[utc] !== undefined) {
        this._oldDates.push(new Date($anchor[0].dataset[utc]));
      }
    });
    if (this._$dateFields.length !== 2) {
      params.dateFormat = 'd M';
    }

    import('air-datepicker/dist/js/datepicker.min').then(() => {
      this._picker = $anchor.datepicker(params).data('datepicker');
      this._setButtons();
      this._picker.setPosition = this._setPosition.bind(this);
      if (this._oldDates.length !== 0) this._picker.selectDate(this._oldDates);
    });
  }

  _setPosition() {
    this._picker.$datepicker
      .css({
        left: this._selectLeft(),
        top: `${this._$dateFields[0].offsetTop + this._$dateFields[0].offsetHeight + 5}px`,
      });
  }

  _setButtons() {
    this._picker.$datepicker.find('.datepicker--nav-title').addClass('-disabled-');
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

  _selectLeft() {
    const windowWidth = $(window).width();
    const datepickerWidth = this._picker.$datepicker[0].offsetWidth;
    const datepickerRight = this._picker.$el.offset().left + datepickerWidth;
    return this._areCenteringRequired(windowWidth, datepickerRight) ? (windowWidth - datepickerWidth) / 2 : `${this._$dateFields[0].offsetLeft}px`;
  }

  _areCenteringRequired(windowWidth, datepickerRight) {
    return !this._picker.opts.inline && (windowWidth < 410 || datepickerRight > windowWidth);
  }

  _handleCancelClick() {
    this._picker.clear();
    this._picker.hide();
    this._$cancel.addClass('datepicker--button-hidden');
    this._$dateFields.val('');
    this._oldDates = [];
  }

  _handleApplyClick() {
    if (this._newDates.length === 2) {
      this._oldDates = [...this._newDates];
      this._picker.hide();
    }
  }

  _onSelect(formattedDates, dates) {
    this._setValues(formattedDates);
    this._newDates = dates;
    if (dates !== '') {
      this._$cancel.removeClass('datepicker--button-hidden');
    }
  }

  _onHide() {
    this._picker.clear();
    this._picker.selectDate(this._oldDates);
    if (this._oldDates.length === 0) {
      this._$cancel.addClass('datepicker--button-hidden');
    }
  }

  _setValues(dates) {
    if (this._$dateFields.length === 2) {
      const [startDate, endDate] = dates.split(' - ');
      this._$dateFields[0].value = startDate;
      this._$dateFields[1].value = endDate || '';
    } else {
      this._$dateFields[0].value = dates;
    }
  }

  static initAll({ selector = '.js-dropdown-date', parent = document }) {
    $(parent).find(selector).each((_, element) => new DropdownDate().create($(element)));
  }

  static initAllInline({ selector = '.js-dropdown-date-inline', parent = document }) {
    $(parent).find(selector).each((_, element) => new DropdownDate().create($(element), true));
  }

  static initDefault({ selector = '.js-dropdown-date', parent = document }) {
    new DropdownDate().create($(parent.querySelector(selector)));
  }
}

export default DropdownDate;

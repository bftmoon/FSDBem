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
      onShow: this._onShow.bind(this),
      onChangeMonth: this._onChangeMonth.bind(this),
    };

    const $anchor = $element.find('.js-dropdown-date__anchor');
    $element.find('.js-dropdown-date__iconed-input').on('click', this._handleIconedInputClick.bind(this));
    this._$dateFields = $element.find('.js-dropdown-date__input');

    this._oldDates = [];
    ['startUtc', 'endUtc'].forEach((utc) => {
      if ($anchor[0].dataset[utc] !== undefined) {
        this._oldDates.push(new Date($anchor[0].dataset[utc]))
      }
    })
    if (this._$dateFields.length !== 2) {
      params.dateFormat = 'd M';
    }

    import('air-datepicker/dist/js/datepicker.min').then(() => {
      this._picker = $anchor.datepicker(params).data('datepicker');
      this._setButtons();
      if (this._oldDates.length !== 0) this._picker.selectDate(this._oldDates);
    });
    this._handleWindowResize = this._handleWindowResize.bind(this);
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

  _updatePosition() {
    if (this._areResponsiveUpdateRequired()) {
      this._picker.$datepicker.css('left', ($(window).width() - this._picker.$datepicker[0].offsetWidth) / 2 + 'px');
    }
  }

  _areResponsiveUpdateRequired() {
    return !this._picker.opts.inline && (this._picker.$datepicker.offset().left + this._picker.$datepicker[0].offsetWidth) + 30 > $(window).width();
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

  _handleWindowResize() {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      this._updatePosition();
    });
  }

  _onSelect(formattedDates, dates) {
    this._setValues(formattedDates);
    this._newDates = dates;
    if (dates !== '') {
      this._$cancel.removeClass('datepicker--button-hidden');
    }
  }

  _onHide() {
    this._picker.clear(); // for normal work with empty old dates
    this._picker.selectDate(this._oldDates);
    $(window).off('resize', this._handleWindowResize);
    if (this._oldDates.length === 0) {
      this._$cancel.addClass('datepicker--button-hidden');
    }
  }

  _onShow() {
    this._updatePosition();
    $(window).on('resize', this._handleWindowResize);
  }

  _onChangeMonth() {
    this._updatePosition();
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

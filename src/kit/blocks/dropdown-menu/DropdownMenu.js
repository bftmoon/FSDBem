import RussianLangUtil from '@utils/RussianLangUtil';

class DropdownMenu {
  // todo: refactoring
  constructor(formatHeader = DropdownMenu.formatDefaultHeader) {
    this._formatHeader = formatHeader;
  }

  create($menu) {
    document.addEventListener('click', this._handleDocumentClick.bind(this));
    this._$header = $menu.find('.js-dropdown-menu__header');
    this._$content = this._$header.next();
    this._$inputs = this._$content.find('.js-dropdown-menu__count');

    this._$header.on('click', this._handleHeaderClick.bind(this));
    this._$decrements = this._$content.find('.js-dropdown-menu__decrement');
    this._$decrements.on('click', this._handleDecrementClick.bind(this));
    this._$increments = this._$content.find('.js-dropdown-menu__increment');
    this._$increments.on('click', this._handleIncrementClick.bind(this));

    const $actionButtons = this._$content.find('.js-dropdown-menu__buttons');
    $actionButtons.find('.js-dropdown-menu__button_type_confirm').on('click', this._handleConfirmButtonClick.bind(this));

    this._$cancel = $actionButtons.find('.js-dropdown-menu__button_type_cancel');
    this._$cancel.on('click', this._handleCancelButtonClick.bind(this));

    if ($actionButtons.length !== 0) {
      this._cachedData = [];
      this._supportRecovers = [];
    }
    this._prepareInputs();
    this._updateHeader(this._calcValues());
    if (this._isSummaryZero()) this._hideCancel();
  }

  _handleHeaderClick() {
    this._toggleMenu();
  }

  _handleConfirmButtonClick() {
    this._toggleMenu();
    this._cachedData = this._calcValues();
    this._updateHeader(this._cachedData);
  }

  _updateHeader(values) {
    this._$header.children(':first-child').text(this._formatHeader(values));
  }

  _calcValues() {
    return this._$inputs.toArray().map((input) => Number(input.value));
  }

  _toggleMenu() {
    this._$header.toggleClass('dropdown-menu__header_opened');
    this._$content.toggleClass('dropdown-menu__content_opened');
  }

  _showCancel() {
    this._$cancel.removeClass('dropdown-menu__button_hidden');
  }

  _hideCancel() {
    this._$cancel.addClass('dropdown-menu__button_hidden');
  }

  _isSummaryZero() {
    return this._$inputs.toArray().reduce((result, current) => Number(current.value) + result, 0) === 0;
  }

  _handleDocumentClick(event) {
    if (!this._$content.parent()[0].contains(event.target)) {
      this._$header.removeClass('dropdown-menu__header_opened');
      this._$content.removeClass('dropdown-menu__content_opened');
      this._recoverState();
    }
  }

  _recoverState() {
    if (this._cachedData) {
      this._$inputs.each((index, input) => {
        input.value = this._cachedData[index];
        this._$decrements[index].disabled = this._cachedData[index] === 0;
      })
      this._supportRecovers.forEach((recover) => recover());
    }
  }

  static formatDefaultHeader(countArray) {
    return countArray.map((count) => RussianLangUtil.selectWordByCount(
      count,
      ['вещей', 'вещь', 'вещи', 'вещей'],
      {withNumber: true},
    ));
  }

  _handleDecrementClick(event) {
    const decrementButton = event.target;
    const input = decrementButton.nextSibling;
    input.value -= 1;
    if (Number(input.value) === 0) {
      decrementButton.disabled = true;
      if (this._isSummaryZero()) this._hideCancel();
    }
    this._updateHeaderIfRequired();
  }

  _handleIncrementClick(event) {
    const input = event.target.previousSibling;
    const count = Number(input.value);
    if (count === 0) input.previousSibling.disabled = false;
    input.value = count + 1;
    this._showCancel();
    this._updateHeaderIfRequired();
  }

  _handleCancelButtonClick() {
    this._cleanData();
    this._hideCancel();
  }

  _cleanData() {
    this._$inputs.val(0);
    this._$inputs.prev().prop('disabled', true);
  }

  _updateHeaderIfRequired() {
    if (!this._cachedData) this._updateHeader(this._calcValues());
  }

  _prepareInputs() {
    this._$inputs.each((index, element) => {
      if (this._cachedData) this._cachedData[index] = element.value;
      if (Number(element.value) === 0) element.previousSibling.disabled = true;
    })
  }
}

export default DropdownMenu;

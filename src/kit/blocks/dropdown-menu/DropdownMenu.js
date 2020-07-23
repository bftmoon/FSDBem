import RussianLangUtil from '@utils/RussianLangUtil';

class DropdownMenu {
  constructor(formatHeader = DropdownMenu.formatDefaultHeader) {
    this._formatHeader = formatHeader;
  }

  create($menu) {
    this._$menu = $menu;
    document.addEventListener('click', this._handleDocumentClick.bind(this));
    this._$header = $menu.find('.js-dropdown-menu__header');
    this._$header.on('click', this._handleHeaderClick.bind(this));
    this._$content = this._$header.next();
    this._$inputs = this._$content.find('.js-dropdown-menu__count');
    this._$decrements = this._$content.find('.js-dropdown-menu__decrement');
    this._$decrements.on('click', this._handleDecrementClick.bind(this));
    this._$increments = this._$content.find('.js-dropdown-menu__increment');
    this._$increments.on('click', this._handleIncrementClick.bind(this));

    const $actionButtons = this._$content.find('.js-dropdown-menu__buttons');
    $actionButtons.find('.js-dropdown-menu__button_type_confirm').on('click', this._handleConfirmButtonClick.bind(this));
    this._$cancel = $actionButtons.find('.js-dropdown-menu__button_type_cancel');
    this._$cancel.on('click', this._handleCancelButtonClick.bind(this));

    this._createState($actionButtons.length !== 0);
  }

  _createState(withActions) {
    if (withActions) {
      this._cachedData = [];
      this._isStateChanged = false;
    }
    this._prepareInputs();
    this._updateHeader(this._getValues());
    if (this._isSummaryZero()) this._updateCancel(false);
  }

  _recoverState() {
    if (this._isRecoverRequired()) {
      this._$inputs.each((index, input) => {
        // eslint-disable-next-line no-param-reassign
        input.value = this._cachedData[index];
        this._$decrements[index].disabled = Number(this._cachedData[index]) === 0;
      });
      this._updateCancel(!this._isSummaryZero());
      this._isStateChanged = true;
    }
  }

  _isRecoverRequired() {
    return this._cachedData !== undefined && this._isStateChanged;
  }

  _prepareInputs() {
    this._$inputs.each((index, element) => {
      if (this._cachedData !== undefined) this._cachedData[index] = element.value;
      // eslint-disable-next-line no-param-reassign
      if (Number(element.value) === 0) element.previousSibling.disabled = true;
    });
  }

  _handleHeaderClick() {
    this._toggleMenu();
  }

  _handleDocumentClick(event) {
    if (!this._$menu[0].contains(event.target)) {
      this._$menu.removeClass('dropdown-menu_opened');
      this._recoverState();
    }
  }

  _handleConfirmButtonClick() {
    this._toggleMenu();
    this._cachedData = this._getValues();
    this._updateHeader(this._cachedData);
  }

  _handleDecrementClick(event) {
    const decrementButton = event.target;
    const input = decrementButton.nextSibling;
    input.value -= 1;
    if (Number(input.value) === 0) {
      decrementButton.disabled = true;
      this._updateCancel(!this._isSummaryZero());
    }
    this._updateHeaderIfRequired();
    this._isStateChanged = true;
  }

  _handleIncrementClick(event) {
    const input = event.target.previousSibling;
    const count = Number(input.value);
    if (count === 0) input.previousSibling.disabled = false;
    input.value = count + 1;
    this._updateCancel(true);
    this._updateHeaderIfRequired();
    this._isStateChanged = true;
  }

  _handleCancelButtonClick() {
    this._cleanData();
    this._updateCancel(false);
    this._cachedData = this._cachedData.fill(0);
    this._updateHeader(this._cachedData);
  }

  _updateHeader(values) {
    this._$header.children(':first-child').text(this._formatHeader(values));
  }

  _getValues() {
    return this._$inputs.toArray().map((input) => Number(input.value));
  }

  _toggleMenu() {
    this._$menu.toggleClass('dropdown-menu_opened');
  }

  _updateCancel(isVisible) {
    if (isVisible) {
      this._$cancel.removeClass('dropdown-menu__button_hidden');
    } else {
      this._$cancel.addClass('dropdown-menu__button_hidden');
    }
  }

  _isSummaryZero() {
    return this._$inputs.toArray().reduce(
      (result, current) => Number(current.value) + result, 0,
    ) === 0;
  }

  _cleanData() {
    this._$inputs.val(0);
    this._$inputs.prev().prop('disabled', true);
  }

  _updateHeaderIfRequired() {
    if (this._cachedData === undefined) this._updateHeader(this._getValues());
  }

  static formatDefaultHeader(countArray) {
    return countArray.map((count) => RussianLangUtil.selectWordByCount(
      count,
      ['вещей', 'вещь', 'вещи', 'вещей'],
      { withNumber: true },
    ));
  }
}

export default DropdownMenu;

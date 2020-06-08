import RussianLangUtil from '@utils/RussianLangUtil';

class DropdownMenu {
  constructor(formatHeader = DropdownMenu._formatDefaultHeader) {
    this._formatHeader = formatHeader;
  }
  create($menu) {
    // todo: optimization?
    document.addEventListener('click', this._handleDocumentClick.bind(this));
    this._$header = $menu.find('.js-dropdown-menu__header');
    this._$content = this._$header.next();
    this._$inputs = this._$content.find('.js-dropdown-menu__count');

    this._bindListeners();

    this._$header.on('click', this._handleHeaderClick);
    this._$decrements = this._$content.find('.js-dropdown-menu__decrement');
    this._$decrements.on('click', this._handleDecrementClick);
    this._$increments = this._$content.find('.js-dropdown-menu__increment')
    this._$increments.on('click', this._handleIncrementClick);

    const $actionButtons = this._$content.find('.js-dropdown-menu__buttons');
    $actionButtons.find('.js-dropdown-menu__button_type_confirm').on('click', this._handleConfirmButtonClick);
    $actionButtons.find('.js-dropdown-menu__button_type_cancel').on('click', this._handleCancelButtonClick);

    this._updateHeader();
  }

  _handleHeaderClick() {
    this._toggleMenu();
  }

  _handleConfirmButtonClick() {
    this._toggleMenu();
  }

  _bindListeners() {
    this._handleHeaderClick = this._handleHeaderClick.bind(this);
    this._handleConfirmButtonClick = this._handleConfirmButtonClick.bind(this);
    this._handleIncrementClick = this._handleIncrementClick.bind(this);
    this._handleDecrementClick = this._handleDecrementClick.bind(this);
    this._handleCancelButtonClick = this._handleCancelButtonClick.bind(this);
  }

  _updateHeader() {
    const values = [];
    this._$inputs.each((index, input) => {
      values.push(Number(input.value));
    });
    this._$header.children(':first-child').text(this._formatHeader(values));
  }

  _toggleMenu() {
    this._$header.toggleClass('dropdown-menu__header_opened');
    this._$content.toggleClass('dropdown-menu__content_opened');
  }

  _handleDocumentClick(event){
    if (!this._$content.parent()[0].contains(event.target)){
      this._$header.removeClass('dropdown-menu__header_opened');
      this._$content.removeClass('dropdown-menu__content_opened');
    }
  }

  static _formatDefaultHeader(countArray) {
    return countArray.map((count) => RussianLangUtil.selectWordByCount(
      count,
      ['вещей', 'вещь', 'вещи', 'вещей'],
      { withNumber: true },
    ));
  }

  _handleDecrementClick(event) {
    const decrementButton = event.target;
    const input = decrementButton.nextSibling;
    input.value -= 1;
    if (+input.value === 0) decrementButton.disabled = true;
    this._updateHeader();
  }

  _handleIncrementClick(event) {
    const input = event.target.previousSibling;
    const count = Number(input.value);
    if (count === 0) input.previousSibling.disabled = false;
    input.value = count + 1;
    this._updateHeader();
  }

  _handleCancelButtonClick() {
    this._cleanData();
  }

  _cleanData(){
    this._$inputs.val(0);
    this._$inputs.prev().prop('disabled', true);
    this._updateHeader();
  }
}

export default DropdownMenu;

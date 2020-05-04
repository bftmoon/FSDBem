class DropdownMenu {

  constructor(headerFormatter) {
    if (headerFormatter)
      this._formatter = headerFormatter;
  }

  init($menu) {
    if ($menu.length > 1)
      console.log(`WARNING: ${$menu.length} dropdown menu for 1 class`);

    this._$header = $menu.find('.dropdown-menu__header');
    let $content = $menu.find('.dropdown-menu__content');
    this._$inputs = $content.find('.dropdown-menu__count')
    let $actionButtons = $content.find('.dropdown-menu__buttons');

    this._bindListeners()

    this._$header.on('click', this._openOrCloseMenu)
    $content.find('.dropdown-menu__decrement').on('click', this._decrement)
    $content.find('.dropdown-menu__increment').on('click', this._increment)
    $actionButtons.find('.dropdown-menu__button_type_confirm').on('click', this._openOrCloseMenu)
    $actionButtons.find('.dropdown-menu__button_type_cancel').on('click', this._nullifyInputs)

    this._updateHeader();
  }

  _bindListeners() {
    this._openOrCloseMenu = this._openOrCloseMenu.bind(this);
    this._increment = this._increment.bind(this);
    this._decrement = this._decrement.bind(this);
    this._nullifyInputs = this._nullifyInputs.bind(this);
  }

  _updateHeader() {
    let values = []
    this._$inputs.each((index, input) => {
      values.push(+input.value);
    });
    this._$header.children(':first-child').text(this._formatter(values));
  }

  _openOrCloseMenu() {
    this._$header.toggleClass('dropdown-menu__header_opened');
    this._$header.next().toggle();
  }

  _formatter(countArray) {
    return countArray.map((count=>DropdownMenu.itemFormatter(count, ['Нет вещей', 'вещь', 'вещи', 'вещей'])))
  }

  _decrement(event) {
    let input = event.target.nextSibling;
    input.value--;
    if (+input.value === 0)
      event.target.disabled = true;
    this._updateHeader();
  }

  _increment(event) {
    let input = event.target.previousSibling;
    if (+input.value === 0)
      input.previousSibling.disabled = false;
    input.value++;
    this._updateHeader();
  }

  _nullifyInputs() {
    this._$inputs.val(0);
    this._$inputs.prev().prop('disabled', true);
    this._updateHeader();
  }

  static itemFormatter(count, variants) { // number, [string]
    if (count === 0) return variants[0];
    if (count === 1) return count + ' ' + variants[1];
    if (count > 1 && count < 5) return count + ' ' + variants[2];
    return count + ' ' + variants[3];
  }

  static initAll(selector='.js-dropdown-menu', headerFormatter) {
    $(selector).each((_, element)=>new DropdownMenu(headerFormatter).init($(element)));
  }
}

export default DropdownMenu;
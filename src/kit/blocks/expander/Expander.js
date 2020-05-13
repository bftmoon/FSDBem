class Expander {
  init($element, $controlledContent, isOpened = true) {
    const $button = $element.find('.js-expander__button');
    this._$icons = $button.find('.js-expander__icon');
    this._$content = $controlledContent;

    this._handleExpanderClick = this._handleExpanderClick.bind(this);
    $button.on('click', this._handleExpanderClick);

    if (!isOpened)
      this._handleExpanderClick()
  }

  _handleExpanderClick() {
    this._$icons.toggleClass('expander__icon_hidden');
    this._$content.toggle();
  }

  static initDefault({selector = '.js-expander', controlledSelector}) {
    new Expander().init($(selector), $(controlledSelector))
  }
}

export default Expander;

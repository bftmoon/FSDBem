class Expander {
  init($element, $controlledContent, isOpened = true) {
    const $button = $element.find('.js-expander__button');
    this._$icons = $button.find('.js-expander__icon');
    this._$content = $controlledContent;

    this._toggleExpander = this._toggleExpander.bind(this);
    $button.on('click', this._toggleExpander);

    if (!isOpened)
      this._toggleExpander()
  }

  _toggleExpander() {
    this._$icons.toggle();
    this._$content.toggle();
  }

  static initDefault({selector = '.js-expander', controlledSelector}) {
    new Expander().init($(selector), $(controlledSelector))
  }
}

export default Expander;

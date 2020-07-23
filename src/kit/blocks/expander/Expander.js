class Expander {
  create($element) {
    this._$expander = $element;
    this._handleExpanderClick = this._handleExpanderClick.bind(this);
    $element.find('.js-expander__header').on('click', this._handleExpanderClick);
  }

  _handleExpanderClick() {
    this._$expander.toggleClass('expander_opened');
  }

  static initAll({ selector = '.js-expander', parent = document }) {
    $(parent).find(selector).each((__, element) => new Expander().create($(element)));
  }

  static initDefault({ selector = '.js-expander', parent = document }) {
    $(parent).find(selector).each((__, element) => new Expander().create($(element)));
  }
}

export default Expander;

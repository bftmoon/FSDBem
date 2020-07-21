class Expander {
  create($element) {
    this._$icon = $element.find('.js-expander__icon');
    this._$content = $element.find('.js-expander__content');

    this._handleExpanderClick = this._handleExpanderClick.bind(this);
    $element.find('.js-expander__header').on('click', this._handleExpanderClick);
  }

  _handleExpanderClick() {
    this._$icon.toggleClass('expander__icon_direction_down');
    this._$content.toggleClass('expander__content_hidden');
  }

  static initAll({ selector = '.js-expander', parent = document }) {
    $(parent).find(selector).each((__, element) => new Expander().create($(element)));
  }

  static initDefault({ selector = '.js-expander', parent = document }) {
    $(parent).find(selector).each((__, element) => new Expander().create($(element)));
  }
}

export default Expander;

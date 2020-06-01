class ExpandableCheckboxList {
  init($expander) {
    this._$icons = $expander.find('.js-checkbox-list__icon');
    this._$content = $expander.find('.js-checkbox-list__group');

    this._handleExpanderClick = this._handleExpanderClick.bind(this);
    $expander.find('.js-checkbox-list__expander').on('click', this._handleExpanderClick);
  }

  _handleExpanderClick() {
    this._$icons.toggleClass('checkbox-list__icon_hidden');
    this._$content.toggleClass('checkbox-list__group_hidden');
  }

  static initAll(selector = '.js-checkbox-list') {
    $(selector).each((_, element) => new ExpandableCheckboxList().init($(element)));
  }
}

export default ExpandableCheckboxList;

class ExpandableCheckboxList {
  create($element) {
    this._$icons = $element.find('.js-checkbox-list__icon');
    this._$content = $element.find('.js-checkbox-list__group');

    this._handleExpanderClick = this._handleExpanderClick.bind(this);
    $element.find('.js-checkbox-list__expander').on('click', this._handleExpanderClick);
  }

  _handleExpanderClick() {
    this._$icons.toggleClass('checkbox-list__icon_hidden');
    this._$content.toggleClass('checkbox-list__group_hidden');
  }

  static initAll({selector = '.js-checkbox-list', parent = document}) {
    $(parent).find(selector).each((__, element) => new ExpandableCheckboxList().create($(element)));
  }
}

export default ExpandableCheckboxList;

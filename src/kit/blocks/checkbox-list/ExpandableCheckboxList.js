class ExpandableCheckboxList {
  init($expander) {
    this._$toggledElements = $expander.find('.js-checkbox-list__icon, .js-checkbox-list__group');
    // this._$content = $expander.find('.js-checkbox-list__group');
    $expander.find('.js-checkbox-list__expander').on('click', () => this._$toggledElements.toggle())
  }

  static initAll(selector = '.js-checkbox-list') {
    $(selector).each((_, element) => new ExpandableCheckboxList().init($(element)));
  }
}

export default ExpandableCheckboxList;

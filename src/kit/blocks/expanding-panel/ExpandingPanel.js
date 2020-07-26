class ExpandingPanel {
  create($element) {
    this._$panel = $element;
    this._handleExpandingPanelClick = this._handleExpandingPanelClick.bind(this);
    $element.find('.js-expanding-panel__header').on('click', this._handleExpandingPanelClick);
  }

  _handleExpandingPanelClick() {
    this._$panel.toggleClass('expanding-panel_opened');
  }

  static initAll({ selector = '.js-expanding-panel', parent = document }) {
    $(parent).find(selector).each((__, element) => new ExpandingPanel().create($(element)));
  }

  static initDefault({ selector = '.js-expanding-panel', parent = document }) {
    $(parent).find(selector).each((__, element) => new ExpandingPanel().create($(element)));
  }
}

export default ExpandingPanel;

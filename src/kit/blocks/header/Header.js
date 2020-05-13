class Header {
  init($element) {
    this._handleButtonsClick = this._handleButtonsClick.bind(this);
    this._handleDimClick = this._handleDimClick.bind(this);

    this._$dim = $element.find('.js-header__dim');
    this._$sidebar = $element.find('.js-header__sidebar');
    const buttons = $element.find('.js-header__closing-button, .js-header__menu-button');

    buttons.on('click', this._handleButtonsClick);
    this._$dim.on('click', this._handleDimClick);
  }

  _handleButtonsClick() {
    this._toggleSidebar();
  }

  _handleDimClick() {
    this._toggleSidebar();
  }

  _toggleSidebar() {
    this._$dim.toggleClass('header__dim_opened');
    this._$sidebar.toggleClass('header__sidebar_opened');
  }

  static initAll(selector = '.js-header') {
    $(selector).each((_, element) => new Header().init($(element)))
  }
}

export default Header;

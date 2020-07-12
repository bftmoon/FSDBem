class Header {
  create($element, menuButtonClickListener) {
    $element.find('.js-header__menu-button').on('click', menuButtonClickListener);
    this._$header = $element;
    this._$headerContent = $element.find('.js-header__content');
    this._$links = this._$headerContent.find('.js-header__links');
    this._$dim = this._$header.find('.js-header__dim');

    this._$headerContent.find('.js-header__menu-button').on('click', this._handleMenuButtonClick.bind(this));
    this._$dim.on('click', this._handleDimClick.bind(this));
    this._$headerContent.find('.js-header__close-button').on('click', this._handleCloseButtonClick.bind(this));
    $(window).on('resize', this._handleWindowResize.bind(this));
    this._$headerContent.ready(this._handleContentReady.bind(this));
  }

  _handleWindowResize() {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      this._updateContent();
    }, 50);
  }

  _handleContentReady() {
    this._calcMinWidth();
    this._updateContent();
  }

  _handleMenuButtonClick() {
    this._toggleSidebar();
  }

  _handleDimClick() {
    this._toggleSidebar();
  }

  _handleCloseButtonClick() {
    this._toggleSidebar();
  }

  _toggleSidebar() {
    this._$links.toggleClass('header__links_opened');
    this._$dim.toggleClass('header__dim_opened');
  }

  _calcMinWidth() {
    this._minWidth = this._$headerContent
      .children().toArray()
      .reduce((sum, current) => {
        return current.offsetWidth + sum}, 0) + 20;
  }

  _updateContent() {
    this._toggleMode(this._minWidth >= this._$headerContent[0].clientWidth);
  }

  _toggleMode(withSidebar) {
    if (withSidebar) {
      this._$header.addClass('header_mode_sidebar');
    } else {
      this._$header.removeClass('header_mode_sidebar');
    }
  }

  static initDefault({menuButtonClickListener, parent = document}) {
    new Header().create($(parent).find('.js-header:first'), menuButtonClickListener);
  }
}

export default Header;

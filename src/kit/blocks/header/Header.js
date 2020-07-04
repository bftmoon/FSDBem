class Header {
  create($element, menuButtonClickListener) {
    $element.find('.js-header__menu-button').on('click', menuButtonClickListener);

    this.headerContent = $element.find('.js-header__content');
    this.menuButton = this.headerContent.find('.js-header__menu-button');
    this.items = this.headerContent.find('.js-header__items');
    $(window).on('resize', this._handleWindowResize.bind(this));
    this._calcMinWidth();
    this._updateContent();
  }

  _handleWindowResize() {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      this._updateContent();
    }, 50);
  }

  _calcMinWidth() {
    this.minWidth = this.headerContent
      .children().toArray()
      .reduce((sum, current) => current.offsetWidth + sum, 0);
  }

  _updateContent() {
    if (this.minWidth < this.headerContent[0].offsetWidth) {
      this.menuButton.addClass('header__menu-button_hidden');
      this.items.removeClass('header__items_hidden');
    } else {
      this.menuButton.removeClass('header__menu-button_hidden');
      this.items.addClass('header__items_hidden');
    }
  }

  static initDefault({ menuButtonClickListener, parent = document }) {
    new Header().create($(parent).find('.js-header:first'), menuButtonClickListener);
  }
}

export default Header;

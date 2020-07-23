class Header {
  create(element) {
    this._header = element;
    element.querySelector('.js-header__menu-button').addEventListener('click', this._handleMenuButtonClick.bind(this));
  }

  _handleMenuButtonClick() {
    this._header.classList.toggle('header_opened');
  }

  static initDefault({ selector = '.js-header', parent = document }) {
    new Header().create(parent.querySelector(selector));
  }
}

export default Header;

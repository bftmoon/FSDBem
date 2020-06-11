class Header {
  static initDefault({ menuButtonClickListener, parent = document }) {
    parent.querySelector('.js-header__menu-button').addEventListener('click', menuButtonClickListener);
  }
}

export default Header;

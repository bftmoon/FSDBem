class Sidebar {
  create($element) {
    this._$sidebar = $element;
    this._$main = $element.find('.js-sidebar__main');

    $element.find('.js-sidebar__dim').on('click', this._handleDimClick.bind(this));
    $element.find('.js-sidebar__close-button').on('click', this._handleCloseButtonClick.bind(this));
  }

  _handleDimClick() {
    this.close();
  }

  _handleCloseButtonClick() {
    this.close();
  }

  open() {
    this._$sidebar.toggleClass('sidebar_opened');
    setTimeout(() => this._$main.toggleClass('sidebar__main_opened'), 100);
  }

  close() {
    this._$main.toggleClass('sidebar__main_opened');
    setTimeout(() => this._$sidebar.toggleClass('sidebar_opened'), 600);
  }

  static createDefault({ parent = document }) {
    const sidebar = new Sidebar();
    sidebar.create($(parent).find('.js-sidebar'));
    return sidebar;
  }
}

export default Sidebar;

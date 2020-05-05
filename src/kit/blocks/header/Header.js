class Header {
  init($element){
    this._$dim = $element.find('.js-header__dim');
    this._$sidebar=$element.find('.js-header__content');
    const closeButton = $element.find('.js-header__closing-button');

    this._toggleSidebar = this._toggleSidebar.bind(this);

    closeButton.on('click', this._toggleSidebar);
    $element.find('.js-header__menu-button').on('click', this._toggleSidebar);
    this._$dim.on('click', this._toggleSidebar);
  }
  _toggleSidebar(){
    this._$dim.toggle();
    this._$sidebar.toggleClass('header__content_opened');
  }
  static initAll(selector='.js-header'){
    $(selector).each((_, element)=>new Header().init($(element)))
  }
}

export default Header;

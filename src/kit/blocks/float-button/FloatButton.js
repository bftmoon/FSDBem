class FloatButton {
  init({$button, $element, toggleClass}) {
    $button.on('click', () => $element.toggleClass(toggleClass));
  }

  static initDefault({elementSelector, toggleClass}) {
    new FloatButton().init({
      $button: $('.js-float-button'),
      $element: $(elementSelector),
      toggleClass
    })
  }
}

export default FloatButton;

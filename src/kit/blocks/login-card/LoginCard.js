class LoginCard {
  static init($element, listener) {
    $element.find('.js-login-card__registration-button').find(':first-child').on('click', listener);
  }

  static initDefault({ selector = '.js-login-card', parent = document, registrationClickListener }) {
    LoginCard.init($(parent).find(selector), registrationClickListener);
  }
}

export default LoginCard;

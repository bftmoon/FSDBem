class LoginCard {
  create($element, registrationPath) {
    this._registrationPath = registrationPath;
    $element.find('.js-login-card__registration-button').find(':first-child').on('click', this._handleRegistrationButtonClick.bind(this));
  }

  static initDefault({ selector = '.js-login-card', parent = document, registrationPath='./registration.html' }) {
    new LoginCard().create($(parent).find(selector), registrationPath);
  }

  _handleRegistrationButtonClick() {
    window.location.href = this._registrationPath;
  }
}

export default LoginCard;

class LoginCard {
  static addRegistrationClickListener(listener) {
    $('.js-login-card__registration-button').on('click', listener);
  }
}

export default LoginCard;

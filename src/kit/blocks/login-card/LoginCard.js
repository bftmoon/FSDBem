class LoginCard {
  static init($element, listener){
    console.log($element)
    $element.find('.js-login-card__registration-button').on('click', listener);
  }
  static initDefault({selector='.js-login-card', parent = document, registrationClickListener}){
    LoginCard.init($(parent).find(selector), registrationClickListener);
  }
}

export default LoginCard;

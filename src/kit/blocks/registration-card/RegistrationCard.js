class RegistrationCard {
  static addLoginClickListener(listener){
    $('.js-registration-card__login-button').on('click', listener);
  }
}

export default RegistrationCard;

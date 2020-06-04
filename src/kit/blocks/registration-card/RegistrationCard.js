import DateMaskedInput from "@blocks/input";

class RegistrationCard {
  static initDefault({selector = '.js-registration-card', parent = document, loginClickListener}) {
    const card = parent.querySelector(selector);
    card.querySelector( '.js-registration-card__login-button').addEventListener('click', loginClickListener);
    DateMaskedInput.initDefault({parent: card})
  }
}

export default RegistrationCard;

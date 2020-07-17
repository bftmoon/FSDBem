import DateMaskedInput from '@blocks/input';

class RegistrationCard {

  create({element, loginPath}) {
    this._loginPath = loginPath;
    element.querySelector('.js-registration-card__login-button').firstChild.addEventListener('click', this._handleLoginButtonClick.bind(this));
    DateMaskedInput.initDefault({parent: element});
  }

  static initDefault({selector = '.js-registration-card', parent = document, loginPath = './login.html'}) {
    new RegistrationCard().create({element: parent.querySelector(selector), loginPath});
  }

  _handleLoginButtonClick() {
    window.location.href = this._loginPath;
  }
}

export default RegistrationCard;

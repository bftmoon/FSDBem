import LoginCard from '@blocks/login-card';
import RegistrationCard from '@blocks/registration-card';

class LoginPage {
  create() {
    this.$cards = $('.js-login__card');

    LoginCard.initDefault({
      registrationClickListener: this._handleRegistrationButtonClick.bind(this)
    });
    RegistrationCard.initDefault({
      loginClickListener: this._handleLoginButtonClick.bind(this)
    });

    if (!LoginPage.isLoginLocation()) this.$cards.toggleClass('login__card_hidden');
  }

  _handleLoginButtonClick() {
    this._updateLocation();
  }

  _handleRegistrationButtonClick() {
    this._updateLocation();
  }

  _updateLocation() {
    window.location.search = LoginPage.isLoginLocation() ? 'sign=up' : 'sign=in';
  }

  static isLoginLocation() {
    return window.location.search.split('=')[1] === 'in';
  }
}

export default LoginPage;

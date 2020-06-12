import LoginCard from '@blocks/login-card';
import RegistrationCard from '@blocks/registration-card';

class LoginPage {
  create() {
    this.$cards = $('.js-login__card');

    LoginCard.initDefault({
      registrationClickListener: LoginPage.handleRegistrationButtonClick,
    });
    RegistrationCard.initDefault({
      loginClickListener: LoginPage.handleLoginButtonClick.bind,
    });

    if (!LoginPage.isLoginLocation()) this.$cards.toggleClass('login__card_hidden');
  }

  static handleLoginButtonClick() {
    LoginPage.updateLocation();
  }

  static handleRegistrationButtonClick() {
    LoginPage.updateLocation();
  }

  static updateLocation() {
    window.location.search = LoginPage.isLoginLocation() ? 'sign=up' : 'sign=in';
  }

  static isLoginLocation() {
    return window.location.search.split('=')[1] === 'in';
  }
}

export default LoginPage;

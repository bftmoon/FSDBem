import LoginCard from '@blocks/login-card';
import RegistrationCard from '@blocks/registration-card';

class LoginPage {
  create() {
    this.$cards = $('.js-login__card');

    LoginCard.initDefault({registrationClickListener: this.handleRegistrationButtonClick.bind(this)});
    RegistrationCard.initDefault({loginClickListener: this.handleLoginButtonClick.bind(this)});

    if (!this.isLoginLocation()) this.$cards.toggleClass('login__card_hidden');

  }

  handleLoginButtonClick() {
    this.updateLocation();
  }

  handleRegistrationButtonClick() {
    this.updateLocation();
  }

  updateLocation() {
    window.location.search = this.isLoginLocation() ? 'sign=up' : 'sign=in';
  }

  isLoginLocation() {
    return window.location.search.split('=')[1] === 'in';
  }
}

export default LoginPage;

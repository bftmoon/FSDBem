import LoginCard from '../../../kit/blocks/login-card/LoginCard';
import RegistrationCard from '../../../kit/blocks/registration-card/RegistrationCard';

class LoginPage {
  init() {
    this.$cards = $('.js-login-page__card');
    this.handleLoginButtonClick = this.handleLoginButtonClick.bind(this);
    this.handleRegistrationButtonClick = this.handleRegistrationButtonClick.bind(this);

    LoginCard.addRegistrationClickListener(this.handleRegistrationButtonClick);
    RegistrationCard.addLoginClickListener(this.handleLoginButtonClick);
  }

  handleLoginButtonClick() {
    this.toggleCards();
  }

  handleRegistrationButtonClick() {
    this.toggleCards();
  }

  toggleCards() {
    this.$cards.toggleClass('login-page__card_hidden');
  }
}

export default LoginPage;

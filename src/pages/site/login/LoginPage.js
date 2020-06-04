import LoginCard from "@blocks/login-card";
import RegistrationCard from "@blocks/registration-card";

class LoginPage {
  create() {
    this.$cards = $('.js-login-page__card');
    this.handleLoginButtonClick = this.handleLoginButtonClick.bind(this);
    this.handleRegistrationButtonClick = this.handleRegistrationButtonClick.bind(this);

    LoginCard.initDefault({registrationClickListener: this.handleRegistrationButtonClick});
    RegistrationCard.initDefault({loginClickListener: this.handleLoginButtonClick});
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

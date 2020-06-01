import 'jquery.maskedinput/src/jquery.maskedinput';

$(".js-input_masked").mask("99.99.9999", {
  completed: function () {
    const input = Date.parse(this.val().split('.').reverse().join('-'));
    if (Number.isNaN(input)){
      this[0].setCustomValidity('Невозможная дата')
    } else if (input > Date.now()) {
      this[0].setCustomValidity('Слишком молоды')
    } else if (input < Date.now() - 150 * 365 * 24 * 60 * 60 * 1000) {
      this[0].setCustomValidity('Невозможный жизненный срок')
    } else {
      this[0].setCustomValidity('');
    }
  }
});


class DateMaskedInput {
  static init($element) {
    import('jquery.maskedinput/src/jquery.maskedinput').then(() =>
      $element.mask('99.99.9999', {
        completed() {
          const input = Date.parse(this.val().split('.').reverse().join('-'));
          if (Number.isNaN(input)) {
            this[0].setCustomValidity('Невозможная дата');
          } else if (input > Date.now()) {
            this[0].setCustomValidity('Слишком молоды');
          } else if (input < Date.now() - 150 * 365 * 24 * 60 * 60 * 1000) {
            this[0].setCustomValidity('Невозможный жизненный срок');
          } else {
            this[0].setCustomValidity('');
          }
        },
      }));
  }

  static initAll({selector = '.js-input_masked', parent = document}) {
    $(parent).find(selector).each((__, element) => DateMaskedInput.init($(element)));
  }

  static initDefault({selector = '.js-input_masked', parent = document}) {
    DateMaskedInput.init($(parent.querySelector(selector)));
  }
}

export default DateMaskedInput;

import 'jquery-ui/ui/widgets/slider';

class Slider {
  init($element, { min = 0, max = 15000, current = [5000, 10000] }) {
    this._$element = $element;
    this._$amount = this._$element.find('.js-slider__amount');
    this.$picker = this._$element.find('.js-slider__picker');
    this._slideListener = this._slideListener.bind(this);

    this.$picker.slider({
      range: true,
      min,
      max,
      values: current,
      slide: this._slideListener,
    });

    this._$amount.val(Slider.formatRange(this.$picker.slider('values')));
  }

  _slideListener(_, ui) {
    this._$amount.val(Slider.formatRange(ui.values));
  }

  static formatRange([sum1, sum2]) {
    return (`${sum1.toLocaleString()}₽ - ${sum2.toLocaleString()}₽`);
  }


  static initAll(selector = '.js-slider') {
    $(selector).each((_, element) => new Slider().init($(element), {}));
  }
}

export default Slider;

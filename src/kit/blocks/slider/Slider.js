import 'jquery-ui/ui/widgets/slider'

class Slider {

  constructor($element) {
    this._$element = $element;
  }

  init({min = 0, max = 15000, current = [5000, 10000]}) {
    this._$amount = this._$element.find('.js-slider__amount');
    this.$picker = this._$element.find('.js-slider__picker');
    this._slideListener = this._slideListener.bind(this);

    this.$picker.slider({
      range: true,
      min: min,
      max: max,
      values: current,
      slide: this._slideListener
    });

    this._$amount.val(this._formatter(this.$picker.slider("values")));
  }

  _slideListener(_, ui) {
    this._$amount.val(this._formatter(ui.values));
  }

  _formatter([sum1, sum2]) {
    return sum1 + '₽ - ' + sum2 + '₽';
  }


  static initAll(selector='.js-slider'){
    $(selector).each((_, element)=>new Slider($(element)).init({}))
  }
}

export default Slider;


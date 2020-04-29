import 'jquery-ui/ui/widgets/slider'

function init({selector = '.slider', min = 0, max = 15000, current = [5000, 10000]}) {
  let slider = $(selector);
  let amount = slider.find('.slider__amount');
  let picker = slider.find('.slider__picker');
  let formatter = ([sum1, sum2]) => sum1 + '₽ - ' + sum2 + '₽';

  picker.slider({
    range: true,
    min: min,
    max: max,
    values: current,
    slide: function (event, ui) {
      amount.val(formatter(ui.values));
    }
  });
  amount.val(formatter(picker.slider("values")));
}

export {init}

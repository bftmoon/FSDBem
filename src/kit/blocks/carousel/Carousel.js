import 'lightslider/dist/js/lightslider.min';

class Carousel {
  init(element) {
    this.slider = element.lightSlider({
      loop: true,
      item: 1,
      prevHtml: '<i class="material-icons lSAction__icon">expand_more</i>',
      nextHtml: '<i class="material-icons lSAction__icon">expand_more</i>',
    });
  }

  static initAll(selector = '.js-carousel__content') {
    $(selector).each((_, element) => new Carousel().init($(element)));
  }
}

export default Carousel;

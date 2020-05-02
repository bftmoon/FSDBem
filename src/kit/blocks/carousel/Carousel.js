import 'lightslider/dist/js/lightslider.min'

class Carousel {

  constructor(element) {
    this._init(element);
  }

  _init(element) {
    element.lightSlider({
      loop: true,
      item: 1,
      prevHtml: '<i class="material-icons lSAction__icon">expand_more</i>',
      nextHtml: '<i class="material-icons lSAction__icon">expand_more</i>',
    });
  }
}

export default Carousel;

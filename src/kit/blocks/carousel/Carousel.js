class Carousel {
  static init($element) {
    import('lightslider/dist/js/lightslider.min').then(() => {
      $element.lightSlider({
        loop: true,
        item: 1,
        useCSS: false,
        slideMargin: 0,
        galleryMargin: 0,
        prevHtml: '<i class="material-icons lSAction__icon">expand_more</i>',
        nextHtml: '<i class="material-icons lSAction__icon">expand_more</i>',
      });
    })
  }

  static initDefault({selector = '.js-carousel__content', parent = document}) {
    Carousel.init($(parent.querySelector(selector)));
  }
}

export default Carousel;

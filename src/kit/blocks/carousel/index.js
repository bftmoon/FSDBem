import Carousel from "./Carousel";

$('.js-carousel__content').each((_, element) => new Carousel($(element)))

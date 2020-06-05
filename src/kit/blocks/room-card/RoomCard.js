import Carousel from '../carousel';

class RoomCard {
  static init(element) {
    Carousel.initDefault({ parent: element });
  }

  static initAll({ selector = '.js-room-card', parent = document }) {
    $(parent).find(selector).each((__, element) => RoomCard.init(element));
  }
}

export default RoomCard;

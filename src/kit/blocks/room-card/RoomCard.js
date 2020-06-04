import Carousel from "../carousel";

class RoomCard {
  static init(element) {
    Carousel.initDefault({parent: element});
  }

  static initDefault({selector = '.js-room-card', parent = document}) {
    RoomCard.init(parent.querySelector(selector));
  }
}

export default RoomCard;

import LikeButton from "../like-button/index";

class Feedback {
  static init(element) {
    LikeButton.initDefault({parent: element});
  }

  static initAll({selector = '.js-feedback', parent = document}) {
    $(parent).find(selector).each((__, element) => Feedback.init(element));
  }
}

export default Feedback;

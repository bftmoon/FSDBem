class LikeButton {
  static init($element) {
    $element.on('click', LikeButton.handleLikeClick);
  }

  static handleLikeClick(element) {
    const counter = element.currentTarget.querySelector('.js-like-button__count');
    counter.innerText = Number(counter.innerText) + (element.target.checked ? 1 : -1);
  }

  static initAll(selector = '.js-like-button') {
    $(selector).each((_, like) => LikeButton.init($(like)));
  }
}

export default LikeButton;

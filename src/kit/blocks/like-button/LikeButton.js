class LikeButton {
  static init($element) {
    $element.on('click', LikeButton.handleLikeClick);
  }

  static handleLikeClick(element) {
    const counter = element.currentTarget.querySelector('.js-like-button__count');
    if (element.target.checked) {
      counter.innerText += 1;
    } else {
      counter.innerText -= 1;
    }
  }

  static initAll(selector = '.js-like-button') {
    $(selector).each((_, like) => LikeButton.init($(like)));
  }
}

export default LikeButton;

class LikeButton {
  static init(element) {
    element.addEventListener('click', LikeButton.handleLikeClick);
  }

  static handleLikeClick(element) {
    const counter = element.currentTarget.querySelector('.js-like-button__count');
    counter.innerText = Number(counter.innerText) + (element.target.checked ? 1 : -1);
  }

  static initAll({ selector = '.js-like-button', parent = document }) {
    $(parent).find(selector).each((_, element) => LikeButton.init(element));
  }

  static initDefault({ selector = '.js-like-button', parent = document }) {
    LikeButton.init(parent.querySelector(selector));
  }
}

export default LikeButton;

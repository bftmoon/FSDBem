class LikeButton {

  init($element) {
    $element.on('click', this._handleLikeClick);
  }

  _handleLikeClick(element){
    const counter = element.currentTarget.querySelector('.js-like-button__count');
    if (element.target.checked){
      counter.innerText++;
    } else {
      counter.innerText--;
    }
  }
  static initAll(selector='.js-like-button'){
    $(selector).each((_, like)=>new LikeButton().init($(like)));
  }
}

export default LikeButton;

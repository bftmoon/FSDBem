class LikeButton {

  constructor($element) {
    this._init($element);
  }

  _init($element) {
    $element.on('click', this._clickListener);
  }

  _clickListener(element){
    const counter = element.currentTarget.querySelector('.js-like-button__count');
    if (element.target.checked){
      counter.innerText++;
    } else {
      counter.innerText--;
    }
  }
}

export default LikeButton;

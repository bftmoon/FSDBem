import RussianLangUtil from '@utils/RussianLangUtil';
import DropdownMenu from '../dropdown-menu';

class GuestsDropdownMenu extends DropdownMenu {
  constructor() {
    super(GuestsDropdownMenu.formatGuestsHeader);
  }

  handleAdultsDecrementClick(event) {
    const adultsCount = event.target.nextSibling.value;
    if (Number(adultsCount) === 0) {
      this._cleanAndBlockChildsIncrement();
    }
  }

  create($menu) {
    super.create($menu);
    if (Number(this._$inputs[0].value) === 0) {
      this._cleanAndBlockChildsIncrement();
    }
    this._$increments[0].addEventListener('click', this.handleAdultsIncrementClick.bind(this));
    this._$decrements[0].addEventListener('click', this.handleAdultsDecrementClick.bind(this));
  }

  handleAdultsIncrementClick(event) {
    const adultsCount = event.target.previousSibling.value;
    if (Number(adultsCount) === 1) {
      this._enableChildsIncrement();
    }
  }

  _cleanAndBlockChildsIncrement() {
    this._cleanData();
    this._disableChildsIncrements();
  }

  _disableChildsIncrements() {
    this._$increments[1].disabled = true;
    this._$increments[2].disabled = true;
  }

  _enableChildsIncrement() {
    this._$increments[1].disabled = false;
    this._$increments[2].disabled = false;
  }


  _cleanData() {
    super._cleanData();
    this._disableChildsIncrements();
  }

  static formatGuestsHeader(countArray) {
    let guestsInfo = RussianLangUtil.selectWordByCount(
      countArray[0] + countArray[1],
      ['Сколько гостей', 'гость', 'гостя', 'гостей'],
      { withNumber: true },
    );
    if (countArray[2] > 0) {
      guestsInfo += `, ${RussianLangUtil.selectWordByCount(countArray[2], ['', 'младенец', 'младенца', 'младенцев'], { withNumber: true })}`;
    }
    return guestsInfo;
  }

  static initDefault({ selector = '.js-guests-dropdown', parent = document }) {
    new GuestsDropdownMenu().create($(parent.querySelector(selector).firstChild));
  }

  static initAll({ selector = '.js-guests-dropdown', parent = document }) {
    $(parent).find(selector).each((__, element) =>
      new GuestsDropdownMenu().create($(element.firstChild))
    );
  }
}

export default GuestsDropdownMenu;

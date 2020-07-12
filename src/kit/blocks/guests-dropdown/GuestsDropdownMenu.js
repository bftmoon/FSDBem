import RussianLangUtil from '@utils/RussianLangUtil';
import DropdownMenu from '../dropdown-menu';

class GuestsDropdownMenu extends DropdownMenu {
  constructor() {
    super(GuestsDropdownMenu.formatGuestsHeader);
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
    $(parent).find(selector).each((__, element) => {
      new GuestsDropdownMenu().create($(element.firstChild));
    });
  }
}

export default GuestsDropdownMenu;

import DropdownMenu from "../dropdown-menu";
import RussianLangUtil from "@utils/RussianLangUtil";

class GuestsDropdownMenu extends DropdownMenu {

  constructor() {
    super();
    this.x ='I am a very long string for file that was imported more then one time find me if you can';
  }

  _formatHeader(countArray) {
    const guestsCount = countArray.reduce((sum, count) => sum + count, 0);
    return RussianLangUtil.selectWordByCount(
      guestsCount,
      ['Сколько гостей', 'гость', 'гостя', 'гостей'],
      {withNumber: true},
    );
  }

  static initDefault({selector = '.js-guests-dropdown', parent = document}) {
    new GuestsDropdownMenu().create($(parent.querySelector(selector)));
  }

  static initAll({selector = '.js-guests-dropdown', parent = document}) {
    $(parent).find(selector).each((__, element) => new GuestsDropdownMenu().create($(element)));
  }
}

export default GuestsDropdownMenu;

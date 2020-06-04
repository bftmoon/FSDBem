import DropdownMenu from "../dropdown-menu/index";
import RussianLangUtil from "@utils/RussianLangUtil";

class GuestsDropdownMenu extends DropdownMenu {
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

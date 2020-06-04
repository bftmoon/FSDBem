import DropdownMenu from "../dropdown-menu/index";
import RussianLangUtils from "../../../utils/RussianLangUtils";

class FurnitureDropdownMenu extends DropdownMenu {
  _formatHeader(countArray) {
    return [
      RussianLangUtils.selectWordByCount(countArray[0], ['спален', 'спальня', 'спальни', 'спален'], {
        withNumber: true,
        withZeroNumber: true,
      }),
      RussianLangUtils.selectWordByCount(countArray[1], ['кроватей', 'кровать', 'кровати', 'кроватей'], {
        withNumber: true,
        withZeroNumber: true,
      }),
      RussianLangUtils.selectWordByCount(countArray[2], ['ванных комнат', 'ванная комната', 'ванные комнаты', 'ванных комнат'], {
        withNumber: true,
        withZeroNumber: true,
      }),
    ].join(', ');
  }

  static initDefault({selector = '.js-guests-dropdown', parent = document}) {
    new FurnitureDropdownMenu().create($(parent.querySelector(selector)));
  }

  static initAll({selector = '.js-guests-dropdown', parent = document}) {
    $(parent).find(selector).each((__, element) => new FurnitureDropdownMenu().create($(element)));
  }
}

export default FurnitureDropdownMenu;

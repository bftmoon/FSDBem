import RussianLangUtil from '@utils/RussianLangUtil';
import DropdownMenu from '@blocks/dropdown-menu';

class FurnitureDropdownMenu extends DropdownMenu {
  constructor() {
    super(FurnitureDropdownMenu.formatFurnitureHeader);
  }

  static formatFurnitureHeader(countArray) {
    const countWords = [
      ['спален', 'спальня', 'спальни', 'спален'],
      ['кроватей', 'кровать', 'кровати', 'кроватей'],
      ['ванных комнат', 'ванная комната', 'ванные комнаты', 'ванных комнат'],
    ];
    const headerCounts = [];
    for (let i = 0; i < 3; i += 1) {
      if (countArray[i] > 0) {
        headerCounts.push(
          RussianLangUtil.selectWordByCount(countArray[i], countWords[i], { withNumber: true }),
        );
      }
    }
    return headerCounts.length > 0 ? headerCounts.join(', ') : 'Удобства не выбраны';
  }

  static initDefault({ selector = '.js-furniture-dropdown', parent = document }) {
    new FurnitureDropdownMenu().create($(parent.querySelector(selector).firstChild));
  }

  static initAll({ selector = '.js-furniture-dropdown', parent = document }) {
    $(parent).find(selector).each((__, element) => {
      new FurnitureDropdownMenu().create($(element.firstChild));
    });
  }
}

export default FurnitureDropdownMenu;

import DropdownMenu from '../dropdown-menu/DropdownMenu';
import RussianLangUtils from '../../Utils';

DropdownMenu.initAll({
  selector: '.js-furniture-dropdown',
  headerFormatter: (counterData) => [
    RussianLangUtils.selectWordByCount(counterData[0], ['спален', 'спальня', 'спальни', 'спален'], {
      withNumber: true,
      withZeroNumber: true,
    }),
    RussianLangUtils.selectWordByCount(counterData[1], ['кроватей', 'кровать', 'кровати', 'кроватей'], {
      withNumber: true,
      withZeroNumber: true,
    }),
    RussianLangUtils.selectWordByCount(counterData[2], ['ванных комнат', 'ванная комната', 'ванные комнаты', 'ванных комнат'], {
      withNumber: true,
      withZeroNumber: true,
    }),
  ].join(', '),
});

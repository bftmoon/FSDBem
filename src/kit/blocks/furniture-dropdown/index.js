import DropdownMenu from "../dropdown-menu/DropdownMenu";

DropdownMenu.initAll('.js-furniture-dropdown', furnitureFormatter);

function furnitureFormatter(counterData) {
  return [
    DropdownMenu.itemFormatter(counterData[0], ['0 спален', 'спальня', 'спальни', 'спален']),
    DropdownMenu.itemFormatter(counterData[1], ['0 кроватей', 'кровать', 'кровати', 'кроватей']),
    DropdownMenu.itemFormatter(counterData[2], ['0 ванных комнат', 'ванная комната', 'ванные комнаты', 'ванных комнат'])
  ].join(', ');
}

import DropdownMenu from "../dropdown-menu/DropdownMenu";

DropdownMenu.initAll('.js-guests-dropdown', guestsFormatter);

function guestsFormatter(counterData) {
  let guestsCount = counterData.reduce((sum, count) => sum + count, 0);
  return DropdownMenu.itemFormatter(guestsCount, ['Сколько гостей', 'гость', 'гостя', 'гостей']);
}

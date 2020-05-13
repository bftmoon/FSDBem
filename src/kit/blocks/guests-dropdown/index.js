import DropdownMenu from "../dropdown-menu/DropdownMenu";
import RussianLangUtils from "../../Utils";

DropdownMenu.initAll({
  selector: '.js-guests-dropdown',
  headerFormatter: (counterData) => {
    const guestsCount = counterData.reduce((sum, count) => sum + count, 0);
    return RussianLangUtils.selectWordByCount(
      guestsCount,
      ['Сколько гостей', 'гость', 'гостя', 'гостей'],
      {withNumber: true}
    );
  }
});

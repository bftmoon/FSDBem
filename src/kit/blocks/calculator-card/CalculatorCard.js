import DropdownDate from "../dropdown-date/index";
import GuestsDropdownMenu from "../guests-dropdown/index";
import FurnitureDropdownMenu from "../furniture-dropdown/index";

class CalculatorCard {
  static init(element) {
    DropdownDate.initDefault({parent: element});
    GuestsDropdownMenu.initDefault({parent: element});
    FurnitureDropdownMenu.initDefault({parent: element});
  }

  static initDefault({selector = '.js-calculator-card', parent = document}) {
    CalculatorCard.init(parent.querySelector(selector));
  }
}

export default CalculatorCard;

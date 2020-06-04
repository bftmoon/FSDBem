import DropdownDate from "../dropdown-date";
import GuestsDropdownMenu from "../guests-dropdown";

class SearchCard {
  static init(element) {
    DropdownDate.initDefault({parent: element});
    GuestsDropdownMenu.initDefault({parent: element});
  }

  static initDefault({selector = '.js-search-card', parent = document}) {
    SearchCard.init($(parent.querySelector(selector)));
  }
}

export default SearchCard;

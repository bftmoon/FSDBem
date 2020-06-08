import DropdownDate from '../dropdown-date';
import GuestsDropdownMenu from '../guests-dropdown';

class SearchCard {
  static init(element) {
    DropdownDate.createDefault({ parent: element });
    GuestsDropdownMenu.createDefault({ parent: element });
  }

  static initDefault({ selector = '.js-search-card', parent = document }) {
    SearchCard.init(parent.querySelector(selector));
  }
}

export default SearchCard;

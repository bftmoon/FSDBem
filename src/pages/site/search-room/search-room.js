import './search-room.scss'
import '../layout/layout'
import DropdownDate from "@blocks/dropdown-date";
import GuestsDropdownMenu from "@blocks/guests-dropdown";
import Slider from "@blocks/slider";
import ExpandableCheckboxList from "@blocks/checkbox-list";
import FurnitureDropdownMenu from "@blocks/furniture-dropdown";
import RoomCard from "@blocks/room-card";
import Paginator from "../../../kit/blocks/paginator";

DropdownDate.initDefault({});
GuestsDropdownMenu.initDefault({});
FurnitureDropdownMenu.initDefault({})
Slider.initDefault({});
// todo: separate expandable
ExpandableCheckboxList.initAll({})
RoomCard.initAll({});
Paginator.initDefault({})

import './search-room.scss'
import '../layout/layout'
import DropdownDate from "@blocks/dropdown-date";
import GuestsDropdownMenu from "@blocks/guests-dropdown";
import Slider from "@blocks/slider";
import "@blocks/checkbox-list";
import FurnitureDropdownMenu from "@blocks/furniture-dropdown";
import RoomCard from "@blocks/room-card";
import Paginator from "../../../kit/blocks/paginator";
import ExpandableCheckboxes from "../../../kit/blocks/expandable-checkboxes";

DropdownDate.initDefault({});
GuestsDropdownMenu.initDefault({});
FurnitureDropdownMenu.initDefault({})
Slider.initDefault({});
ExpandableCheckboxes.initAll({});
RoomCard.initAll({});
Paginator.initDefault({})

import '@blocks/checkbox-list';
import DropdownDate from '@blocks/dropdown-date';
import ExpandableCheckboxes from '@blocks/expandable-checkboxes';
import FurnitureDropdownMenu from '@blocks/furniture-dropdown';
import GuestsDropdownMenu from '@blocks/guests-dropdown';
import Paginator from '@blocks/paginator';
import RoomCard from '@blocks/room-card';
import Slider from '@blocks/slider';
import '../layout/layout';
import './search-room.scss';

DropdownDate.initDefault({});
GuestsDropdownMenu.initDefault({});
FurnitureDropdownMenu.initDefault({});
Slider.initDefault({ options: { min: 80, max: 15500 } });
ExpandableCheckboxes.initAll({});
RoomCard.initAll({});
Paginator.initDefault({});

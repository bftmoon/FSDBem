import '../layout/layout'
import './form-elements.scss'
import '@blocks/kit-header'
import '@blocks/input'
import '@blocks/title'
import '@blocks/button'
import '@blocks/toggle'
import '@blocks/rating'
import '@blocks/a'
import '@blocks/bullet-list'
import '@blocks/subscribe-input'
import '@blocks/iconed-list'
import '@blocks/radio-list'
import DateMaskedInput from "../../../kit/blocks/input";
import DropdownDate from "../../../kit/blocks/dropdown-date";
import GuestsDropdownMenu from "../../../kit/blocks/guests-dropdown";
import FurnitureDropdownMenu from "../../../kit/blocks/furniture-dropdown";
import ExpandableCheckboxList from "../../../kit/blocks/checkbox-list";
import Slider from "../../../kit/blocks/slider";
import Paginator from "../../../kit/blocks/paginator";
import Feedback from "../../../kit/blocks/feedback";
import LikeButton from "../../../kit/blocks/like-button";

DateMaskedInput.initDefault({});
DropdownDate.initAll({})
GuestsDropdownMenu.initAll({})
FurnitureDropdownMenu.initAll({})
ExpandableCheckboxList.initAll({})
Slider.initDefault({})
Paginator.initDefault({})
Feedback.initAll({})
LikeButton.initAll({parent: $('.js-form-elements__likes')[0]})



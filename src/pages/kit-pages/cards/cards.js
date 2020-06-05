import CalculatorCard from '@blocks/calculator-card';
import DropdownDate from '@blocks/dropdown-date';
import '@blocks/kit-header';
import LoginCard from '@blocks/login-card';
import RegistrationCard from '@blocks/registration-card';
import RoomCard from '@blocks/room-card';
import SearchCard from '@blocks/search-card';
import '../layout/layout';
import './cards.scss';

SearchCard.initDefault({});
RegistrationCard.initDefault({});
CalculatorCard.initDefault({});
LoginCard.initDefault({});
DropdownDate.initAllInline({});
RoomCard.initAll({});

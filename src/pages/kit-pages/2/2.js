import * as kit from '../../../kit/kit'
import './2.scss';

let dropdown = new kit.dropdown.DropdownMenu(
  [
    {name: 'Взрослые', count: 0},
    {name: 'Дети', count: 0},
    {name: 'Младенцы', count: 0},
  ],
  {initTitle: 'Сколько гостей'}
).init({
  parentSelector: '#init_closed',
});

kit.datepicker.init({selector: '#date_double_input'})
kit.datepicker.init({selector: '#date_single_input'})
kit.slider.init({})

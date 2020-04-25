import './kit.scss'
import * as paginator from './paginator/paginator'
import * as dropdown from './menu/menu'
import './dateDropdown/dateDropdown'
import './maskedDateInput/field_masked'
import * as datepicker from './dateDropdown/dateDropdown'
import * as slider from './slider/slider'
import * as checkboxes from './checkboxList/checkboxList'

function initDefault() {
  // dropdown.DropdownMenu()
}

checkboxes.init();
export {paginator, dropdown, datepicker, slider}

// import './kit.scss' // avoid double import
import * as paginator from './blocks/paginator/paginator'
import * as dropdown from './blocks/dropdownMenu/dropdownMenu'
import './blocks/dropdownDate/dropdownDate'
import * as datepicker from './blocks/dropdownDate/dropdownDate'
import * as slider from './blocks/slider/slider'
import * as checkboxes from './blocks/checkboxList/checkboxList'
import * as input from './blocks/input/input'
import * as like from './blocks/likeButton/likeButton'

input.initDateMasks();
checkboxes.init();
like.init();

export {paginator, dropdown, datepicker, slider}

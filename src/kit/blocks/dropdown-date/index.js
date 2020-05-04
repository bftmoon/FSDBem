import DropdownDate from "./DropdownDate";

$('.js-date-dropdown').each((_, element)=>new DropdownDate({element: $(element)}))
$('.js-date-dropdown-inline').each((_, element)=>new DropdownDate({element: $(element), isInline: true}))

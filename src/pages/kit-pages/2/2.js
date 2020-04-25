import * as kit from '../../../kit/kit'
import './2.scss';

kit.datepicker.init({selector: '#date_double_input'})
kit.datepicker.init({selector: '#date_single_input'})
kit.slider.init({})
kit.paginator.init({
  clickListener: (page) => {
    let count = (page - 1) * 12 + 1;
    return count + ' - ' + (count + 11) + ' из 100+ вариантов аренды';
  }
});

const furnitureInitData = [
  {name: 'Спальни', count: 2},
  {name: 'Кровати', count: 2},
  {name: 'Ванные комнаты', count: 0},
];
const guestsInitData = [
  {name: 'Взрослые', count: 0},
  {name: 'Дети', count: 0},
  {name: 'Младенцы', count: 0},
];

kit.dropdown.init($.extend(true, [], guestsInitData), {
  selector: '.dropdown-default-example',
  changesListener: guestsFormatter
});
kit.dropdown.init($.extend(true, [], furnitureInitData), {
  selector: '.dropdown-titled-example',
  changesListener: furnitureFormatter
});
kit.dropdown.init($.extend(true, [], furnitureInitData), {
  selector: '.dropdown-expanded-example',
  isClosed: false,
  changesListener: furnitureFormatter
});
kit.dropdown.init($.extend(true, [], furnitureInitData), {
  selector: '.dropdown-confirm-example',
  isClosed: false,
  withConfirm: true,
  changesListener: furnitureFormatter
});
kit.dropdown.init($.extend(true, [], guestsInitData), {
  selector: '.dropdown-cancel-example',
  isClosed: false,
  withConfirm: true,
  withCancel: true,
  changesListener: guestsFormatter
});

function guestsFormatter(counterData) {
  let guestsCount = counterData.reduce((sum, obj) => sum + obj.count, 0);
  return guestsCount === undefined? 'Сколько гостей': itemFormatter(guestsCount, ['Сколько гостей', 'гость', 'гостя', 'гостей']);
}

function furnitureFormatter(counterData) {
  return [
    itemFormatter(counterData[0].count, ['0 спален', 'спальня', 'спальни', 'спален']),
    itemFormatter(counterData[1].count, ['0 кроватей', 'кровать', 'кровати', 'кроватей']),
    itemFormatter(counterData[2].count, ['0 ванных комнат', 'ванная комната', 'ванные комнаты', 'ванных комнат'])
  ].join(', ');
}

function itemFormatter(count, variants) { // number, [string]
  if (count === 0) return variants[0]
  if (count === 1) return count + ' ' + variants[1];
  if (count > 1 && count < 5) return count + ' ' + variants[2];
  return count + ' ' + variants[3];
}

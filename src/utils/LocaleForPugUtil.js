class LocaleForPugUtil {
  static toRuDate(date){
    return date.toLocaleDateString('ru', {day: "2-digit", month:"2-digit", year: 'numeric'}).split('-').reverse().join('.')
  }
  static toRuPrice(number){
    return number.toLocaleString().replace(',', ' ')+'₽'
  }
}

export default LocaleForPugUtil;

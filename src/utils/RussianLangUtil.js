class RussianLangUtil {
  static selectWordByCount(count, variants, {withNumber = false, withZeroNumber = false}) {
    const prefix = withNumber ? `${count} ` : '';
    const residue = count % 10;
    if (count === 0) return withZeroNumber ? prefix + variants[0] : variants[0];
    if (residue === 1 && count !== 11) return prefix + variants[1];
    // eslint-disable-next-line fsd/split-conditionals
    if (residue > 1 && residue < 5 && ![12, 13, 14].includes(count)) return prefix + variants[2];
    return prefix + variants[3];
  }
}

export default RussianLangUtil;

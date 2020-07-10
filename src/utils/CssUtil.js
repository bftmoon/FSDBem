class CssUtil {
  static makeClassGenerator(blockName, isVertical) {
    return (elementName) => {
      const className = elementName === undefined ? blockName : `${blockName}__${elementName}`;
      return `${className} ${className}_${isVertical ? 'vertical' : 'horizontal'}`;
    };
  }
}

export default CssUtil;

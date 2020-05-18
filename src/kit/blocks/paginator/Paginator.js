class Paginator {

  init($element, {page = 1, count = 15, href = 'mock-address'}) {
    const items = [];
    if (page > 1) items.push(this._buildArrow(page, href, false));

    const pageNums = this._preparePageNums(page, count);
    pageNums.forEach((pageNum, index) => {
      if (this._checkIsThreeDotsRequired(index, pageNum, pageNums)) {
        items.push(this._buildThreeDot());
      }
      items.push(this._buildPageNum(pageNum, href, page))
    })

    if (page < count) items.push(this._buildArrow(page, href, true));
    $element.prepend(this._buildPaginator(items));
  }

  _checkIsThreeDotsRequired(index, pageNum, pageNums) {
    return index > 0 && (pageNum - pageNums[index - 1]) > 1;
  }

  _buildPaginator(items) {
    return $('<div>', {
      class: 'paginator__pages',
      append: items
    });
  }

  _buildArrow(page, href, isForward) {
    return $('<a>', {
      href: href + (page + (isForward ? 1 : -1)),
      class: 'paginator__item paginator__item-with-arrow',
      append: $('<i>', {
        class: 'paginator__arrow',
        text: 'arrow_' + (isForward ? 'forward' : 'backward')
      })
    });
  }

  _buildPageNum(num, href, current) {
    if (num === current)
      return $('<span>', {
        class: 'paginator__item paginator__current',
        text: num
      });
    return $('<a>', {
      href: href + num,
      text: num,
      class: 'paginator__item',
    });
  }

  _buildThreeDot() {
    return $('<span>', {
      class: 'paginator__item',
      text: '...'
    });
  }

  _preparePageNums(page, count) {
    let pages = [];
    if (count < 6) {
      for (let i = 1; i <= count; i++)
        pages.push(i);
    } else {
      pages.push(1);
      if (page !== 1) {
        pages.push(page - 1);
      } else {
        pages.push(2)
        pages.push(3);
        if (page !== count) {
          pages.push(page + 1);
        } else {
          pages.push(count - 1)
          pages.push(count - 2);
        }
      }
      pages.push(count);
    }
    return [...new Set(pages)];
  }

  static initAll(selector = '.js-paginator') {
    $(selector).each((_, element) => new Paginator().init($(element), {}))
  }
}

export default Paginator;

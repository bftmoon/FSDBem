class Paginator {
  static init($element, { page = 1, count = 15, href = 'mock-address' }) {
    const items = [];
    if (page > 1) items.push(Paginator.buildArrow(page, href, false));

    const pageNums = Paginator.preparePageNums(page, count);
    pageNums.forEach((pageNum, index) => {
      if (Paginator.checkIsThreeDotsRequired(index, pageNum, pageNums)) {
        items.push(Paginator.buildThreeDot());
      }
      items.push(Paginator.buildPageNum(pageNum, href, page));
    });

    if (page < count) items.push(Paginator.buildArrow(page, href, true));
    $element.prepend(Paginator.buildPaginator(items));
  }

  static checkIsThreeDotsRequired(index, pageNum, pageNums) {
    return index > 0 && (pageNum - pageNums[index - 1]) > 1;
  }

  static buildPaginator(items) {
    return $('<div>', {
      class: 'paginator__pages',
      append: items,
    });
  }

  static buildArrow(page, href, isForward) {
    return $('<a>', {
      href: href + (page + (isForward ? 1 : -1)),
      class: 'paginator__item paginator__item_with-arrow',
      append: $('<div>', {
        class: `paginator__arrow${isForward ? '' : '_backward'}`,
      }),
    });
  }

  static buildPageNum(num, href, current) {
    if (num === current) {
      return $('<span>', {
        class: 'paginator__item paginator__current',
        text: num,
      });
    }
    return $('<a>', {
      href: href + num,
      text: num,
      class: 'paginator__item',
    });
  }

  static buildThreeDot() {
    return $('<span>', {
      class: 'paginator__item',
      text: '...',
    });
  }

  static preparePageNums(page, count) {
    const pages = [];
    if (count < 6) {
      for (let i = 1; i <= count; i += 1) pages.push(i);
    } else {
      pages.push(1);
      if (page !== 1) {
        pages.push(page - 1);
      } else {
        pages.push(2);
        pages.push(3);
        if (page !== count) {
          pages.push(page + 1);
        } else {
          pages.push(count - 1);
          pages.push(count - 2);
        }
      }
      pages.push(count);
    }
    return [...new Set(pages)];
  }

  static initDefault({ selector = '.js-paginator', parent = document, options = {} }) {
    Paginator.init($(parent.querySelector(selector)), options);
  }
}

export default Paginator;

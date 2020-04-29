let Pagination = {
  code: '',
  hideClass: 'hidden',

  setParams: function (data) {
    data = data || {};
    Pagination.size = data.size || 150;
    Pagination.page = data.page || 1;
    Pagination.step = data.step || 3;
    Pagination.clickListener = data.clickListener || function (page){return ''};
  },

  updateDescription: function(){
    Pagination.parent.nextSibling.innerText = Pagination.clickListener(Pagination.page)
  },

  addNumberPages: function (firstPage, lastPage) {
    for (let i = firstPage; i < lastPage; i++) {
      Pagination.code += '<a>' + i + '</a>';
    }
  },

  addCollapseAndLast: function () {
    Pagination.code += '<a>...</a><a>' + Pagination.size + '</a>';
  },

  addCollapseAndFirst: function () {
    Pagination.code += '<a>1</a><a>...</a>';
  },

  checkAndHideArrows: function (newPage, oldPage) {
    if (newPage === 1) {
      Pagination.left.classList.add(Pagination.hideClass)
    } else if (newPage === Pagination.size) {
      Pagination.right.classList.add(Pagination.hideClass)
    }
    if (oldPage === 1) {
      Pagination.left.classList.remove(Pagination.hideClass)
    } else if (oldPage === Pagination.size) {
      Pagination.right.classList.remove(Pagination.hideClass)
    }
  },

  onNumberPageClick: function () {
    let newPage = +this.innerHTML;
    if (Pagination.page !== newPage) {
      Pagination.checkAndHideArrows(newPage, Pagination.page);
      Pagination.page = newPage;
      Pagination.fillNumberPages();
    }
    Pagination.updateDescription();
  },

  onLeftClick: function () {
    Pagination.checkAndHideArrows(Pagination.page - 1, Pagination.page)
    Pagination.page--;
    Pagination.fillNumberPages();
    Pagination.updateDescription();
  },

  onRightClick: function () {
    Pagination.checkAndHideArrows(Pagination.page + 1, Pagination.page)
    Pagination.page++;
    Pagination.fillNumberPages();
    Pagination.updateDescription();
  },

  bindNumberPages: function () {
    let a = Pagination.numParent.getElementsByTagName('a');
    for (let i = 0; i < a.length; i++) {
      if (+a[i].innerHTML === Pagination.page) a[i].className = 'current';
      a[i].addEventListener('click', (Pagination.onNumberPageClick), false);
    }
  },

  Finish: function () {
    Pagination.numParent.innerHTML = Pagination.code;
    Pagination.code = '';
    Pagination.bindNumberPages();
  },

  fillNumberPages: function () {
    if (Pagination.size < Pagination.step * 2 + 6) {
      Pagination.addNumberPages(1, Pagination.size + 1);
    } else if (Pagination.page < Pagination.step * 2 + 1) {
      Pagination.addNumberPages(1, Pagination.step * 2 + 2);
      Pagination.addCollapseAndLast();
    } else if (Pagination.page > Pagination.size - Pagination.step * 2) {
      Pagination.addCollapseAndFirst();
      Pagination.addNumberPages(Pagination.size - Pagination.step * 2, Pagination.size + 1);
    } else {
      Pagination.addCollapseAndFirst();
      Pagination.addNumberPages(Pagination.page - Pagination.step, Pagination.page + Pagination.step + 1);
      Pagination.addCollapseAndLast();
    }
    Pagination.Finish();
  },

  setOnLeftRightClick: function (parent) {
    let nav = parent.getElementsByTagName('a');
    nav[0].addEventListener('click', Pagination.onLeftClick, false);
    nav[1].addEventListener('click', Pagination.onRightClick, false);
    Pagination.left = nav[0];
    Pagination.right = nav[1];
  },

  createChilds: function (numParent) {
    let html = [
      '<a class="arrow' + (Pagination.page === 1 ? ' hidden' : '') + '"><i class="material-icons">arrow_backward</i></a>',
      '<span></span>',
      '<a class="arrow' + (Pagination.page === Pagination.size ? ' hidden' : '') + '"><i class="material-icons">arrow_forward</i></a>',
    ];

    numParent.innerHTML = html.join('');
    Pagination.numParent = numParent.getElementsByTagName('span')[0];
    Pagination.setOnLeftRightClick(numParent);
  },

  initPaginator: function (parent, data) {
    Pagination.parent = parent;
    Pagination.setParams(data);
    Pagination.createChilds(parent);
    Pagination.fillNumberPages();
    Pagination.updateDescription();
  }
};

function init({selector='.paginator', size = 15, page = 1, clickListener}) {
  document.addEventListener('DOMContentLoaded', () => {
    Pagination.initPaginator(document.querySelector(selector+' .paginator__pages'), {
      size: size,
      page: page,
      step: 1,
      clickListener: clickListener
    });
  }, false);
}

export {init};

//todo: block click on ...

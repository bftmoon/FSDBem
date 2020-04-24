class DropdownMenu {
  constructor(countersData, {changesListener = this._defaultChangesListener, initTitle = 'Menu'}) {
    this.countersData = countersData; // [{name, count}]
    this._changesListener = changesListener; // (countersData)=>{}
    this._initTitle = initTitle;
  }

  init(
    {
      parentSelector = '.dropdown-menu',
      isClosed = true,
      withCancel = false,
      withConfirm = false,
    }
  ) {
    this._menu = document.querySelector(parentSelector)
    let menuHeader = this._menu.firstChild;
    let menuTitle = menuHeader.firstChild;
    let menuContent = this._menu.lastChild;

    menuTitle.textContent = this._initTitle;
    menuHeader.addEventListener('click', () => {
      menuContent.hidden = !menuContent.hidden;
      menuHeader.classList.toggle('dropdown-header-opened');
    });
    if (!isClosed) {
      menuHeader.classList.add('dropdown-header-opened')
    }

    let list = [];
    this.countersData.forEach((el, i) => {
      list.push(this._buildItem(el, i))
    });

    menuContent.firstChild.before(...list);
    menuContent.hidden = isClosed;

    this._initMenuButtons(withCancel, withConfirm);
  }

  _buildItem(el, i) {
    // <div class="dropdown-item">
    const listItem = `
          <h3>${el.name}</h3>
          <span class="dropdown-counter">
            <button ${el.count === 0 ? 'disabled' : ''}>-</button>
            <h3 class="count">${el.count}</h3>
            <button>+</button>
          </span>
    `.replace(/>\s+</g, '><');
    // </div>

    let item = document.createElement('div')
    item.classList.add("dropdown-item");
    item.innerHTML = listItem;

    let counter = item.querySelector('.dropdown-counter');
    this._setCounterListeners(counter, i);
    return item;
  }

  _setIncrementListener(decrement, increment, countText, i) {
    increment.addEventListener('click', (ev) => {
      let currentItem = this.countersData[i];
      currentItem.count++;
      countText.innerText = currentItem.count;
      this._updateHeader();
      if (currentItem.count === 1) {
        decrement.disabled = false;
      }
    })
  }

  _setCounterListeners(counter, i) {
    let [decrement, countText, increment] = counter.children;
    this._setIncrementListener(decrement, increment, countText, i);
    this._setDecrementListener(decrement, countText, i);
  }

  _setDecrementListener(decrement, countText, i) {
    decrement.addEventListener('click', (ev) => {
      let currentItem = this.countersData[i];
      currentItem.count--;
      countText.innerText = currentItem.count;
      this._updateHeader();
      if (currentItem.count === 0) {
        ev.target.disabled = true;
      }
    })
  }

  _initMenuButtons(withCancel, withConfirm) {
    if (withCancel) {
      let cancelButton = this._menu.querySelector('.dropdown-cancel');
      cancelButton.hidden = false;
      cancelButton.addEventListener('click', () => {
        this._clear()
      });
    }
    if (withConfirm) {
      let confirmButton = this._menu.querySelector('.dropdown-confirm');
      confirmButton.hidden = false;
      confirmButton.addEventListener('click', () => {
        this._confirm()
      });
    }
  }

  _updateHeader() {
    this._menu.firstChild.firstChild.innerText = this._changesListener(this.countersData);
  }

  _clear() {
    this.countersData.forEach(el => {
      el.count = 0;
    })
    this._menu.querySelectorAll('.dropdown-counter').forEach(el => {
      el.firstChild.disabled = true;
      el.firstChild.nextSibling.innerText = '0';
    })
    this._menu.firstChild.firstChild.innerText = this._initTitle;
  }

  _confirm() {
    this._menu.lastChild.hidden = true;
  }

  _defaultChangesListener(data) {
    let summary = [];
    data.forEach(el => {
      summary.push(el.count + ' ' + el.name)
    })
    return summary.join(', ');
  }
}

export {DropdownMenu};

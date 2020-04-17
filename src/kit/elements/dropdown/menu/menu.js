class DropdownMenu {
  constructor(countersData, {changesListener = this._defaultChangesListener, initTitle = 'Menu'}) {
    this.countersData = countersData;
    this._changesListener = changesListener;
    this._initTitle = initTitle;
  }

  init(
    {
      parentSelector = '.dropdown-menu',
      initTitle = 'Menu',
      isClosed = true,
      withCancel = false,
      withConfirm = false,
    }
  ) {
    this._menu = document.querySelector(parentSelector)
    let menuHeader = this._menu.firstChild;
    let menuTitle = menuHeader.firstChild;
    let menuContent = this._menu.lastChild;

    menuTitle.textContent = initTitle;
    menuHeader.addEventListener('click', () => menuContent.hidden = !menuContent.hidden);

    let list = [];
    this.countersData.forEach((el, i) => {
      list.push(this._buildItem(el, i))
    });

    menuContent.append(...list);
    menuContent.hidden = isClosed;

    this._initMenuButtons(withCancel, withConfirm);
  }

  _buildItem(el, i) {
    const listItem = `
<!--        <div class="dropdown-item">-->
          <span class="dropdown-item-name">${el.name}</span>
          <span class="dropdown-counter">
            <button ${el.count===0?'disabled':''}>-</button>
            <span class="count">${el.count}</span>
            <button>+</button>
          </span>
<!--        </div>-->
    `.replace(/>\s+</g, '><');
    console.log(listItem)

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
    console.log(decrement, countText)
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
      cancelButton.addEventListener('click', ()=>{this._clear()});
    }
    if (withConfirm) {
      let confirmButton = this._menu.querySelector('.dropdown-confirm');
      confirmButton.hidden = false;
      confirmButton.addEventListener('click', ()=>{this._confirm()});
    }
  }

  _updateHeader() {
    this._menu.firstChild.firstChild.innerText = this._changesListener(this.countersData);
  }

  _clear() {
    this.countersData.forEach(el => {
      el.count = 0;
    })
    this._menu.querySelectorAll('.count').forEach(el => {
      el.innerText = '0';
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

new DropdownMenu([{name: 'Hi', count: 8}, {name: 'Hi', count: 8}], {}).init({
  isClosed: false,
  withConfirm: true,
  withCancel: true
});

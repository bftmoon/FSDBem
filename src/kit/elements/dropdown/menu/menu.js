class DropdownMenu {
  // countersData;
  // _changesListener;
  // _initTitle;
  // _menu;

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
      list.push(this._buildItem(menuTitle, el, i))
    });

    menuContent.append(...list);
    menuContent.hidden = isClosed;

    this._buildMenuButtons(withCancel, withConfirm);
  }


  _buildItem(menuTitle, el, i) {
    let item = document.createElement('div')
    let itemName = document.createElement('span')
    itemName.innerText = el.name;

    item.append(itemName, this._buildCounter(menuTitle, el, i));
    return item;
  }

  _buildCounter(head, el, i) {
    let counter = document.createElement('span');
    let counterText = document.createElement('span');

    counterText.classList.add('count')
    counterText.innerText = el.count;
    counter.append(
      this._createDecrement(head, i, counterText),
      counterText,
      this._createIncrement(head, i, counterText)
    );
    return counter
  }

  _buildMenuButtons(withCancel, withConfirm) {
    if (withCancel) {
      let cancelButton = this._menu.querySelector('.dropdown-menu-cancel');
      cancelButton.hidden = false;
      cancelButton.addEventListener('click', this._clearCounts);
    }
    if (withConfirm) {
      let confirmButton = this._menu.querySelector('.dropdown-menu-confirm');
      confirmButton.hidden = false;
      confirmButton.addEventListener('click', this._confirm);
    }
  }

  _clearCounts() {
    this.countersData.forEach(el => {
      el.count = 0;
    })
    this._menu.querySelectorAll('.count').forEach(el => {
      el.innerText = '0';
    })
  }

  _confirm() {
    this._menu.hidden = true;
  }

  _createDecrement(head, i, counterText) {
    let decrement = document.createElement('button');
    decrement.innerHTML = '-'
    decrement.addEventListener('click', (ev) => {
      let currentItem = this.countersData[i];
      if (currentItem.count > 0) {
        currentItem.count--;
        counterText.innerText = currentItem.count;
        head.innerText = this._changesListener(this.countersData)
      } else {
        ev.target.disabled = true;
      }
    })
    return decrement;
  }

  _createIncrement(head, i, counterText) {
    let increment = document.createElement('button');
    increment.innerHTML = '+'
    increment.addEventListener('click', () => {
      if (this.countersData[i] === 0) {

      }
      this.countersData[i].count++;
      counterText.innerText = this.countersData[i].count;
      head.innerText = this._changesListener(this.countersData)
    })
    return increment;
  }

  _defaultChangesListener(data) {
    let summary = [];
    data.forEach(el => {
      summary.push(el.count + ' ' + el.name)
    })
    return summary.join(', ');
  }
}

new DropdownMenu([{name: 'Hi', count: 8}, {name: 'Hi', count: 8}], {}).init({isClosed: false});

let listItem = `
  <div class="dropdown-item">
    <span class="dropdown-item-name"></span>
    <span class="dropdown-counter">
      <button>-</button>
      <span></span>
      <button>+</button>
    </span>
  </div>
   `;

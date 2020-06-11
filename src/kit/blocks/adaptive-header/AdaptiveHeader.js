import Sidebar from '../sidebar';
import Header from '../header';

class AdaptiveHeader {
  createForParent(parent) {
    this._sidebar = Sidebar.createDefault({ parent });
    Header.initDefault({
      parent,
      menuButtonClickListener: this.handleMenuButtonClick.bind(this),
    });
  }

  handleMenuButtonClick() {
    this._sidebar.open();
  }

  static initDefault() {
    new AdaptiveHeader().createForParent(document);
  }
}

export default AdaptiveHeader;

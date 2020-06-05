import Expander from "../expander";

class ExpandableCheckboxes {
  static initAll({selector='.js-expandable-checkboxes', parent=document}){
    parent.querySelectorAll(selector).forEach((element)=>Expander.initDefault({parent: element}));
  }
}
export default ExpandableCheckboxes;

import FloatButton from "../../../kit/blocks/float-button/FloatButton";
import Expander from "../../../kit/blocks/expander/Expander";

FloatButton.initDefault({
  elementSelector: '.js-search-page__configuration',
  toggleClass: 'search-page__configuration_opened'
});

Expander.initDefault({controlledSelector:'.js-search-page__config-content'});

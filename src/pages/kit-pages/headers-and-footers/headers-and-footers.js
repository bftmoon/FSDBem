import AdaptiveHeader from '@blocks/adaptive-header';
import '@blocks/footer';
import '@blocks/kit-header';
import '@blocks/simple-footer';
import '../layout/layout';
import './headers-and-footers.scss';

$('.js-header-and-footers__header').each((__, element) => {
  new AdaptiveHeader().createForParent(element);
});

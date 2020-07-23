import '@blocks/footer';
import '@blocks/kit-header';
import '../layout/layout';
import './headers-and-footers.scss';
import Header from "@blocks/header";

Header.initDefault({parent: document.querySelector('.js-header-and-footers__anonim-header')})
Header.initDefault({parent: document.querySelector('.js-header-and-footers__logged-header')})

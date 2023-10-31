import * as model from './model';
import swiperView from './views/swiperView';
import paginationView from './views/paginationView';

// FIXME: IMPLEMENT ERROR HANDLING

class Controller {
  constructor() {
    this.init();
  }

  async controlPagination(pageLimit, goToPage) {
    // 1) Get Href for http request and pagination params
    const currentHref = window.location.href;

    // 2) Send data to server for http request
    await model.loadSearchResultsPage(currentHref, pageLimit, goToPage);

    // 3) Render NEW results
    paginationView.render(model.state.search);
  }

  async init() {
    await model.getMetadata();
    paginationView.addHandlerClick(this.controlPagination, model.state.search);
    swiperView.initSwiper();
  }
}

// if (this.swipers) swiperView.initSwiper(this.swipers);
// if (this.paginationBtns) {
//   paginationView.handlePagination(this.paginationBtns);
// }

// eslint-disable-next-line no-unused-vars
const controller = new Controller();

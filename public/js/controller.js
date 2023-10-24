import { LOCAL_SERVER, NEWS_API, HOTEL_API } from './settings';
import pageView from './views/pageView';
import navbarView from './views/navbarView';
import swiperView from './views/swiperView';
import model from './model';
import Swiper from 'swiper';

// TODO: Implement a sub-controller for each page

class Controller {
  _pageName;
  _initialPage = 'homePage';

  constructor() {
    window.addEventListener('hashchange', this._navigate);
    this._navigate();
  }

  _loadPage = async () => {
    // 1) Fetch Page from url
    const pageContent = await model.fetchData(`${this._pageName}.html`);

    window.scrollTo({ top: 0, behavior: 'instant' });

    // 2) Add content to the Page
    pageView.render(pageContent);

    // 3) Render specific page
    this._pageMapping[this._pageName]();
  };

  _navigate = () => {
    this._pageName = location.hash.replace('#/', '') || this._initialPage;
    this._loadPage(this._pageName);
  };

  async renderHomePage() {
    // 1) Fetch News data
    const news = await model.fetchData(`${NEWS_API}`, true);

    swiperView.setParentElement(pageView._parentElement);
    swiperView.render(news.data);
    swiperView._handleSwiper();
  }

  // TODO: Implement mapping for the rest of the pages
  _pageMapping = {
    homePage: this.renderHomePage,
  };
}

const controller = new Controller();

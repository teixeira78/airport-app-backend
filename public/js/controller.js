import { LOCAL_SERVER, NEWS_API, HOTEL_API } from './settings';
import pageView from './views/pageView';
import navbarView from './views/navbarView';
import swiperView from './views/swiperView';
import model from './model';

class Controller {
  _pageName;
  initialPage = 'homePage';

  constructor() {
    window.addEventListener('hashchange', this._navigate);
    this._navigate();
  }

  _loadPage = async () => {
    // 1) Fetch Page from url
    const pageContent = await model.fetchData(`${this._pageName}.html`);

    console.log(pageContent);

    // 2) Render Page
    // pageView.render(pageContent);

    this.renderSwiper();

    this._pageMapping[this._pageName]();
  };

  _navigate = () => {
    this._pageName = location.hash.replace('#/', '') || this._initialPage;
    this._loadPage(this._pageName);
  };

  renderSwiper = () => {
    // 1) Return if swiper container does not exist
    if (!swiperView.checkSwiperExistence(pageView._parentElement)) return;

    // 2) Initialize Swiper
    swiperView.initializeSwiper();
  };

  async renderHomePage() {
    console.log('rendering Home ...');
    const news = await model.fetchData(`${LOCAL_SERVER}/${NEWS_API}`, true);
    console.log(`here`, news);
  }

  _pageMapping = {
    homePage: this.renderHomePage,
  };
}

const controller = new Controller();

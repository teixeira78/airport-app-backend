import View from './Views';

// TODO - USE EVENET EMITTER
class NewsView extends View {
  _pageLimit = 5;

  pageStats = {};

  initPageData(pageInfo) {
    if (!pageInfo.newsType) return;

    const currentNewsType = pageInfo.newsType;

    const newsStats = pageInfo.newsData.find(
      (el) => el.type === currentNewsType,
    );

    this.pageStats = {
      count: newsStats.count,
      limit: this._pageLimit,
      currPage: pageInfo.page,
    };

    return this.pageStats;
  }

  _generateMarkup() {
    // Generate and return markup for rendering news items
    const html = this._data.results.map(
      (news) => `
          <a href="${news.slug}" class="col-xl-12 col-md-6 col-sm-12"> 
            <div class="news-box row"> 
              <div class="col-6">
                <div class="news-description">
                  <p class="news-title--mini"> ${news.title} </p>
                  <p class="publish-date mt-3">${news.publishDate}</p>
                </div>
              </div>
              <div class="col-6">
                <div class="news-box-img--container">
                  <img class="news-box-img" src="/images/news/${news.coverImg}.jpg" alt="${news.title}"/>
                </div>
              </div>
            </div>
          </a>`,
    );

    return html.join('');
  }
}

export default new NewsView();

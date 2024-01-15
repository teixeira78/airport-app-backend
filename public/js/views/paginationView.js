import View from './Views';

// FIXME: Pagination button not working properly on mobile;

// TODO - Separate logic. Make Pagination reusable and create a view just for News

class PaginationView extends View {
  // DOM elements for pagination
  _parentElement = document.querySelector('.news-side-nav--preview');

  _paginationbtn = document.querySelector('.pagination-buttons');

  _btnNext = document.querySelector('.btn-pagination--next');

  _btnPrev = document.querySelector('.btn-pagination--previous');

  // Number of news items to display per page
  _pageLimit = 5;

  addHandlerClick(handler) {
    // 1) Exit the function if no pagination buttons are present
    if (!this._paginationbtn) return;

    console.log(this._paginationbtn);

    // this.currentNewsType = pageData.newsType;

    // const newsStats = pageData.newsData.find(
    //   (el) => el.type === this.currentNewsType,
    // );

    // this.newsCount = newsStats.count;

    // Store the current page and calculate the total number of pages
    // this._currentPage = pageData.currPage;
    // this.numPages = Math.ceil((pageData.count - 1) / pageData.limit);

    // Configure the initial state of pagination buttons
    // this.configPaginationButtons();

    // 2) Listen for click event
    // this._paginationbtn.addEventListener('click', (e) => {
    // Find the clicked button element
    // const clickedBtn = e.target.closest('.btn-pagination');
    // if (!clickedBtn) return;
    // Update the current page based on the button clicked
    // this._currentPage += clickedBtn.classList.contains('btn-pagination--next')
    //   ? 1
    //   : -1;
    // 3) Invoke the provided handler with updated page and limit information
    // handler(pageData.limit, this._currentPage);
    // });
  }

  configPaginationButtons() {
    const isFirstPage = this._currentPage === 1;

    // Check if current page is last and there is more than 1 page
    const isLastPage = this._currentPage === this.numPages && this.numPages > 1;

    // Page 1
    this._btnPrev.classList.toggle('disabled', isFirstPage);

    this._btnPrev.classList.toggle(
      'hidden',
      isFirstPage && this.numPages === 1,
    );

    this._btnNext.classList.toggle(
      'hidden',
      isFirstPage && this.numPages === 1,
    );

    // Pages between the first and last
    this._btnPrev.classList.toggle('enabled', !isFirstPage);

    // Also enables btnNext on first page, isLastPage = false on page 1
    this._btnNext.classList.toggle('enabled', !isLastPage);

    // Last page
    this._btnNext.classList.toggle('disabled', isLastPage);
  }

  _generateMarkup() {
    // Configure the state of pagination buttons
    this.configPaginationButtons();

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

export default new PaginationView();

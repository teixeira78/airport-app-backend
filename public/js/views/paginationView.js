import View from './Views';

class PaginationView extends View {
  // DOM elements for pagination
  _parentElement = document.querySelector('.news-side-nav--preview');

  _paginationbtn = document.querySelector('.pagination-buttons');

  _btnNext = document.querySelector('.btn-pagination--next');

  _btnPrev = document.querySelector('.btn-pagination--previous');

  // Number of news items to display per page
  _pageLimit = 5;

  addHandlerClick(handler, pageData) {
    // 1) Exit the function if no pagination buttons are present
    if (!this._paginationbtn) return;

    // Store the current page and calculate the total number of pages
    this._currentPage = pageData.page;
    this.numPages = Math.ceil((pageData.newsCount - 1) / this._pageLimit);

    // Configure the initial state of pagination buttons
    this.configPaginationButtons();

    // 2) Listen for click event
    this._paginationbtn.addEventListener('click', (e) => {
      // Find the clicked button element
      const clickedBtn = e.target.closest('.btn-pagination');
      if (!clickedBtn) return;

      // Update the current page based on the button clicked
      this._currentPage += clickedBtn.classList.contains('btn-pagination--next')
        ? 1
        : -1;

      // 3) Invoke the provided handler with updated page and limit information
      handler(this._pageLimit, this._currentPage);
    });
  }

  configPaginationButtons() {
    // Page 1, with more pages available
    if (this._currentPage === 1 && this.numPages > 1) {
      this._btnPrev.classList.add('disabled');
      this._btnNext.classList.add('enabled');
    }

    // Page 1, with no additional pages
    if (this._currentPage === 1 && this.numPages === 1) {
      this._btnPrev.classList.add('hidden');
      this._btnNext.classList.add('hidden');
    }

    // Pages between the first and last
    if (this._currentPage > 1 && this._currentPage < this.numPages) {
      this._btnPrev.classList.replace('disabled', 'enabled');
      this._btnNext.classList.replace('disabled', 'enabled');
    }

    // Last page, with more than one page in total
    if (this._currentPage === this.numPages && this.numPages > 1) {
      this._btnNext.classList.add('disabled');
    }
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

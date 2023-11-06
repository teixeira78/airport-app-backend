const $93068cd354048e55$export$6edd75dba255d47c = `http://127.0.0.1:8000`;
const $93068cd354048e55$export$5b9cf06580b74957 = `api/v1/metadata`;


const $eef87f1cfb0bade6$export$ca000e230c0caa3e = {
    search: {
        page: 1
    }
};
const $eef87f1cfb0bade6$export$8548546c0aa631e6 = async function() {
    try {
        // 1) Send HTTP request for metadata
        const response = await fetch(`${(0, $93068cd354048e55$export$6edd75dba255d47c)}/${(0, $93068cd354048e55$export$5b9cf06580b74957)}`);
        const data = await response.json();
        // 2) Asign response to state.search
        $eef87f1cfb0bade6$export$ca000e230c0caa3e.search.newsCount = data.metadata.newsCount;
    } catch (err) {
        console.log(err);
    }
};
const $eef87f1cfb0bade6$export$c6b70b628aa585b0 = async function(currentHref, limit, page = $eef87f1cfb0bade6$export$ca000e230c0caa3e.search.page) {
    try {
        $eef87f1cfb0bade6$export$ca000e230c0caa3e.search.page = page;
        // 1) Send HTTP request to server with params for pagination
        const apiUrl = `${currentHref}?page=${page}&limit=${limit}`;
        const response = await fetch(apiUrl, {
            headers: {
                Accept: "application/json"
            }
        });
        const data = await response.json();
        // 2) Assign store data into state object
        $eef87f1cfb0bade6$export$ca000e230c0caa3e.search.results = data.news;
        // 3)
        return data;
    } catch (err) {
        console.log(err);
    }
};


/* eslint-disable no-undef */ // FIXME: LEFT SWIPPER SHOULD BE STARTING FROM LAST CARD
class $f510c7f00c68230c$var$SwiperView {
    swipers = document.querySelectorAll(".swiper");
    initSwiper() {
        if (!this.swipers) return;
        this.swipers.forEach((swiper)=>{
            this.swiperScrollbar = swiper.querySelector(".swiper-scrollbar");
            this.swiperPosition = swiper.classList.contains("right-swiper") ? "right" : "left";
            this.handleSwiper(swiper);
        });
    }
    handleSwiper(swiper) {
        this.swiperContainer = new Swiper(swiper, {
            direction: "horizontal",
            centeredSlides: true,
            initialSlide: 0,
            grabCursor: true,
            spaceBetween: 30,
            slidesPerView: "auto",
            scrollbar: {
                el: this.swiperScrollbar,
                draggable: true,
                dragSize: "auto"
            },
            breakpoints: {
                575: {
                    spaceBetween: 30,
                    slidesPerView: 2
                },
                768: {
                    spaceBetween: 100,
                    slidesPerGroup: 2
                },
                992: {
                    spaceBetween: 30,
                    slidesPerView: "auto",
                    slidesPerGroup: 1,
                    centeredSlides: false
                }
            }
        });
    }
}
var $f510c7f00c68230c$export$2e2bcd8739ae039 = new $f510c7f00c68230c$var$SwiperView();


class $f2fc15954219e5db$export$2e2bcd8739ae039 {
    _data;
    render(data) {
        // 1) Exit the function if data is null
        if (!data) return;
        this._data = data;
        console.log(this._data);
        // 2)
        const markup = this._generateMarkup();
        // 3) Clear parent Element before inserting HTML
        this.clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }
    clear() {
        this._parentElement.innerHTML = "";
    }
}


// FIXME: Pagination button not working properly on mobile;
class $5548e641de1782a7$var$PaginationView extends (0, $f2fc15954219e5db$export$2e2bcd8739ae039) {
    // DOM elements for pagination
    _parentElement = document.querySelector(".news-side-nav--preview");
    _paginationbtn = document.querySelector(".pagination-buttons");
    _btnNext = document.querySelector(".btn-pagination--next");
    _btnPrev = document.querySelector(".btn-pagination--previous");
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
        this._paginationbtn.addEventListener("click", (e)=>{
            // Find the clicked button element
            const clickedBtn = e.target.closest(".btn-pagination");
            if (!clickedBtn) return;
            // Update the current page based on the button clicked
            this._currentPage += clickedBtn.classList.contains("btn-pagination--next") ? 1 : -1;
            // 3) Invoke the provided handler with updated page and limit information
            handler(this._pageLimit, this._currentPage);
        });
    }
    configPaginationButtons() {
        // Page 1, with more pages available
        if (this._currentPage === 1 && this.numPages > 1) {
            this._btnPrev.classList.add("disabled");
            this._btnNext.classList.add("enabled");
        }
        // Page 1, with no additional pages
        if (this._currentPage === 1 && this.numPages === 1) {
            this._btnPrev.classList.add("hidden");
            this._btnNext.classList.add("hidden");
        }
        // Pages between the first and last
        if (this._currentPage > 1 && this._currentPage < this.numPages) {
            this._btnPrev.classList.replace("disabled", "enabled");
            this._btnNext.classList.replace("disabled", "enabled");
        }
        // Last page, with more than one page in total
        if (this._currentPage === this.numPages && this.numPages > 1) this._btnNext.classList.add("disabled");
    }
    _generateMarkup() {
        // Configure the state of pagination buttons
        this.configPaginationButtons();
        // Generate and return markup for rendering news items
        const html = this._data.results.map((news)=>`
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
      </a>`);
        return html.join("");
    }
}
var $5548e641de1782a7$export$2e2bcd8739ae039 = new $5548e641de1782a7$var$PaginationView();


// TODO: IMPLEMENT ERROR HANDLING
// TODO: ADD NAVBAR VIEW FOR STICKY NAV
class $2d2b23bb420541fa$var$Controller {
    constructor(){
        this.init();
    }
    async controlPagination(pageLimit, goToPage) {
        // 1) Get Href for http request and pagination params
        const currentHref = window.location.href;
        // 2) Send data to server for http request
        await $eef87f1cfb0bade6$export$c6b70b628aa585b0(currentHref, pageLimit, goToPage);
        // 3) Render NEW results
        (0, $5548e641de1782a7$export$2e2bcd8739ae039).render($eef87f1cfb0bade6$export$ca000e230c0caa3e.search);
    }
    async init() {
        await $eef87f1cfb0bade6$export$8548546c0aa631e6();
        (0, $5548e641de1782a7$export$2e2bcd8739ae039).addHandlerClick(this.controlPagination, $eef87f1cfb0bade6$export$ca000e230c0caa3e.search);
        (0, $f510c7f00c68230c$export$2e2bcd8739ae039).initSwiper();
    }
}
// eslint-disable-next-line no-unused-vars
const $2d2b23bb420541fa$var$controller = new $2d2b23bb420541fa$var$Controller();


//# sourceMappingURL=bundle.js.map

import View from './View';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.mjs';
import { Scrollbar } from 'swiper/modules';

// TODO: Add second swiper to the page
// TODO: Add :id to cards and event listener on 'CLICK'

class SwiperView extends View {
  _swiper;
  _scrollBar;

  setParentElement(parentEl) {
    this._parentElement = parentEl.querySelector('.swiper');
    this._scrollBar = parentEl.querySelector('.swiper-scrollbar');
  }

  // initializeSwiper(direction) {
  // this._swiper = document.querySelector(`.${direction}-swiper`);
  //   this._swiper.forEach((swiperEl) => {
  //     const swiperWrapper = this._findSwiperWrapper(swiperEl);
  //     const cardCount = this._countCardInSwiper(swiperWrapper);
  //     const swiperDirection = swiperEl.classList[1];
  //     this._handleSwiper(swiperEl, cardCount, swiperDirection);
  //   });
  // }

  // _findSwiperWrapper(swiperEl) {
  //   return swiperEl.querySelector('.swiper-wrapper');
  // }

  // _countCardInSwiper(swiperWrapper) {
  //   if (!swiperWrapper) return 0;

  //   const cards = swiperWrapper.querySelectorAll('.card');
  //   return cards.length;
  // }

  // FIXME: Scroll bar not showing after card is rendered
  _handleSwiper() {
    console.log(this._scrollBar);
    const swiper = new Swiper(this._parentElement, {
      modules: [Scrollbar],
      slidesPerView: 'auto',
      // sliderPerGroup: 4,
      centeredSlides: false,
      spaceBetween: 30,
      initialSlide: 0,
      grabCursor: true,
      scrollbar: {
        el: this._scrollBar,
        draggable: true,
        dragSize: 'auto',
      },
    });
  }

  _generateMarkup() {
    return `<div class="swiper-wrapper">
    ${this._renderNewsCard()}
    </div>`;
  }

  // TODO: Implement truncateText to limit length of news.content
  _renderNewsCard() {
    return this._data
      .map((news) => {
        return `
      <div class="swiper-slide card">
        <img src="../images/carousel-1.jpg" class="card-img-top" alt="..." />
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${news.title}</h5>
          <p class="card-text">
           ${news.content}
          </p>
        </div>
      </div>
   
      `;
      })
      .join('');
  }
}

export default new SwiperView();

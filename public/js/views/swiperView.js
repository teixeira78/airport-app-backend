import View from './View';
// core version + navigation, pagination modules:
import Swiper from 'swiper';
// import "swiper/swiper-bundle.min.mjs";
import 'swiper/swiper-bundle.mjs';

class SwiperView extends View {
  _swiperExists = true;
  _swiper;

  checkSwiperExistence(contentContainer) {
    this._swiper = contentContainer.querySelectorAll('.swiper');

    if (this._swiper.length > 0) return true;
    return false;
  }

  initializeSwiper() {
    this._swiper.forEach((swiperEl) => {
      const swiperWrapper = this._findSwiperWrapper(swiperEl);
      const cardCount = this._countCardInSwiper(swiperWrapper);
      const swiperDirection = swiperEl.classList[1];
      this._handleSwiper(swiperEl, cardCount, swiperDirection);
    });
  }

  _findSwiperWrapper(swiperEl) {
    return swiperEl.querySelector('.swiper-wrapper');
  }

  _countCardInSwiper(swiperWrapper) {
    if (!swiperWrapper) return 0;

    const cards = swiperWrapper.querySelectorAll('.card');
    return cards.length;
  }

  _handleSwiper(swiperEl, cardCount, swiperDirection) {
    const initialSlide = swiperDirection === 'right-swiper' ? 0 : cardCount - 1;
    const swiper = new Swiper(swiperEl, {
      slidesPerView: 'auto',
      // sliderPerGroup: 4,
      centeredSlides: false,
      spaceBetween: 30,
      initialSlide: initialSlide,
      grabCursor: true,
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
        dragSize: 'auto',
      },
    });
  }

  _renderCard(data) {
    const template = `
    <div class="swiper-slide card">
    <img src="../images/carousel-1.jpg" class="card-img-top" alt="..." />
    <div class="card-body d-flex flex-column">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Doloribus, dolorum placeat, incidunt officiis aut unde repellendus
        quidem at quia ad quasi nam
      </p>
    </div>
    </div>
    `;
  }
}

export default new SwiperView();

/* eslint-disable no-undef */

// FIXME: LEFT SWIPPER SHOULD BE STARTING FROM LAST CARD
class SwiperView {
  swipers = document.querySelectorAll('.swiper');

  initSwiper() {
    if (!this.swipers) return;

    this.swipers.forEach((swiper) => {
      this.swiperScrollbar = swiper.querySelector('.swiper-scrollbar');
      this.swiperPosition = swiper.classList.contains('right-swiper')
        ? 'right'
        : 'left';

      this.handleSwiper(swiper);
    });
  }

  handleSwiper(swiper) {
    this.swiperContainer = new Swiper(swiper, {
      direction: 'horizontal',
      centeredSlides: true,
      initialSlide: 0,
      grabCursor: true,
      spaceBetween: 30,
      slidesPerView: 'auto',
      scrollbar: {
        el: this.swiperScrollbar,
        draggable: true,
        dragSize: 'auto',
      },
      breakpoints: {
        575: {
          spaceBetween: 30,
          slidesPerView: 2,
        },
        768: {
          spaceBetween: 100,
          slidesPerGroup: 2,
        },
        992: {
          spaceBetween: 30,
          slidesPerView: 'auto',
          slidesPerGroup: 1,
          centeredSlides: false,
        },
      },
    });
  }
}

export default new SwiperView();

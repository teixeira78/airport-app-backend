import View from './View';

class NavbarView extends View {
  _parentElement = document.querySelector('.navbar');
  _navbarHeight = this._parentElement.getBoundingClientRect().height;
  _heroSection = document.querySelector('.section-hero');

  constructor() {
    super();
    this._sectionObserver.observe(this._heroSection);
  }

  _stickyNavBar(entries) {
    const [entry] = entries;

    if (!entry.isIntersecting) {
      this._parentElement.classList.add('sticky');
    } else {
      this._parentElement.classList.remove('sticky');
    }
  }

  _sectionObserver = new IntersectionObserver(
    (entries) => {
      this._stickyNavBar(entries);
    },
    {
      root: null, // entire viewport
      threshold: 0, // When hero is completely out of view
      rootMargin: `-${this._navbarHeight}px`,
    },
  );
}

export default new NavbarView();

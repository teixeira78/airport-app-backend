import View from "./View";

class PageContentView extends View {
  _parentElement = document.querySelector(".content-container");
  _swiper = this._parentElement.querySelectorAll(".swiper");
  _markup = "";

  _generateMarkup() {
    this._markup = this._data;
    return this._markup;
  }
}

export default new PageContentView();

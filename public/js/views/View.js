export default class View {
  _data;

  render(data) {
    if (!data) return;
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);

    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
}

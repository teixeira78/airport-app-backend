export default class View {
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
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  clear() {
    this._parentElement.innerHTML = '';
  }
}

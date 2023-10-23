export class Model {
  _data;

  async fetchData(url, shouldParse = false) {
    try {
      const response = await fetch(url);
      const data = await response.text();
      return shouldParse ? JSON.parse(data) : data;
    } catch (err) {
      console.error(err);
    }
  }
}

export default new Model();

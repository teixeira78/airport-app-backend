import { LOCAL_SERVER } from './settings';

export class Model {
  _data;

  async fetchData(url, shouldParse = false) {
    try {
      const response = await fetch(`${LOCAL_SERVER}/${url}`);
      const data = await response.text();
      return shouldParse ? JSON.parse(data) : data;
    } catch (err) {
      console.error(err);
    }
  }
}

export default new Model();

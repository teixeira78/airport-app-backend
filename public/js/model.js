import { LOCAL_HOST, METADATA_ENDPOINT } from './config';

export const state = {
  search: {
    page: 1,
  },
};

export const getMetadata = async function () {
  try {
    // 1) Send HTTP request for metadata
    const response = await fetch(`${LOCAL_HOST}/${METADATA_ENDPOINT}`);
    const data = await response.json();

    // 2) Asign response to state.search
    state.search.newsData = data.metadata.newsData;
    state.search.newsType = data.metadata.newsType;
  } catch (err) {
    console.log(err);
  }
};

export const loadSearchResultsPage = async function (
  currentHref,
  limit,
  page = state.search.page,
) {
  try {
    state.search.page = page;

    // 1) Send HTTP request to server with params for pagination
    const apiUrl = `${currentHref}?page=${page}&limit=${limit}`;
    const response = await fetch(apiUrl, {
      headers: {
        Accept: 'application/json',
      },
    });
    const data = await response.json();

    // 2) Assign store data into state object
    state.search.results = data.news;

    // 3)
    return data;
  } catch (err) {
    console.log(err);
  }
};

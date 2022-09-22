const axios = require('axios').default;
const API_KEY = '30048771-b82027b1d1dd03684fe8fb9c0';
const BASE_URL = 'https://pixabay.com/api';
const QUANTITY = 40;

export default class CartApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.totalHits = 0;
  }

  async fetchCart() {
    console.log(this);

    const url = `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&language=en&per_page=${QUANTITY}&page=${this.page}`;
    try {
      const response = await axios.get(url);
      //console.log(response);
      const data = response.data;
      //console.log(data);
      this.incrementPage();

      this.totalHits = data.totalHits;
      return data.hits;
    } catch (error) {
      console.error(error);
    }
  }

  /*
  fetchCart() {
    console.log(this);

    const url = `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&language=en&per_page=${QUANTITY}&page=${this.page}`;

    return fetch(url)
      .then(r => r.json())
      .then(data => {
        this.incrementPage();
        console.log(data);
        this.totalHits = data.totalHits;
        return data.hits;
      });
  }
  */
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

//orientation - ориентация фотографии. Задай значение horizontal.
//safesearch - фильтр по возрасту. Задай значение true.

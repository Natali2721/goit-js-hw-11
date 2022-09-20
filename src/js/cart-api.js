export default class CartApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  fetchCart() {
    console.log(this);
    const API_KEY = '30048771-b82027b1d1dd03684fe8fb9c0';
    const BASE_URL = 'https://pixabay.com/api';
    const url = `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&language=en&per_page=40&page=${this.page}`;

    return fetch(url)
      .then(r => r.json())
      .then(data => {
        this.incrementPage();
        //console.log(data);
        return data.hits;
      });
  }
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

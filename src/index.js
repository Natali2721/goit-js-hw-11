import Notiflix from 'notiflix';
import CartApiService from './js/cart-api';
import './css/common.css';
import SimpleLightbox from 'simplelightbox';
const axios = require('axios').default;

//Your API key: 30048771-b82027b1d1dd03684fe8fb9c0
//https://pixabay.com/api/?key=30048771-b82027b1d1dd03684fe8fb9c0&q=yellow+flowers&image_type=photo

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};
const cartApiService = new CartApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
function onSearch(e) {
  e.preventDefault();
  cartApiService.query = e.currentTarget.elements.searchQuery.value;
  cartApiService.resetPage();
  resetMarkup(refs.gallery);
  cartApiService.fetchCart().then(appendCardsMarkup);
  Notiflix.Notify.success('Hooooray! We found 40 perfect images for you.');
}
function onLoadMore() {
  cartApiService.fetchCart().then(appendCardsMarkup);
}
function appendCardsMarkup(hits) {
  const cardMarkup = hits.map(hit => {
    return `
    <div class="photo-card">
  <img class="img" src=${hit.webformatURL} alt=${hit.tags} loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${hit.likes}
    </p>
    <p class="info-item">
      <b>Views</b>${hit.views}
    </p>
    <p class="info-item">
      <b>Comments</b>${hit.comments}
    </p>
    <p class="info-item">
<b>Downloads</b>${hit.downloads}
    </p>
  </div>
</div>`;
  });
  cardMarkup.forEach(markup => {
    refs.gallery.insertAdjacentHTML('beforeend', markup);
  });
}
function resetMarkup(a) {
  a.innerHTML = '';
}
function notifySuccess() {
  Notiflix.Notify.success('Hooooray! We found 40 perfect images for you.');
}

import './css/common.css';
import Notiflix from 'notiflix';
import CartApiService from './js/cart-api';
import LoadMoreBtn from './js/load-more-btn';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const axios = require('axios').default;

//Your API key: 30048771-b82027b1d1dd03684fe8fb9c0
//https://pixabay.com/api/?key=30048771-b82027b1d1dd03684fe8fb9c0&q=yellow+flowers&image_type=photo

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  //loadMoreBtn: document.querySelector('.load-more'),
};
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});
const cartApiService = new CartApiService();
//console.log(loadMoreBtn);
const lightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: '250',
});

refs.searchForm.addEventListener('submit', onSearch);
//refs.loadMoreBtn.addEventListener('click', onLoadMore);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  cartApiService.query = e.currentTarget.elements.searchQuery.value;
  cartApiService.resetPage();
  clearGallery(refs.gallery);
  if (cartApiService.query === '') {
    loadMoreBtn.hide();
    return notifyWarning();
  }

  cartApiService.fetchCart().then(hits => {
    console.log(hits);

    if (hits.length === 0) {
      return notifyFailure();
      loadMoreBtn.hide();
    }
    loadMoreBtn.show();
    loadMoreBtn.disable();
    appendCardsMarkup(hits);
    //Notiflix.Notify.success('Hooooray! We found 40 perfect images for you.');
    notifySuccess();
    loadMoreBtn.enable();
  });
}
function onLoadMore() {
  loadMoreBtn.disable();
  cartApiService.fetchCart().then(hits => {
    if (hits.length === 0) {
      loadMoreBtn.hide();
      return notifyInfo();
    }
    appendCardsMarkup(hits);
    //lightBox.refresh();
    loadMoreBtn.enable();
  });
}
function appendCardsMarkup(hits) {
  const cardMarkup = hits.map(hit => {
    return `<div class="photo-card">
    <a href="${hit.largeImageURL}">
    
  <img class="img" src=${hit.webformatURL} alt=${hit.tags} loading="lazy" /></a>
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
  </div></div>`;
  });
  cardMarkup.forEach(markup => {
    refs.gallery.insertAdjacentHTML('beforeend', markup);
  });
  lightBox.refresh();
}
function clearGallery(a) {
  a.innerHTML = '';
}
function notifySuccess(data) {
  Notiflix.Notify.success(
    `Hooooray! We found ${cartApiService.totalHits} perfect images for you.`
  );
}

function notifyFailure() {
  Notiflix.Notify.failure(
    'Ooooops. Something wrong. We can`t find this. Try again, please.'
  );
}
function notifyWarning() {
  Notiflix.Notify.warning('Please, print something.');
}

function notifyInfo() {
  Notiflix.Notify.info(
    'We`re sorry, but you`ve reached the end of search results.'
  );
}

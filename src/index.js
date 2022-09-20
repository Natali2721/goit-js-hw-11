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
  cartApiService.fetchCart().then(appendCardsMarkup);
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

/*
const countriesListElem = document.querySelector('.country-list');
const countryInfoElem = document.querySelector('.country-info');


function makeMarkupList(countries) {
  const countriesList = countries.map(country => {
    return `<li class="country-list__item">
            <img src=${country.flags.png} width="50" alt="flag">
            <span class="country-list__name">${country.name.official}</span>
        </li>`;
  });
  countriesList.forEach(markupCountry => {
    countriesListElem.insertAdjacentHTML('beforeend', markupCountry);
  });
}

function makeMarkupInfo(countries) {
  const country = countries[0];
  const info = `<div class="country-info__box" alt="flag">
            <img src=${country.flags.png} width="50">
            <span class="country-info__name">${country.name.official}</span>
            </div>
            <p class="country-text"><span class="country-info--accent">Capital:</span> ${
              country.capital
            }</p>
            <p class="country-text"><span class="country-info--accent">Population:</span> ${
              country.population
            }</p>
            <p class="country-text"><span class="country-info--accent">Languages:</span> ${Object.values(
              country.languages
            ).join(', ')}</p>`;

  countryInfoElem.insertAdjacentHTML('beforeend', info);
}
function resetMarkup(a, b) {
  a.innerHTML = '';
  b.innerHTML = '';
}*/

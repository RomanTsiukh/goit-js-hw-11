import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    form: document.querySelector(".sesearch-form"),
    input: document.querySelector('.search-form input'),
    div: document.querySelector('div.gallery'),
}

refs.form.addEventListener('submit', fetchImages);
refs.input.addEventListener('input', onInputNameImage);

function onInputNameImage (e) {
   const name = e.target.value;
   console.log(name);
   return name;
}

axios.defaults.baseURL = 'https://pixabay.com';

function fetchImages() {
    const key = '28328960-67dbfe558f6e9bfc72c6b732c';
    const nameImage = onInputNameImage();

    return axios
        .get('/api/?${key}&q=${nameImage}&image_type=photo&orientation=horizontal&safesearch=true')
        .then(responce => responce.data)
}

fetchImages()
    .then(responce => {
        const card = responce.map(image => imageСardTemplate(image));
        refs.div.innerHTML = card.join('');
    }
        
        )
    .catch(error => {
        Notify.failure ('Sorry, there are no images matching your search query. Please try again.');
            refs.countryInfo.innerHTML = '';
            refs.countryList.innerHTML = '';
            return error;
        });


function imageСardTemplate({
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
}) {
    return `
    <div class="photo-card">
    <img src="${largeImageURL}" alt="${tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>${likes}</b>
      </p>
      <p class="info-item">
        <b>${views}</b>
      </p>
      <p class="info-item">
        <b>${comments}</b>
      </p>
      <p class="info-item">
        <b>${downloads}</b>
      </p>
    </div>
  </div>
    `;}
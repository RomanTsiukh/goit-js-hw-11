import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getRefs } from './js/refs';
import { renderMarkup } from './js/renderCard';
import { fetchImages } from './js/fetchImages';
import { noMorePages } from './js/end';

const { formElement, galleryElement, btnElement, textElement } = getRefs();

let page = null;
let nameImg = '';
const perPage = 40;

const Lightbox = new SimpleLightbox('.gallery a', {
  captionSelector: 'img',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  animationSpeed: 250,
  preloading: false,
  docClose: false,
  widthRatio: 1,
  doubleTapZoom: 1.5,
});

btnElement.classList.add('hidden');
console.log(formElement);
formElement.addEventListener('submit', getGallery);
btnElement.addEventListener('click', onClickMoreImg);

async function getGallery(event) {
  event.preventDefault();
  galleryElement.innerHTML = '';
  nameImg = event.target.searchQuery.value.toLowerCase();
  page = 1;
  try {
    const img = await fetchImages(nameImg);
    const imgData = img.data;
    console.log(imgData);
    if (imgData.total === 0) {
      btnElement.classList.add('hidden');
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    console.log(imgData.totalHits)
    textElement.innerHTML = '';

    Notify.success(`Hooray! We found ${imgData.totalHits} images.`);
    renderMarkup(imgData.hits);

    if(imgData.total !== 0) {
      btnElement.classList.remove('hidden');
    }
    
    noMorePages(imgData);

    Lightbox.refresh();
  } catch (error) {
    console.log(error.message);
  }
}

async function onClickMoreImg() {
  try {
    if (page > 0) {
      page += 1;
      const img = await fetchImages(nameImg);
      const imgData = img.data;
      renderMarkup(imgData.hits);
      noMorePages(imgData);
      Lightbox.refresh();
    }
  } catch (error) {
    console.log(error.message);
  }
}

export { perPage, page, nameImg };

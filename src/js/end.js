import { getRefs } from './refs';
import { perPage, page } from '../index';

const { btnElement, textElement } = getRefs();

export function noMorePages(response) {
  const totalPage = Math.ceil(response.totalHits / perPage);
  if (page === totalPage) {
    btnElement.classList.add('hidden');
    renderMessageEnd();
  }
}

function renderMessageEnd() {
  const markup = `
  <div class="message">
    <p  class="message_text">We're sorry, but you've reached the end of search results.</p>
</div>
`;
  return (textElement.innerHTML = markup);
}
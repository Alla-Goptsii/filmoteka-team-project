import { refs } from './refs.js';
import { STORAGE_KEY_WATCHED } from '../globals.js';
import { STORAGE_KEY_QUEUE } from '../globals.js';
import { IMAGE_URL } from '../globals';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

if (refs.watchedBtn) {
  refs.watchedBtn.addEventListener('click', () => {
    // Loading.dots({
    //   svgSize: '150px',
    //   svgColor: '#ff6b08',
    // });
    onClickBtnWatched();
    // Loading.remove(400);
  });
  if (refs.watchedBtn.classList.contains('button__active')) {
    onClickBtnWatched();
  } else {
    onClickBtnQueue();
  }
}

if (refs.queueBtn) {
  refs.queueBtn.addEventListener('click', () => {
    // Loading.dots({
    //   svgSize: '150px',
    //   svgColor: '#ff6b08',
    // });
    onClickBtnQueue();
    // Loading.remove(400);
  });
}

export function onClickBtnWatched() {
  refs.queueBtn.classList.remove('button__active');
  refs.watchedBtn.classList.add('button__active');

  const watchedFilms = JSON.parse(localStorage.getItem(STORAGE_KEY_WATCHED));

  Loading.dots({
    svgSize: '150px',
    svgColor: '#ff6b08',
  });
  // console.log(watchedFilms);
  if (watchedFilms?.length > 0) {
    const renderWatchedFilms = watchedFilms
      .map(({ title, id, poster_path, release_date, genres, vote_average }) => {
        return `<li class="library-card">
          <article class="library-card__article movie-item-js" data-id="${id}">
            <img width="440" height="660" class="library-card__img" src="${IMAGE_URL}${poster_path}">
            <div class="library-card__header">
              <h2 class="library-card__title">${title}</h2>
              <div class="library-card__description">
                <div class="library-card__info">
                  ${genres
                    .map(item => item.name)
                    .join(' ')} | ${release_date.substring(0, 4)}
                </div>
                <div class="library-card__rating">${vote_average.toFixed(
                  1
                )}</div>
              </div>
            </div>
          </article>
        </li>`;
      })
      .join('');

    hideNoMoviesBlock();
    refs.library.innerHTML = renderWatchedFilms;
    Loading.remove(400);
  } else {
    // showNoMoviesBlock();
    // Loading.dots({
    //   svgSize: '150px',
    //   svgColor: '#ff6b08',
    // });

    refs.library.innerHTML = '';
    showNoMoviesBlock();
    Loading.remove(400);
  }
}

export function onClickBtnQueue() {
  refs.watchedBtn.classList.remove('button__active');
  refs.queueBtn.classList.add('button__active');

  const queueFilms = JSON.parse(localStorage.getItem(STORAGE_KEY_QUEUE));

  Loading.dots({
    svgSize: '150px',
    svgColor: '#ff6b08',
  });
  if (queueFilms?.length > 0) {
    const renderQueueFilms = queueFilms
      .map(({ title, id, poster_path, release_date, genres, vote_average }) => {
        return `<li class="library-card">
          <article class="library-card__article movie-item-js" data-id="${id}">
            <img width="440" height="660" class="library-card__img" src="${IMAGE_URL}${poster_path}">
            <div class="library-card__header">
              <h2 class="library-card__title">${title}</h2>
              <div class="library-card__description">
                <div class="library-card__info">
                  ${genres
                    .map(item => item.name)
                    .join(' ')} | ${release_date.substring(0, 4)}
                </div>
                <div class="library-card__rating">${vote_average.toFixed(
                  1
                )}</div>
              </div>
            </div>
          </article>
        </li>`;
      })
      .join('');

    hideNoMoviesBlock();
    refs.library.innerHTML = renderQueueFilms;
    Loading.remove(400);
  } else {
    Loading.dots({
      svgSize: '150px',
      svgColor: '#ff6b08',
    });
    refs.library.innerHTML = '';
    showNoMoviesBlock();
    Loading.remove(400);
  }
}

function hideNoMoviesBlock() {
  refs.emptyPage.classList.add('visually-hidden');
}

function showNoMoviesBlock() {
  refs.emptyPage.classList.remove('visually-hidden');
}

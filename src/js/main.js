import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

document.addEventListener('DOMContentLoaded', function () {
  const loaderContainer = document.getElementById('loader-container');
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');
  const gallery = document.getElementById('gallery');
  const loadMoreButton = document.getElementById('loadMoreButton');

  const apiKey = '41942411-47547b04f91f4c6a01d45aac7';
  let currentPage = 1;
  let totalHits = 0;
  let currentSearchTerm = '';

  hideLoader(loaderContainer);
  loadMoreButton.style.display = 'none';

  searchForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    currentPage = 1;
    loadMoreButton.style.display = 'none';

    const searchTerm = searchInput.value.trim();
    if (searchTerm === '') {
      iziToast.error({
        title: 'Error',
        message: 'Please enter a search term',
      });
      hideLoader(loaderContainer);
      return;
    }
    currentSearchTerm = searchTerm;
    showLoader(loaderContainer);
    try {
      await fetchData(currentSearchTerm);
    } finally {
      hideLoader(loaderContainer);
    }
  });

  async function fetchData(searchTerm) {
    try {
      const response = await axios.get('https://pixabay.com/api/', {
        params: {
          key: apiKey,
          q: searchTerm,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          per_page: 40,
          page: currentPage,
        },
      });

      totalHits = response.data.totalHits;

      gallery.innerHTML = '';

      if (response.data.hits.length === 0) {
        iziToast.error({
          title: 'Error',
          message: 'No images found for the provided search term',
        });
      } else {
        displayImages(response.data.hits);

        if (currentPage * 40 >= totalHits) {
          loadMoreButton.style.display = 'none';
        } else {
          loadMoreButton.style.display = 'block';
        }
      }
    } catch (error) {
      iziToast.error({
        title: 'Error',
        message: 'Failed to fetch images. Please try again later.',
      });
    }
  }

  loadMoreButton.addEventListener('click', async function () {
    currentPage++;
    await fetchData(currentSearchTerm);
    smoothScroll();
  });
  function smoothScroll() {
    const cardHeight = document
      .querySelector('.gallery-item')
      .getBoundingClientRect().height;

    window.scrollTo({
      top: window.scrollY + cardHeight * 2,
      behavior: 'smooth',
    });
  }
  function showLoader(loaderContainer) {
    if (loaderContainer) {
      loaderContainer.style.display = 'block';
    }
  }

  function hideLoader(loaderContainer) {
    if (loaderContainer) {
      loaderContainer.style.display = 'none';
    }
  }

  function displayImages(images) {
    const galleryHTML = images
      .map(image => {
        return `
         <div class="gallery-item">
      <a href="${image.largeImageURL}" data-lightbox="gallery" data-title="Likes: ${image.likes}, Views: ${image.views}, Comments: ${image.comments}, Downloads: ${image.downloads}">
          <img src="${image.webformatURL}" alt="${image.tags}" data-src="${image.largeImageURL}" data-caption="Likes: ${image.likes}, Views: ${image.views}, Comments: ${image.comments}, Downloads: ${image.downloads}">
        </a>
        <div class="image-stats">
      <div class="stat-item">
        <p class="stat-label">Likes:</p>
        <p class="stat-value">${image.likes}</p>
      </div>
      <div class="stat-item">
        <p class="stat-label">Views:</p>
        <p class="stat-value">${image.views}</p>
      </div>
      <div class="stat-item">
        <p class="stat-label">Comments:</p>
        <p class="stat-value">${image.comments}</p>
      </div>
      <div class="stat-item">
        <p class="stat-label">Downloads:</p>
        <p class="stat-value">${image.downloads}</p>
      </div>
    </div>
    </div>
      `;
      })
      .join('');

    gallery.insertAdjacentHTML('beforeend', galleryHTML);

    const lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });

    lightbox.refresh();
  }
});
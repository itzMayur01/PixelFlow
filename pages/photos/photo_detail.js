
import { client } from "../../js/api_configure.js";
import { ripple } from "../../js/utils/ripple.js";
import { photoCard } from "../../js/photo_card.js";
import { menu } from "../../js/menu.js";
import { favorite } from "../../js/favorite.js";
import { gridInit, updateGrid } from "../../js/utils/masonry_grid.js";


/**
 *Add ripple effect
 */

const $rippleElems = document.querySelectorAll("[data-ripple]");
$rippleElems.forEach($rippleElem => {
  ripple($rippleElem)
});







/**
 * Page transition
 */

window.addEventListener("loadstart", () => {
  document.body.style.opacity = "0";
})

window.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = "1";
})







/**
 * Menu toggle
 */

const $menuWrappers = document.querySelectorAll("[data-menu-wrapper]");

$menuWrappers.forEach($menuWrapper => {
  menu($menuWrapper);
})



/**
 * Add to favorite
 * 
 */

const favoritePhotos = JSON.parse(window.localStorage.getItem('favorite')).photos;
const $favoriteBtn = document.querySelector("[data-add-favorite]");
const photoId = window.location.search.split("=")[1];
// console.log(photoId);

if (favoritePhotos[photoId]) {
  $favoriteBtn.classList.add("active");
} else {
  $favoriteBtn.classList.remove("active");
}

favorite($favoriteBtn, "photos", photoId)







/**
 * Render detail data
 */

const $detailWrapper = document.querySelector("[data-detail-wrapper]");
const $downloadLink = document.querySelector("[data-download-link]");
const $downloadMenu = document.querySelector("[data-download-menu]");

client.photos.detail(photoId, data => {
  // console.log(data);

  const {
    avg_color,
    height,
    width,
    photographer,
    src,
    alt
  } = data;

  $downloadLink.href = src.original;

  Object.entries(src).forEach(item => {
    const [key, value] = item;

    // console.log(key, value);


    $downloadMenu.innerHTML +=
      ` <a href=${value} class="menu-item" download data-ripple  data-menu-item>
          <span class="label-large text">${key}</span>

          <div class="state-layer"></div>
        </a>`
  })

  $detailWrapper.innerHTML =
    ` <figure class="detail-banner" style="aspect-ratio: ${width} / ${height}; background-color: ${avg_color}">
           <img src="${src.large2x}" width="${width}" height="${height}" alt="" class="img-cover">
      </figure>

        <p class="title-small">Photograph by <span class="color-primary">${photographer}</span></p>
`;

  const $detailImg = $detailWrapper.querySelector('img');

  $detailImg.style.opacity = 0;

  $detailImg.addEventListener('load', () => {
    $detailImg.animate({
      opacity: 1
    }, {
      fill: "forwards", duration: 400
    })

    if (alt) {
      client.photos.search({ query: alt, page: 1, per_Page: 30 }, data => {
        loadSimilar(data);
      });
    } else {
      $loader.style.display = "none";
      $photoGrid.innerHTML = "<p>No similar photo found.</p>";
    }
  });


});






/**
 * Load similar photos
 * @param data photo data
 */

const $photoGrid = document.querySelector("[data-photo-grid]");

const photoGrid = gridInit($photoGrid);
const $loader = document.querySelector("[data-loader]");
const loadSimilar = function (data) {

  data.photos.forEach(photo => {
    const $card = photoCard(photo);

    updateGrid($card, photoGrid.columnsHeight, photoGrid.$columns);
    $loader.style.display = "none";
  })

}





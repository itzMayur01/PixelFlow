
import { client } from "../../js/api_configure.js";
import { gridInit, updateGrid } from "../../js/utils/masonry_grid.js";
import { photoCard } from "../../js/photo_card.js";
import { updateUrl } from "../../js/utils/updateUrl.js";
import { urlDecode } from "../../js/utils/urlDecode.js";
import { filter } from "../../js/filter.js";


/**
 * Show filter bar if searched anything
 */

const $filterBar = document.querySelector("[data-filter-bar]");

$filterBar.style.display = window.location.search ? "flex" : "none";






/**
 * Init filter
 */

const $filterWrappers = document.querySelectorAll("[data-filter]");

$filterWrappers.forEach($filterWrapper => {

  filter($filterWrapper, window.filterObj, (newObj) => {

    // console.log(newObj)

    window.filterObj = newObj;
    updateUrl(newObj, "photos");
  });
})






/**
 * Render curated or searched photos
 * If searched something then render searched photos
 * otherwise render curated photos
 */

const $photoGrid = document.querySelector("[data-photo-grid]");
const $title = document.querySelector("[data-title]");
// console.log($title);

const photoGrid = gridInit($photoGrid)
const perPage = 30;
let currentPage = 1;
let totalPages = 0;

// Extract query string from URL and decode it into an object
const searchUrl = window.location.search.slice(1); // Remove "?" from query

let searchObj = searchUrl && urlDecode(searchUrl); // Decode query into key-value pairs

const title = searchObj ? `${searchObj.query} photos` : "Curated photos  " // Set the page title based on the query or default to curated photos

$title.textContent = title;
document.title = title;








/**
 * Render all the photos
 * @param {*} currentPage  current page number
 */

const renderPhotos = function (currentPage) {

  client.photos[searchObj ? "search" : "curated"]({ ...searchObj, per_page: perPage, page: currentPage }, data => {


    totalPages = Math.ceil(data.total_results / perPage);// This calculates the total number of pages based on the total_results divided by perPage

    // console.log(totalPages);

    data.photos.forEach(photo => {

      const $photoCard = photoCard(photo);

      updateGrid($photoCard, photoGrid.columnsHeight, photoGrid.$columns)
    });

    // when photos loaded 
    isloaded = true;

    //when no more photos found, hide loader 
    if (currentPage >= totalPages) $loader.style.display = 'none';


  })

}

renderPhotos(currentPage);








/**
 * Load more photos
 */

const $loader = document.querySelector('[data-loader]');
let isloaded = true;

window.addEventListener('scroll', () => {

  /**
   * Checks if the loader is close to being in view (2x the window height from the bottom). When the loader is near the viewport, it triggers loading more photos.
   * 
   * Ensures that photos can only load if there are more pages available and if the photos haven’t been loaded yet (isloaded is true).
   */
  if ($loader.getBoundingClientRect().top < (window.innerHeight * 2) && currentPage <= totalPages && isloaded) {

    currentPage++;
    renderPhotos(currentPage);
    isloaded = false;

  }
})
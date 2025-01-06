

import { client } from "../../js/api_configure.js";
import { gridInit, updateGrid } from "../../js/utils/masonry_grid.js";
import { videoCard } from "../../js/video_card.js";
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
    updateUrl(newObj, "videos");
  });
})






/**
 * Render Popular videos or searched videos
 * If searched something then render searched videos
 * otherwise render popular photos
 */

const $videoGrid = document.querySelector("[data-video-grid]");
const $title = document.querySelector("[data-title]");
// console.log($title);

const videoGrid = gridInit($videoGrid)
const perPage = 30;
let currentPage = 1;
let totalPages = 0;

// Extract query string from URL and decode it into an object
const searchUrl = window.location.search.slice(1); // Remove "?" from query

let searchObj = searchUrl && urlDecode(searchUrl); // Decode query into key-value pairs

const title = searchObj ? `${searchObj.query} videos` : "Popular photos  " // Set the page title based on the query or default to curated photos

$title.textContent = title;
document.title = title;








/**
 * Render all the videos
 * @param {*} currentPage  current page number
 */

const renderVideos = function (currentPage) {

  client.videos[searchObj ? "search" : "popular"]({ ...searchObj, per_page: perPage, page: currentPage }, data => {


    totalPages = Math.ceil(data.total_results / perPage);// This calculates the total number of pages based on the total_results divided by perPage

    // console.log(totalPages);

    data.videos.forEach(video => {

      const $videoCard = videoCard(video);

      updateGrid($videoCard, videoGrid.columnsHeight, videoGrid.$columns)
    });

    // when videos loaded 
    isloaded = true;

    //when no more videos found, hide loader 
    if (currentPage >= totalPages) $loader.style.display = 'none';


  })

}
renderVideos(currentPage);








/**
 * Load more videos
 */

const $loader = document.querySelector('[data-loader]');
let isloaded = true;

window.addEventListener('scroll', () => {

  /**
   * Checks if the loader is close to being in view (2x the window height from the bottom). When the loader is near the viewport, it triggers loading more videos.
   * 
   * Ensures that videos can only load if there are more pages available and if the videos haven’t been loaded yet (isloaded is true).
   */
  if ($loader.getBoundingClientRect().top < (window.innerHeight * 2) && currentPage <= totalPages && isloaded) {

    currentPage++;
    renderVideos(currentPage);
    isloaded = false;

  }
})
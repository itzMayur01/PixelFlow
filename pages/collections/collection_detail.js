import { client } from "../../js/api_configure.js";
import { gridInit, updateGrid } from "../../js/utils/masonry_grid.js";
import { photoCard } from "../../js/photo_card.js";
import { videoCard } from "../../js/video_card.js";
import { urlDecode } from "../../js/utils/urlDecode.js";

/**
 * Render collection medias
 */

const $collectionGrid = document.querySelector('[data-collection-grid]');
const $title = document.querySelector('[data-title]');


const collectionGrid = gridInit($collectionGrid)
const perPage = 30;
let currentPage = 1;
let totalPage = 0;
const collectionObj = urlDecode(window.location.search.slice(1));

// console.log(collectionObj);

$title.textContent = `${collectionObj.title} collections`;
document.title = `${collectionObj.title} collections`;


/**
 * 
 */

const loadCollection = function (page) {
  client.collections.detail(collectionObj.collectionId, { per_page: perPage, page: page }, data => {

    totalPage = Math.ceil(data.total_results / perPage);

    data.media.forEach(item => {
      let $card;

      switch (item.type.toLowerCase()) {
        case 'photo':
          $card = photoCard(item);
          break;
        case 'video':
          $card = videoCard(item);
          break;
      }

      updateGrid($card, collectionGrid.columnsHeight, collectionGrid.$columns);


      isloaded = true;
      if (currentPage >= totalPage) $loader.style.display == 'none'
    });

  })
}

loadCollection(currentPage);







/**
 * 
 * Load more collections
 */

const $loader = document.querySelector('[data-loader]');
let isloaded = false;

const loadMore = function () {

  if ($loader.getBoundingClientRect().top < (window.innerHeight * 2) && currentPage <= totalPage && isloaded) {
    currentPage++;
    loadCollection(currentPage);
    isloaded = false;
  }
}

window.addEventListener('scroll', loadMore);
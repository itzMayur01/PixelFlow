
import { client } from "../../js/api_configure.js";
import { collectionCard } from "../../js/collection_card.js";

/**
 * Render featured collections
 */

const $collectionGrid = document.querySelector("[data-collection-grid]");

const perPage = 36;
let currPage = 1;
let totalPage = 0;

const loadCollections = function (page) {
  client.collections.featured({ page: page, per_page: perPage }, data => {
    totalPage = Math.ceil(data.total_results / perPage);

    data.collections.forEach(collection => {

      const $collectionCard = collectionCard(collection);

      $collectionGrid.appendChild($collectionCard);
    });

    isloaded = true;
    (currPage >= totalPage) && ($loader.style.display == 'none')


  });
}

loadCollections(currPage);




/**
 * 
 * Load more collections
 */

const $loader = document.querySelector('[data-loader]');
let isloaded = false;

const loadMore = function () {

  if ($loader.getBoundingClientRect().top < (window.innerHeight * 2) && currPage <= totalPage && isloaded) {
    currPage++;
    loadCollections(currPage);
    isloaded = false;
  }
}

window.addEventListener('scroll', loadMore);


import { gridInit, updateGrid } from "../../js/utils/masonry_grid.js";
import { segment } from "../../js/segment_btn.js";
import { photoCard } from "../../js/photo_card.js";
import { videoCard } from "../../js/video_card.js";


/**
 * Fvorite segment button
 */

const $favoriteSegment = document.querySelector('[data-segment = "favorite"]');

/**
 * When the user selects a new segment (e.g., switches to "videos"), this code clears the grid and reloads it with items of the selected type.
 */
let favType = "photos";

segment($favoriteSegment, segmentValue => {
  favType = segmentValue;

  $favGrid.innerHTML = "";
  favGrid = gridInit($favGrid);
  loadFav(favType, favGrid)
})


/**
 * Load favorites items
 */

const $favGrid = document.querySelector('[data-fav-grid]');
let favGrid = gridInit($favGrid);
const favData = JSON.parse(window.localStorage.getItem('favorite'));



const loadFav = function (type, favGridItem) {

  Object.values(favData[type]).forEach(item => {

    let $card;

    switch (type) {
      case "photos":
        $card = photoCard(item);
        break;
      case "videos":
        $card = videoCard(item);
        break;
    }

    updateGrid($card, favGridItem.columnsHeight, favGridItem.$columns);

  });
}


loadFav(favType, favGrid)
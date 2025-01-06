import { addEventOnElements } from "./utils/event.js";
import { segment } from "./segment_btn.js";
import { ripple } from "./utils/ripple.js";
import { updateUrl } from "./utils/updateUrl.js";
import { urlDecode } from "./utils/urlDecode.js";
/**
 * search view toggle in small devices
 */

const $searchToggler = document.querySelectorAll("[data-search-toggler]");
const $searchView = document.querySelector("[data-search-view]");

// Toggle search view
addEventOnElements($searchToggler, "click", () => {
  $searchView.classList.toggle("show");
});

/**
 * Search clear button
 */

const $searchClearBtn = document.querySelector("[data-search-clear-btn]");

const $searchField = document.querySelector("[data-search-field]");
$searchClearBtn.addEventListener("click", () => ($searchField.value = ""));

/**
 *  Search type
 */

const $searchSegment = document.querySelector('[data-segment = "search"]');
const $activeSegmentBtn = $searchSegment.querySelector(
  "[data-segment-btn].selected"
);
window.searchType = $activeSegmentBtn.dataset.segmentValue;

segment($searchSegment, (segmentValue) => {
  window.searchType = segmentValue;
  // console.log(searchType);
});

/**
 *  Search submit
 */

const $searchBtn = document.querySelector("[data-search-btn]");

$searchBtn.addEventListener("click", () => {
  const searchValue = $searchField.value.trim();
  // console.log(`Searching for: ${searchValue}`);
  if (searchValue) {
    updateSearchHistory(searchValue);
    window.filterObj.query = searchValue;
    updateUrl(window.filterObj, window.searchType);
  }
});


/**
 * submit search when press enter key
 */

$searchField.addEventListener("keydown", e => {
  if (e.key === 'Enter' && $searchField.value.trim()) $searchBtn.click();
})



/**
 * Search History
 */

// Initial search history

/**
 *
 * The code ensures that searchHistory is always initialized correctly:
 * If search history exists in localStorage, it loads that data.
 * If no search history exists, it creates a new one in localStorage.
 *
 */

let searchHistory = { items: [] };

if (window.localStorage.getItem("search_history")) {
  searchHistory = JSON.parse(window.localStorage.getItem("search_history"));
} else {
  window.localStorage.setItem("search_history", JSON.stringify(searchHistory));
}

//update search history

const updateSearchHistory = (searchValue) => {
  /**
   * if the searched value is already present in the search list
   * then remove that one and add the search value at the beginning of the search list
   * This ensures that the most recent search is at the top of the history
   */
  if (searchHistory.items.includes(searchValue)) {
    searchHistory.items.splice(searchHistory.items.indexOf(searchValue), 1);
  }
  searchHistory.items.unshift(searchValue);
  window.localStorage.setItem("search_history", JSON.stringify(searchHistory));
};

/**
 * Render the search history items in search List
 */

const $searchList = document.querySelector("[data-search-List]");
const historyLength = searchHistory.items.length;

for (let i = 0; (i < historyLength) & (i <= 5); i++) {
  const $listItem = document.createElement("button");
  $listItem.classList.add("list-item");

  $listItem.innerHTML = `
  <span class="material-symbols-outlined leading-icon" aria-hidden="true">history</span>

   <span class="body-large text">${searchHistory.items[i]}</span>

   <div class="state-layer"></div>
  `;
  ripple($listItem);

  $listItem.addEventListener("click", function () {
    $searchField.value = this.children[1].textContent;
    $searchBtn.click();
  });


  $searchList.appendChild($listItem)
}


/**
 * Show searched value in search field after reload
 */

const search = urlDecode(window.location.search.slice(1));
// console.log(search);
if (search.query) $searchField.value = search.query;



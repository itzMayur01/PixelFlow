
import { menu } from "./menu.js";
/**
 * Add filter functionality
 * @param {Node} $filterWrapper filter wrapper
 * @param {Object} filterObj filter object
 * @param {*} callback  callback function
 */
export const filter = ($filterWrapper, filterObj, callback) => {

  const $filterClearBtn = $filterWrapper.querySelector("[data-filter-clear]");
  const $filterValue = $filterWrapper.querySelector("[data-filter-value]");
  const $filterChip = $filterWrapper.querySelector("[data-filter-chip]");
  const $filterColorField = $filterWrapper.querySelector("[data-color-field]");
  // console.log($filterColorField);

  const filterKey = $filterWrapper.dataset.filter;
  // console.log(filterKey);

  const newObj = filterObj;

  menu($filterWrapper, filterValue => {

    $filterValue.innerText = filterValue;
    $filterChip.classList.add("selected");

    newObj[filterKey] = filterValue;
    callback(newObj);
  })

  $filterClearBtn.addEventListener("click", () => {
    $filterChip.classList.remove("selected");
    $filterValue.innerText = $filterValue.dataset.filterValue;

    delete newObj[filterKey];
    callback(newObj);

  })

  $filterColorField?.addEventListener("change", function () {

    const filterValue = this.value.toLowerCase();

    $filterValue.innerText = filterValue;
    $filterChip.classList.add("selected")

    newObj[filterKey] = filterValue;
    callback(newObj);

  });
}
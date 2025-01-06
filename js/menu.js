import { addEventOnElements } from "./utils/event.js";

/**
 * Add menu functionality
 * @param {*} $menuWrapper 
 * @param {*} callback 
 */
export const menu = ($menuWrapper, callback) => {
  const $menu = $menuWrapper.querySelector("[data-menu]");
  const $menuTogglers = $menuWrapper.querySelectorAll("[data-menu-toggler]");
  const $menuItems = $menuWrapper.querySelectorAll("[data-menu-item]");

  addEventOnElements($menuTogglers, "click", () => {
    $menu.classList.toggle("expanded");
  });
  addEventOnElements($menuItems, "click", function () {
    $menu.classList.remove("expanded");

    // console.log(this.dataset.menuItem)

    if (callback) callback(this.dataset.menuItem);
  })

}
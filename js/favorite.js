import { client } from "./api_configure.js";
/**
 * 
 * @param {node} $element 
 * @param {*} type item type eg., "photo" or "video"
 * @param {*} id item id
 */
export const favorite = ($element, type, id) => {
  $element.addEventListener('click', () => {
    // console.log("clicked");


    $element.setAttribute("disabled", "");
    const favoriteObj = JSON.parse(window.localStorage.getItem('favorite'));

    /**
     * If the Item is Already a Favorite
     * 
     */
    if (favoriteObj[type][id]) {
      $element.classList.toggle("active");

      // Disable the button to prevent multiple rapid clicks
      $element.removeAttribute("disabled");

      delete favoriteObj[type][id];

      window.localStorage.setItem('favorite', JSON.stringify(favoriteObj));

      // Reload the page to reflect the changes
      location.reload();

    } else {

      /**
       * If the Item is Not a Favorite
       * It fetches the item’s details from an API and adds it to the favorites list.
       */
      client[type].detail(id, data => {
        $element.classList.toggle("active");
        $element.removeAttribute("disabled");

        favoriteObj[type][id] = data;

        window.localStorage.setItem('favorite', JSON.stringify(favoriteObj));


      })
    }

  });
}
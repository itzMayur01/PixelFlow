
/**
 * Add event on multiple elements
 * @param {*} $elements NodeList 
 * @param {*} eventType Event type e.g. click
 * @param {*} callback callback function
 */
export const addEventOnElements = function ($elements, eventType, callback) {
  $elements.forEach($element => $element.addEventListener(eventType, callback));
} 
/**
 * update url
 * @param {*} filterObj Filter  object
 * @param {*} searchType Search type eg., videos or photos
 */

import { urlEncode } from './urlEncode.js';

export const updateUrl = (filterObj, searchType) => {
  setTimeout(() => {
    const root = window.location.origin;
    // console.log(filterObj);
    // console.log(searchType);


    const searchQuery = urlEncode(filterObj)
    window.location = `${root}/pages/${searchType}/${searchType}.html?${searchQuery}`;
    // console.log(`${root}/pages/${searchType}/${searchType}.html?${searchQuery}`);

  }, 500);
}
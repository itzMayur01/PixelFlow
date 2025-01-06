
// import { urlEncode } from "./utils/urlEncode.js"
// const API_KEY = "in api key file -> desktop"

// const headers = new Headers();
// headers.append("Authorization", API_KEY);

// const requestOptions = { headers };

// const fetchData = async (url, successCallback) => {
//   const response = await fetch(url, requestOptions);

//   if (response.ok) {
//     const data = await response.json();
//     successCallback(data);
//   }
// }

// let requestUrl = "";

// const root = {
//   default: "https://api.pexels.com/v1/",
//   videos: "https://api.pexels.com/videos/"
// };


// export const client = {

//   photos: {

//     /**
//      * Search photos
//      * @param {*} parameters url object
//      * @param {*} callback
//      */
//     search(parameters, callback) {
//       requestUrl = `${root.default}search?${urlEncode(parameters)}`;
//       fetchData(requestUrl, callback);
//     },

//     /**curated photos
//      *
//      * @param {*} parameters url object
//      * @param {*} callback
//      */

//     curated(parameters, callback) {
//       fetchData(`${root.default}curated?${urlEncode(parameters)}`, callback)
//     },

//     /**
//      * Get single photo detail
//      * @param {*} id photo id
//      * @param {*} callback
//      */

//     detail(id, callback) {
//       fetchData(`${root.default}photos/${id}`, callback);
//     }
//   },

//   videos: {

//     /**
//      * Search videos
//      * @param {*} parameters url object
//      * @param {*} callback
//      */
//     search(parameters, callback) {
//       requestUrl = `${root.videos}search?${urlEncode(parameters)}`;
//       fetchData(requestUrl, callback);
//     },

//     /**Popular photos
//      *
//      * @param {*} parameters url object
//      * @param {*} callback
//      */

//     popular(parameters, callback) {
//       fetchData(`${root.videos}popular?${urlEncode(parameters)}`, callback)
//     },

//     /**
//      * Get single Video detail
//      * @param {*} id video id
//      * @param {*} callback
//      */

//     detail(id, callback) {
//       fetchData(`${root.videos}videos/${id}`, callback);
//     }
//   },

//   collections: {

//     /** get featured collections
//      *
//      * @param {*} parameters url object
//      * @param {*} callback
//      */

//     featured(parameters, callback) {
//       requestUrl = `${root.default}collections/featured?${urlEncode(parameters)}`;
//       fetchData(requestUrl, callback);
//     },

//     /**
//      * Get a collection medias
//      * @param {*} id photo id
//      * @param {*} parameters url object
//      * @param {*} callback
//      */

//     detail(id, parameters, callback) {
//       requestUrl = `${root.default}/collections/${id}?${urlEncode(parameters)}`;
//       fetchData(requestUrl, callback);
//     }
//   },

// }









import { urlEncode } from "./utils/urlEncode.js";


const fetchData = async (url, successCallback) => {
  const response = await fetch(url);

  if (response.ok) {
    const data = await response.json();
    successCallback(data);
  } else {
    console.error("Error fetching data:", response.statusText);
  }
};


const root = {
  default: "/api/proxy?endpoint=", // Use proxy endpoint
  videos: "/api/proxy?endpoint=videos/",
};


let requestUrl = "";
export const client = {
  photos: {
    search(parameters, callback) {
      requestUrl = `${root.default}search&${urlEncode(parameters)}`;
      fetchData(requestUrl, callback);
    },
    curated(parameters, callback) {
      fetchData(`${root.default}curated&${urlEncode(parameters)}`, callback);
    },
    detail(id, callback) {
      fetchData(`${root.default}photos/${id}`, callback);
    },
  },
  videos: {
    search(parameters, callback) {
      requestUrl = `${root.videos}search&${urlEncode(parameters)}`;
      fetchData(requestUrl, callback);
    },
    popular(parameters, callback) {
      fetchData(`${root.videos}popular&${urlEncode(parameters)}`, callback);
    },
    detail(id, callback) {
      fetchData(`${root.videos}videos/${id}`, callback);
    },
  },
  collections: {
    featured(parameters, callback) {
      requestUrl = `${root.default}collections/featured&${urlEncode(parameters)}`;
      fetchData(requestUrl, callback);
    },
    detail(id, parameters, callback) {
      requestUrl = `${root.default}collections/${id}&${urlEncode(parameters)}`;
      fetchData(requestUrl, callback);
    },
  },
};





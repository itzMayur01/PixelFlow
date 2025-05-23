
import { client } from "../../js/api_configure.js";
import { ripple } from "../../js/utils/ripple.js";
import { menu } from "../../js/menu.js";
import { favorite } from "../../js/favorite.js";



/**
 *Add ripple effect
 */

const $rippleElems = document.querySelectorAll("[data-ripple]");
$rippleElems.forEach($rippleElem => {
  ripple($rippleElem)
});







/**
 * Page transition
 */

window.addEventListener("loadstart", () => {
  document.body.style.opacity = "0";
})

window.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = "1";
})







/**
 * Menu toggle
 */

const $menuWrappers = document.querySelectorAll("[data-menu-wrapper]");

$menuWrappers.forEach($menuWrapper => {
  menu($menuWrapper);
})



/**
 * Add to favorite
 * 
 */

const favoriteVideos = JSON.parse(window.localStorage.getItem('favorite')).videos;
const $favoriteBtn = document.querySelector("[data-add-favorite]");
const videoId = window.location.search.split("=")[1];
// console.log(videoId);

if (favoriteVideos[videoId]) {
  $favoriteBtn.classList.add("active");
} else {
  $favoriteBtn.classList.remove("active");
}

favorite($favoriteBtn, "videos", videoId)







/**
 * Render detail data
 */

const $detailWrapper = document.querySelector("[data-detail-wrapper]");
const $downloadLink = document.querySelector("[data-download-link]");
const $downloadMenu = document.querySelector("[data-download-menu]");

client.videos.detail(videoId, data => {
  // console.log(data);

  const {
    height,
    width,
    user: { name: author },
    image,
    video_files
  } = data;


  const hdVideo = video_files?.find(item => item.quality === "hd" || item.quality === null);

  if (!hdVideo) {
    return;
  }
  // console.log(sdVideo);
  const { file_type = "unknown", link = null } = hdVideo;

  if (!link) {
    return;
  }




  $downloadLink.href = link;

  video_files.forEach(item => {
    const {
      width,
      height,
      quality,
      link
    } = item;

    // Handle cases where quality is null or undefined
    const qualityLabel = quality ? quality.toUpperCase() : "NA";


    $downloadMenu.innerHTML +=
      ` <a href=${link} class="menu-item" download data-ripple  data-menu-item>
          <span class="label-large text">${qualityLabel}</span>


          <span class="label-large trailing-text">${width}x${height}</span>


          <div class="state-layer"></div>
        </a>`
  })

  $detailWrapper.innerHTML =
    `
        <div class="detail-banner" style="aspect-ratio: ${width} / ${height};">

          <video poster="${image}" controls class="img-cover" data-video>
            <source src="${link}" type="${file_type}">
          </video>
        </div>

        <p class="title-small">Video by <span class="color-primary">${author}</span></p>

`;


});










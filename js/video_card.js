
import { ripple } from "./utils/ripple.js";
import { favorite } from "./favorite.js";
import { hoverOnPlay } from "./utils/hoverOnPlay.js";
/**
 * @param video video object
 * @return  video card
 */
export const videoCard = (video) => {

  const root = window.location.origin;
  console.log(video);

  const {
    height,
    width,
    id,
    image,
    video_files
  } = video;

  const sdVideo = video_files?.find(item => item.quality === "sd" || (item.quality === null && item.width < 1000));

  console.log(sdVideo);
  // const { file_type, link } = sdVideo;

  if (!sdVideo) {
    return; // Exit the function if no valid video is found
  }

  // Check if the link property exists
  const { file_type = "unknown", link = null } = sdVideo;


  if (!link) {
    return; // Skip processing this video
  }



  const favoriteObj = JSON.parse(window.localStorage.getItem('favorite'));


  const $card = document.createElement('div');
  $card.classList.add('card', 'grid-item', 'video');

  $card.innerHTML = `
              <div class="card-banner" style="--width:${width}; --height:${height}">
                <video poster="${image}" muted loop preload = "none" class="img-cover" data-video>
                  <source src="${link}" type="${file_type}">
                </video>
              </div>

              <div class="card-content">
                  <button class="icon-btn small ${favoriteObj.videos[id] ? "active" : ""}" aria-label="Add to favorite" data-ripple data-favorite>
                    <span class="material-symbols-outlined" aria-hidden="true">favorite</span>
                    <div class="state-layer"></div>
                  </button>
              </div>

              <span class="card-badge "data-card-badge>
                <span class="material-symbols-outlined" aria-hidden="true">play_arrow</span>
              </span>
              
              
             <a href="${root}/pages/videos/video_detail.html?id=${id}" class="state-layer"></a>`;


  const rippleElems = [$card, $card.querySelector("[data-ripple]")];
  rippleElems.forEach(rippleElem => ripple(rippleElem));

  const $favoriteBtn = $card.querySelector("[data-favorite]")
  favorite($favoriteBtn, "videos", id)

  hoverOnPlay($card);

  return $card;
}





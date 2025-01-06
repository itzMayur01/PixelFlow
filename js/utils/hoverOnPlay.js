

export const hoverOnPlay = ($card) => {

  const $cardVideo = $card.querySelector("[data-video]")
  const $cardBadge = $card.querySelector("[data-card-badge]");


  let isplaying = false;
  let playTimeout;

  $card.addEventListener("pointerover", () => {
    playTimeout = setTimeout(() => {
      $cardBadge.style.display = "none";

      $cardVideo.play().then(res => {
        isplaying = true;
      }).catch(err => {
        isplaying = false;
      })
    }, 500)
  });


  $card.addEventListener("pointerout", () => {
    playTimeout && clearTimeout(playTimeout);

    $cardBadge.style.display = "grid";

    if (isplaying) $cardVideo.pause();
  });
}
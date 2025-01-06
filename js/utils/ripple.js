/**
 * Add ripple effect on an element
 */


export const ripple = function ($rippleElem) {
  // console.log($rippleElem);

  $rippleElem.addEventListener('pointerdown', function (e) {
    e.stopImmediatePropagation()
    // console.log(e);

    const $ripple = document.createElement('div');
    $ripple.classList.add('ripple');
    this.appendChild($ripple);

    const removeRipple = () => {
      $ripple.animate({
        opacity: 0
      }, {
        fill: "forwards", duration: 300
      })
      setTimeout(() => {
        $ripple.remove();
      }, 1000);

    }
    this.addEventListener('pointerup', removeRipple)
    this.addEventListener('pointerleave', removeRipple)

    const isNotIconButton = !this.classList.contains("icon-btn");
    if (isNotIconButton) {
      const rippleSize = Math.max(this.clientWidth, this.clientHeight);
      $ripple.style.top = `${e.layerY}px`;
      $ripple.style.left = `${e.layerX}px`;
      $ripple.style.width = `${rippleSize}px`;
      $ripple.style.height = `${rippleSize}px`;
    }
  })
}
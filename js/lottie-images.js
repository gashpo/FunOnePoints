document.addEventListener("DOMContentLoaded", function () {
  const lottieElements = document.querySelectorAll("[data-animation-path]");

  // 預設設定
  const defaultSettings = {
    renderer: "svg",
    loop: true,
    autoplay: true,
  };

  lottieElements.forEach(function (element) {
    const animationPath = element.getAttribute("data-animation-path");

    // 如果需要覆蓋預設值，仍可透過 data 屬性設定
    const settings = {
      container: element,
      path: animationPath,
      renderer:
        element.getAttribute("data-anim-renderer") || defaultSettings.renderer,
      loop: element.hasAttribute("data-anim-loop")
        ? element.getAttribute("data-anim-loop") === "true"
        : defaultSettings.loop,
      autoplay: element.hasAttribute("data-anim-autoplay")
        ? element.getAttribute("data-anim-autoplay") === "true"
        : defaultSettings.autoplay,
    };

    lottie.loadAnimation(settings);
  });
});

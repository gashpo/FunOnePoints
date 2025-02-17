$(document).ready(function () {
  $(".menu-toggle").click(function () {
    $("header").toggleClass("open");
  });

  $(".header-dropdown").click(function (event) {
    event.stopPropagation();
    if ($(window).width() > 768) {
      $(".select").toggleClass("active");
    } else {
      $(".mobile-frame").toggleClass("open");
    }
  });

  // 點擊其他地方關閉 .select
  $(document).click(function () {
    $(".select").removeClass("active");
  });
});

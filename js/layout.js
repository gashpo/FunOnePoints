$(document).ready(function () {
  /* 引入layout */
  // 確保 header 加載完成後才綁定事件
  $("#header-placeholder").load("_header.html", function () {
    $("#user").click(function () {
      if (window.innerWidth < 768) {
        if ($("#mobile-menu").length === 0) {
          // 引入 mobile-menu
          $("body").append('<div id="mobile-menu-placeholder"></div>');
          $("#mobile-menu-placeholder").load("_mobile-menu.html");
        } else {
          // 移除 mobile-menu
          $("#mobile-menu").remove();
        }
      }
    });
  });
  // $("#sidebar-placeholder").load("_sidebar.html");
  $("#footer-placeholder").load("_footer.html");
});

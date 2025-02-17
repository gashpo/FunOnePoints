$(document).ready(function () {
    let $tab = $(".tab");
    let $underline = $(".tab-underline");
    let $scrollLeftBtn = $(".tab-scroll-left");
    let $scrollRightBtn = $(".tab-scroll-right");

    // 讓滾動更平滑
    $tab.css("scroll-behavior", "smooth");

    function checkScrollable() {
      let scrollLeft = $tab.scrollLeft();
      let maxScrollLeft = $tab[0].scrollWidth - $tab.outerWidth();

      if (scrollLeft <= 0) {
        $scrollLeftBtn.css("display", "none");
      } else {
        $scrollLeftBtn.css("display", "flex");
      }

      if (scrollLeft >= maxScrollLeft - 10) {
        $scrollRightBtn.css("display", "none");
      } else {
        $scrollRightBtn.css("display", "flex");
      }
    }

    function updateUnderline() {
      let $activeTab = $(".tab-item.active");
      let leftPos = $activeTab.position().left + $tab.scrollLeft();
      let width = $activeTab.outerWidth();
      $underline.css({ left: leftPos + "px", width: width + "px" });
    }

    function scrollToTab($tabItem) {
      let tabLeft = $tabItem.position().left;
      let tabWidth = $tabItem.outerWidth();
      let tabScrollLeft = $tab.scrollLeft();
      let tabContainerWidth = $tab.outerWidth();

      if (tabLeft < 0) {
        $tab.scrollLeft(tabScrollLeft + tabLeft - 10);
      } else if (tabLeft + tabWidth > tabContainerWidth) {
        $tab.scrollLeft(tabScrollLeft + (tabLeft + tabWidth - tabContainerWidth) + 10);
      }
    }

    function updateTabContent(index) {
      $(".tab-content").hide().eq(index).show();
    }

    checkScrollable();
    updateUnderline();

    $(window).on("resize", function () {
      checkScrollable();
      updateUnderline();
    });

    $scrollRightBtn.click(function () {
      $tab.animate({ scrollLeft: "+=300px" }, 300, checkScrollable);
    });

    $scrollLeftBtn.click(function () {
      $tab.animate({ scrollLeft: "-=300px" }, 300, checkScrollable);
    });

    $tab.on("scroll", function () {
      checkScrollable();
      updateUnderline();
    });

    $(".tab-item").click(function () {
      let index = $(this).index();
      $(".tab-item").removeClass("active");
      $(this).addClass("active");
      updateUnderline();
      scrollToTab($(this));
      updateTabContent(index);
    });
});
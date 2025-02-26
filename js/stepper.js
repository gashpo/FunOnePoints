$(document).ready(function () {
  $(".stepper-wrapper").each(function () {
    const $wrapper = $(this);
    const $minus = $wrapper.find(".step-minus");
    const $plus = $wrapper.find(".step-plus");
    const $count = $wrapper.find(".count");
    const $helper = $wrapper.find(".helper");
    const $helperPoints = $helper.find("span");
    const $points = $(".points h5 span"); // 取得單價點數

    function updateHelper() {
      let unitPoints = parseInt($points.text()); // 單價點數
      let quantity = parseInt($count.text()); // 數量
      let totalPoints = unitPoints * quantity; // 計算總點數

      // 更新 .helper 內的數值
      $helperPoints.text(totalPoints);

      // 當數量 > 1 顯示 .helper，否則隱藏
      $helper.toggle(quantity > 1);
    }

    function updateCount(change) {
      let value = parseInt($count.text()) + change;
      if (value < 1) return; // 確保不會低於 1
      $count.text(value);
      $minus.prop("disabled", value <= 1);
      updateHelper();
    }

    // 增加數字
    $plus.click(function () {
      updateCount(1);
    });

    // 減少數字
    $minus.click(function () {
      updateCount(-1);
    });

    // 頁面載入時執行一次
    updateHelper();
  });
});

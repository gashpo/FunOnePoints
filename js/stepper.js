$(document).ready(function () {
  $(".stepper-wrapper").each(function () {
    const $wrapper = $(this);
    const $minus = $wrapper.find(".step-minus");
    const $plus = $wrapper.find(".step-plus");
    const $count = $wrapper.find(".count");

    // 增加數字
    $plus.click(function () {
      let value = parseInt($count.text());
      value++;
      $count.text(value);
      $minus.prop("disabled", value === 0); // 只有 0 才禁用
    });

    // 減少數字
    $minus.click(function () {
      let value = parseInt($count.text());
      if (value > 0) {
        value--;
        $count.text(value);
      }
      $minus.prop("disabled", value === 0);
    });
  });
});

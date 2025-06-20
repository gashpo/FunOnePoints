function serialcopy() {
  var $icon = $(event.target);
  var $input = $icon.siblings('input[type="text"]');
  var textToCopy = $input.val();

  // 複製到剪貼簿
  navigator.clipboard
    .writeText(textToCopy)
    .then(function () {
      // 成功複製後更換圖示並增加 class
      $icon.text("check_circle").addClass("copied filled");

      // 2秒後恢復原始圖示並移除 class
      setTimeout(function () {
        $icon.text("content_copy").removeClass("copied filled");
      }, 2000);
    })
    .catch(function (err) {
      console.error("複製失敗: ", err);
    });
}

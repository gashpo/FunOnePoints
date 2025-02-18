$(document).ready(function () {
  $("[for]").click(function () {
    // 開啟 overlay
    $(".overlay").remove();
    $("body").append('<div class="overlay"></div>');

    // 開啟 popup
    let actionValue = $(this).attr("for");
    $(".popup").removeClass("show");
    $("#" + actionValue).addClass("show");
  });

  // 關閉 popup
  $(document).on("click", ".overlay", function () {
    $(".overlay").remove();
    $(".popup").removeClass("show");
  });

  $(document).on("click", "i[action='close']", function () {
    $(".overlay").remove();
    $(".popup").removeClass("show");
  });
});

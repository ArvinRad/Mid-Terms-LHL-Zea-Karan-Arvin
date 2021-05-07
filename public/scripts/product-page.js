$(document).ready(function () {
  $("#btnDelte").on("click", function (e) {
    e.preventDefault();
    productId = $("#fcf-button").data("productid");
    $.ajax({
      url: "/products/" + productId + "/delete",
      type: "POST",
      data: { productId: productId },
      success: function (result) {
        window.location.href = "/";
      },
    });
  });

  $("#btnSeller").on("click", function (e) {
    $(".fcf-body").slideDown();
    $(this).hide();
  });

  $("#btnHide").on("click", function (e) {
    $(".fcf-body").hide();
    $("#btnSeller").show();
  });

  $("#Message").keyup(function (event) {
    if ($("#Message").val().length > 0) {
      // alert("Please enter text in the message box");
      $("#noValid").slideUp();
    }
  });
  $("#fcf-button").on("click", function (e) {
    e.preventDefault();
    if ($("#Message").val().length === 0) {
      // alert("Please enter text in the message box");
      $("#noValid").slideDown();
    }
    const message = $("#Message").val();

    $("#Message").val("");
    let productId = $("#fcf-button").data("productid");
    // console.log(productId)

    $.ajax({
      url: "/messages/" + productId,
      type: "POST",
      data: { productId: productId, message: message },
      success: function (result) {
        // console.log(result);
        getMessages();
      },
      error: function (error) {
        console.log("There was an error" + error);
      },
    });
  });
  const getMessages = () => {
    let productId = $("#fcf-button").data("productid");
    userId = 1;
    $.ajax({
      url: `/messages/${productId}?userId=${userId}`,
      type: "GET",
      success: function (result) {
        $("#showMessages").empty();
        for (let ele in result) {
          $("#showMessages").append(`<p>${result[ele]["message"]}\n</p>`);
        }
      },
      error: function (error) {
        console.log("There was an error" + error);
      },
    });
  };
  getMessages();
});

$(document).ready(function () {
  //=> jquery event fired

  $(".favBtn").each(function () {
    let favProdId = $(this).data("fav_prod_id");
    console.log("favProdId",favProdId);
    if (favProdId) {
    $(this).addClass("btnRed");
    favProdId = null;
    }
  });
  $(".favBtn").on("click", function (e) {
    e.preventDefault();
    //we need to get the product id
    let productId = $(this).data("productid");
    console.log(productId);
    let favProdId = $(this).data("fav_prod_id");
    console.log("favProdId",favProdId);
    let userId = $(this).data("user_id");
    console.log(userId);
    const altThis = $(this);
    //ajax call
    if (favProdId) {
      $(this).toggleClass("btnRed");
      $.ajax({
        url: "/heart/" + productId + "/delete",
        type: "POST",
        data: { productId: productId },
        success: function (result) {
          altThis.data("fav_prod_id",null)
          console.log("hey")
        },
        error: function (error) {
          console.log("There was an error" + error);
        },
      });
    } if (!favProdId) {
      $(this).toggleClass("btnRed");
      $.ajax({
        url: "/heart/" + productId,
        type: "POST",
        data: { productId: productId },
        success: function (result) {
          altThis.data("fav_prod_id",productId)
          console.log("hi")
        },
        error: function (error) {
          console.log("There was an error", error);
        },
      });
    }
    
  });
  
}); //document ready closes here.
  // $('.unlikeproduct').on('click',function(e){
  //     e.preventDefault();
  //     //we need to get the product id
  //     let productId = $(this).data('productid');
  //     //ajax call
  //     $.ajax({
  //         url: "/heart/"+productId+"/delete",
  //         type: "POST",
  //         data: {productId: productId},
  //         success: function(result){
  //             // console.log("The result that came from server ");
  //             // console.log(result);
  //             //to set the color the stuff changed to red color;
  //             alert("Favorite added to the Database");
  //         },
  //         error: function(error){
  //             console.log("There was an error"+error);

  //         }
  //     });

  // });
  // // $("heart").submit(function(event) {//=> jquery event fired

  // //     alert("Hello");
  //     event.preventDefault();
  //     const url = $("heart").attr("action");

  //     // $("#heart").addClass("btn-fav");
  //     // $.post(url,
  //     //     function(data, status, xhr) {

  //     //         $('heart').find('button').append('status: ' + status + ', data: ' + data);

  //     //     }).done(function() { alert('Request done!'); })
  //     //     .fail(function(jqxhr, settings, ex) { alert('failed, ' + ex); });

  //     });
  //     $("hate").submit(function(event) {//=> jquery event fired

  //         event.preventDefault();
  //         const url = $("hate").attr("action")

  //         $.post(url)
  //     });

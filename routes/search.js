$(search_form).ready(function() {

  var navigationWrapper = $('.cd-main-nav-wrapper'),
    navigation = navigationWrapper.children('.cd-main-nav'),
    searchForm = $('.cd-main-search'),
    navigationTrigger = $('.cd-nav-trigger'),
    mainHeader = $('.cd-main-header');

function moveNavigation(){
   var screenSize = checkWindowWidth(); //returns 'mobile' or 'desktop'
   if ( screenSize == 'desktop' && (navigationTrigger.siblings('.cd-main-search').length == 0) ) {
      //desktop screen - insert navigation and search form inside <header>
      searchForm.detach().insertBefore(navigationTrigger);
      navigationWrapper.detach().insertBefore(searchForm).find('.cd-serch-wrapper').remove();
   } else if( screenSize == 'mobile' && !(mainHeader.children('.cd-main-nav-wrapper').length == 0)) {
      //mobile screen - move navigation and search form after .cd-main-content element
      navigationWrapper.detach().insertAfter('.cd-main-content');
      var newListItem = $('<li class="cd-serch-wrapper"></li>');
      searchForm.detach().appendTo(newListItem);
      newListItem.appendTo(navigation);
   }
}

  $('form[role="search"]').submit(ev =>  {
    ev.preventDefault();
    // get the input value with:
    let searchstring = $('input[type="text"]', this).val();
    // your ajax request, using the variable above
    let url = "http://svcs.ebay.com/services/search/FindingService/v1";
    url = "http://svcs.ebay.com/services/search/FindingService/v1";
    url += "?OPERATION-NAME=findCompletedItems";
    url += "&SERVICE-VERSION=1.13.0";
    url += "&SERVICE-NAME=FindingService";
    url += "&SECURITY-APPNAME=deleted for privacy";
    url += "&GLOBAL-ID=EBAY-US";
    url += "&RESPONSE-DATA-FORMAT=JSON";
    url += "&REST-PAYLOAD";
    url += "&paginationInput.pageNumber=1";
    url += "&paginationInput.entriesPerPage=10";
    url += "&keywords=" + searchstring;
    url += "&sortOrder=StartTimeNewest";

    $.ajax({
      type: "GET",
      url: url,
      dataType: "jsonp",
      success: function(res){
        console.log(res);
        var items = res.findCompletedItemsResponse[0].searchResult[0].item;
        var ins = "";
        for (var i = 0; i < items.length; i++){
          ins += "<div>";
          ins += "<img src='" + items[i].galleryURL + "  '/>";
          ins += "  " + items[i].title + " - ";
          ins += "Sold for $" + items[i].sellingStatus[0].currentPrice[0].__value__;
          ins += "</div><br />";
        };
        $('.results').html(ins);
      }
    });
  });
});

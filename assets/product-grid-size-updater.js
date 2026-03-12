function autoUpdateSize(){ 
   jQuery(".indiv-product").find(".indiv-product-title-text").css("height", "auto"); 
   var max = -1;
   jQuery(".indiv-product").find(".indiv-product-title-text").each(function() {
       var h = jQuery(this).height(); 
       max = h > max ? h : max;
   });
   jQuery(".indiv-product").find(".indiv-product-title-text").css('height',max);
}
  
  function autoUpdateHomeProductSize(){ 
   jQuery(".bestSeller-box").find(".bestSeller-bottom > h6").css("height", "auto"); 
   var max = -1;
   jQuery(".bestSeller-box").find(".bestSeller-bottom > h6").each(function() {
       var h = jQuery(this).height(); 
       max = h > max ? h : max;
   });
   jQuery(".bestSeller-box").find(".bestSeller-bottom > h6").css('height',max);
  }
  
  jQuery(document).ready(function(){
      autoUpdateSize();
      autoUpdateHomeProductSize();
  });
  jQuery(window).resize(function(){
      autoUpdateSize();
      autoUpdateHomeProductSize();
  });    
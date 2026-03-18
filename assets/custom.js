jQuery(document).ready(function($) {
  // jQuery('.blockSize').hide();
  //  //jQuery('.time_dropdown').hide();
  //   jQuery(".time_menu").click(function(){
  //     jQuery('.time_dropdown').toggleClass("show-dropdown");
  //   });
   
  
  // $('input[name=option-1]').click(function(){
  //   var swatchval = $(this).val();
    
  //   var colorval = $('#SingleOptionSelector-1-dropdown li').attr("value");
  //   // console.log(colorval);
  //   // if(swatchval == colorval){
      
  //   //   $('#SingleOptionSelector-1-dropdown #'+swatchval).addClass("selected");
  //   // }
    
  // });
    // $('#SingleOptionSelector-0-dropdown li').click(function(){
    //   alert($('#SingleOptionSelector-0-dropdown li').attr('value'));
    // });
  //      $('.wetheme-custom-radio').change(function() {
  //   var selectedValue = $(this).val();
  //   $('.SingleOptionSelector-0-dropdown #'+optionText).trigger('click');
  // });

    jQuery(".time_menu").click(function(){
      alert();
        jQuery(".time_dropdown").toggleClass("show-dropdown");		
    });


  // Hide product details/dimention/warrenty table if data is empty
  var checkLength = jQuery('.table-dimentions').find('tr:visible').length;
  if (checkLength == 0)
    jQuery('.table-dimentions').parent().parent().hide();
  else
    jQuery('.table-dimentions').parent().parent().show();

  var checkLength = jQuery('.table-details').find('tr:visible').length;
  if (checkLength == 0)
    jQuery('.table-details').parent().parent().hide();
  else
    jQuery('.table-details').parent().parent().show();
  
  var checkLength = jQuery('.table-warrenty').find('tr:visible').length;
  if (checkLength == 0)
    jQuery('.table-warrenty').parent().parent().hide();
  else
    jQuery('.table-warrenty').parent().parent().show();
});

/*jQuery(document).on('change', '.wetheme-custom-radio', function(){
    // console.log($(this).val());
    var optionid = jQuery(this).data('optionid');
    var selectText = jQuery('#SingleOptionSelector-'+optionid+'-button');  // button id where lebel is appare
    var dropdownBox = jQuery('#SingleOptionSelector-'+optionid+'-dropdown li');  // ul li id
    var selectBox = jQuery('#SingleOptionSelector-'+optionid); // select option tag id
    var optionText = jQuery(this).val();  // select value
  console.log(optionText);
    jQuery("#SingleOptionSelector-"+optionid).val(optionText).trigger('change');
   // selectText.html(optionText);
    jQuery('#SingleOptionSelector-'+optionid+'-dropdown li').removeAttr('aria-selected');
    jQuery('#'+optionText).attr('aria-selected','true');
    jQuery('#SingleOptionSelector-'+optionid+'-dropdown li').removeClass('selected');
    jQuery('#'+optionText).addClass('selected');
  //  jQuery('#SingleOptionSelector-'+optionid).val(optionText).change();
    //$('#SingleOptionSelector-0-dropdown li.selected').
  

  });*/


jQuery(document).ready(function() {
      jQuery('.tab').click(function() {
      var tabNumber = $(this).data('tab');
      //var tabId = $(this).data('tabid');
      jQuery(this).addClass("active").siblings().removeClass("active");
      jQuery('.why-vicstore').hide();
      jQuery('.why-choose').hide();
      //jQuery('.tab_content .shopify-section.madix-about.comm-padd').show();

      jQuery.get(tabNumber, function(data) {
        var success = $(data).find('#main');
        jQuery('#content').html(success);
      });
    });
  
  });

jQuery(document).ready(function($){
    $('.seemore').on('click', function () {
        $(this).parents('.readCont').find('#full-content').css('display', 'block');
        $(this).parents('.readCont').find('#halCont').css('display', 'none');
        $(this).css('display', 'none');
        $(this).parents('.readCont').find('.seeless').css('display', 'block');
    });
    $('.seeless').on('click', function () {
        $(this).parents('.readCont').find('#full-content').css('display', 'none');
        $(this).parents('.readCont').find('#halCont').css('display', 'block');
        $(this).css('display', 'none');
        $(this).parents('.readCont').find('.seemore').css('display', 'block');
    });


  
});



  function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }



function onlyNumberInput(event) {
    var key = event.which || event.keyCode;
    if (key && (key < 48 || key > 57) && key !== 8) {
        event.preventDefault();
    }
}

$(function () {
    // Set quantity input field to 1 if left blank
    $("[name=quantity]").blur(function () {
        var quantity = parseInt($(this).val());
        if (isNaN(quantity) || quantity < 1) {
            $(this).val(1);
        }
    });

    // Add event listener to allow only numeric input
    $("[name=quantity]").keypress(onlyNumberInput);

    // Set focus on quantity input field
    $("[name=quantity]").focus();
});



// document.addEventListener('DOMContentLoaded', function () {
//         // Select the quantity input element
//         var quantityInput = document.getElementById('quantity');

//         // Add event listener for input event
//         quantityInput.addEventListener('input', function () {
//             // Get the current value of the quantity input
//             var quantityValue = parseInt(quantityInput.value.trim());

//             // Check if the input is empty or not a number
//             if (isNaN(quantityValue)) {
//                 // If input is empty or not a number, set the quantity value to 1
//                 quantityInput.value = 1;
//             }
//         });

//         // Add event listener for keydown event to disallow special characters
//         quantityInput.addEventListener('keydown', function (event) {
//             // Allow backspace key
//             if (event.key === 'Backspace') {
//                 return;
//             }

//             // Check if the pressed key is a special character or not numeric
//             if (!isNumericKey(event.key)) {
//                 event.preventDefault();
//             }
//         });

//         // Function to check if a key is numeric
//         function isNumericKey(key) {
//             return /\d/.test(key);
//         }
//     });




// document.addEventListener('DOMContentLoaded', function() {
//     // Select the quantity input element
//     var quantityInput = document.getElementById('quantity');

//     // Add event listener for input event
//     quantityInput.addEventListener('input', function() {
//         // Get the current value of the quantity input
//         var quantityValue = parseInt(quantityInput.value.trim());

//         // Check if the input is empty, not a number, or less than or equal to 0
//         if (isNaN(quantityValue) || quantityValue <= 0) {
//             // If input is empty, not a number, or less than or equal to 0, set the quantity value to 1
//             quantityInput.value = 1;
//         }
//     });

//      // Add event listener for keydown event to allow backspace and disallow special characters
//     quantityInput.addEventListener('keydown', function(event) {
//         // Check if the pressed key is backspace or numeric
//         if (isNumericKey(event.key)) {
//             return;
//         }

//         // Prevent input for other keys
//         event.preventDefault();
//     });

//     // Function to check if a key is numeric
//     function isNumericKey(key) {
//         return /\d/.test(key);
//     }
// });




jQuery(document).ready(function($){
  $('.halfcontent .read-moreBtn').on('click', function(){
    $('.halfcontent').hide();
    $('.fullcontent').show();
  });

  $('.fullcontent .read-lessBtn').on('click', function(){
    $('.fullcontent').hide();
    $('.halfcontent').show();
  });
});


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
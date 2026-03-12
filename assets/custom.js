jQuery(document).ready(function($) {

  // Hide product details/dimension/warranty table if data is empty
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

jQuery(document).ready(function() {
  jQuery('.tab').click(function() {
    var tabNumber = $(this).data('tab');
    jQuery(this).addClass("active").siblings().removeClass("active");
    jQuery('.why-vicstore').hide();
    jQuery('.why-choose').hide();

    jQuery.get(tabNumber, function(data) {
      var success = $(data).find('#main');
      jQuery('#content').html(success);
    });
  });
});

jQuery(document).ready(function($) {
  $('.seemore').on('click', function() {
    $(this).parents('.readCont').find('#full-content').css('display', 'block');
    $(this).parents('.readCont').find('#halCont').css('display', 'none');
    $(this).css('display', 'none');
    $(this).parents('.readCont').find('.seeless').css('display', 'block');
  });

  $('.seeless').on('click', function() {
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

$(function() {
  // Set quantity input field to 1 if left blank
  $("[name=quantity]").blur(function() {
    var quantity = parseInt($(this).val());
    if (isNaN(quantity) || quantity < 1) {
      $(this).val(1);
    }
  });

  // Allow only numeric input on quantity fields
  $("[name=quantity]").keypress(onlyNumberInput);
});

jQuery(document).ready(function($) {
  $('.halfcontent .read-moreBtn').on('click', function() {
    $('.halfcontent').hide();
    $('.fullcontent').show();
  });

  $('.fullcontent .read-lessBtn').on('click', function() {
    $('.fullcontent').hide();
    $('.halfcontent').show();
  });
});

function autoUpdateSize() {
  jQuery(".indiv-product").find(".indiv-product-title-text").css("height", "auto");
  var max = -1;
  jQuery(".indiv-product").find(".indiv-product-title-text").each(function() {
    var h = jQuery(this).height();
    max = h > max ? h : max;
  });
  jQuery(".indiv-product").find(".indiv-product-title-text").css('height', max);
}

function autoUpdateHomeProductSize() {
  jQuery(".bestSeller-box").find(".bestSeller-bottom > h6").css("height", "auto");
  var max = -1;
  jQuery(".bestSeller-box").find(".bestSeller-bottom > h6").each(function() {
    var h = jQuery(this).height();
    max = h > max ? h : max;
  });
  jQuery(".bestSeller-box").find(".bestSeller-bottom > h6").css('height', max);
}

jQuery(document).ready(function() {
  autoUpdateSize();
  autoUpdateHomeProductSize();
});

jQuery(window).resize(function() {
  autoUpdateSize();
  autoUpdateHomeProductSize();
});
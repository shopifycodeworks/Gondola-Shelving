jQuery('.video').parent().click(function() {
    if (jQuery(this).children(".video").get(0).paused) {
      jQuery(this).children(".video").get(0).play();
      jQuery(this).children(".playpause").fadeOut();
    } else {
      jQuery(this).children(".video").get(0).pause();
      jQuery(this).children(".playpause").fadeIn();
    }
  });
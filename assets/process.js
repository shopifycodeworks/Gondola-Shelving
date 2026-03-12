(function () {
    "use strict";

    // define variables
    var items = document.querySelectorAll(".timeline .event");

    // check if an element is in viewport
    function isElementInViewport(el) {
      var rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }

    function callbackFunc() {
      for (var i = 0; i < items.length; i++) {
        if (isElementInViewport(items[i])) {
          items[i].classList.add("in-view");
        }
      }
    }

    // listen for events
    window.addEventListener("load", callbackFunc);
    window.addEventListener("resize", callbackFunc);
    window.addEventListener("scroll", callbackFunc);
  })();

</script>
<script>
  // Timeline Scroll Section
  // --------------------------------------------------------------
  var items = $(".timeline li"),
    timelineHeight = $(".timeline ul").height(),
    greyLine = $('.default-line'),
    lineToDraw = $('.draw-line');

  // sets the height that the greyLine (.default-line) should be according to `.timeline ul` height

  // run this function only if draw line exists on the page
  if (lineToDraw.length) {
    $(window).on('scroll', function () {

      // Need to constantly get '.draw-line' height to compare against '.default-line'
      var redLineHeight = lineToDraw.height(),
        greyLineHeight = greyLine.height(),
        windowDistance = $(window).scrollTop(),
        windowHeight = $(window).height() / 4,
        timelineDistance = $(".timeline").offset().top;

      if (windowDistance >= timelineDistance - windowHeight) {
        line = windowDistance - timelineDistance + windowHeight;

        if (line <= greyLineHeight) {
          lineToDraw.css({
            'height': line + 20 + 'px'
          });
        }
      }

      // This takes care of adding the class in-view to the li:before items
      var bottom = lineToDraw.offset().top + lineToDraw.outerHeight(true);
      items.each(function (index) {
        var circlePosition = $(this).offset();

        if (bottom > circlePosition.top) {
          $(this).addClass('in-view');
        } else {
          $(this).removeClass('in-view');
        }
      });
    });
  }
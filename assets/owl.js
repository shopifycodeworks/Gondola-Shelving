jQuery('#logo-slider').owlCarousel({
    loop:true,
    margin:15,
    nav:true,
  navText:['<i class="fa fa-chevron-left" aria-hidden="true"></i>','<i class="fa fa-chevron-right" aria-hidden="true"></i>'],
  dots:false,
  autoplay:true,
autoplayTimeout:2000,
autoplayHoverPause:true,
    responsive:{
        0:{
            items:2
        },
        600:{
            items:3
        },
        1000:{
            items:6
        }
    }
});


jQuery('.featuredCollectionSlider').owlCarousel({
    margin:20,
    nav:true,
  responsiveClass:true,
   navText:['<i class="fa fa-chevron-left" aria-hidden="true"></i>','<i class="fa fa-chevron-right" aria-hidden="true"></i>'],
  dots: false,
  autoplay:true,
autoplayTimeout:2000,
autoplayHoverPause:true,
    responsive:{
      0:{
          items:2,
          margin:8,
          nav:true
        },
        380:{
            items:3,
          margin:10,
          nav:true
        },
        575:{
          items:4,
          margin:15,
          nav:true
        },
        600:{
          items:6,
          margin:15,
          nav:true
        },
        1000:{
            items:8,
            nav:true
        }
    }
});



// jQuery('#coll-tab-slider').owlCarousel({
//     margin:20,
//     nav:true,
//   responsiveClass:true,
//    navText:['<i class="fa fa-chevron-left" aria-hidden="true"></i>','<i class="fa fa-chevron-right" aria-hidden="true"></i>'],
//   dots: false,
//   autoplay:true,
// autoplayTimeout:2000,
// autoplayHoverPause:true,
//     responsive:{
//       0:{
//           items:2,
//           margin:8,
//           nav:true
//         },
//         380:{
//             items:3,
//           margin:10,
//           nav:true
//         },
//         575:{
//           items:4,
//           margin:15,
//           nav:true
//         },
//         600:{
//           items:6,
//           margin:15,
//           nav:true
//         },
//         1000:{
//             items:8,
//             nav:true
//         }
//     }
// });




jQuery('#featured-slider').owlCarousel({
     margin:20,
    nav:true,
  responsiveClass:true,
   navText:['<i class="fa fa-chevron-left" aria-hidden="true"></i>','<i class="fa fa-chevron-right" aria-hidden="true"></i>'],
  dots: false,
  autoplay:true,
autoplayTimeout:2000,
autoplayHoverPause:true,
    responsive:{
      0:{
          items:2,
          margin:3,
          nav:true
        },
        380:{
            items:3,
          margin:3,
          nav:true
        },
        575:{
          items:4,
          margin:5,
          nav:true
        },
        600:{
          items:6,
          margin:8,
          nav:true
        },
        1000:{
            items:8,
            margin:10,
            nav:true
        }
    }
});



jQuery('.all-collection-slider').owlCarousel({
    loop:false,
    margin:20,
    nav:true,
   navText:['<i class="fa fa-chevron-left" aria-hidden="true"></i>','<i class="fa fa-chevron-right" aria-hidden="true"></i>'],
  dots:false,
  autoplay:true,
autoplayTimeout:2000,
autoplayHoverPause:true,
    responsive:{
      0:{
            items:2,
            margin:3
        },
        380:{
          items:3,
          margin:3,
          nav:true
        },
        575:{
            items:4,
            margin:5
        },
        600:{
            items:6,
            margin:8
        },
        1000:{
            items:8,
            margin:10
        }
    }
});


jQuery('#page-slider').owlCarousel({
    margin:20,
    loop:true,
   responsiveClass:true,
  dots:true,
  autoplay:true,
autoplayTimeout:2000,
autoplayHoverPause:true,
    responsive:{
        0:{
            items:2,
            margin:10
        },
        480:{
            items:3,
             margin:10
        },
        575:{
            items:4,
            margin:10
        },
        768:{
            items:5,
            margin:10
        },
        991:{
            items:6,
            margin:10
        },
        1000:{
            items:7
        }
    }
});


jQuery('#bestseller-slider').owlCarousel({
    loop:true,
    margin:20,
  dots:false,
    nav:false,
  autoplay:true,
autoplayTimeout:2000,
autoplayHoverPause:true,
    responsive:{
        0:{
          items:2,
          margin: 5
        },
        480:{
            items:3,
            margin:5,
        },
        575:{
           items:5,
           margin:8,
        },
        600:{
          items:7,
           margin:10,
        },
        1000:{
            items:9
        }
    }
});


jQuery('#onsale-productImage-slider').owlCarousel({
    loop:true,
    margin:20,
  dots:false,
    nav:false,
  autoplay:false,
    responsive:{
        0:{
          items:1,
          margin:5
        },
        600:{
            items:2,
            margin:10
        },
        1000:{
            items:3
        }
    }
});


jQuery('#store-slider').owlCarousel({
    loop:true,
    margin:15,
    nav:true,
  navText:['<i class="fa fa-chevron-left" aria-hidden="true"></i>','<i class="fa fa-chevron-right" aria-hidden="true"></i>'],
  dots:false,
  autoplay:true,
autoplayTimeout:2000,
autoplayHoverPause:true,
    responsive:{
        0:{
          items:1,
          margin:0
        },
        600:{
          items:2,
          margin:10
        },
        1000:{
            items:3
        }
    }
});

jQuery('.about-carausal').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
  navText:['<i class="fa fa-chevron-left" aria-hidden="true"></i>','<i class="fa fa-chevron-right" aria-hidden="true"></i>'],
  dots:false,
  autoplay:true,
autoplayTimeout:4000,
autoplayHoverPause:true,
    responsive:{
        0:{
           nav:false,
           dots:true,
           margin:0,
           items:1
        },
        600:{
          nav:false,
  dots:true,
          margin:8,
            items:1
        },
        1000:{
          nav:true,
  dots:false,
            items:1
        }
    }
});

jQuery('.project-slider').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    autoplay: true,
    dots: false,
    responsive:{
        0:{
            items:1,
          margin:0
        },
        600:{
            items:2,
          margin:8
        },
        1000:{
            items:3
        }
    }
});




jQuery('#features-slider').owlCarousel({
    loop:true,
    margin:15,
    nav:true,
  navText:['<i class="fa fa-chevron-left" aria-hidden="true"></i>','<i class="fa fa-chevron-right" aria-hidden="true"></i>'],
  dots:false,
  autoplay:false,
autoplayTimeout:3000,
autoplayHoverPause:true,
    responsive:{
        0:{
          items:1,
          margin:0
        },
        600:{
          items:2,
          margin:10
        },
        1000:{
            items:4
        }
    }
});

if ($(window).width() < 600) {
jQuery('#benefitsSlider').owlCarousel({
    loop:true,
    margin:15,
    nav:true,
  navText:['<i class="fa fa-chevron-left" aria-hidden="true"></i>','<i class="fa fa-chevron-right" aria-hidden="true"></i>'],
  dots:false,
  autoplay:false,
autoplayTimeout:3000,
autoplayHoverPause:true,
    responsive:{
        0:{
          items:1,
          margin:0
        },
        600:{
          items:2,
          margin:10
        },
        1000:{
            items:3
        }
    }
});
}




jQuery(' .owl_1').owlCarousel({
    loop:false,
    margin:2,	
	responsiveClass:true,autoplayHoverPause:true,
	autoplay:false,
	 slideSpeed: 400,
      paginationSpeed: 400,
	 autoplayTimeout:3000,
    responsive:{
        0:{
            items:3,
            nav:true,
			  loop:false
        },
        600:{
            items:3,
            nav:true,
			  loop:false
        },
        1000:{
            items:3,
            nav:true,
            loop:false
        }
    }
})
jQuery(document) .ready(function(){
var li =  jQuery(".owl-item li ");
jQuery(".owl-item li").click(function(){
li.removeClass('active');
});
});

// for best seller section
jQuery('#tabslider').owlCarousel({
    loop:false,
    margin:10,
  dots: false,
    nav:true,
  navText:['<i class="fa fa-chevron-left" aria-hidden="true"></i>','<i class="fa fa-chevron-right" aria-hidden="true"></i>'],
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:3
        }
    }
});



  jQuery(document).ready(function($) {
  $(".show-more-content").hide();
     $(".read-moreBtn").click(function(){
      $(".show-less-content").hide();
        $(".show-more-content").show();
    });
    $(".read-lessBtn").click(function(){
      $(".show-more-content").hide();
      $(".show-less-content").show();
    });
  });








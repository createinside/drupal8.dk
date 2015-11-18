
$(document).ready(function() {
 
  
  /* owlCarousel */

  var owl = $(".owl-carousel-img");
 
    owl.owlCarousel({
       
        itemsCustom : [
          [0, 1],
          [450, 2],
          [600, 3],
          [700, 3],
          [1000, 3],
          [1200, 3],
          [1400, 3],
          [1600, 3]
        ],
        navigation : true
   
    });
  /* end owlCarousel */
 
});


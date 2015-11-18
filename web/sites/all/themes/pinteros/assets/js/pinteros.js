(function($) {
  Drupal.Pinteros = Drupal.Pinteros || {};
  Drupal.behaviors.actionPinteros = {
    attach: function(context) {
      $('.btn-btt').smoothScroll({
        speed: 600
      });

      Drupal.Pinteros.showSecondaryMenu();
      Drupal.Pinteros.backToTop();
      Drupal.Pinteros.mobileForum();

      $(window).load(function() {
        Drupal.Pinteros.initMasonry();
      });

      $('[data-toggle="offcanvas"]').click(function () {
        $('.row-offcanvas').toggleClass('active');
      });

      // Mobile menu
      if ($(window).width() <= 991) {
        $('.mobile-main-menu .region-primary-menu').accordionMenu();
      }
      $(window).resize(function() {
        if ($(window).width() <= 991) {
          $('.mobile-main-menu .region-primary-menu').accordionMenu();
        }
      });

      $('#menu-toggle').mobileMenu({
        targetWrapper: '#main-menu-inner',
        targetMenu: '#block-mainmenu'
      });
    }
  };

  Drupal.Pinteros.showSecondaryMenu = function () {
    $('.secondary-menu-button').click(function () {
      console.log('aaa');
      $('#secondary-menu.in').css({'width' : 'auto'});
    })
  };

  Drupal.Pinteros.backToTop = function () {
    $(window).load(function () {
      if($(this).scrollTop()){
        $('.btn-btt').fadeIn();
      }
      else{
        $('.btn-btt').fadeOut();
      }
    });
    $(window).scroll(function () {
      if($(this).scrollTop()){
        $('.btn-btt').fadeIn();
      }
      else{
        $('.btn-btt').fadeOut();
      }
    });

    $('.btn-btt').click(function () {
      $('html, body').animate({scrollTop : 0}, 700);
      return false;
    })
  };

  Drupal.Pinteros.initMasonry = function () {
	$('.view-frontpage .view-content .views-row article').each(function (i, e) {
		var self = $(this);
		var classes = self.attr('class').split(' ');
		var pinterosClass = classes[classes.length-1];
		var parent = self.parent();
		parent.addClass(pinterosClass);
		self.removeClass(pinterosClass);
		
		/*
		if (pinterosClass == "pinteros-medium") {
			parent.css({ 'width' : '456px' });
		} else if (pinterosClass == "pinteros-large") {
			parent.css({ 'width' : '684px' });
		} else { //if (pinterosClass == "pinteros-small")
			parent.css({ 'width' : '228px' });
		}*/
	});
	
    $('.view-frontpage > .view-content, .view-taxonomy-term, .showcase-list, .categories-list').masonry({
      itemSelector: '.views-row'
    });

    $('#sidebar-first .region-sidebar-first').masonry({
      itemSelector: '.block'
    });
  }

  Drupal.Pinteros.mobileForum = function () {
    if($('.forum').find('.forum-inner').length == 0)
      $('.forum').append('<div class="forum-inner"></div>');
    $('.forum table').appendTo('.forum-inner');
  }


})(jQuery);

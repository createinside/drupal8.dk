(function ($) {

Drupal.WeebPal = Drupal.WeebPal || {};
Drupal.WeebPal.currentWidth = -1;
Drupal.WeebPal.currentType = -1;
Drupal.WeebPal.screens = [0, 767.5, 991.5, 989.5];
Drupal.WeebPal.mobileThreadHold = 991.5;
Drupal.WeebPal.clearMinHeight = function(element) {
  $(element).css('min-height', '0px');
}

Drupal.WeebPal.equalHeight = function() {
}

Drupal.WeebPal.equalHeightActions = function() {
  Drupal.WeebPal.equalHeight();
}

Drupal.WeebPal.onClickResetDefaultSettings = function() {
  var answer = confirm(Drupal.t('Are you sure you want to reset your theme settings to default theme settings?'))
  if (answer){
    $("input:hidden[name = light_use_default_settings]").attr("value", 1);
    return true;
  }

  return false;
}

Drupal.WeebPal.eventStopPropagation = function(event) {
  if (event.stopPropagation) {
    event.stopPropagation();
  }
  else if (window.event) {
    window.event.cancelBubble = true;
  }
}

Drupal.WeebPal.setInputPlaceHolder = function(name, text, selector) {
  selector = selector == undefined ? '' : selector + ' ';

  if ($.support.placeholder) {
    $(selector + 'input[name="' + name + '"]').attr('placeholder', Drupal.t(text));
  }
  else {
    $(selector + 'input[name="' + name + '"]').val(Drupal.t(text));
    $(selector + 'input[name="' + name + '"]').focus(function(){
      if(this.value == Drupal.t(text)) {
        this.value='';
      }
    }).blur(function(){
      if(this.value == '') {
        this.value=Drupal.t(text);
      }
    });
  }
}

Drupal.behaviors.actionWeebPal = {
  attach: function (context) {
    $('#change-skin').once('load').on('click', function(){
      $('#change-skin i').toggleClass('fa-spin');
      $('#change_skin_menu_wrapper').toggleClass('fly-out');
    });
    $(window).load(function() {
      Drupal.WeebPal.equalHeightActions();
    });
    //Drupal.WeebPal.setInputPlaceHolder('search_block_form', 'Keywords', '#search-block-form');
    //Drupal.WeebPal.setInputPlaceHolder('keys', 'Keywords', '#search-form');
    $(".search-block-form > .content").prepend('<span class="fa fa-search search-icon"> </span>');


    $(window).resize(function() {
      var width = $(window).innerWidth();
      if((width - Drupal.WeebPal.mobileThreadHold) * (Drupal.WeebPal.currentWidth - Drupal.WeebPal.mobileThreadHold) < 0) {
        if(width > Drupal.WeebPal.mobileThreadHold) {
          $("#main-menu-inner").css({width: ""});
          $("#secondary-menu").css({width: ""});
        }
      }
      Drupal.WeebPal.currentWidth = width;
    });

    //$(window).scroll(function() {
    //  if($(window).scrollTop() > 200) {
    //    $('.btn-btt').show();
    //  }
    //  else {
    //    $('.btn-btt').hide();
    //  }
    //}).resize(function(){
    //  if($(window).scrollTop() > 200) {
    //    $('.btn-btt').show();
    //  }
    //  else {
    //    $('.btn-btt').hide();
    //  }
    //});
    $("#block-search-form .content").prepend('<span class="fa fa-search search-icon"> </span>');

    $(".search-block-form .search-icon").click(function() {
      if($(this).closest('.search-block-form').hasClass('hover')) {
        $(this).closest('.search-block-form').removeClass('hover');
      }
      else {
        $(this).closest('.search-block-form').addClass('hover');
      }
      if($("#main-menu-inner").hasClass('in')){
        var main_menu = $("#main-menu-inner");
        main_menu.removeClass('collapse in');
        main_menu.addClass('collapsing');
        main_menu.css("width", 0);
        main_menu.removeClass('collapsing');
        //$("#main-menu-inner").removeClass('in');
      }
    });

    $("#block-search-form").click(function(e) {
      Drupal.WeebPal.eventStopPropagation(e);
    });
    $('body').click(function() {
      if($('#block-search-form').hasClass('hover')) {
        $('#block-search-form').removeClass('hover');
      }
    });

  }
};
})(jQuery);

/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true,
 strict:true, curly:true, browser:true, jquery:true, maxerr:50 */
//smooth scroll on page
$(document).ready(function() {
  'use strict';

  $('.navbar a, .navbar li a, .brand, #footer li a, .more a, a.go-top')
  .bind('click', function(event) {
    var $anchor = $(this),
    scrollVal = $($anchor.attr('href')).offset().top - 60;

    if (scrollVal < 0) {
      scrollVal = 0;
    }
    
    $([document.documentElement, document.body]).animate({
      scrollTop: scrollVal
    }, 1000, 'easeInOutExpo');

    event.preventDefault();
  });

  //responsive embed videos
  $('.video').fitVids();

  //custom scrollbar
  $('html, .modal').niceScroll({
    scrollspeed: 60,
    mousescrollstep: 35,
    cursorwidth: 10,
    cursorborder: 0,
    cursorcolor: '#e3e4e5',
    cursorborderradius: '3px',
    autohidemode: false,
    horizrailenabled: false
  });

  //make intro carousel height of window
  $('#carousel_intro .item').css({'height': ($(window).height()) + 'px'});
  $(window).resize(function() {
    $('#carousel_intro .item').css({'height': ($(window).height()) + 'px'});
  });

  //carousel swipe and autoslide
  var carousels = [
    'intro',
    'content',
    'modal',
    'header_1',
    'header_3'
  ];

  $.each(carousels, function() {
    var suffix = Array.prototype.slice.call(this).join(''),
    element = '#carousel_' + suffix;
    $(element).carousel({
      interval: 0,
      pause: false
    });
    jQuery(element).touchwipe({
      wipeLeft: function() { jQuery(element).carousel('next'); },
      wipeRight: function() { jQuery(element).carousel('prev'); },
      min_move_x: 20,
      preventDefaultEvents: false
    });
  });

  //animated elements
  if ($('.no-touch').length) {
    skrollr.init({
      edgeStrategy: 'set',
      easing: {
        WTF: Math.random,
        inverted: function(p) {
          return 1 - p;
        }
      },
      smoothScrolling: true,
      forceHeight: false
    });
  }
});

$(window).on('load', function() { 
  'use strict';
  //preloader
  $(window).scrollTop(0);
  $('#status').fadeOut();
  $('#preloader').delay(350).fadeOut('slow');

  //modal trigger
  $('.modal').bigmodal('hide');

  //tooltip and popover trigger
  $('[data-thumb=tooltip]').tooltip();
  $('[data-thumb=popover]').popover();

  //if link points to nowhere (aka #) then don't go to top of page
  $('a[href="#"]').click(function() {
    return false;
  });

});


/*-----------------------------------------------------------------------------------------------*/
/* jQuery.ScrollTo 1.4.6																		 */
/* Copyright (c) 2007-2013 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com  */
/* Dual licensed under MIT and GPL.																 */
/*-----------------------------------------------------------------------------------------------*/
;(function($){var h=$.scrollTo=function(a,b,c){$(window).scrollTo(a,b,c)};h.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};h.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(e,f,g){if(typeof f=='object'){g=f;f=0}if(typeof g=='function')g={onAfter:g};if(e=='max')e=9e9;g=$.extend({},h.defaults,g);f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;g.offset=both(g.offset);g.over=both(g.over);return this._scrollable().each(function(){if(e==null)return;var d=this,$elem=$(d),targ=e,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}$.each(g.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=h.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(g.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=g.offset[pos]||0;if(g.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*g.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&g.queue){if(old!=attr[key])animate(g.onAfterFirst);delete attr[key]}});animate(g.onAfter);function animate(a){$elem.animate(attr,f,g.easing,a&&function(){a.call(this,targ,g)})}}).end()};h.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);

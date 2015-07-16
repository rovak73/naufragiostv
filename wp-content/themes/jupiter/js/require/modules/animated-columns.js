define(['jquery', 'window'], function($, win) {
	'use strict';

	var Public = {
		init: init
	};


	var equalheight = function(container){

	var currentTallest = 0,
	     currentRowStart = 0,
	     rowDivs = new Array(),
	     $el,
	     topPosition = 0;
	 $(container).each(function() {

	   $el = $(this);
	   $($el).height('auto')
	   topPosition = $el.position().top;

	   if (currentRowStart != topPosition) {
	     for (var currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
	       rowDivs[currentDiv].height(currentTallest);
	     }
	     rowDivs.length = 0; // empty the array
	     currentRowStart = topPosition;
	     currentTallest = $el.height();
	     rowDivs.push($el);
	   } else {
	     rowDivs.push($el);
	     currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
	  }
	   for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
	     rowDivs[currentDiv].height(currentTallest);
	   }

	 });
	}

    function init(config) {

        var $this = $('#' + config.id);

        function prepareCols() {

            equalheight('.vc_row .animated-column-icon');
            equalheight('.vc_row .animated-column-title');
            equalheight('.vc_row .animated-column-desc');


                if ($this.hasClass('full-style')) {
                    $this.find('.animated-column-item').each(function() {
                        var $this = $(this),
                            contentHeight = $this.find('.animated-column-icon').innerHeight() + $this.find('.animated-column-title').innerHeight() + $this.find('.animated-column-desc').innerHeight() + $this.find('.animated-column-btn').innerHeight();

                        $this.height(contentHeight * 1.5 + 50);

                        var $box_height = $this.outerHeight(true),
                            $icon_height = $this.find('.animated-column-icon').height();

                        $this.find('.animated-column-holder').css({
                            'paddingTop': $box_height / 2 - $icon_height
                        });


                        $this.animate({opacity:1}, 300);
                    });
                } else {
                    $this.find('.animated-column-item').each(function() {
                        var $this = $(this),
                            $half_box_height = $this.outerHeight(true) / 2,
                            $icon_height = $this.find('.animated-column-icon').outerHeight(true)/2,
                            $title_height = $this.find('.animated-column-simple-title').outerHeight(true)/2;

                        $this.find('.animated-column-holder').css({
                            'paddingTop': $half_box_height - $icon_height
                        });
                        $this.find('.animated-column-title').css({
                            'paddingTop': $half_box_height - $title_height + ($icon_height * 2)
                        });

                        $this.animate({opacity:1}, 300);

                    });
                }
        }
        prepareCols();

        $(window).on("resize", function() {
            setTimeout(prepareCols, 1000);
        });

        if($this.hasClass('full-style')) {
        	$this.find('.animated-column-item').hover(
            function() {
                TweenLite.to($(this).find(".animated-column-holder"), 0.5, {
                    top: '-15%',
                    ease: Back.easeOut
                });
                TweenLite.to($(this).find(".animated-column-desc"), 0.5, {
                    top: '-50%',
                    ease: Expo.easeOut
                }, 0.4);
                TweenLite.to($(this).find(".animated-column-btn"), 0.3, {
                    top: '-50%',
                    ease: Expo.easeOut
                }, 0.6);
            },
            function() {

                TweenLite.to($(this).find(".animated-column-holder"), 0.5, {
                    top: '0%',
                    ease: Back.easeOut, easeParams:[3]
                });
                TweenLite.to($(this).find(".animated-column-desc"), 0.5, {
                    top: '100%',
                    ease: Back.easeOut
                }, 0.4);
                TweenLite.to($(this).find(".animated-column-btn"), 0.5, {
                    top: '100%',
                    ease: Back.easeOut
                }, 0.2);
            });
        }

        if($this.hasClass('.simple-style')) {
         	$this.find('.animated-column-item').hover(
            function() {
                TweenLite.to($(this).find(".animated-column-holder"), 0.7, {
                    top: '100%',
                    ease: Expo.easeOut
                });
                TweenLite.to($(this).find(".animated-column-title"), 0.7, {
                    top: '0%',
                    ease: Back.easeOut
                }, 0.2);
            },
            function() {
                TweenLite.to($(this).find(".animated-column-holder"), 0.7, {
                    top: '0%',
                    ease: Expo.easeOut
                });
                TweenLite.to($(this).find(".animated-column-title"), 0.7, {
                    top: '-100%',
                    ease: Back.easeOut
                }, 0.2);
            });
        };

    }

	return Public;

});
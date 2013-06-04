(function($){
	"use strict";

	var carouselAds = function() {
		var SELF = this;
		SELF.proportion    = '';
		SELF.screenPadding = '';
		SELF.$window       = $( window );
		SELF.$stylesheetDirectory = stylesheetDirectory; // localized variable

		SELF.init = function() {
			SELF.proportion = 85;
			SELF.screenPadding = 110;
			$( document.body ).on( 'jp_carousel.afterOpen', SELF.insertAd );
		};

		// return screen dimensions, orig -> jetpack-carousel.js line 631
		SELF.slideDimensions = function (){
			return {
				width: SELF.$window.width() - ( SELF.screenPadding * 2 ),
				height: ( ( SELF.$window.height() / 100 ) * SELF.proportion ) - 60
			};
		};

		// return element original dimensions, orig -> jetpack-carousel.js line 856
		SELF.originalDimensions = function ( elem ) {
			var splitted = elem.data('orig-size').split(',');
			return {width: parseInt(splitted[0], 10), height: parseInt(splitted[1], 10)};
		};

		// return new width and height for element, orig -> jetpack-carousel.js line 650
		SELF.bestFit = function( elem ){
			var max        = SELF.slideDimensions(),
					width      = 1,
					height     = 1,
					orig       = SELF.originalDimensions( elem ),
					orig_ratio = orig.width / orig.height,
					w_ratio    = 1,
					h_ratio    = 1;

			if ( orig.width > max.width )
				w_ratio = max.width / orig.width;
			if ( orig.height > max.height )
				h_ratio = max.height / orig.height;

			if ( w_ratio < h_ratio ) {
				width = max.width;
				height = width / orig_ratio;
			} else if ( h_ratio < w_ratio ) {
				height = max.height;
				width = height * orig_ratio;
			} else {
				width = orig.width;
				height = orig.height;
			}

			return {
				width: width,
				height: height
			};
		};

		// resize slide and padding to fit the stage, orig jetpack-carousel.js line 709
		SELF.fitSlide = function( elem ){
			var dimensions = SELF.bestFit( elem ),
					max        = SELF.slideDimensions();

			dimensions.left = 0;
			dimensions.top = ( (max.height - dimensions.height) * 0.5 ) + 40;
			elem.css( dimensions );
		};

		SELF.ad = function() {
			var container = document.createElement( 'div' ),
			    img       = document.createElement( 'img');
			container.className = 'jp-carousel-slide ad';
			// Define target for ad
			container.innerHTML = '<a href="http://mysite.com/target" target="_blank"><img src="' + SELF.$stylesheetDirectory + '/images/carousel-ad.png"></a>';
			var $ad = $( container).data('title', '')
					.data('desc', '')
					.data('caption', '')
					.data('attachment-id', '')
					.data('orig-size', '300, 250')
					.data('comments-opened', 0)
					.data('image-meta', '')
					.data('medium-file', '')
					.data('large-file', '')
					.data('orig-file', '');

			return $ad.on( 'click', SELF.adClick );
		};

		SELF.insertAd = function(e) {
			setTimeout(function(){
				var $target = $( document.querySelector( '.jp-carousel' )),
				    $ad     = SELF.ad();

				$target.append( $ad );

				// center ad on stage because slide was added after carousel was
				// initialized, further resizing is handled natively by the
				// jetpack carousel
				SELF.fitSlide( $ad );

			}, 100);
		};

		SELF.adClick = function(e) {
			e.stopPropagation();
		};

	};

	$(document).ready( function(){
		var newCarouselAds = new carouselAds();
		newCarouselAds.init();
	});

})(jQuery);
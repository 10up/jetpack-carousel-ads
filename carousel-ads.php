<?php

new Carousel_Ads;
class Carousel_Ads{

	public function __construct() {
		add_action( 'wp_enqueue_scripts', array( $this, 'scripts' ) );
	}

	function scripts() {
		wp_enqueue_script( 'carousel-ad', get_template_directory_uri() . '/js/carousel-ads.js', array( 'jquery' ), null, true );

		// Define directory for js file
		wp_localize_script( 'carousel-ad', 'stylesheetDirectory', get_stylesheet_directory_uri() );
	}

}

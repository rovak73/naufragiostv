<?php

/**
 * LayerSlider loader.
 * Adds layerSlider shortcode to visual composer and fixes issue in frontend editor
 *
 * @since 4.3
 */
class Vc_Vendor_Layerslider implements Vc_Vendor_Interface {
	/**
	 * @var int - used to detect id for layerslider in frontend
	 */
	protected static $instanceIndex = 1;

	/**
	 * Add layerslayer shortcode to visual composer, and add fix for ID in frontend editor
	 * @since 4.3
	 */
	public function load() {
		add_action( 'vc_after_mapping', array( &$this, 'buildShortcode' ) );

	}

	/**
	 * Add shortcode and filters for layerslider id
	 * @since 4.3
	 */
	public function buildShortcode() {
		if ( ! class_exists( 'LS_Sliders' ) ) {
			include_once LS_ROOT_PATH . '/classes/class.ls.sliders.php';
		}
		$ls = LS_Sliders::find( array(
			'limit' => 999,
			'order' => 'ASC',
		) );
		$layer_sliders = array();
		if ( ! empty( $ls ) ) {
			foreach ( $ls as $slider ) {
				$layer_sliders[ $slider['name'] ] = $slider['id'];
			}
		} else {
			$layer_sliders[ __( 'No sliders found', 'js_composer' ) ] = 0;
		}
		vc_map( array(
			'base' => 'layerslider_vc',
			'name' => __( 'Layer Slider', 'js_composer' ),
			'icon' => 'icon-wpb-layerslider',
			'category' => __( 'Content', 'js_composer' ),
			'description' => __( 'Place LayerSlider', 'js_composer' ),
			'params' => array(
				array(
					'type' => 'textfield',
					'heading' => __( 'Widget title', 'js_composer' ),
					'param_name' => 'title',
					'description' => __( 'Enter text which will be used as widget title. Leave blank if no title is needed.', 'js_composer' )
				),
				array(
					'type' => 'dropdown',
					'heading' => __( 'LayerSlider ID', 'js_composer' ),
					'param_name' => 'id',
					'admin_label' => true,
					'value' => $layer_sliders,
					'description' => __( 'Select your LayerSlider.', 'js_composer' )
				),
				array(
					'type' => 'textfield',
					'heading' => __( 'Extra class name', 'js_composer' ),
					'param_name' => 'el_class',
					'description' => __( 'If you wish to style particular content element differently, then use this field to add a class name and then refer to it in your css file.', 'js_composer' )
				)
			)
		) );

		// Load layer slider shortcode && change id
		if ( vc_is_frontend_ajax() || vc_is_frontend_editor() ) {
			add_filter( 'vc_layerslider_shortcode', array( &$this, 'setId' ) );
		}
	}

	/**
	 * @since 4.3
	 *
	 * @param $output
	 *
	 * @return string
	 */
	public function setId( $output ) {
		return preg_replace( '/(layerslider_\d+)/', '$1_' . time() . '_' . self::$instanceIndex ++, $output );
	}
}
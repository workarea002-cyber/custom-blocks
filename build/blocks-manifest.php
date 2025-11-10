<?php
// This file is generated. Do not modify it manually.
return array(
	'accordion' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'custom-blocks/my-custom-blocks',
		'version' => '0.1.0',
		'title' => 'Accordion',
		'category' => 'widgets',
		'icon' => 'smiley',
		'description' => 'Example block scaffolded with Create Block tool.',
		'example' => array(
			
		),
		'attributes' => array(
			
		),
		'supports' => array(
			'html' => false,
			'border' => array(
				'color' => true,
				'radius' => true,
				'width' => true,
				'style' => true
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true
			),
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => true,
				'width' => true,
				'style' => true
			),
			'shadow' => true,
			'allowedBlocks' => true
		),
		'textdomain' => 'my-custom-blocks',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	)
);

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	InnerBlocks,
	InspectorControls,
	ColorPalette,
	useBlockProps,
} from "@wordpress/block-editor";
import {
	PanelBody,
	RangeControl,
	__experimentalInputControl as InputControl,
} from "@wordpress/components";
import { useState } from "react";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const {
		textColor,
		backgroundColor,
		paddingTop,
		paddingRight,
		paddingBottom,
		paddingLeft,
		gap,
	} = attributes;

	const blockProps = useBlockProps({
		className: "accordion-wrapper",
		style: {
			"--accordion-padding": attributes.padding,
			"--accordion-bg": attributes.backgroundColor,
			"--accordion-textColor": attributes.textColor,
			"--accordion-gap": attributes.gap,
			"--padding-top": attributes.paddingTop,
		},
	});

	console.log(blockProps);

	return (
		<>
			<InspectorControls>
				<PanelBody title="Accordion Styles">
					<p>
						<strong>Background Color</strong>
					</p>
					<ColorPalette
						title="Background Color"
						value={backgroundColor}
						onChange={(newColor) =>
							setAttributes({ backgroundColor: newColor })
						}
					/>
					<p>
						<strong>Text Color</strong>
					</p>
					<ColorPalette
						value={textColor}
						onChange={(newColor) => setAttributes({ textColor: newColor })}
					/>
					<InputControl
						__next40pxDefaultSize
						label="Padding"
						value={parseInt(paddingTop || 0)}
						onChange={(val) => setAttributes({ paddingTop: `${val}px` })}
						min={0}
						max={50}
					/>
					<RangeControl
						label="Gap between items"
						value={parseInt(gap || 16)}
						onChange={(val) => setAttributes({ gap: `${val}px` })}
						min={0}
						max={50}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<InnerBlocks
					allowedBlocks={["custom-blocks/accordion-item"]}
					template={[["custom-blocks/accordion-item"]]}
				/>
			</div>
		</>
	);
}

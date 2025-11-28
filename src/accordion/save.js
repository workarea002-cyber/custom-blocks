/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save({ attributes }) {
	const {
		textColor,
		backgroundColor,
		accordionGap,
		headerPadding,
		contentPadding,
		contentSpacing,
		borderRadius,
		iconColor,
		multiple,
		fontSize,
		iconSize,
	} = attributes;

	const blockProps = useBlockProps.save({
		style: {
			// Background Color
			"--accordion-bg": backgroundColor.bgColor,
			"--accordion-active-bg": backgroundColor.activeBgColor,
			"--accordion-header-bg": backgroundColor.headerBgColor,
			"--accordion-content-bg": backgroundColor.contentBgColor,

			// Text Color
			"--accordion-header-color": textColor.headingColor,
			"--accordion-active-header-color": textColor.activeHeadingColor,
			"--accordion-content-color": textColor.contentColor,

			// Spacing
			"--accordion-gap": accordionGap,
			"--accordion-content-spacing": contentSpacing,

			// Padding
			"--accordion-headerPadding-top": headerPadding.top,
			"--accordion-headerPadding-right": headerPadding.right,
			"--accordion-headerPadding-bottom": headerPadding.bottom,
			"--accordion-headerPadding-left": headerPadding.left,

			"--accordion-contentPadding-top": contentPadding.top,
			"--accordion-contentPadding-right": contentPadding.right,
			"--accordion-contentPadding-bottom": contentPadding.bottom,
			"--accordion-contentPadding-left": contentPadding.left,

			// Border
			"--accordion-radius-top": borderRadius.top,
			"--accordion-radius-right": borderRadius.right,
			"--accordion-radius-bottom": borderRadius.bottom,
			"--accordion-radius-left": borderRadius.left,

			// Icon
			"--accordion-icon-size": iconSize,
			"--accordion-icon-color": iconColor.normal,
			"--accordion-icon-active-color": iconColor.active,

			// Font
			"--accordion-heading-fontsize": fontSize.heading,
			"--accordion-heading-fontweight": fontSize.headingWeight,
			"--accordion-heading-lineheight": fontSize.headerLineHeight,
			"--accordion-heading-letterspacing": fontSize.headerLetterSpacing,
			"--accordion-content-fontsize": fontSize.content,
		},
		"data-multiple": multiple,
	});

	return (
		<div {...blockProps}>
			<InnerBlocks.Content />
		</div>
	);
}

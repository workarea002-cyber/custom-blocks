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
	const blockProps = useBlockProps.save({
		style: {
			"--accordion-bg": attributes.backgroundColor,
			"--accordion-textColor": attributes.textColor,
			"--accordion-gap": attributes.gap,
			"--accordion-header-padding-top": attributes.padding.top,
			"--accordion-header-padding-right": attributes.padding.right,
			"--accordion-header-padding-bottom": attributes.padding.bottom,
			"--accordion-header-padding-left": attributes.padding.left,
			"--theme-content-spacing": attributes.contentSpacing,
		},
	});

	return (
		<div {...blockProps}>
			<InnerBlocks.Content />
		</div>
	);
}

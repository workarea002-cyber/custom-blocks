/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InnerBlocks, RichText, useBlockProps } from "@wordpress/block-editor";

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
	const { headingTag, headingContent } = attributes;
	return (
		<div className="accordion" {...useBlockProps.save()}>
			<div className="accordion-header">
				<div className="accordion-heading">
					<RichText.Content
						tagName={headingTag} // dynamic tag (h2, h3, etc.)
						value={headingContent}
					/>
				</div>
				<div className="accordion-icon-btn">{/* custom image or icon */}</div>
			</div>

			<div className="accordion-content">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}

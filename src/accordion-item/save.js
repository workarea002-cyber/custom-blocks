/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InnerBlocks, RichText, useBlockProps } from "@wordpress/block-editor";
import { ChevronUp } from "../accordion/assets";
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
	const { headingTag, headingContent, iconUrl } = attributes;

	return (
		<div {...useBlockProps.save()}>
			<div className="accordion-header">
				<RichText.Content
					tagName={headingTag} // dynamic tag (h2, h3, etc.)
					value={headingContent}
				/>
				<div className="accordion-icon-btn">
					<img
						className="open-icon"
						src={iconUrl.openUrl}
						alt="icon"
						width={24}
						height={24}
					/>
					<img
						className="close-icon"
						src={iconUrl.closeUrl}
						alt="icon"
						width={24}
						height={24}
					/>
				</div>
			</div>

			<div className="accordion-content">
				<div>
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	);
}

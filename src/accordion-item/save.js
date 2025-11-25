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

const Icon = ({ type, url, className }) => {
	if (type === "default") {
		return (
			<span className={className} dangerouslySetInnerHTML={{ __html: url }} />
		);
	}

	return <img className={className} src={url} alt="" width={24} height={24} />;
};

export default function save({ attributes }) {
	const { headTag, headingContent, accordionIcon, iconType, blockId } =
		attributes;

	const TagName = headTag || "h3";

	return (
		<div {...useBlockProps.save()}>
			<TagName className="accordion-header-wrap">
				<button
					id={`accordion-header-${blockId}`}
					className="accordion-trigger"
					aria-expanded="false"
					aria-controls={`accordion-content-${blockId}`}
				>
					<RichText.Content
						tagName="span"
						className="heading"
						value={headingContent}
					/>
					<span className="accordion-icon-wrap">
						<Icon
							type={iconType}
							url={accordionIcon.openUrl}
							className="open-icon"
						/>
						<Icon
							type={iconType}
							url={accordionIcon.closeUrl}
							className="close-icon"
						/>
					</span>
				</button>
			</TagName>

			<div
				id={`accordion-content-${blockId}`}
				className="accordion-content"
				role="region"
				aria-labelledby={`accordion-header-${blockId}`}
			>
				<div className="inner-wrapper">
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	);
}

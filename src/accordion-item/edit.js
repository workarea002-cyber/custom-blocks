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
import { InnerBlocks, RichText, useBlockProps } from "@wordpress/block-editor";

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
	const { headingContent, headingTag } = attributes;

	return (
		<div {...useBlockProps()}>
			<div className="accordion-header">
				<div className="accordion-heading">
					<RichText
						tagName={headingTag} // dynamic tag (h2, h3, etc.)
						value={headingContent}
						onChange={(value) => setAttributes({ headingContent: value })}
						placeholder="Accordion title..."
						allowedFormats={["core/bold", "core/italic"]}
					/>
				</div>
				<div className="accordion-icon-btn">{/* custom image or icon */}</div>
			</div>

			<div className="accordion-content">
				<InnerBlocks
					allowedBlocks={["core/paragraph", "core/image", "core/list"]}
					template={[["core/paragraph", { placeholder: "Add your text..." }]]}
				/>
			</div>
		</div>
	);
}

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
	RichText,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import { useEffect } from "react";
import { Icons } from "../accordion/constants";

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
export default function Edit({ attributes, setAttributes, context }) {
	const { headingContent, headingTag, allowedBlocks, iconUrl, iconType } =
		attributes;

	const iconContext = context["accordionIcons"];
	const customIconContext = context["accordionCustomIcons"];
	const iconContextType = context["iconType"];

	useEffect(() => {
		const getOpenIconUrl =
			iconContext.openUrl == ""
				? customIconContext.openUrl
				: customIconContext.openUrl == ""
				? iconContext.openUrl
				: Icons.find((item) => item.id == iconContext.openId).svg;

		const getCloseIconUrl =
			iconContext.closeUrl == ""
				? customIconContext.closeUrl
				: customIconContext.closeUrl == ""
				? iconContext.closeUrl
				: Icons.find((item) => item.id == iconContext.closeId).svg;

		if (
			getOpenIconUrl !== iconUrl.openUrl &&
			getCloseIconUrl !== iconUrl.closeUrl
		) {
			setAttributes({
				iconUrl: {
					...iconUrl,
					openUrl: getOpenIconUrl,
					closeUrl: getCloseIconUrl,
				},
				iconType: iconContextType,
			});
		}
	}, [
		customIconContext?.openUrl,
		customIconContext?.closeUrl,
		iconContext?.openUrl,
		iconContext?.closeUrl,
		iconContextType,
	]);

	const innerBlockProps = useInnerBlocksProps({
		allowedBlocks,
		template: [["core/paragraph", { placeholder: "Add your text..." }]],
		orientation: "vertical",
	});

	return (
		<div {...useBlockProps()}>
			<div className="accordion-header">
				<RichText
					tagName={headingTag} // dynamic tag (h2, h3, etc.)
					value={headingContent}
					onChange={(value) => setAttributes({ headingContent: value })}
					placeholder="Accordion title..."
					allowedFormats={["core/bold", "core/italic"]}
				/>
				<div className="accordion-icon-btn">
					{iconType === "default" ? (
						<>
							<span
								className="open-icon"
								dangerouslySetInnerHTML={{ __html: iconUrl.openUrl }}
							/>
							<span
								className="close-icon"
								dangerouslySetInnerHTML={{ __html: iconUrl.closeUrl }}
							/>
						</>
					) : (
						<>
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
						</>
					)}
				</div>
			</div>

			<div className="accordion-content">
				<div {...innerBlockProps}></div>
			</div>
		</div>
	);
}

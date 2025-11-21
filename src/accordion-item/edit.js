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
	const { headingContent, headTag, allowedBlocks, accordionIcon, iconType } =
		attributes;

	const defaultIconContext = context["defaultAccordionIcons"];
	const customIconContext = context["customAccordionIcons"];
	const iconTypeContext = context["iconType"];
	const headingTagContext = context["headingTag"];

	useEffect(() => {
		let openUrl, closeUrl;

		if (headTag !== headingTagContext) {
			setAttributes({ headTag: headingTagContext });
		}

		if (iconType !== iconTypeContext) {
			setAttributes({ iconType: iconTypeContext });
		}

		if (iconType == "custom") {
			openUrl = customIconContext.openUrl;
			closeUrl = customIconContext.closeUrl;
		} else {
			const openId = defaultIconContext.openId;
			const closeId = defaultIconContext.closeId;

			openUrl = Icons.find((i) => i.id === openId)?.svg;
			closeUrl = Icons.find((i) => i.id === closeId)?.svg;
		}

		if (
			accordionIcon.openUrl !== openUrl ||
			accordionIcon.closeUrl !== closeUrl
		) {
			setAttributes({
				accordionIcon: {
					...accordionIcon,
					openUrl,
					closeUrl,
				},
			});
		}
	}, [
		iconTypeContext,
		headingTagContext,
		defaultIconContext.openId,
		defaultIconContext.closeId,
		customIconContext.openUrl,
		customIconContext.closeUrl,
	]);

	const innerBlockProps = useInnerBlocksProps({
		allowedBlocks,
		className: "inner-wrapper",
		template: [["core/paragraph", { placeholder: "Add your text..." }]],
		orientation: "vertical",
	});

	return (
		<div {...useBlockProps()}>
			<div className="accordion-header">
				<RichText
					tagName={headTag}
					value={headingContent}
					className="heading"
					onChange={(value) => setAttributes({ headingContent: value })}
					placeholder="Accordion title..."
					allowedFormats={["core/bold", "core/italic"]}
				/>
				<div className="accordion-icon-btn">
					{iconType === "default" ? (
						<>
							<span
								className="open-icon"
								dangerouslySetInnerHTML={{ __html: accordionIcon.openUrl }}
							/>
							<span
								className="close-icon"
								dangerouslySetInnerHTML={{ __html: accordionIcon.closeUrl }}
							/>
						</>
					) : (
						<>
							<img
								className="open-icon"
								src={accordionIcon.openUrl}
								alt="icon"
								width={24}
								height={24}
							/>
							<img
								className="close-icon"
								src={accordionIcon.closeUrl}
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

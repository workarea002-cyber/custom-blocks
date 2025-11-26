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

const Icon = ({ type, url, className }) => {
	if (type === "default") {
		return (
			<span className={className} dangerouslySetInnerHTML={{ __html: url }} />
		);
	}

	return <img className={className} src={url} alt="" width={24} height={24} />;
};

export default function Edit({ attributes, setAttributes, context, clientId }) {
	const {
		headingContent,
		headTag,
		allowedBlocks,
		accordionIcon,
		iconType,
		blockId,
	} = attributes;

	const {
		defaultAccordionIcons: defaultIconContext,
		customAccordionIcons: customIconContext,
		iconType: iconTypeContext,
		headingTag: headingTagContext,
	} = context;

	useEffect(() => {
		let openUrl, closeUrl;

		if (!blockId) {
			setAttributes({ blockId: clientId });
		}

		if (headTag !== headingTagContext) {
			setAttributes({ headTag: headingTagContext });
		}

		if (iconType !== iconTypeContext) {
			setAttributes({
				iconType: iconTypeContext,
			});
		}

		if (iconTypeContext === "custom") {
			openUrl = customIconContext.openUrl;
			closeUrl = customIconContext.closeUrl;
		} else {
			openUrl = Icons.find((i) => i.id === defaultIconContext.openId)?.svg;
			closeUrl = Icons.find((i) => i.id === defaultIconContext.closeId)?.svg;
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
		defaultBlock: {
			name: "core/paragraph",
			attributes: { content: "Add your text..." },
		},
		orientation: "vertical",
		directInsert: true,
	});

	const TagName = headTag || "h3";

	return (
		<div {...useBlockProps()}>
			<TagName className="accordion-header-wrap">
				<button
					id={`accordion-header-${blockId}`}
					className="accordion-trigger"
					aria-expanded="false"
					aria-controls={`accordion-content-${blockId}`}
				>
					<RichText
						tagName="span"
						value={headingContent}
						className="heading"
						onChange={(value) => setAttributes({ headingContent: value })}
						placeholder="Accordion title..."
						allowedFormats={["core/bold", "core/italic"]}
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
				<div {...innerBlockProps}></div>
			</div>
		</div>
	);
}

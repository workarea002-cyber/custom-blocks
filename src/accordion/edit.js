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
	__experimentalInputControl as InputControl,
	BoxControl,
} from "@wordpress/components";

import { Icons } from "./assets";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";
import { useEffect } from "react";
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
		gap,
		padding,
		contentSpacing,
		borderRadius,
		allowedBlocks,
		iconId,
		isChevron,
	} = attributes;

	const blockProps = useBlockProps({
		style: {
			"--accordion-bg": attributes.backgroundColor,
			"--accordion-textColor": attributes.textColor,
			"--accordion-gap": attributes.gap,
			"--accordion-header-padding-top": attributes.padding.top,
			"--accordion-header-padding-right": attributes.padding.right,
			"--accordion-header-padding-bottom": attributes.padding.bottom,
			"--accordion-header-padding-left": attributes.padding.left,
			"--accordion-content-spacing": attributes.contentSpacing,
			"--accordion-radius-top": attributes.borderRadius.top,
			"--accordion-radius-right": attributes.borderRadius.right,
			"--accordion-radius-bottom": attributes.borderRadius.bottom,
			"--accordion-radius-left": attributes.borderRadius.left,
		},
	});

	useEffect(() => {
		setAttributes({
			iconUrl: Icons.find((item) => item.id === iconId)?.svg,
			rotate: Icons.find((item) => item.id === iconId)?.rotate,
		});
	}, [iconId]);

	const handleIcon = (e, id, svg, rotate) => {
		e.stopPropagation();
		setAttributes({
			iconId: id,
			iconUrl: svg,
			rotate: rotate,
		});
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title="Accordion Item Styles" initialOpen={false}>
					<p>
						<strong>Background Color</strong>
					</p>
					<ColorPalette
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
				</PanelBody>
				<PanelBody title="Accordion Item Spacing" initialOpen={false}>
					<BoxControl
						__next40pxDefaultSize
						label="Padding"
						values={padding}
						onChange={(newValues) => setAttributes({ padding: newValues })}
					/>
					<InputControl
						__next40pxDefaultSize
						label="Item Gap"
						value={parseInt(gap || 24)}
						onChange={(val) => setAttributes({ gap: `${val}px` })}
						min={0}
						max={50}
					/>
					<InputControl
						__next40pxDefaultSize
						label="Content Spacing"
						value={parseInt(contentSpacing || 8)}
						onChange={(val) => setAttributes({ contentSpacing: `${val}px` })}
						min={0}
						max={50}
					/>
					<BoxControl
						__next40pxDefaultSize
						label="Border Radius"
						values={borderRadius}
						onChange={(newValues) => setAttributes({ borderRadius: newValues })}
					/>
				</PanelBody>
				<PanelBody title="Accordion Icon" initialOpen={false}>
					<div className="accordion-icon">
						{Icons.map(({ id, svg, rotate }) => (
							<button
								key={id}
								className={iconId === id && "active"}
								onClick={(e) => handleIcon(e, id, svg, rotate)}
							>
								<img src={svg} alt="icon" width={35} height={35} />
							</button>
						))}
					</div>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<InnerBlocks
					allowedBlocks={allowedBlocks}
					template={[["custom-blocks/accordion-item"]]}
					orientation="vertical"
				/>
			</div>
		</>
	);
}

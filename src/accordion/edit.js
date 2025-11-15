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

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";
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

	return (
		<>
			<InspectorControls>
				<PanelBody title="Accordion Item Styles">
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
				<PanelBody title="Accordion Item Spacing">
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
			</InspectorControls>

			<div {...blockProps}>
				<InnerBlocks
					allowedBlocks={["custom-blocks/accordion-item"]}
					template={[["custom-blocks/accordion-item"]]}
				/>
			</div>
		</>
	);
}

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
	MediaUpload,
} from "@wordpress/block-editor";
import {
	PanelBody,
	__experimentalInputControl as InputControl,
	BoxControl,
	Button,
	RadioControl,
} from "@wordpress/components";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";
import { Icons } from "./constants";
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
		accordionCustomIcons,
		accordionIcons,
		iconType,
	} = attributes;

	const handleOpenIcon = (e, id, svg) => {
		e.stopPropagation();
		setAttributes({
			accordionIcons: { ...accordionIcons, openId: id, openUrl: svg },
		});
	};
	const handleCloseIcon = (e, id, svg) => {
		e.stopPropagation();
		setAttributes({
			accordionIcons: { ...accordionIcons, closeId: id, closeUrl: svg },
		});
	};

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
					<RadioControl
						label="Icon Type"
						selected={iconType}
						onChange={(value) => setAttributes({ iconType: value })}
						options={[
							{ label: "Custom Icons", value: "custom" },
							{ label: "Default Icons", value: "default" },
						]}
					/>
					{iconType === "custom" ? (
						<div className="media-lib-selector">
							<h3>Custom Icons</h3>
							<div className="select-open-icon">
								<h4>Accordion Open</h4>
								<MediaUpload
									title="Select Image"
									allowedTypes={[
										"image/jpeg",
										"image/png",
										"image/webp",
										"image/svg+xml",
									]}
									value={accordionCustomIcons.openId}
									onSelect={(newImage) =>
										setAttributes({
											accordionCustomIcons: {
												...accordionCustomIcons,
												openId: newImage.id,
												openUrl: newImage.url,
											},
											accordionIcons: {
												...accordionIcons,
												openUrl: "",
											},
											iconType: "custom",
										})
									}
									render={({ open }) => {
										if (0 == accordionCustomIcons.openId) {
											return (
												<Button
													className="components-button is-primary"
													onClick={open}
												>
													Select
												</Button>
											);
										} else {
											return (
												<div>
													<img
														src={accordionCustomIcons.openUrl}
														style={{
															aspectRatio: "16/9",
															objectFit: "contain",
														}}
														onClick={open}
													/>
													<Button
														className="components-button is-secondary"
														onClick={() =>
															setAttributes({
																accordionCustomIcons: {
																	...accordionCustomIcons,
																	openId: 0,
																	openUrl: "",
																},
															})
														}
													>
														Delete
													</Button>
												</div>
											);
										}
									}}
								/>
							</div>
							<div className="select-close-icon">
								<h4>Accordion Close</h4>
								<MediaUpload
									title="Select Image"
									allowedTypes={[
										"image/jpeg",
										"image/png",
										"image/webp",
										"image/svg+xml",
									]}
									value={accordionCustomIcons.closeId}
									onSelect={(newImage) =>
										setAttributes({
											accordionCustomIcons: {
												...accordionCustomIcons,
												closeId: newImage.id,
												closeUrl: newImage.url,
											},
											accordionIcons: {
												...accordionIcons,
												closeUrl: "",
											},
											iconType: "custom",
										})
									}
									render={({ open }) => {
										if (0 == accordionCustomIcons.closeId) {
											return (
												<Button
													className="components-button is-primary"
													onClick={open}
												>
													Select
												</Button>
											);
										} else {
											return (
												<div>
													<img
														style={{
															aspectRatio: "16/9",
															objectFit: "contain",
														}}
														src={accordionCustomIcons.closeUrl}
														onClick={open}
													/>
													<Button
														className="components-button is-secondary"
														onClick={() =>
															setAttributes({
																accordionCustomIcons: {
																	...accordionCustomIcons,
																	closeId: 0,
																	closeUrl: "",
																},
															})
														}
													>
														Delete
													</Button>
												</div>
											);
										}
									}}
								/>
							</div>
						</div>
					) : (
						<div className="accordion-icons">
							<h3>Default Icons</h3>
							<div className="open-icon">
								<h4>Accordion Open</h4>
								{Icons.map(({ id, svg }) => (
									<Button
										key={id}
										className={`components-button is-${
											accordionIcons.openId === id &&
											accordionIcons.openUrl !== ""
												? "primary"
												: "secondary"
										}`}
										onClick={(e) => handleOpenIcon(e, id, svg)}
									>
										<span dangerouslySetInnerHTML={{ __html: svg }} />
									</Button>
								))}
							</div>
							<div className="close-icon">
								<h4>Accordion Close</h4>
								{Icons.map(({ id, svg }) => (
									<Button
										key={id}
										className={`components-button is-${
											accordionIcons.closeId === id &&
											accordionIcons.closeUrl !== ""
												? "primary"
												: "secondary"
										}`}
										onClick={(e) => handleCloseIcon(e, id, svg)}
									>
										<span dangerouslySetInnerHTML={{ __html: svg }} />
									</Button>
								))}
							</div>
						</div>
					)}
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

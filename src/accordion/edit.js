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
	useSettings,
} from "@wordpress/block-editor";
import {
	PanelBody,
	__experimentalInputControl as InputControl,
	BoxControl,
	Button,
	RadioControl,
	SelectControl,
} from "@wordpress/components";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";
import {
	bgColorControl,
	customAccordionIconControl,
	defaultAccordionIconControl,
	iconColorControl,
	Icons,
	textColorControl,
} from "./constants";
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

wp.domReady(() => {
	initAccordion(); // Reuse same function!
});

function initAccordion() {
	document.addEventListener("DOMContentLoaded", () => {
		const accordionItems = document.querySelectorAll(
			".wp-block-custom-blocks-accordion-item",
		);

		accordionItems.forEach((accordionItem) => {
			const accordionTrigger =
				accordionItem.querySelector(".accordion-trigger");
			const accordionContent =
				accordionItem.querySelector(".accordion-content");

			accordionContent.style.maxHeight = "0px";

			accordionTrigger.addEventListener("click", () => {
				accordionItems.forEach((item) => {
					if (item !== accordionItem) {
						item.classList.remove("show-text");
						const otherContent = item.querySelector(".accordion-content");
						otherContent.style.maxHeight = "0px";
					}
				});
				const open = accordionItem.classList.toggle("show-text");
				if (open) {
					const fullHeight = accordionContent.scrollHeight;
					accordionContent.style.maxHeight = fullHeight + "px";
				} else {
					accordionContent.style.maxHeight = "0px";
				}
			});
		});
	});
}

export default function Edit({ attributes, setAttributes }) {
	const {
		textColor,
		backgroundColor,
		gap,
		padding,
		contentSpacing,
		borderRadius,
		allowedBlocks,
		customAccordionIcons,
		defaultAccordionIcons,
		iconType,
		headingTag,
		iconColor,
	} = attributes;

	console.log(attributes);

	const [themeColors] = useSettings("color.palette");

	const blockProps = useBlockProps({
		style: {
			"--accordion-bg": backgroundColor.bgColor,
			"--accordion-active-bg": backgroundColor.activeBgColor,
			"--accordion-header-bg": backgroundColor.headerBgColor,
			"--accordion-content-bg": backgroundColor.contentBgColor,
			"--accordion-header-color": textColor.headerColor,
			"--accordion-active-header-color": textColor.activeHeaderColor,
			"--accordion-content-color": textColor.contentColor,
			"--accordion-gap": gap,
			"--accordion-padding-top": padding.top,
			"--accordion-padding-right": padding.right,
			"--accordion-padding-bottom": padding.bottom,
			"--accordion-padding-left": padding.left,
			"--accordion-content-spacing": contentSpacing,
			"--accordion-radius-top": borderRadius.top,
			"--accordion-radius-right": borderRadius.right,
			"--accordion-radius-bottom": borderRadius.bottom,
			"--accordion-radius-left": borderRadius.left,
			"--accordion-icon-fill-color": iconColor.fill,
			"--accordion-icon-stroke-color": iconColor.stroke,
		},
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title="Accordion header Tag" initialOpen={true}>
					<SelectControl
						label="Tag Level"
						value={headingTag}
						options={[
							{ label: "h1", value: "h1" },
							{ label: "h2", value: "h2" },
							{ label: "h3", value: "h3" },
							{ label: "h4", value: "h4" },
							{ label: "h5", value: "h5" },
							{ label: "h6", value: "h6" },
						]}
						onChange={(newTag) => setAttributes({ headingTag: newTag })}
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
				</PanelBody>

				<PanelBody title="Accordion Color" initialOpen={false}>
					{bgColorControl.map(({ label, attribute }) => (
						<div key={attribute}>
							<p>
								<strong>{label}</strong>
							</p>
							<ColorPalette
								colors={themeColors}
								enableAlpha={true}
								value={backgroundColor?.[attribute]}
								onChange={(newColor) =>
									setAttributes({
										backgroundColor: {
											...backgroundColor,
											[attribute]: newColor,
										},
									})
								}
							/>
						</div>
					))}

					{textColorControl.map(({ label, attribute }) => (
						<div key={attribute}>
							<p>
								<strong>{label}</strong>
							</p>
							<ColorPalette
								value={textColor?.[attribute]}
								colors={themeColors}
								enableAlpha={true}
								onChange={(newColor) =>
									setAttributes({
										textColor: {
											...textColor,
											[attribute]: newColor,
										},
									})
								}
							/>
						</div>
					))}
				</PanelBody>

				<PanelBody title="Accordion Spacing" initialOpen={false}>
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
							{customAccordionIconControl.map(
								({ title, attributeId, attributeUrl }) => (
									<div className="select-open-icon" key={title}>
										<h4>{title}</h4>
										<MediaUpload
											title="Select Image"
											allowedTypes={[
												"image/jpeg",
												"image/png",
												"image/webp",
												"image/svg+xml",
											]}
											value={customAccordionIcons?.[attributeId]}
											onSelect={(newImage) =>
												setAttributes({
													customAccordionIcons: {
														...customAccordionIcons,
														[attributeId]: newImage.id,
														[attributeUrl]: newImage.url,
													},
												})
											}
											render={({ open }) => {
												if (0 == customAccordionIcons?.[attributeId]) {
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
																src={customAccordionIcons?.[attributeUrl]}
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
																		customAccordionIcons: {
																			...customAccordionIcons,
																			[attributeId]: 0,
																			[attributeUrl]: "",
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
								),
							)}
						</div>
					) : (
						<div className="accordion-icons">
							<h3>Default Icons</h3>
							{defaultAccordionIconControl.map(({ title, attributeId }) => (
								<div className="open-icon" key={title + attributeId}>
									<h4>{title}</h4>
									{Icons.map(({ id, svg }) => (
										<Button
											key={id}
											className={`components-button is-${
												defaultAccordionIcons?.[attributeId] === id
													? "primary"
													: "secondary"
											}`}
											onClick={() =>
												setAttributes({
													defaultAccordionIcons: {
														...defaultAccordionIcons,
														[attributeId]: id,
													},
												})
											}
										>
											<span dangerouslySetInnerHTML={{ __html: svg }} />
										</Button>
									))}
								</div>
							))}
						</div>
					)}

					{iconColorControl.map(({ label, attribute }) => (
						<div key={attribute}>
							<p>
								<strong>{label}</strong>
							</p>
							<ColorPalette
								colors={themeColors}
								enableAlpha={true}
								value={iconColor?.[attribute]}
								onChange={(newColor) =>
									setAttributes({
										iconColor: {
											...iconColor,
											[attribute]: newColor,
										},
									})
								}
							/>
						</div>
					))}
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<InnerBlocks
					allowedBlocks={allowedBlocks}
					template={[["custom-blocks/accordion-item"]]}
					orientation="vertical"
					renderAppender={InnerBlocks.ButtonBlockAppender}
				/>
			</div>
		</>
	);
}

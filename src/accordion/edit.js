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
	MediaUpload,
	useSettings,
	useBlockProps,
	InspectorControls,
} from "@wordpress/block-editor";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";
import {
	Icons,
	bgColorControl,
	fontSizeControl,
	iconColorControl,
	textColorControl,
	customAccordionIconControl,
	defaultAccordionIconControl,
} from "./constants";

import {
	Flex,
	Button,
	PanelBody,
	ColorPalette,
	BoxControl,
	RadioControl,
	SelectControl,
	ToggleControl,
	FontSizePicker,
	__experimentalText as Text,
	__experimentalVStack as VStack,
	__experimentalUnitControl as UnitControl,
} from "@wordpress/components";
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
		customAccordionIcons,
		defaultAccordionIcons,
		iconType,
		headingTag,
		iconColor,
		multiple,
		fontSize,
	} = attributes;

	const [themeColors] = useSettings("color.palette");
	const blockProps = useBlockProps({
		style: {
			"--accordion-bg": backgroundColor.bgColor,
			"--accordion-active-bg": backgroundColor.activeBgColor,
			"--accordion-header-bg": backgroundColor.headerBgColor,
			"--accordion-content-bg": backgroundColor.contentBgColor,
			"--accordion-header-color": textColor.headingColor,
			"--accordion-active-header-color": textColor.activeHeadingColor,
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
			"--accordion-heading-fontsize": fontSize?.heading,
			"--accordion-content-fontsize": fontSize?.content,
		},
		"data-multiple": multiple,
	});

	return (
		<>
			<InspectorControls group="settings">
				<PanelBody title="Tag" initialOpen={true}>
					<VStack>
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
						<ToggleControl
							__nextHasNoMarginBottom
							label="Multi Open Accordion"
							checked={multiple}
							onChange={(newValue) => {
								setAttributes({ multiple: newValue });
							}}
						/>
					</VStack>
				</PanelBody>
			</InspectorControls>
			<InspectorControls group="styles">
				<PanelBody title="Background Color" initialOpen={false}>
					<VStack>
						{bgColorControl.map(({ label, attribute }) => (
							<VStack key={attribute}>
								<Text upperCase>{label}</Text>
								<ColorPalette
									colors={themeColors}
									enableAlpha={true}
									value={backgroundColor?.[attribute]}
									disableCustomColors={true}
									onChange={(newColor) =>
										setAttributes({
											backgroundColor: {
												...backgroundColor,
												[attribute]: newColor,
											},
										})
									}
								/>
							</VStack>
						))}
					</VStack>
				</PanelBody>

				<PanelBody title="Text Color" initialOpen={false}>
					<VStack>
						{textColorControl.map(({ label, attribute }) => (
							<VStack key={attribute}>
								<Text upperCase>{label}</Text>
								<ColorPalette
									value={textColor?.[attribute]}
									colors={themeColors}
									enableAlpha={true}
									disableCustomColors={true}
									onChange={(newColor) =>
										setAttributes({
											textColor: {
												...textColor,
												[attribute]: newColor,
											},
										})
									}
								/>
							</VStack>
						))}
					</VStack>
				</PanelBody>

				<PanelBody title="Spacing" initialOpen={false}>
					<VStack direction="column">
						<BoxControl
							__next40pxDefaultSize
							label="Padding"
							values={padding}
							onChange={(newValues) => setAttributes({ padding: newValues })}
						/>
						<UnitControl
							__next40pxDefaultSize
							label="Gap"
							value={gap}
							onChange={(newValue) => setAttributes({ gap: newValue })}
						/>

						<UnitControl
							__next40pxDefaultSize
							label="Content Gap"
							value={contentSpacing}
							onChange={(newValue) =>
								setAttributes({ contentSpacing: newValue })
							}
						/>
						<BoxControl
							__next40pxDefaultSize
							label="Border Radius"
							values={borderRadius}
							onChange={(newValues) =>
								setAttributes({ borderRadius: newValues })
							}
						/>
					</VStack>
				</PanelBody>
			</InspectorControls>
			<InspectorControls group="settings">
				<PanelBody title="Icon" initialOpen={false}>
					<VStack direction="column">
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
							<VStack className="media-lib-selector">
								<Text upperCase>Custom Icons</Text>
								{customAccordionIconControl.map(
									({ title, attributeId, attributeUrl }) => (
										<VStack className="select-open-icon" key={title}>
											<Text>{title}</Text>
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
																text="Select"
															/>
														);
													} else {
														return (
															<VStack direction="column">
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
																	text="Delete"
																	onClick={() =>
																		setAttributes({
																			customAccordionIcons: {
																				...customAccordionIcons,
																				[attributeId]: 0,
																				[attributeUrl]: "",
																			},
																		})
																	}
																/>
															</VStack>
														);
													}
												}}
											/>
										</VStack>
									),
								)}
							</VStack>
						) : (
							<VStack className="accordion-icons" direction="column">
								<Text upperCase>Default Icons</Text>
								{defaultAccordionIconControl.map(({ title, attributeId }) => (
									<VStack
										direction="column"
										className="open-icon"
										key={title + attributeId}
									>
										<Text>{title}</Text>
										<Flex direction="row" wrap={true} gap="2">
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
										</Flex>
									</VStack>
								))}
							</VStack>
						)}
					</VStack>
				</PanelBody>
			</InspectorControls>
			<InspectorControls group="styles">
				<PanelBody title="Default Icon Color" initialOpen={false}>
					{iconColorControl.map(({ label, attribute }) => (
						<VStack key={attribute}>
							<Text>{label}</Text>
							<ColorPalette
								colors={themeColors}
								enableAlpha
								value={iconColor?.[attribute]}
								disableCustomColors={true}
								onChange={(newColor) =>
									setAttributes({
										iconColor: {
											...iconColor,
											[attribute]: newColor,
										},
									})
								}
							/>
						</VStack>
					))}
				</PanelBody>
			</InspectorControls>

			<InspectorControls group="styles">
				<PanelBody title="Text Size" initialOpen={false}>
					{fontSizeControl.map(({ label, attribute }) => (
						<VStack key={attribute}>
							<Text>{label}</Text>
							<FontSizePicker
								__next40pxDefaultSize
								value={fontSize?.[attribute]}
								onChange={(newSize) =>
									setAttributes({
										fontSize: {
											...fontSize,
											[attribute]: newSize,
										},
									})
								}
								withSlider
							/>
						</VStack>
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

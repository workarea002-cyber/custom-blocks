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
	textColorControl,
	customAccordionIconControl,
	defaultAccordionIconControl,
	paddingControl,
	blockGapControl,
	iconColorControl,
} from "./constants";

import {
	Flex,
	Button,
	Popover,
	PanelBody,
	BoxControl,
	TextControl,
	RadioControl,
	ColorPalette,
	SelectControl,
	ToggleControl,
	ColorIndicator,
	FontSizePicker,
	__experimentalText as Text,
	__experimentalVStack as VStack,
	__experimentalUnitControl as UnitControl,
} from "@wordpress/components";
import { useState } from "react";
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
		accordionGap,
		headerPadding,
		contentPadding,
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
		iconSize,
	} = attributes;

	const [themeColors] = useSettings("color.palette");
	const blockProps = useBlockProps({
		style: {
			// Background Color
			"--accordion-bg": backgroundColor.bgColor,
			"--accordion-active-bg": backgroundColor.activeBgColor,
			"--accordion-header-bg": backgroundColor.headerBgColor,
			"--accordion-content-bg": backgroundColor.contentBgColor,

			// Text Color
			"--accordion-header-color": textColor.headingColor,
			"--accordion-active-header-color": textColor.activeHeadingColor,
			"--accordion-content-color": textColor.contentColor,

			// Spacing
			"--accordion-gap": accordionGap,
			"--accordion-content-spacing": contentSpacing,

			// Padding
			"--accordion-headerPadding-top": headerPadding.top,
			"--accordion-headerPadding-right": headerPadding.right,
			"--accordion-headerPadding-bottom": headerPadding.bottom,
			"--accordion-headerPadding-left": headerPadding.left,

			"--accordion-contentPadding-top": contentPadding.top,
			"--accordion-contentPadding-right": contentPadding.right,
			"--accordion-contentPadding-bottom": contentPadding.bottom,
			"--accordion-contentPadding-left": contentPadding.left,

			// Border
			"--accordion-radius-top": borderRadius.top,
			"--accordion-radius-right": borderRadius.right,
			"--accordion-radius-bottom": borderRadius.bottom,
			"--accordion-radius-left": borderRadius.left,

			// Icon
			"--accordion-icon-size": iconSize,
			"--accordion-icon-color": iconColor.normal,
			"--accordion-icon-active-color": iconColor.active,

			// Font
			"--accordion-heading-fontsize": fontSize.heading,
			"--accordion-heading-fontweight": fontSize.headingWeight,
			"--accordion-heading-lineheight": fontSize.headerLineHeight,
			"--accordion-heading-letterspacing": fontSize.headerLetterSpacing,
			"--accordion-content-fontsize": fontSize.content,
		},
		"data-multiple": multiple,
	});

	const [isVisible, setIsVisible] = useState(null);
	const toggleVisible = (label) => {
		setIsVisible((prev) => (prev === label ? null : label));
	};

	return (
		<>
			<InspectorControls group="settings">
				<PanelBody title="Tag" initialOpen={true}>
					<VStack direction="column" spacing={3}>
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

				<PanelBody title="Icon" initialOpen={false}>
					<VStack direction="column" spacing={3}>
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
							<VStack className="icons-selector" direction="column">
								<Text upperCase>Default Icons</Text>
								<VStack direction="column">
									{defaultAccordionIconControl.map(({ title, attributeId }) => (
										<Button
											key={title + attributeId}
											variant="secondary"
											onClick={() => toggleVisible(title)}
										>
											<VStack direction="row">
												<span
													className="selected-icon"
													dangerouslySetInnerHTML={{
														__html: Icons.find(
															(i) =>
																i.id === defaultAccordionIcons?.[attributeId],
														)?.svg,
													}}
												/>
												<Text>{title}</Text>
											</VStack>
											{isVisible === title && (
												<Popover placement="left-end" offset={20}>
													<Flex direction="row" wrap={true} gap="2">
														{Icons.map(({ id, label, svg }) => (
															<Button
																key={id}
																className={`components-button is-${
																	defaultAccordionIcons?.[attributeId] === id
																		? "primary"
																		: "secondary"
																}`}
																title={label}
																onClick={() =>
																	setAttributes({
																		defaultAccordionIcons: {
																			...defaultAccordionIcons,
																			[attributeId]: id,
																		},
																	})
																}
															>
																<span
																	className="span-svg"
																	dangerouslySetInnerHTML={{ __html: svg }}
																/>
															</Button>
														))}
													</Flex>
												</Popover>
											)}
										</Button>
									))}
								</VStack>
							</VStack>
						)}
					</VStack>
				</PanelBody>
			</InspectorControls>

			<InspectorControls group="styles">
				<PanelBody title="Background Color" initialOpen={false}>
					<VStack direction="column">
						{bgColorControl.map(({ label, attribute }) => (
							<Button
								key={attribute}
								variant="secondary"
								onClick={() => toggleVisible(label)}
							>
								<VStack direction="row">
									<ColorIndicator colorValue={backgroundColor?.[attribute]} />
									<Text>{label}</Text>
								</VStack>
								{isVisible === label && (
									<Popover placement="left-end" offset={20}>
										<VStack direction="column">
											<Text>Theme Colors</Text>
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
									</Popover>
								)}
							</Button>
						))}
					</VStack>
				</PanelBody>

				<PanelBody title="Text Color" initialOpen={false}>
					<VStack direction="column">
						{textColorControl.map(({ label, attribute }) => (
							<Button
								key={attribute}
								variant="secondary"
								onClick={() => toggleVisible(label)}
							>
								<VStack direction="row">
									<ColorIndicator colorValue={textColor?.[attribute]} />
									<Text>{label}</Text>
								</VStack>
								{isVisible === label && (
									<Popover placement="left-end" offset={20}>
										<VStack direction="column">
											<Text>Theme Colors</Text>
											<ColorPalette
												colors={themeColors}
												enableAlpha={true}
												value={textColor?.[attribute]}
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
									</Popover>
								)}
							</Button>
						))}
					</VStack>
				</PanelBody>

				<PanelBody title="Icon Color" initialOpen={false}>
					<VStack direction="column">
						<UnitControl
							__next40pxDefaultSize
							label="Size"
							value={iconSize}
							onChange={(newValue) => setAttributes({ iconSize: newValue })}
						/>

						{iconColorControl.map(({ label, attribute }) => (
							<VStack direction="column">
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
					</VStack>
				</PanelBody>

				<PanelBody title="Accordion Item Spacing" initialOpen={false}>
					<VStack direction="column" spacing={6}>
						<VStack direction="column" spacing={3}>
							{paddingControl.map(({ label, attribute }) => (
								<BoxControl
									key={label}
									__next40pxDefaultSize
									label={label}
									values={attributes[attribute]}
									onChange={(newValues) =>
										setAttributes({ [attribute]: newValues })
									}
								/>
							))}
						</VStack>

						<VStack direction="column" spacing={3}>
							{blockGapControl.map(({ label, attribute }) => (
								<UnitControl
									key={label}
									__next40pxDefaultSize
									label={label}
									value={attributes[attribute]}
									onChange={(newValues) =>
										setAttributes({ [attribute]: newValues })
									}
								/>
							))}
						</VStack>

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

				<PanelBody title="Typography" initialOpen={false}>
					<VStack spacing="6" direction="column">
						<VStack direction="column" spacing={3}>
							<Text>Heading Styles</Text>
							<FontSizePicker
								__next40pxDefaultSize
								value={fontSize.heading}
								onChange={(newSize) =>
									setAttributes({
										fontSize: {
											...fontSize,
											heading: newSize,
										},
									})
								}
								withSlider
							/>

							<SelectControl
								label="Font Weight"
								value={fontSize.headingWeight}
								options={[
									{ label: "Default", value: "" },
									{ label: "100 (Thin)", value: "100" },
									{ label: "200 (ExtraLight)", value: "200" },
									{ label: "300 (Light)", value: "300" },
									{ label: "400 (Normal)", value: "400" },
									{ label: "500 (Medium)", value: "500" },
									{ label: "600 (SemiBold)", value: "600" },
									{ label: "700 (Bold)", value: "700" },
									{ label: "800 (ExtraBold)", value: "800" },
									{ label: "900 (Black)", value: "900" },
								]}
								onChange={(newTag) =>
									setAttributes({
										fontSize: {
											...fontSize,
											headingWeight: newTag,
										},
									})
								}
								__next40pxDefaultSize
								__nextHasNoMarginBottom
							/>

							<VStack>
								<TextControl
									__next40pxDefaultSize
									__nextHasNoMarginBottom
									label="Line Height"
									onChange={(newValues) =>
										setAttributes({
											fontSize: {
												...fontSize,
												headerLineHeight: newValues,
											},
										})
									}
									placeholder="1.2 (default)"
									value={fontSize.headerLineHeight}
								/>
								<Text variant="muted">
									Enter a line-height value (unitless like 1.5 or with units
									like 20px, 1rem, 1.2em).
								</Text>
							</VStack>

							<VStack>
								<TextControl
									__next40pxDefaultSize
									__nextHasNoMarginBottom
									label="Letter Spacing"
									onChange={(newValues) =>
										setAttributes({
											fontSize: {
												...fontSize,
												headerLetterSpacing: newValues,
											},
										})
									}
									placeholder="normal (default)"
									value={fontSize.headerLetterSpacing}
								/>
								<Text variant="muted">
									Enter a value with units (e.g., 16px, 1rem, 1em).
								</Text>
							</VStack>
						</VStack>

						<VStack direction="column">
							<Text>Content Styles</Text>
							<FontSizePicker
								__next40pxDefaultSize
								value={fontSize.content}
								onChange={(newSize) =>
									setAttributes({
										fontSize: {
											...fontSize,
											content: newSize,
										},
									})
								}
								withSlider
							/>
						</VStack>
					</VStack>
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

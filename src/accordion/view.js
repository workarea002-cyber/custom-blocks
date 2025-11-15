document.addEventListener("DOMContentLoaded", () => {
	const accordionItems = document.querySelectorAll(
		".wp-block-custom-blocks-accordion-item",
	);

	accordionItems.forEach((accordionItem) => {
		const accordionHeader = accordionItem.querySelector(".accordion-header");
		const accordionContent = accordionItem.querySelector(".accordion-content");

		accordionContent.style.maxHeight = "0px";

		accordionHeader.addEventListener("click", () => {
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

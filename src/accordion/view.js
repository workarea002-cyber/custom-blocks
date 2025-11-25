document.addEventListener("DOMContentLoaded", () => {
	const accordions = document.querySelectorAll(
		".wp-block-custom-blocks-accordion",
	);

	accordions.forEach((accordion) => {
		const multiple = accordion.getAttribute("data-multiple") === "true";
		const items = accordion.querySelectorAll(
			".wp-block-custom-blocks-accordion-item",
		);

		items.forEach((item, index) => {
			const trigger = item.querySelector(".accordion-trigger");
			const content = item.querySelector(".accordion-content");

			// first open one
			if (index === 0) {
				item.classList.toggle("show-text");
				trigger.setAttribute("aria-expanded", "true");
				content.style.maxHeight = content.scrollHeight + "px";
			} else {
				trigger.setAttribute("aria-expanded", "false");
				content.style.maxHeight = "0px";
			}

			// Click event
			trigger.addEventListener("click", () => {
				if (multiple) {
					toggleMultiAccordion(item, trigger, content);
				} else {
					toggleSingleAccordion(item, items, trigger, content);
				}
			});

			// keyboard event
			trigger.addEventListener("keydown", (e) => {
				const key = e.key;

				if (key === " " || key === "Enter") {
					e.preventDefault();
					if (multiple) {
						toggleMultiAccordion(item, trigger, content);
					} else {
						toggleSingleAccordion(item, items, trigger, content);
					}
				}

				if (key === "ArrowDown") {
					e.preventDefault();
					focusItem(index + 1);
				}

				if (key === "ArrowUp") {
					e.preventDefault();
					focusItem(index - 1);
				}
			});

			function focusItem(targetIndex) {
				const triggers = document.querySelectorAll(".accordion-trigger");
				if (targetIndex >= 0 && targetIndex < triggers.length) {
					triggers[targetIndex].focus();
				}
			}
		});
	});

	function toggleMultiAccordion(item, trigger, content) {
		const isOpen = trigger.getAttribute("aria-expanded") === "true";

		trigger.setAttribute("aria-expanded", !isOpen);
		item.classList.toggle("show-text", !isOpen);

		if (!isOpen) {
			content.style.maxHeight = content.scrollHeight + "px";
		} else {
			content.style.maxHeight = "0px";
		}
	}

	function toggleSingleAccordion(item, items, trigger, content) {
		const isOpen = trigger.getAttribute("aria-expanded") === "true";

		trigger.setAttribute("aria-expanded", !isOpen);
		item.classList.toggle("show-text", !isOpen);

		items.forEach((newItem) => {
			if (newItem !== item) {
				const newTrigger = newItem.querySelector(".accordion-trigger");
				const newContent = newItem.querySelector(".accordion-content");

				newItem.classList.remove("show-text");
				newTrigger.setAttribute("aria-expanded", "false");
				newContent.style.maxHeight = "0px";
			}
		});

		if (!isOpen) {
			content.style.maxHeight = content.scrollHeight + "px";
		} else {
			content.style.maxHeight = "0px";
		}
	}
});

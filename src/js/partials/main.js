document.addEventListener("DOMContentLoaded", () => {
	const header = document.querySelector(".header");

	if (header) {
		/* Разделить строку на символы */
		const splitText = new SplitType(".split-title", {
			types: "chars"
		});
		const titleShadow = document.querySelector(".header__title-shadow img");

		document.querySelector(".split-title").classList.add("visible");

		/* Анимация появления символов в первом блоке */
		const heroObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const chars = document.querySelectorAll(".split-title .char");

					chars.forEach((el, index) => {
						setTimeout(() => {
							el.style.transform = 'translateX(0)';
						}, 50 * index);
					});

					setTimeout(() => {
						titleShadow.classList.add("visible");
					}, 50 * chars.length + 300);
				}
			});
		});

		heroObserver.observe(header);
	}
});

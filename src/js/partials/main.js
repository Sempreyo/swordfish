document.addEventListener("DOMContentLoaded", () => {
	const modals = new HystModal({
		linkAttributeName: "data-hystmodal",
	});

	/* Добавляем кастомное свойство для анимированного прогрессбара в круговой диаграмме */
	window.CSS.registerProperty({
		name: "--p",
		syntax: "<percentage>",
		inherits: false,
		initialValue: "10%",
	});

	/*const header = document.querySelector(".header");

	if (header) {
		/!* Разделить строку на символы *!/
		const splitText = new SplitType(".split-title", {
			types: "chars"
		});
		const titleShadow = document.querySelector(".header__title-shadow img");

		document.querySelector(".split-title").classList.add("visible");

		/!* Анимация появления символов в первом блоке *!/
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
	}*/

	/* Анимация наведения на круговые диаграммы */
	const digitCharts = document.querySelectorAll(".digit-chart__item");

	if (digitCharts) {
		digitCharts.forEach(el => {
			el.addEventListener("mouseover", (e) => {
				digitCharts.forEach(chart => chart.classList.add("inactive"));
				e.currentTarget.classList.remove("inactive");
			});

			el.addEventListener("mouseout", () => {
				digitCharts.forEach(chart => chart.classList.remove("inactive"));
			});
		});
	}

	/* Анимация счетчика */
	const animateNumber = (element, targetNumber, duration = 2000) => {
		const startNumber = 0;
		const startTime = performance.now();
		
		const updateNumber = (currentTime) => {
			const elapsedTime = currentTime - startTime;
			/* Ограничиваем прогресс от 0 до 1 */
			const progress = Math.min(Math.max(elapsedTime / duration, 0), 1);
			/* Гарантируем, что значение будет между 0 и targetNumber */
			const currentNumber = Math.floor(progress * targetNumber);
			
			/* Всегда показываем минимум 0 */
			element.textContent = Math.max(currentNumber, 0).toLocaleString();
			
			if (progress < 1) {
			  requestAnimationFrame(updateNumber);
			} else {
			  element.textContent = targetNumber.toLocaleString();
			}
		}

		requestAnimationFrame(updateNumber);
	}

	const darkCardProgress = document.querySelector(".about-card--dark");

	if (darkCardProgress) {
		const aboutNums = darkCardProgress.querySelectorAll("[data-number]");

		const darkCardProgressObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					aboutNums.forEach(el => animateNumber(el, +el.dataset.number));
				} else {
					aboutNums.forEach(el => el.textContent = "0");
				}
			});
		});

		darkCardProgressObserver.observe(darkCardProgress);
	}

	const chartProgress = document.querySelector(".chart__items");

	if (chartProgress) {
		const chartNums = chartProgress.querySelectorAll("[data-number]");
		const chartBar = chartProgress.querySelectorAll("[data-progress]");

		const chartProgressObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					chartNums.forEach((el, index) => {
						animateNumber(el, +el.dataset.number);
						chartBar[index].setAttribute("style", `--p: ${chartBar[index].dataset.progress}`);
					});
				} else {
					chartNums.forEach((el, index) => {
						el.textContent = "0";
						chartBar[index].removeAttribute("style");
					});
				}
			});
		});

		chartProgressObserver.observe(chartProgress);
	}
});

document.addEventListener("DOMContentLoaded", () => {
	const urlParams = new URLSearchParams(window.location.search);
	const modalParam = urlParams.get('modal');

	/* Модалки с поворотом карточек */
	const modals = new HystModal({
		linkAttributeName: "data-hystmodal",
		beforeOpen: function(modal) {
			const closeButton = modal.element.querySelector(".hystmodal__close");
			const formWrapper = modal.element.querySelector(".form");

			if (modal.element.id === "formResearch") {
				if (formWrapper && !formWrapper.classList.contains("rotate")) {
					closeButton.setAttribute("hidden", "true");
				}

				if (formWrapper && modal.starter !== null || modalParam) {
					formWrapper.style.transition = "unset";
					formWrapper.classList.add("rotate");
					closeButton.removeAttribute("hidden");
				}
			}
		}
	});

	/* Открыть нужную модалку по урлу */
	if (modalParam) {
		modals.open('#' + modalParam);
	}

	const readMoreButton = document.querySelector(".form__front");

	if (readMoreButton) {
		readMoreButton.addEventListener("click", (e) => {
			const closeButton = e.currentTarget.closest(".hystmodal__window").querySelector(".hystmodal__close");
			const formWrapper = e.currentTarget.closest(".form");

			formWrapper.classList.add("rotate");
			setTimeout(() => {
				closeButton.removeAttribute("hidden");
			}, 500);
		});
	}

	/* Открываем модалку с формой спустя 3 секунды на странице */
	setTimeout(() => {
		if (modals.openedModals.length === 0) {
			modals.open("#formResearch");
		}
	}, 3000);

	/* Добавляем кастомное свойство для анимированного прогрессбара в круговой диаграмме */
	window.CSS.registerProperty({
		name: "--p",
		syntax: "<percentage>",
		inherits: false,
		initialValue: "10%",
	});

	/* Запуск видео */
	const video = document.querySelector(".video video");
	const videoPoster = document.querySelector(".video .video__poster");

	if (video) {
		videoPoster.addEventListener("click", (e) => {
			e.currentTarget.classList.add("hide");
			video.play();
		});
	}

	/* Анимация первого блока */
	const header = document.querySelector(".header");

	if (header) {
		/* Разделить строку на символы */
		const splitText = new SplitType(".hero__title-big", {
			types: "words"
		});
		const headerContainer = header.querySelector(".header__container");
		const heroLight = document.querySelector(".hero__light");
		const titleWords = document.querySelector(".hero__title-big");
		const words = document.querySelectorAll(".hero__title-big .word");

		/* Анимация появления символов в первом блоке */
		const heroObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					headerContainer.classList.remove("hidden");
					titleWords.style.opacity = "1";

					setTimeout(() => {
						heroLight.classList.remove("hidden");
					}, 300);

					words.forEach((el, index) => {
						setTimeout(() => {
							el.style.transform = "translateY(0)";
						}, 300 + 100 * index);
					});
				} else {
					heroLight.classList.add("hidden");

					words.forEach(el => {
						el.style.transform = "translateY(calc(-100% - 53px))";
					});
				}
			});
		});

		heroObserver.observe(header);
	}

	/* Анимация наведения на круговые диаграммы */
	const digitCharts = document.querySelectorAll(".digit-chart__item");

	if (digitCharts && window.matchMedia("(min-width: 768px)").matches) {
		digitCharts.forEach(el => {
			el.addEventListener("mouseover", (e) => {
				digitCharts.forEach(chart => chart.classList.add("inactive"));
				e.currentTarget.classList.remove("inactive");
				e.currentTarget.classList.add("active");
			});

			el.addEventListener("mouseout", () => {
				digitCharts.forEach(chart => chart.classList.remove("inactive", "active"));
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

	const chartProgress = document.querySelectorAll(".chart__item");

	chartProgress.forEach(chart => {
		if (chart) {
			const chartNums = chart.querySelectorAll("[data-number]");
			const chartBar = chart.querySelectorAll("[data-progress]");

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

			chartProgressObserver.observe(chart);
		}
	});

	/* Плавающий продуктовый блок */
	const productWrapParent = document.querySelector(".products");

	if (window.matchMedia("(min-width: 992px)").matches) {
		if (productWrapParent) {
			const productItems = productWrapParent.querySelectorAll(".products-card");
			const productWrap = document.querySelector(".products-card");
			const productDescH = productWrap.querySelector(".products-card__bottom").offsetHeight + 21;
			const elemY = productWrap.getBoundingClientRect().top;
			const windowY =
				document.documentElement.clientHeight - productWrap.offsetHeight;

			if (elemY < windowY) {
				productWrapParent.classList.remove("bgcolor");
				productWrapParent.style.bottom = "0";
			} else {
				productWrapParent.classList.add("bgcolor");
				productWrapParent.style.bottom = `-${productDescH}px`;
			}

			productItems.forEach((el) => {
				el.addEventListener("mouseover", () => {
					if (productWrapParent.getAttribute("style")) {
						el.style.transform = `translateY(-${productDescH - 21}px)`;
					}
				});

				el.addEventListener("mouseout", () => {
					if (productWrapParent.getAttribute("style")) {
						el.removeAttribute("style");
					}
				});
			});

			window.addEventListener("scroll", function () {
				const elemY = productWrap.getBoundingClientRect().top;
				const windowY = document.documentElement.clientHeight - productWrap.offsetHeight;

				if (elemY < windowY) {
					productWrapParent.classList.remove("bgcolor");
					productWrapParent.removeAttribute("style");
				} else {
					productWrapParent.classList.add("bgcolor");
					productWrapParent.style.bottom = `-${productDescH}px`;
				}
			});
		}
	}
});

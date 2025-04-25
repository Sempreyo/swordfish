document.addEventListener("DOMContentLoaded", () => {
	const interviewCarousel = document.querySelectorAll(".interview__slider .swiper");

	if (interviewCarousel.length > 0) {
		interviewCarousel.forEach(el => {
			const interviewCarouselNext = el.closest(".interview__slider").querySelector(".swiper-btn-next");
			const interviewCarouselPrev = el.closest(".interview__slider").querySelector(".swiper-btn-prev");

			const slider = new Swiper(el, {
				slidesPerView: 1,
				spaceBetween: 40,
				navigation: {
					nextEl: interviewCarouselNext,
					prevEl: interviewCarouselPrev,
				},
				breakpoints: {
					768: {
						slidesPerView: 2
					},
					992: {
						slidesPerView: 3,
						autoHeight: false
					},
				},
				keyboard: {
					enabled: true,
					onlyInViewport: true
				}
			});
		});
	}

	const opinionCarousel = document.querySelectorAll(".opinion__slider");

	if (opinionCarousel.length > 0) {
		opinionCarousel.forEach(el => {
			const opinionCarouselPagination = el.querySelector(".swiper-pagination");

			const slider = new Swiper(el, {
				slidesPerView: 1,
				spaceBetween: 8,
				pagination: {
					el: opinionCarouselPagination,
					clickable: true
				},
				breakpoints: {
					1280: {
					  slidesPerView: "auto",
					  spaceBetween: 50,
						centeredSlides: true,
						initialSlide: 1
					},
				},
				keyboard: {
					enabled: true,
					onlyInViewport: true
				}
			});
		});
	}
});

document.addEventListener("DOMContentLoaded", () => {
	const interviewCarousel = document.querySelectorAll(".interview__slider");

	if (interviewCarousel.length > 0) {
		interviewCarousel.forEach(el => {
			const interviewCarouselNext = el.querySelector(".swiper-btn-next");
			const interviewCarouselPrev = el.querySelector(".swiper-btn-prev");

			const slider = new Swiper(el, {
				slidesPerView: 1,
				spaceBetween: 10,
				autoHeight: true,
				navigation: {
					nextEl: interviewCarouselNext,
					prevEl: interviewCarouselPrev,
				}
			});
		});
	}

	const opinionCarousel = document.querySelectorAll(".opinion__slider");

	if (opinionCarousel.length > 0) {
		opinionCarousel.forEach(el => {
			const opinionCarouselPagination = el.querySelector(".swiper-pagination");

			const slider = new Swiper(el, {
				slidesPerView: "auto",
				initialSlide: 1,
				centeredSlides: true,
				spaceBetween: 50,
				pagination: {
					el: opinionCarouselPagination,
					clickable: true
				}
			});
		});
	}
});

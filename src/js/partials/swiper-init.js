document.addEventListener("DOMContentLoaded", () => {
	const slideshowCarousel = document.querySelectorAll(".carousel__slider");

	if (slideshowCarousel.length > 0) {
		slideshowCarousel.forEach(el => {
			const slideshowCarouselNext = el.nextElementSibling.querySelector(".swiper-btn-next");
			const slideshowCarouselPrev = el.nextElementSibling.querySelector(".swiper-btn-prev");

			const slider = new Swiper(el, {
				slidesPerView: 1,
				spaceBetween: 10,
				autoHeight: true,
				navigation: {
					nextEl: slideshowCarouselNext,
					prevEl: slideshowCarouselPrev,
				}
			});
		});
	}

	const articlesCarousel = document.querySelectorAll(".other-articles__slider");

	if (articlesCarousel.length > 0) {
		articlesCarousel.forEach(el => {
			const articlesCarouselNext = el.nextElementSibling.querySelector(".swiper-btn-next");
			const articlesCarouselPrev = el.nextElementSibling.querySelector(".swiper-btn-prev");

			const slider = new Swiper(el, {
				slidesPerView: 1,
				spaceBetween: 10,
				navigation: {
					nextEl: articlesCarouselNext,
					prevEl: articlesCarouselPrev,
				},
				breakpoints: {
					576: {
						slidesPerView: 2,
					}
				}
			});
		});
	}
});

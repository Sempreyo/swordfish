document.addEventListener("DOMContentLoaded", () => {
	/*const openNav = () => {
		let bodyState = document.body.getAttribute("data-state");

		if (bodyState === "mobile-menu") {
			document.body.dataset.state = "";
		} else {
			document.body.dataset.state = "mobile-menu";
		}
	}

	/!* Мобильное меню *!/
	const burger = document.querySelector(".header__burger");
	const closeButtonMenu = document.querySelector(".header__menu-close");
	const overlay = document.querySelector(".overlay");

	burger.addEventListener("click", openNav);
	closeButtonMenu.addEventListener("click", openNav);
	overlay.addEventListener("click", openNav);

	/!* Смарт хэдер *!/
	const HEADER_SCROLL_BG = 50;
	const HEADER_SCROLL_HIDE = 400;
	const header = document.querySelector(".header");
	let previousTop = window.scrollY;

	header.classList.remove("header--hide");

	const setHeaderStyles = () => {
		let currentTop = window.scrollY;

		if (currentTop > HEADER_SCROLL_BG) {
			header.classList.add("header--bg");
		} else {
			header.classList.remove("header--bg");
		}

		if (currentTop > HEADER_SCROLL_HIDE && currentTop > previousTop && document.body.dataset.state !== "mobile-menu") {
			header.classList.add("header--hide");
		} else {
			header.classList.remove("header--hide");
		}
		previousTop = currentTop;
	};

	document.addEventListener("scroll", () => {
		setHeaderStyles();
	});

	setHeaderStyles();*/
});

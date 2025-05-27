document.addEventListener("DOMContentLoaded", () => {
	const anchors = document.querySelectorAll('.anchor');

	if (anchors && anchors.length > 0) {
		anchors.forEach(anchor => {
			anchor.addEventListener('click', function (e) {
				e.preventDefault();

				document.querySelector(`${anchor.getAttribute("href")}`).scrollIntoView({
					behavior: 'smooth'
				});
			});
		});
	}
});

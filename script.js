// wait for page to load
window.onload = function () {
	// add smooth scrolling to navigation links
	var navLinks = document.querySelectorAll("nav a");

	for (var i = 0; i < navLinks.length; i++) {
		navLinks[i].onclick = function (e) {
			e.preventDefault();

			// get the target section
			var targetId = this.getAttribute("href");
			var targetSection = document.querySelector(targetId);

			// scroll to the section
			if (targetSection) {
				window.scrollTo({
					top: targetSection.offsetTop - 70,
					behavior: "smooth",
				});
			}

			// update active link
			var currentActive = document.querySelector("nav .active");
			if (currentActive) {
				currentActive.classList.remove("active");
			}
			this.classList.add("active");
		};
	}

	// button click alerts
	var listenButtons = document.querySelectorAll(".btn-primary");
	for (var i = 0; i < listenButtons.length; i++) {
		listenButtons[i].onclick = function (e) {
			e.preventDefault();
			var playlistName =
				this.parentNode.querySelector(".card-title").textContent;
			alert("Now playing: " + playlistName);
		};
	}

	// rofile view alerts
	var profileButtons = document.querySelectorAll(".btn-outline-primary");
	for (var i = 0; i < profileButtons.length; i++) {
		profileButtons[i].onclick = function (e) {
			e.preventDefault();
			var artistName =
				this.parentNode.querySelector(".card-title").textContent;
			alert("Viewing profile of: " + artistName);
		};
	}
};
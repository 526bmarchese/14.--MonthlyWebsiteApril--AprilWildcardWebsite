// wait for page to load
window.onload = function () {
	// smooth scrolling to navigation links
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

	// listen buttons - show alert when clicked
	var listenButtons = document.querySelectorAll(".btn-primary");
	for (var i = 0; i < listenButtons.length; i++) {
		listenButtons[i].onclick = function (e) {
			e.preventDefault();
			var playlistName =
				this.parentNode.querySelector(".card-title").textContent;
			alert("Now playing: " + playlistName);
		};
	}

	// profile view
	var profileButtons = document.querySelectorAll(".btn-outline-primary");
	for (var i = 0; i < profileButtons.length; i++) {
		profileButtons[i].onclick = function (e) {
			e.preventDefault();
			var artistName =
				this.parentNode.querySelector(".card-title").textContent;
			alert("Viewing profile of: " + artistName);
		};
	}
	
	// genre card
	var genreCards = document.querySelectorAll(".genre-card");
	for (var i = 0; i < genreCards.length; i++) {
		genreCards[i].onclick = function () {
			var genre = this.getAttribute("data-genre");
			alert("Browsing " + genre + " music");
		};
	}
	
	// newsletter subscription
	var subscribeBtn = document.getElementById("subscribe-btn");
	var emailInput = document.getElementById("newsletter-email");
	var messageDiv = document.getElementById("subscription-message");
	
	if (subscribeBtn) {
		subscribeBtn.onclick = function () {
			messageDiv.style.display = "block";
		
			var email = emailInput.value;
			
			if (email && email.indexOf("@") > -1) {
				// success
				messageDiv.textContent = "Thank you for subscribing!";
				messageDiv.className = "success";
				emailInput.value = "";
				
				// Hide the message after 3 seconds
				setTimeout(function() {
					messageDiv.style.display = "none";
				}, 3000);
			} else {
				// Error
				messageDiv.textContent = "Please enter a valid email address";
				messageDiv.className = "error";
				
				// Hide the error message after 3 seconds
				setTimeout(function() {
					messageDiv.style.display = "none";
				}, 3000);
			}
		};
	}
	
	// Current date in the footer
	var currentDate = new Date();
	var year = currentDate.getFullYear();
	var footerYear = document.querySelector("footer .small");
	
	if (footerYear) {
		footerYear.innerHTML = "© " + year + " Music Discovery. All rights reserved.";
	}
};
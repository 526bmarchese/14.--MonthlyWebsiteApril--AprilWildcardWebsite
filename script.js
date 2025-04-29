// wait for page to load
window.onload = function () {
	// smooth scrolling to navigation links
	var navLinks = document.querySelectorAll("nav a");

	for (var i = 0; i < navLinks.length; i++) {
		navLinks[i].onclick = function (e) {
			// If the link is to a different page, let it proceed normally
			if (this.getAttribute("href").includes(".html")) {
				return true;
			}

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

			// Check if this button is in the recommendations section of about.html
			if (this.closest("#recommendation-form") || this.closest("#recommendations-container")) {
				// Skip this handler for recommendation buttons
				return true;
			}

			// Check if card-title element exists before accessing it
			var titleElement = this.parentNode.querySelector(".card-title");
			if (titleElement) {
				var playlistName = titleElement.textContent;
				alert("Now playing: " + playlistName);
			}
		};
	}

	// profile view
	var profileButtons = document.querySelectorAll(".btn-outline-primary");
	for (var i = 0; i < profileButtons.length; i++) {
		profileButtons[i].onclick = function (e) {
			e.preventDefault();

			// Check if card-title element exists before accessing it
			var titleElement = this.parentNode.querySelector(".card-title");
			if (titleElement) {
				var artistName = titleElement.textContent;
				alert("Viewing profile of: " + artistName);
			}
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
				setTimeout(function () {
					messageDiv.style.display = "none";
				}, 3000);
			} else {
				// Error
				messageDiv.textContent = "Please enter a valid email address";
				messageDiv.className = "error";

				// Hide the error message after 3 seconds
				setTimeout(function () {
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

	// Music Search Functionality
	var searchBtn = document.getElementById("search-btn");
	var searchInput = document.getElementById("music-search");
	var searchResults = document.getElementById("search-results");
	var resultsContainer = document.getElementById("results-container");

	// Sample music data for search - manually added
	var musicData = [
		{
			title: "greedy",
			artist: "Tate McRae",
			genre: "Pop",
			image: "https://picsum.photos/150/150?random=209"
		},
		{
			title: "you broke me first",
			artist: "Tate McRae",
			genre: "Pop",
			image: "https://picsum.photos/150/150?random=210"
		},
		{
			title: "exes",
			artist: "Tate McRae",
			genre: "Pop",
			image: "https://picsum.photos/150/150?random=211"
		},
		{
			title: "Flowers",
			artist: "Miley Cyrus",
			genre: "Pop",
			image: "https://picsum.photos/150/150?random=212"
		},
		{
			title: "Kill Bill",
			artist: "SZA",
			genre: "R&B",
			image: "https://picsum.photos/150/150?random=213"
		},
		{
			title: "As It Was",
			artist: "Harry Styles",
			genre: "Pop",
			image: "https://picsum.photos/150/150?random=214"
		},
		{
			title: "Anti-Hero",
			artist: "Taylor Swift",
			genre: "Pop",
			image: "https://picsum.photos/150/150?random=215"
		},
		{
			title: "Die For You",
			artist: "The Weeknd",
			genre: "R&B",
			image: "https://picsum.photos/150/150?random=216"
		},
		{
			title: "Calm Down",
			artist: "Rema & Selena Gomez",
			genre: "Afrobeats",
			image: "https://picsum.photos/150/150?random=217"
		},
		{
			title: "Unholy",
			artist: "Sam Smith & Kim Petras",
			genre: "Pop",
			image: "https://picsum.photos/150/150?random=218"
		}
	];

	if (searchBtn && searchInput) {
		searchBtn.onclick = function () {
			var query = searchInput.value.toLowerCase();

			if (!query) {
				alert("Please enter a search term");
				return;
			}

			var results = musicData.filter(function (item) {
				return item.title.toLowerCase().includes(query) ||
					item.artist.toLowerCase().includes(query) ||
					item.genre.toLowerCase().includes(query);
			});

			// Show the results section
			searchResults.style.display = "block";

			// Clear previous results
			resultsContainer.innerHTML = "";

			if (results.length === 0) {
				resultsContainer.innerHTML = "<p>No results found. Try a different search term.</p>";
				return;
			}

			// Display results
			results.forEach(function (item) {
				var resultCard = document.createElement("div");
				resultCard.className = "col-md-6 col-lg-4 mb-4";
				resultCard.innerHTML = `
					<div class="card">
						<div class="row g-0">
							<div class="col-4">
								<img src="${item.image}" class="img-fluid rounded-start" alt="${item.title}">
							</div>
							<div class="col-8">
								<div class="card-body">
									<h5 class="card-title">${item.title}</h5>
									<p class="card-text">${item.artist}</p>
									<p class="card-text"><small class="text-muted">${item.genre}</small></p>
									<a href="https://open.spotify.com/search/${encodeURIComponent(item.title + ' ' + item.artist)}" target="_blank" class="btn btn-sm btn-primary">Listen</a>
								</div>
							</div>
						</div>
					</div>
				`;
				resultsContainer.appendChild(resultCard);
			});
		};

		// Allow search on Enter key press
		searchInput.addEventListener("keyup", function (event) {
			if (event.key === "Enter") {
				searchBtn.click();
			}
		});
	}

	// Make genre cards link to platform searches
	var genreCards = document.querySelectorAll(".genre-card");
	for (var i = 0; i < genreCards.length; i++) {
		genreCards[i].onclick = function () {
			var genre = this.getAttribute("data-genre");
			var genreName = this.querySelector("h3").textContent;

			// Simple modal-like alert with options
			var confirmAction = confirm("Would you like to explore " + genreName + " music on streaming platforms?");

			if (confirmAction) {
				// Open Spotify search in a new tab with the genre
				window.open("https://open.spotify.com/search/" + genreName, "_blank");
			}
		};
	}

	// Music Recommendation System
	var recommendationForm = document.getElementById("recommendation-form");
	var recommendationResults = document.getElementById("recommendation-results");
	var recommendationsContainer = document.getElementById("recommendations-container");

	// Music recommendations data by genre and mood
	var recommendationsData = {
		pop: {
			happy: [
				{ title: "Dance Pop Hits", artist: "Various Artists", description: "Upbeat dance tracks to lift your mood" },
				{ title: "Summer Anthems", artist: "Beach Party", description: "Sunny pop tunes perfect for good vibes" }
			],
			chill: [
				{ title: "Mellow Pop", artist: "Indie Voices", description: "Relaxed pop songs for unwinding" },
				{ title: "Acoustic Covers", artist: "String Sessions", description: "Stripped-down versions of popular hits" }
			]
		},
		rock: {
			happy: [
				{ title: "Classic Rock Anthems", artist: "Guitar Heroes", description: "Energetic rock classics to get you moving" },
				{ title: "Upbeat Alternative", artist: "New Wave", description: "Modern rock with positive energy" }
			],
			chill: [
				{ title: "Slow Rock Ballads", artist: "Sunset Drive", description: "Emotional rock ballads for reflection" },
				{ title: "Indie Rock Calm", artist: "Urban Echoes", description: "Mellow indie rock for relaxation" }
			]
		},
		"hip-hop": {
			happy: [
				{ title: "Upbeat Hip-Hop", artist: "Flow Masters", description: "Energetic hip-hop tracks with positive messages" },
				{ title: "Party Rap", artist: "Beat Collective", description: "Hip-hop tracks made for good times" }
			],
			chill: [
				{ title: "Lo-fi Beats", artist: "Chill Hop", description: "Relaxing hip-hop instrumentals" },
				{ title: "Smooth Rap", artist: "Night Verses", description: "Laid-back hip-hop for evening vibes" }
			]
		},
		electronic: {
			happy: [
				{ title: "EDM Anthems", artist: "Festival DJs", description: "High-energy electronic dance music" },
				{ title: "Upbeat Electronica", artist: "Synth Wave", description: "Positive electronic tracks with good rhythms" }
			],
			chill: [
				{ title: "Ambient Electronic", artist: "Deep Space", description: "Atmospheric electronic music for relaxation" },
				{ title: "Chill Step", artist: "Wave Form", description: "Downtempo electronic beats" }
			]
		},
		jazz: {
			happy: [
				{ title: "Swing Jazz", artist: "Brass Section", description: "Upbeat classic jazz from the swing era" },
				{ title: "Funky Jazz", artist: "Smooth Grooves", description: "Jazz with funky influences and energy" }
			],
			chill: [
				{ title: "Late Night Jazz", artist: "Blue Notes", description: "Smooth jazz perfect for evening relaxation" },
				{ title: "Piano Jazz", artist: "Keys Quartet", description: "Gentle piano-led jazz compositions" }
			]
		},
		classical: {
			happy: [
				{ title: "Uplifting Classics", artist: "Grand Orchestra", description: "Classical pieces with uplifting themes" },
				{ title: "Vivaldi Seasons", artist: "String Ensemble", description: "Bright and energetic classical compositions" }
			],
			chill: [
				{ title: "Piano Nocturnes", artist: "Moonlight Sonatas", description: "Peaceful piano classical music" },
				{ title: "Ambient Strings", artist: "Chamber Orchestra", description: "Gentle classical arrangements for relaxation" }
			]
		},
		country: {
			happy: [
				{ title: "Country Anthems", artist: "Western Stars", description: "Upbeat country tunes with positive messages" },
				{ title: "Folk Country", artist: "Mountain Sound", description: "Energetic folk-influenced country music" }
			],
			chill: [
				{ title: "Acoustic Country", artist: "Sunset Riders", description: "Relaxed country songs with acoustic focus" },
				{ title: "Country Ballads", artist: "Southern Tales", description: "Emotional country songs for quiet moments" }
			]
		},
		rb: {
			happy: [
				{ title: "Soulful Grooves", artist: "Rhythm Collective", description: "Upbeat R&B tracks with soul influence" },
				{ title: "Modern R&B Hits", artist: "Urban Smooth", description: "Contemporary R&B with positive energy" }
			],
			chill: [
				{ title: "Smooth R&B", artist: "Velvet Voices", description: "Relaxing R&B tracks for unwinding" },
				{ title: "Neo Soul", artist: "Jazz Influence", description: "Soul-infused R&B for mellow moments" }
			]
		}
	};

	if (recommendationForm) {
		recommendationForm.addEventListener("submit", function (e) {
			e.preventDefault();

			var genre = document.getElementById("favorite-genre").value;
			var mood = document.querySelector('input[name="mood"]:checked').value;
			var artist = document.getElementById("favorite-artist").value;

			if (!genre) {
				alert("Please select a genre");
				return;
			}

			// Show results section
			recommendationResults.style.display = "block";

			// Clear previous recommendations
			recommendationsContainer.innerHTML = "";

			// Get recommendations based on genre and mood
			var recommendations = recommendationsData[genre][mood];

			if (recommendations && recommendations.length > 0) {
				recommendations.forEach(function (item) {
					var recCard = document.createElement("div");
					recCard.className = "col-md-6 mb-3";
					recCard.innerHTML = `
						<div class="card h-100">
							<div class="card-body">
								<h5 class="card-title">${item.title}</h5>
								<h6 class="card-subtitle mb-2 text-muted">${item.artist}</h6>
								<p class="card-text">${item.description}</p>
								<a href="https://open.spotify.com/search/${encodeURIComponent(item.title)}" target="_blank" class="btn btn-primary btn-sm">
									<i class="fab fa-spotify me-1"></i> Find on Spotify
								</a>
							</div>
						</div>
					`;
					recommendationsContainer.appendChild(recCard);
				});

				// If user provided an artist, add a personalized recommendation
				if (artist) {
					var personalized = document.createElement("div");
					personalized.className = "col-12 mt-3";
					personalized.innerHTML = `
						<div class="card bg-light">
							<div class="card-body text-center">
								<h5 class="card-title">Because you like ${artist}</h5>
								<p>You might also enjoy exploring similar artists on your favorite music platform.</p>
								<div class="d-flex justify-content-center gap-2">
									<a href="https://open.spotify.com/search/${encodeURIComponent(artist)}" target="_blank" class="btn btn-outline-dark btn-sm">
										<i class="fab fa-spotify me-1"></i> Find Similar
									</a>
									<a href="https://music.youtube.com/search?q=${encodeURIComponent(artist)}" target="_blank" class="btn btn-outline-dark btn-sm">
										<i class="fab fa-youtube me-1"></i> Explore More
									</a>
								</div>
							</div>
						</div>
					`;
					recommendationsContainer.appendChild(personalized);
				}
			} else {
				recommendationsContainer.innerHTML = "<p class='text-center'>Sorry, we couldn't find any recommendations for your selection.</p>";
			}

			// Scroll to results
			recommendationResults.scrollIntoView({ behavior: 'smooth' });
		});
	}

	// Interactive Image Gallery
	var currentImage = document.getElementById("current-gallery-image");
	var thumbnails = document.querySelectorAll(".thumbnail");
	var prevButton = document.getElementById("prev-image");
	var nextButton = document.getElementById("next-image");
	var galleryCaption = document.getElementById("gallery-caption");
	var currentImageIndex = 0;
	
	// Gallery captions for each image
	var imageCaptions = [
		"Our music discovery team hosting a live event",
		"Recording session with indie artists at our studio",
		"Annual music festival sponsored by Music Discovery",
		"Team meeting discussing new playlist features"
	];
	
	// Only set up gallery functionality if elements exist
	if (thumbnails.length > 0 && currentImage) {
		// Set up thumbnail click handlers
		thumbnails.forEach(function(thumbnail, index) {
			thumbnail.addEventListener("click", function() {
				currentImage.src = this.getAttribute("data-full");
				currentImageIndex = index;
				updateGalleryState();
			});
		});
		
		// Next button handler
		if (nextButton) {
			nextButton.addEventListener("click", function() {
				currentImageIndex = (currentImageIndex + 1) % thumbnails.length;
				currentImage.src = thumbnails[currentImageIndex].getAttribute("data-full");
				updateGalleryState();
			});
		}
		
		// Previous button handler
		if (prevButton) {
			prevButton.addEventListener("click", function() {
				currentImageIndex = (currentImageIndex - 1 + thumbnails.length) % thumbnails.length;
				currentImage.src = thumbnails[currentImageIndex].getAttribute("data-full");
				updateGalleryState();
			});
		}
		
		// Update active thumbnail and caption
		function updateGalleryState() {
			thumbnails.forEach(function(thumb, idx) {
				if (idx === currentImageIndex) {
					thumb.classList.add("active");
					thumb.style.opacity = "1";
				} else {
					thumb.classList.remove("active");
					thumb.style.opacity = "0.6";
				}
			});
			
			if (galleryCaption) {
				galleryCaption.textContent = imageCaptions[currentImageIndex];
			}
		}
	}
	
	// Theme Switcher
	var themeToggle = document.getElementById("theme-toggle");
	var isDarkMode = false;
	
	if (themeToggle) {
		// Check if user has a saved preference
		if (localStorage.getItem("darkMode") === "true") {
			enableDarkMode();
		}
		
		themeToggle.addEventListener("click", function() {
			if (isDarkMode) {
				disableDarkMode();
			} else {
				enableDarkMode();
			}
		});
	}
	
	function enableDarkMode() {
		// Add dark theme to body
		document.body.classList.add("dark-theme");
		
		// Update button icon
		if (themeToggle) {
			themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
			themeToggle.classList.remove("btn-dark");
			themeToggle.classList.add("btn-light");
		}
		
		// Save preference
		localStorage.setItem("darkMode", "true");
		isDarkMode = true;
		
		// Change section backgrounds
		var lightSections = document.querySelectorAll(".bg-light");
		lightSections.forEach(function(section) {
			section.classList.remove("bg-light");
			section.classList.add("bg-dark", "text-white");
		});
		
		// Change card appearances
		var cards = document.querySelectorAll(".card");
		cards.forEach(function(card) {
			card.classList.add("bg-dark", "text-white", "border-secondary");
		});
	}
	
	function disableDarkMode() {
		// Remove dark theme from body
		document.body.classList.remove("dark-theme");
		
		// Update button icon
		if (themeToggle) {
			themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
			themeToggle.classList.remove("btn-light");
			themeToggle.classList.add("btn-dark");
		}
		
		// Save preference
		localStorage.setItem("darkMode", "false");
		isDarkMode = false;
		
		// Restore section backgrounds
		var darkSections = document.querySelectorAll(".bg-dark.text-white:not(nav):not(footer)");
		darkSections.forEach(function(section) {
			if (!section.classList.contains("navbar") && !section.classList.contains("footer")) {
				section.classList.add("bg-light");
				section.classList.remove("bg-dark", "text-white");
			}
		});
		
		// Restore card appearances
		var cards = document.querySelectorAll(".card");
		cards.forEach(function(card) {
			card.classList.remove("bg-dark", "text-white", "border-secondary");
		});
	}
};
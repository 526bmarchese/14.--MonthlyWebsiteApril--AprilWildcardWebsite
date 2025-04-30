// Execute when page loads (Object)
window.onload = function () {
	setupNavigation();
	setupButtons();
	setupNewsletter();
	setupFooterYear();
	setupMusicSearch();
	setupGenreCards();
	setupRecommendations();
	setupGallery();
};

// Navigation functionality
function setupNavigation() {
	document.querySelectorAll("nav a").forEach(link => {
		//OBJECT (Sathvik helped me )
		link.onclick = function(e) {
			if (this.getAttribute("href").includes(".html")) return true;
			
			e.preventDefault();
			const targetSection = document.querySelector(this.getAttribute("href")); //OBJECT (Sathvik helped me )

			
			if (targetSection) {
				window.scrollTo({ //OBJECT (Sathvik helped me )
					top: targetSection.offsetTop - 70,
					behavior: "smooth"
				});
				//OBJECT (Sathvik helped me )
				document.querySelector("nav .active")?.classList.remove("active");
				this.classList.add("active");
			}
		};
	});
}

// Button click handlers
function setupButtons() {
	// Listen buttons
	document.querySelectorAll(".btn-primary").forEach(btn => { //OBJECT (Sathvik helped me )
		btn.onclick = function(e) {
			if (this.closest("#recommendation-form") || 
				this.closest("#recommendations-container") || 
				this.type === "submit") return true;
				
			e.preventDefault();
			const title = this.parentNode.querySelector(".card-title")?.textContent;
			if (title) alert("Now playing: " + title);
		};
	});
	
	// Profile buttons
	document.querySelectorAll(".btn-outline-primary").forEach(btn => { //OBJECT (Sathvik helped me )
		btn.onclick = function(e) {
			e.preventDefault();
			const artist = this.parentNode.querySelector(".card-title")?.textContent;
			if (artist) alert("Viewing profile of: " + artist);
		};
	});
}

// Newsletter subscription
function setupNewsletter() {
	//OBJECT (Sathvik helped me )
	const subscribeBtn = document.getElementById("subscribe-btn");
	const emailInput = document.getElementById("newsletter-email");
	const messageDiv = document.getElementById("subscription-message");
	
	if (!subscribeBtn) return;
	
	subscribeBtn.onclick = function() {
		const email = emailInput.value;
		messageDiv.style.display = "block";
		
		if (email && email.includes("@")) {
			messageDiv.textContent = "Thank you for subscribing!";
			messageDiv.className = "success";
			emailInput.value = "";
		} else {
			messageDiv.textContent = "Please enter a valid email address";
			messageDiv.className = "error";
		}
		
		setTimeout(() => messageDiv.style.display = "none", 3000);
	};
}

// Footer year update
function setupFooterYear() {
	const footerYear = document.querySelector("footer .small"); //OBJECT (Sathvik helped me )
	if (footerYear) {
		footerYear.innerHTML = "© " + new Date().getFullYear() + " Music Discovery. All rights reserved.";
	}
}

// Music search functionality
function setupMusicSearch() {
	const searchBtn = document.getElementById("search-btn"); //OBJECT (Sathvik helped me )
	const searchInput = document.getElementById("music-search");
	const searchResults = document.getElementById("search-results");
	const resultsContainer = document.getElementById("results-container");
	
	if (!searchBtn || !searchInput) return;
	
	// Sample music data OBJECTS (Sathvik helped me )
	const musicData = [
		{
			title: "greedy",
			artist: "Tate McRae",
			genre: "Pop",
			image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80"
		},
		{
			title: "Kill Bill",
			artist: "SZA",
			genre: "R&B",
			image: "https://images.unsplash.com/photo-1619961310056-1f5c8df685d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80"
		},
		{
			title: "Anti-Hero",
			artist: "Taylor Swift",
			genre: "Pop",
			image: "https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80"
		},
		{
			title: "Die For You",
			artist: "The Weeknd",
			genre: "R&B",
			image: "https://images.unsplash.com/photo-1631304908477-871d43a17754?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80"
		}
	];
	
	// Search function
	function performSearch() {
		const query = searchInput.value.toLowerCase();
		if (!query) {
			alert("Please enter a search term");
			return;
		}
		//OBJECT (Sathvik helped me )
		const results = musicData.filter(item => 
			item.title.toLowerCase().includes(query) || 
			item.artist.toLowerCase().includes(query) || 
			item.genre.toLowerCase().includes(query)
		);
		
		searchResults.style.display = "block";
		resultsContainer.innerHTML = "";
		
		if (results.length === 0) {
			resultsContainer.innerHTML = "<p>No results found. Try a different search term.</p>";
			return;
		}
		
		results.forEach(item => {
			const resultCard = document.createElement("div"); //OBJECT (Sathvik helped me )
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
								<a href="https://open.spotify.com/search/${encodeURIComponent(item.title + ' ' + item.artist)}" 
								   target="_blank" class="btn btn-sm btn-primary">Listen</a>
							</div>
						</div>
					</div>
				</div>
			`;
			resultsContainer.appendChild(resultCard);
		});
	}
	
	searchBtn.onclick = performSearch;
	searchInput.addEventListener("keyup", e => {
		if (e.key === "Enter") performSearch(); //OBJECT (Sathvik helped me )
	});
}

// Genre card functionality
function setupGenreCards() {
	//OBJECT (Sathvik helped me )
	document.querySelectorAll(".genre-card").forEach(card => {
		card.onclick = function() {
			const genreName = this.querySelector("h3").textContent;
			
			if (confirm("Would you like to explore " + genreName + " music on streaming platforms?")) {
				window.open("https://open.spotify.com/search/" + genreName, "_blank");
			}
		};
	});
}

// Music recommendation system
function setupRecommendations() {
	const form = document.getElementById("recommendation-form"); //OBJECT (Sathvik helped me )
	if (!form) return;
	
	// Recommendations data OBJECTS (Sathvik helped me )
	const recommendationsData = {
		pop: {
			happy: [{ title: "Dance Pop Hits", artist: "Various Artists", description: "Upbeat dance tracks to lift your mood" }],
			chill: [{ title: "Mellow Pop", artist: "Indie Voices", description: "Relaxed pop songs for unwinding" }]
		},
		rock: {
			happy: [{ title: "Classic Rock Anthems", artist: "Guitar Heroes", description: "Energetic rock classics to get you moving" }],
			chill: [{ title: "Slow Rock Ballads", artist: "Sunset Drive", description: "Emotional rock ballads for reflection" }]
		},
		"hip-hop": {
			happy: [{ title: "Upbeat Hip-Hop", artist: "Flow Masters", description: "Energetic hip-hop tracks with positive messages" }],
			chill: [{ title: "Lo-fi Beats", artist: "Chill Hop", description: "Relaxing hip-hop instrumentals" }]
		},
		electronic: {
			happy: [{ title: "EDM Anthems", artist: "Festival DJs", description: "High-energy electronic dance music" }],
			chill: [{ title: "Ambient Electronic", artist: "Deep Space", description: "Atmospheric electronic music for relaxation" }]
		},
		jazz: {
			happy: [{ title: "Swing Jazz", artist: "Brass Section", description: "Upbeat classic jazz from the swing era" }],
			chill: [{ title: "Late Night Jazz", artist: "Blue Notes", description: "Smooth jazz perfect for evening relaxation" }]
		},
		classical: {
			happy: [{ title: "Uplifting Classics", artist: "Grand Orchestra", description: "Classical pieces with uplifting themes" }],
			chill: [{ title: "Piano Nocturnes", artist: "Moonlight Sonatas", description: "Peaceful piano classical music" }]
		},
		country: {
			happy: [{ title: "Country Anthems", artist: "Western Stars", description: "Upbeat country tunes with positive messages" }],
			chill: [{ title: "Acoustic Country", artist: "Sunset Riders", description: "Relaxed country songs with acoustic focus" }]
		},
		rb: {
			happy: [{ title: "Soulful Grooves", artist: "Rhythm Collective", description: "Upbeat R&B tracks with soul influence" }],
			chill: [{ title: "Smooth R&B", artist: "Velvet Voices", description: "Relaxing R&B tracks for unwinding" }]
		}
	};
	
	//OBJECT (Sathvik helped me )
	form.addEventListener("submit", function(e) {
		e.preventDefault();
		
		const genre = document.getElementById("favorite-genre").value;
		const mood = document.querySelector('input[name="mood"]:checked').value;
		const artist = document.getElementById("favorite-artist").value;
		
		if (!genre) {
			alert("Please select a genre");
			return;
		}
		
		const results = document.getElementById("recommendation-results");
		const container = document.getElementById("recommendations-container");
		
		results.style.display = "block";
		container.innerHTML = "";
		
		const recommendations = recommendationsData[genre][mood]; //OBJECT (Sathvik helped me )
		
		if (recommendations?.length) {
			recommendations.forEach(item => {
				container.innerHTML += `
					<div class="col-md-6 mb-3">
						<div class="card h-100">
							<div class="card-body">
								<h5 class="card-title">${item.title}</h5>
								<h6 class="card-subtitle mb-2 text-muted">${item.artist}</h6>
								<p class="card-text">${item.description}</p>
								<a href="https://open.spotify.com/search/${encodeURIComponent(item.title)}" 
								   target="_blank" class="btn btn-primary btn-sm">
									<i class="fab fa-spotify me-1"></i> Find on Spotify
								</a>
							</div>
						</div>
					</div>
				`;
			});
			
			if (artist) {
				container.innerHTML += `
					<div class="col-12 mt-3">
						<div class="card bg-light">
							<div class="card-body text-center">
								<h5 class="card-title">Because you like ${artist}</h5>
								<p>You might also enjoy exploring similar artists on your favorite music platform.</p>
								<div class="d-flex justify-content-center gap-2">
									<a href="https://open.spotify.com/search/${encodeURIComponent(artist)}" 
									   target="_blank" class="btn btn-outline-dark btn-sm">
										<i class="fab fa-spotify me-1"></i> Find Similar
									</a>
									<a href="https://music.youtube.com/search?q=${encodeURIComponent(artist)}" 
									   target="_blank" class="btn btn-outline-dark btn-sm">
										<i class="fab fa-youtube me-1"></i> Explore More
									</a>
								</div>
							</div>
						</div>
					</div>
				`;
			}
		} else {
			container.innerHTML = "<p class='text-center'>Sorry, we couldn't find any recommendations for your selection.</p>";
		}
		
		results.scrollIntoView({ behavior: 'smooth' });
	});
}

// Image gallery functionality
function setupGallery() {
	const currentImage = document.getElementById("current-gallery-image"); //OBJECT (Sathvik helped me )
	const thumbnails = document.querySelectorAll(".thumbnail");
	const prevButton = document.getElementById("prev-image");
	const nextButton = document.getElementById("next-image");
	const galleryCaption = document.getElementById("gallery-caption");
	
	if (!thumbnails.length || !currentImage) return;
	
	let currentImageIndex = 0;

	//OBJECT (Sathvik helped me )
	const captions = [
		"Our music discovery team hosting a live event",
		"Recording session with indie artists at our studio",
		"Annual music festival sponsored by Music Discovery",
		"Team meeting discussing new playlist features"
	];
	
	function updateGallery() {
		thumbnails.forEach((thumb, idx) => {
			thumb.classList.toggle("active", idx === currentImageIndex);
			thumb.style.opacity = idx === currentImageIndex ? "1" : "0.6";
		});
		
		if (galleryCaption) galleryCaption.textContent = captions[currentImageIndex];
	}
	
	thumbnails.forEach((thumbnail, index) => {
		thumbnail.addEventListener("click", function() {
			currentImage.src = this.getAttribute("data-full");
			currentImageIndex = index;
			updateGallery();
		});
	});
	
	if (nextButton) {
		nextButton.addEventListener("click", function() {
			currentImageIndex = (currentImageIndex + 1) % thumbnails.length;
			currentImage.src = thumbnails[currentImageIndex].getAttribute("data-full");
			updateGallery();
		});
	}
	
	if (prevButton) {
		prevButton.addEventListener("click", function() {
			currentImageIndex = (currentImageIndex - 1 + thumbnails.length) % thumbnails.length;
			currentImage.src = thumbnails[currentImageIndex].getAttribute("data-full");
			updateGallery();
		});
	}
}
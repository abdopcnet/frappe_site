// API_MAP is loaded as a separate script via hooks.py
// Use window.API_MAP which is set by api_mapper.js

export default {
	name: "Slideshow",
	data() {
		return {
			slides: [],
			currentSlide: 0,
			autoSlideInterval: null,
		};
	},
	mounted() {
		this.loadSlideshow();
	},
	beforeUnmount() {
		if (this.autoSlideInterval) {
			clearInterval(this.autoSlideInterval);
		}
	},
	methods: {
		async loadSlideshow() {
			try {
				/* global frappe */
				frappe.call({
					method: window.API_MAP?.SLIDESHOW?.GET_SLIDESHOW || "frappe_site.api.slideshow.get_slideshow.get_active_slideshow",
					callback: (r) => {
						if (r && r.message) {
							this.slides = r.message.slides || [];
							if (this.slides.length > 0) {
								this.startAutoSlide();
							}
						}
					},
				});
			} catch (error) {
				console.error("Error loading slideshow:", error);
			}
		},
		nextSlide() {
			this.currentSlide = (this.currentSlide + 1) % this.slides.length;
		},
		prevSlide() {
			this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
		},
		goToSlide(index) {
			this.currentSlide = index;
		},
		startAutoSlide() {
			if (this.autoSlideInterval) {
				clearInterval(this.autoSlideInterval);
			}
			this.autoSlideInterval = setInterval(() => {
				this.nextSlide();
			}, 5000);
		},
	},
};


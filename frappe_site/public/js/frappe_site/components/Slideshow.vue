<template>
  <div class="slideshow-container" v-if="slides.length > 0">
    <div class="slideshow-wrapper">
      <div
        v-for="(slide, index) in slides"
        :key="slide.id"
        class="slide"
        :class="{ active: index === currentSlide }"
      >
        <img :src="getImageUrl(slide.image)" :alt="slide.heading" @error="handleImageError" />
        <div class="slide-content" v-if="slide.heading || slide.description">
          <h2 v-if="slide.heading">{{ slide.heading }}</h2>
          <p v-if="slide.description">{{ slide.description }}</p>
          <a v-if="slide.url" :href="slide.url" class="slide-link">Shop Now</a>
        </div>
      </div>
    </div>
    <button class="slide-prev" @click="prevSlide">‹</button>
    <button class="slide-next" @click="nextSlide">›</button>
    <div class="slide-indicators">
      <span
        v-for="(slide, index) in slides"
        :key="slide.id"
        class="indicator"
        :class="{ active: index === currentSlide }"
        @click="goToSlide(index)"
      ></span>
    </div>
  </div>
</template>

<script src="./Slideshow.js"></script>

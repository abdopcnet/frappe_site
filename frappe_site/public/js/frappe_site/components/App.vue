<template>
  <div class="frappe-site-app">
    <Slideshow />
    <router-view />
  </div>
</template>

<script>
import Slideshow from './Slideshow.vue';

export default {
  name: 'App',
  components: {
    Slideshow,
  },
};
</script>

<style scoped>
.frappe-site-app {
  min-height: 100vh;
}
</style>

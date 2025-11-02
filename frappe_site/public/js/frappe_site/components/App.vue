<template>
  <div class="frappe-site-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
.frappe-site-app {
  min-height: 100vh;
}
</style>

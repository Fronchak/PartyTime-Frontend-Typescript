<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue';
import FlashMessage from './components/FlashMessage.vue';
</script>

<template>
    <Navbar />
    <FlashMessage />
    <div class="py-2 py-md-3" id="main-container">
      <RouterView />
    </div>
    <Footer></Footer>
</template>

<style scoped>
#main-container {
  min-height: 75vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

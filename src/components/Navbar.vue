<script setup lang="ts">
import { RouterLink, useRouter, useRoute } from 'vue-router';
import useAuthStore from '../stores/authStore';
import flashMessage from '../stores/flashMessage';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const onLogout = () => {
  authStore.logout();
  flashMessage.setMessage('Logout with success', 'alert-primary', 2000);
  router.push({ name: 'home' });
}

</script>

<template>
<nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
  <div class="container">
    <RouterLink class="navbar-brand" to="/">
      <img src="/img/partytimelogo.png" width="30" height="24" alt="Party time logo"/>
    </RouterLink>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <RouterLink class="nav-link" aria-current="page" to="/" :class="{ active: route.path === '/' }">Home</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/parties" :class="{ active: route.path === '/parties' }">Parties</RouterLink>
        </li>
        <li v-if="authStore.isAuthenticated" class="nav-item">
          <RouterLink class="nav-link" to="/dashboard" :class="{ active: route.path === '/dashboard' }">Dashboard</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/about" :class="{ active: route.path === '/about' }">About</RouterLink>
        </li>
      </ul>
      <ul class="navbar-nav me-auto mb-2 mb-lg-0 justify-content-end w-100">
        <template v-if="authStore.isAuthenticated">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/auth/update" :class="{ active: route.path === '/auth/update' }">Update profile</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/dashboard" :class="{ active: route.path === '/dashboard' }">{{ authStore.getEmail }}</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" 
              to="/auth/logout"
              @click.prevent="onLogout"
            >Logout</RouterLink>
          </li>
        </template>
        <template v-else>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/auth/login" :class="{ active: route.path === '/auth/login' }">Login</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/auth/register" :class="{ active: route.path === '/auth/register' }">Register</RouterLink>
          </li>
        </template>
      </ul>
    </div>
  </div>
</nav>
</template>
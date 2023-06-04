<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
    <div class="container">
        <div class="row align-items-center">
            <div class="col-6 d-none d-md-flex">
                <div id="auth-img-container" class="text-center">
                    <img src="/img/login.svg" class="img-fluid" alt="Form" />
                </div>
            </div>
            <div class="col-12 col-md-6">
                <div id="auth-container" class="py-3">
                    <div id="auth-content" class="px-4">
                        <RouterView />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#auth-content {
    max-width: 480px;
    min-height: 500px;
    margin: 0 auto;
    padding-top: 2em;
    padding-bottom: 2em;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.25);
    border: 1px solid #ddd;
    border-radius: 15px;
    display: flex;
    align-items: center;
}

#auth-content * {
    flex: 1;
}
</style>
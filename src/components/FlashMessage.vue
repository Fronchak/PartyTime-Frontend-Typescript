<script setup lang="ts">
import flashMessage from "../stores/flashMessage";
</script>

<template>
    <div v-if="flashMessage.message" class="p-4 pb-0" id="flash-message-container">
        <div class="alert" :class="flashMessage.messageClass" role="alert">
            {{ flashMessage.message }}
        </div>
    </div>
</template>

<style scoped>
#flash-message-container {
    max-width: 560px;
    margin: 0 auto;
}
</style>
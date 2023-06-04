<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { BASE_URL } from '../utils/constantes';
import type { SimplePartyInterface } from '../types/SimplePartyInterface';
import { toDataFormated } from '../utils/date-utils';

type Props = {
    party: SimplePartyInterface
}

defineProps<Props>();
</script>
<template>
    <div class="card">
        <img :src="`${BASE_URL}/imgs/${party.photo}`" class="card-img-top" :alt="party.title" />
        <div class="card-body">
            <h3 class="card-title">{{ party.title }}</h3>
            <p class="card-text"><span class="fw-bold">Date: </span>{{ toDataFormated(party.partyData) }}</p>
        </div>
        <routerLink :to="`/parties/${party.id}`" class="card-button text-bg-dark fw-bold">See details</routerLink>
    </div>
</template>

<style scoped>
.card img {
    height: 200px;
}

.card .card-title {
    height: 70px;
    overflow: hidden;
}
.card-button {
    text-align: center;
    width: 100%;
    padding: 10px 0;
    transition: 0.5s;
}

.card-button:hover {
    background-color: #CCC !important;
    color: #222 !important;
}
</style>


<script setup lang="ts">
import PartyCard from '../../components/PartyCard.vue';
import type { SimplePartyInterface } from '../../types/SimplePartyInterface';
import useFetch from '../../composables/useFetch';

const { data, error } = useFetch<Array<SimplePartyInterface>>('parties');
</script>

<template>
    <div class="container">
        <header>
            <h1 class="mb-3">See the parties register</h1>
        </header>
        <div v-if="data" class="row g-3 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
            <div v-for="party in data" :key="party.id" class="col">
                <PartyCard 
                    :party="party"
                />
            </div>
        </div>
        <h1 v-else>Loading parties...</h1>
    </div>

</template>

<style scoped>
.container {
    align-self: flex-start;
}
</style>
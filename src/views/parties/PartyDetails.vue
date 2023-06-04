<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { BASE_URL,  } from '../../utils/constantes';
import type { PartyInterface } from '../../types/PartyInterface';
import { toDataFormated } from '../../utils/date-utils';
import useFetch from '../../composables/useFetch';
    
const mainPhoto = ref<string | undefined>();
const route = useRoute();

const { data, error, isLoading } = useFetch<PartyInterface>(`parties/${route.params.id}`);

</script>

<template>
    <div class="container">
        <div v-if="!data">
            <h1>Loading...</h1>
        </div>
        <div v-else class="row">
            <div class="d-none d-md-flex col-6">
                <img class="img-fluid" :src="`${BASE_URL}/imgs/${mainPhoto ?? data.photos[0]}`" id="main-photo"/>
            </div>
            <div class="col-12 col-md-6 text-center text-md-start">
                <header>
                    <h1>{{ data.title }}</h1>
                </header>
                <p><span class="fw-bold">Date:</span> {{ toDataFormated(data.partyData) }}</p>
                <p><span class="fw-bold">Description:</span></p>
                <p class="ps-4">{{ data.description }}</p>
            </div>
        </div>
        <div v-if="data" class="mt-3" >
            <header>
                <h2 class="fw-bold fs-1 mb-3">Gallery</h2>
            </header>
            <div id="gallery">
                <div class="img-container" v-for="photo in data.photos" :key="photo">
                    <img :src="`${BASE_URL}/imgs/${photo}`" @mouseover="mainPhoto = photo" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    align-self: flex-start;
}

#gallery {
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
}

.img-container {
    border: 5px solid #CCC;
    transition: 0.5s;
}

.img-container:hover {
    border-color: #222;
}

#main-photo {
    width: 100%;
    max-height: 400px;
}

#gallery img {
    width: 200px;
    height: 200px;
}
</style>
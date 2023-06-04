<script setup lang="ts">
import { ref } from 'vue';
import { BASE_URL } from '../utils/constantes';
import type { SimplePartyInterface } from '../types/SimplePartyInterface';
import { toDataFormated } from '../utils/date-utils';

type Props = {
    party: SimplePartyInterface
}

const props = defineProps<Props>();
const party = ref<SimplePartyInterface>(props.party);

const emit = defineEmits<{
    (e: 'deleteParty', id: string): void
}>();

function onDelete() {
    emit('deleteParty', party.value.id);
}
</script>

<template>
    <div class="card">
        <img :src="`${BASE_URL}/imgs/${party.photo}`" class="card-img-top" :alt="party.title" />
        <div class="card-body">
            <h4 class="card-title">{{ party.title }}</h4>
            <p><strong>Date: </strong>{{ toDataFormated(party.partyData) }}</p>
            <div class="buttons-container">
                <router-link :to="`/parties/${party.id}`" class="btn btn-success">See party</router-link>
                <router-link :to="`/parties/edit/${party.id}`" class="btn btn-primary">Edit</router-link>
                <button @click="onDelete()" class="btn btn-danger">Delete</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-img-top {
    height: 300px;
}

.buttons-container {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
}

.buttons-container * {
    flex: 1;
    min-width: 150px;
}

.card .card-title {
    height: 70px;
    overflow: hidden;
}
</style>
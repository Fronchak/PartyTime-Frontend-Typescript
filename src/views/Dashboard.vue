<script setup lang="ts">
import { computed } from 'vue';
import { BASE_URL } from '../utils/constantes';
import UserPartyCard from '../components/UserPartyCard.vue';
import flashMessage from '../stores/flashMessage';
import useAuthStore from '../stores/authStore';
import type { SimplePartyInterface } from '../types/SimplePartyInterface';
import useFetch from '../composables/useFetch';

const authData = useAuthStore();
const { data } = useFetch<SimplePartyInterface[]>('users/parties', true);
const isEmpty = computed(() => data?.value?.length === 0);

async function deleteParty(id: string) {
    try {
        const response = await fetch(`${BASE_URL}/parties/${id}`, {
            method: 'delete',
            headers: {
                'Authorization': `Bearer ${authData.getToken}`
            }
        });
        if(response.ok) {
            flashMessage.setMessage('Party deleted with success', 'alert-success');
            data.value = data?.value?.filter((party) => party.id !== id);
        }
        else {
            const responseData = await response.json();
            console.log(responseData);
            flashMessage.setMessage('Something went wrong', 'alert-danger');
            console.error(responseData);
        }
    }
    catch(e) {
        flashMessage.setMessage('Something went wrong', 'alert-danger');
        console.error(e);
    }
}
</script>

<template>
    <div id="dashboard-container" class="container">
        <h1>Gerencie seus eventos</h1>
        <p><RouterLink to="/parties/register">Click here</RouterLink> to register a new party</p>
        <div v-if="!data">
            <h2>Loading your parties</h2>
        </div>
        <div v-else-if="isEmpty">
            <h2>You have 0 parties registed, <RouterLink to="/parties/register">click here</RouterLink> to register your first one.</h2>
        </div>
        <div v-else class="row g-3 row-cols-1 row-cols-sm-2 row-cols-lg-3">
            <div class="col" v-for="party in data" :key="party.id">
                <UserPartyCard 
                    :party="party"
                    @deleteParty="deleteParty($event)"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
#dashboard-container {
    align-self: flex-start;
}
</style>
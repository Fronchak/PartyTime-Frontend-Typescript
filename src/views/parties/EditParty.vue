<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PartyForm from '../../components/PartyForm.vue';
import { BASE_URL } from '../../utils/constantes';
import useAuthStore from '../../stores/authStore';
import flashMessage from '../../stores/flashMessage';

type PartyForm = {
    id: string,
    title: string,
    description: string,
    privacy: boolean;
    partyData: string,
    photos: Array<string>
}

const party = ref<PartyForm | undefined>();
const route = useRoute();
const router = useRouter();
const authData = useAuthStore();

onMounted(async() => {
    try {
        const response = await fetch(`${BASE_URL}/parties/${route.params.id}`, {
            headers: {
                'Authorization': `Bearer ${authData.getToken}`
            }
        });
        const responseData = await response.json();
        if(response.ok) {
            party.value = responseData;
            console.log(responseData);
        }
        else {
            console.log(responseData);
            flashMessage.setMessage('Something went wrong', 'alert-danger');
            router.back();
        }
    }
    catch(e) {
        console.error(e);
        flashMessage.setMessage('Something went wrong', 'alert-danger');
        router.back();
    }
});

const date = computed(() => {
    return party.value?.partyData.substring(0, 10);
})

</script>

<template>
    <div id="register-party-container" class="container">
        <h1 class="text-center">Update Party</h1>
        <div v-if="party">
            <PartyForm 
                :id="party.id"
                :title="party.title"
                :description="party.description"
                :oldPhotos="party.photos"
                :partyData="date"
            />
        </div>
        <h2 v-else>Loading...</h2>
        
    </div>
</template>
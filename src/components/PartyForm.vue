<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { isBlank } from '../utils/string-utils';
import { BASE_URL, IS_INVALID, IS_VALID } from '../utils/constantes';
import flashMessage from '../stores/flashMessage';
import useAuthStore from '../stores/authStore';
import type { ValidationServerErrorInterface } from '../types/ValidationServerErrorInterface';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

type Props = {
    id?: string,
    title?: string,
    description?: string,
    privacy?: boolean;
    partyData?: string,
    oldPhotos?: Array<string>
}

const props = defineProps<Props>();

const title = ref<string>(props.title ?? '');
const description = ref(props.description ?? '');
const privacy = ref<boolean>(props.privacy);
const partyData = ref<string>(props.partyData ?? '');
const photos = ref();
const wasSubmited = ref<boolean>(false);

const titleError = ref<string>();
const descriptionError = ref<string>();
const partyDataError = ref<string>();
const photosError = ref<string>();

const titleClass = ref<string>();
const descriptionClass = ref<string>();
const partyDataClass = ref<string>();
const photosClass = ref<string>();

const fileInput = ref<HTMLInputElement | null>(null);

const onTitleInput = () => {
    if(isBlank(title.value)) {
        titleError.value = 'Title is required';
        titleClass.value = IS_INVALID;
    }
    else {
        titleError.value = undefined;
        titleClass.value = IS_VALID;
    }
}

const onDescriptionInput = () => {
    if(isBlank(description.value)) {
        descriptionError.value = 'Description is required';
        descriptionClass.value = IS_INVALID;
    }
    else {
        descriptionError.value = undefined;
        descriptionClass.value = IS_VALID;
    }
}

const onDateChange = () => {
    if(!partyData.value) {
        partyDataError.value = 'Date is required';
        partyDataClass.value = IS_INVALID;
    }
    else {
        partyDataError.value = undefined;
        partyDataClass.value = IS_VALID;
    }
}

const onFilesChange = () => {
    photos.value = fileInput?.value?.files;
    if(!props.id && (!photos.value || photos.value.length == 0)) {
        photosError.value = "Photos are required";
        photosClass.value = IS_INVALID;
    }
    else {
        photosError.value = undefined;
        photosClass.value = IS_VALID;
    }
}

async function onSubmit() {
    if(!wasSubmited.value) {
        wasSubmited.value = true;
        onTitleInput();
        onDateChange();
        onDescriptionInput();
        onFilesChange();
    }
    if(!titleError.value && !descriptionError.value && !partyDataError.value && !photosError.value) {
        console.log('Send to API');
        const formData = new FormData();
        formData.append('title', title.value);
        formData.append('description', description.value);
        formData.append('privacy', privacy.value ? 'true' : 'false');
        formData.append('partyData', partyData.value);
        if(photos.value) {
            for(let i = 0; i < photos.value.length; i++) {
                const image = photos.value.item(i);
                if(image) {
                    formData.append('photos', image);
                }
            }
        }
        try {
            let response;
            if(props.id) {
                response = await fetch(`${BASE_URL}/parties/${props.id}`, {
                    method: 'put',
                    body: formData,
                    headers: {
                        'Authorization': `Bearer ${authStore.getToken}`
                    },
                });
            }
            else {
                response = await fetch(`${BASE_URL}/parties`, {
                    method: 'post',
                    body: formData,
                    headers: {
                        'Authorization': `Bearer ${authStore.getToken}`
                    },
                });
            }
            const responseData = await response.json();
            console.log(responseData);
            if(response.ok) {
                const responseMessage = props.id ? 'Party updated with success' : 'Party register with success';
                flashMessage.setMessage(responseMessage, 'alert-success');
                router.push({ name: 'dashboard' })
            }
            else if(responseData.status == 422) {
                const serverErrors = (responseData as ValidationServerErrorInterface).errors;
                const titleServerError = serverErrors.find((serverError) => serverError.fieldName == 'title');
                if(titleServerError) {
                    titleError.value = titleServerError.message;
                    titleClass.value = IS_INVALID;
                }
                const dateServerError = serverErrors.find((serverError) => serverError.fieldName == 'partyData');
                if(dateServerError) {
                    partyDataError.value = dateServerError.message;
                    partyDataClass.value = IS_INVALID;
                }
                const photosServerError = serverErrors.find((serverError) => serverError.fieldName == 'photos');
                if(photosServerError) {
                    photosError.value = photosServerError.message;
                    photosClass.value = IS_INVALID
                }
                const descriptionServerError = serverErrors.find((serverError) => serverError.fieldName == 'description');
                if(descriptionServerError) {
                    descriptionError.value = descriptionServerError.message;
                    descriptionClass.value = IS_INVALID;
                }
                flashMessage.setMessage('Please verify the invalid fields', 'alert-danger');
            }
            else if(responseData.status == 401) {
                flashMessage.setMessage('You need to login before to register a party');
                router.push({
                    name: 'login',
                    query: { redirect: route.fullPath }
                })
            }
            else {
                flashMessage.setMessage('Something went wrong, please try again later', 'alert-danger');
            }
        }
        catch(e) {
            console.log('no catch');
            console.error(e);
            flashMessage.setMessage('Something went wrong, please try again later', 'alert-danger');
        }
    }
    else {
        console.log('has errors');
    }
}
</script>

<template>
    <form @submit.prevent="onSubmit" enctype="multipart/form-data">
        <div class="mb-3">
            <label class="form-label" for="title">Title</label>
            <input 
                type="text" 
                id="title"
                placeholder="Enter the party title"
                class="form-control"
                :class="wasSubmited && titleClass"
                @input="onTitleInput"
                v-model="title"
            />
            <div class="invalid-feedback d-block">
                {{ wasSubmited ? titleError : '' }}
            </div>
        </div>
        <div class="mb-3">
            <label class="form-label" for="date">Date</label>
            <input 
                type="date"
                class="form-control"
                :class="wasSubmited && partyDataClass"
                @change="onDateChange"
                v-model="partyData"
            />
            <div class="invalid-feedback d-block">
                {{ wasSubmited ? partyDataError : '' }}
            </div>
        </div>
        <div class="mb-3">
            <label class="form-label" for="photos">Photos</label>
            <input 
                type="file"
                multiple
                ref="fileInput"
                class="form-control"
                :class="wasSubmited && photosClass"
                placeholder="Upload some event images"
                @change="onFilesChange"
            />
            <div class="invalid-feedback d-block">
                {{ wasSubmited ? photosError : '' }}
            </div>
        </div>
        <div v-if="oldPhotos">
            <p>Uploaded photos</p>
            <div class="imgs-container">
                <img v-for="photo in props.oldPhotos" :key="photo"  
                    :src="`${BASE_URL}/imgs/${photo}`"
                />
            </div>
        </div>
        <div class="mb-3">
            <label class="form-label" for="description">Description</label>
            <textarea
                id="description"
                class="form-control"
                :class="wasSubmited && descriptionClass"
                placeholder="Party description"
                rows="5"
                v-model="description"
                @input="onDescriptionInput"
            >
            </textarea>
            <div class="invalid-feedback d-block">
                {{ wasSubmited ? descriptionError : '' }}
            </div>
        </div>
        <div class="mb-3 form-check">
            <input  
                class="form-check-input"
                type="checkbox"
                v-model="privacy"
                id="privacy"
            />
            <label class="form-check-label" for="privacy">
                Private event?
            </label>
        </div>
        <div class="mb-3">
            <button type="submit" class="btn btn-primary d-block w-100">
                {{ id ? 'Update party' : 'Register party' }}
            </button>
        </div>
    </form>
</template>

<style scoped>

form {
    max-width: 560px;
    margin: 0 auto;
}
.imgs-container {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
    justify-content: center;
}

.imgs-container img {
    width: 100px;
    height: 100px;
}
</style>
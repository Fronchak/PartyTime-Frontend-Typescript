<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, useRouter, useRoute } from 'vue-router';
import useAuthStore from '../../stores/authStore';
import { isBlank, isEmail } from '../../utils/string-utils';
import { IS_VALID, IS_INVALID, BASE_URL } from '../../utils/constantes';
import flashMessage from "../../stores/flashMessage";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const email = ref<string>('');
const password = ref<string>('');
const emailError = ref<string>();
const passwordError = ref<string>();
const emailClass = ref<string>();
const passwordClass = ref<string>();
const wasSubmited = ref<boolean>(false);

const onEmailInput = () => {
    if(isBlank(email.value)) {
        emailError.value = 'Email is required';
        emailClass.value = IS_INVALID;
    }
    else if(!isEmail(email.value)) {
        emailError.value = 'Invalid email format';
        emailClass.value = IS_INVALID;
    }
    else {
        emailError.value = undefined;
        emailClass.value = IS_VALID;
    }
}

const onPasswordInput = () => {
    if(isBlank(password.value)) {
        passwordError.value = "Password is required";
        passwordClass.value = IS_INVALID;
    }
    else {
        passwordError.value = undefined;
        passwordClass.value = IS_VALID;
    }
}

function onSubmit() {
    if(!wasSubmited.value) {
        wasSubmited.value = true;
        onEmailInput();
        onPasswordInput();
    }
    if(!emailError.value && !passwordError.value) {
        console.log('send to API');
        const data = {
            email: email.value,
            password: password.value
        }
        const jsonData = JSON.stringify(data);
        fetch(`${BASE_URL}/auth/login`, {
            method: 'post',
            body: jsonData,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }).then((response) => response.json())
        .then((responseData) => {
            if(responseData.status == 401) {
                flashMessage.setMessage(responseData.message, 'alert-danger');
                wasSubmited.value = false;
            }
            else {
                authStore.authenticate(responseData.access_token);
                flashMessage.setMessage('Login with success', 'alert-success', 3000);
                let redirect = route.query.redirect || '/home';
                console.log(route.query);
                console.log(redirect);
                router.push({
                    path: redirect as string
                });
            }
        })
        .catch((e) => {
            console.log('no catch');
            console.error(e);
            flashMessage.setMessage('Something went wrong, please try again later', 'alert-danger');
        })
    }
}
</script>

<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="onSubmit">
            <div class="mb-3">
                <label class="mb-3" for="email">Email</label>
                <input 
                    type="email"
                    id="email"
                    class="form-control"
                    :class="wasSubmited && emailClass"
                    placeholder="your-email@example.com"
                    v-model="email"
                    @input="onEmailInput"
                />
                <div class="invalid-feedback d-block">
                    {{ wasSubmited ? emailError : '' }}
                </div>
            </div>
            <div class="mb-3">
                <label class="form-label" for="password">Password</label>
                <input 
                    v-model="password"
                    type="password"
                    id="password"
                    class="form-control"
                    :class="wasSubmited && passwordClass"
                    placeholder="Type your password"
                    @input="onPasswordInput"
                />
                <div class="invalid-feedback d-block">
                    {{ wasSubmited ? passwordError : '' }}
                </div>
            </div>
            <div class="mb-3">
                <button type="submit" class="btn btn-primary d-block w-100">Login</button>
            </div>
        </form>
        <p>Doesn't have an account? <RouterLink to="/auth/register">Click here</RouterLink> to create one</p>
    </div>
</template>
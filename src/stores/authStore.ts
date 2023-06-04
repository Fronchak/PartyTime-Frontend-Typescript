import { ref, computed, onMounted } from 'vue';
import { defineStore } from 'pinia';
import jwtDecode from 'jwt-decode';
import { KEY_LOCA_STORAGE } from '../utils/constantes';

type TokenType = {
    id: string;
    username: string;
    exp: number;
}

type LocalStorageData = {
    id: string;
    username: string;
    token: string;
}

const useAuthStore = defineStore('auth', () => {
    const id = ref<string>();
    const email = ref<string>();
    const token = ref<string>();

    const isAuthenticated = computed(() => {
        if(!token.value) return false;
        const decode = jwtDecode(token.value);
        if(!decode) return false;
        return (decode as TokenType).exp > (Date.now()/1000);
    });

    function authenticate(newToken: string) {
        const decode: TokenType = jwtDecode(newToken);
        if(decode) {
            const localStorageData = {
                token: newToken, 
                email: decode.username,
                id: decode.id
            }
            localStorage.setItem(KEY_LOCA_STORAGE, JSON.stringify(localStorageData));
            email.value = decode.username;
            id.value = decode.id;
            token.value = newToken;
        }
    }

    function logout() {
        localStorage.removeItem(KEY_LOCA_STORAGE);
        email.value = undefined;
        id.value = undefined;
        token.value = undefined;
    }

    onMounted(() => {
        const localStorageValue = localStorage.getItem(KEY_LOCA_STORAGE);
        if(localStorageValue) {
            const localStorageData: LocalStorageData = JSON.parse(localStorageValue);
            const decode: TokenType = jwtDecode(localStorageData.token);
            if(decode && ((decode.exp) > (Date.now() / 1000))) {
                email.value = localStorageData.username;
                id.value = localStorageData.id;
                token.value = localStorageData.token;
            }
        }
    });

    const getEmail = computed(() => email.value);
    const getId = computed(() => id.value);
    const getToken = computed(() => token.value);

    return { getEmail, getId, getToken, isAuthenticated, authenticate, logout };
});

export default useAuthStore;

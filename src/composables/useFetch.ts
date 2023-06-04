import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { BASE_URL } from '../utils/constantes';
import flashMessage from '../stores/flashMessage';
import type { ServerErrorInterface } from '../types/ServerErrorInterface';
import useAuthStore from '../stores/authStore';

function useFetch<T>(url: string, requiresAuth: boolean = false) {
    const data = ref<T | undefined>();
    const error = ref();
    const isLoading = ref<boolean>(false);
    const router = useRouter();
    const route = useRoute();
    const authData = useAuthStore();

    async function doFetch() {
        try {
            const isAuthenticated = authData.isAuthenticated;
            if(requiresAuth && !isAuthenticated) {
                redirectToLogin();
                return;
            }
            const requestURL = `${BASE_URL}/${url}`;
            let options = {};
            if(isAuthenticated) {
                options = {
                    headers: {
                        'Authorization': `Bearer ${authData.getToken}`
                    }
                }
            }
            isLoading.value = true;
            const response = await fetch(requestURL, options);
            const responseData = await response.json();
            isLoading.value = false;
            if(response.ok) {
                data.value = responseData as T;
            }
            else {
                const error = responseData as ServerErrorInterface;
                if(error.status == 404 || error.status == 400) {
                    router.back();
                    flashMessage.setMessage('Resource not found', 'alert-danger');
                }
                else if(error.status == 401 && !isAuthenticated) {
                    redirectToLogin();
                }
                else if(error.status == 401) {
                    router.push({
                        name: 'parties'
                    });
                    flashMessage.setMessage(`You don't have access to this page`);
                }
            }

        }
        catch(e) {
            isLoading.value = false;
            error.value = e;
            flashMessage.setMessage('Something went wrong, please try again later');
            router.back();
        }
    }

    function redirectToLogin() {
        router.push({
            name: 'login',
            query: {
                redirect: route.fullPath
            }
        });
        flashMessage.setMessage('You need to login to access this page');
    }

    doFetch();

    return { data, error, isLoading };
}

export default useFetch;
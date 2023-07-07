import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTokenStore = defineStore('token', () => {
    const token = ref('nil')

    const isLoggedIn = computed(() => token.value != 'nil')
    function setToken(_token) {
        token.value = _token
    }
    function unSetToken() {
        token.value = ''
    }

    return { token, isLoggedIn, setToken, unSetToken }
})
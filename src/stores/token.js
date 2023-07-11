import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTokenStore = defineStore('token', () => {
    const token = ref(window.localStorage.getItem('xxqToken'))

    const isLoggedIn = computed(() => token.value)
    function setToken(_token) {
        token.value = _token
        window.localStorage.setItem('xxqToken', _token)
    }
    function unSetToken() {
        token.value = ''
        window.localStorage.setItem('xxqToken', '')
    }

    return { token, isLoggedIn, setToken, unSetToken }
})
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTokenStore = defineStore('token', () => {
    const token = ref(window.localStorage.getItem('xxqToken'))
    const permissionLevel = ref(window.localStorage.getItem('xxqPermission'))

    const isLoggedIn = computed(() => token.value)
    function setToken(_token) {
        token.value = _token
        window.localStorage.setItem('xxqToken', _token)
    }
    function unSetToken() {
        token.value = ''
        window.localStorage.setItem('xxqToken', '')
    }
    function setPermission(permission) {
        permissionLevel.value = permission
        window.localStorage.setItem('xxqPermission', permission)
    }
    function isAdmin() {
        return permissionLevel.value == 3
    }

    return { token, isLoggedIn, setToken, unSetToken, setPermission, permissionLevel, isAdmin }
})
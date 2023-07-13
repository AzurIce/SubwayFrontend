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
    function unSetPermission(permission) {
        permissionLevel.value = permission
        window.localStorage.setItem('xxqPermission', 0)
    }

    function isAdmin() {
        return permissionLevel.value == 3
    }

    function isGov(){
        return permissionLevel.value == 2
    }

    return { token, isLoggedIn, setToken, unSetToken, setPermission, permissionLevel, isGov,isAdmin, unSetPermission }
})
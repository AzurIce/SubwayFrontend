<script setup>
import { ref } from 'vue'
import router from '../router/index'
import { useTokenStore } from '../stores/token'
const tokenStore = useTokenStore()

function onLogout() {
  tokenStore.unSetToken()
  router.push('/login')
}

import MapBox from '../components/MapBox.vue'
const donateDialog = ref(false)
</script>

<template>
  <v-layout class="tw-h-full">
    <NavigationBar></NavigationBar>
    <v-main class="tw-h-full">
      <MapBox />
    </v-main>
  </v-layout>
</template>

<style scoped></style>
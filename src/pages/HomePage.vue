<script setup>
import router from '../router/index'
import { useTokenStore } from '../stores/token'
const tokenStore = useTokenStore()

function onLogout() {
  tokenStore.unSetToken()
  router.push('/login')
}

import MapBox from '../components/MapBox.vue'
</script>

<template>
  <v-layout class="tw-h-full">
    <v-app-bar :elevation="2" title="地铁客流量预测系统">
      <v-btn icon="mdi-poll" @click="() => {router.push('/test')}"></v-btn>
      <v-btn icon="mdi-exit-run" @click="onLogout()"></v-btn>
    </v-app-bar>
    <v-main class="tw-h-full">
      <MapBox />
    </v-main>
  </v-layout>
</template>

<style scoped></style>
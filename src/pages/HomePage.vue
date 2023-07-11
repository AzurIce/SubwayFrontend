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
  <v-dialog v-model="donateDialog" width="auto">
    <v-card>
      <v-img src="src/assets/showMeMoney.jpg" contain height="300"></v-img>
      <v-card-text>
        我很可爱请给我钱
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="donateDialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-layout class="tw-h-full">
    <v-app-bar :elevation="2" title="地铁客流量预测系统">
      <v-btn icon="mdi-currency-usd" @click="() => { donateDialog = true }" />
      <v-btn icon="mdi-poll" @click="() => { router.push('/test') }"></v-btn>
      <v-btn icon="mdi-exit-run" @click="onLogout()"></v-btn>
    </v-app-bar>
    <v-main class="tw-h-full">
      <MapBox />
    </v-main>
  </v-layout>
</template>

<style scoped></style>
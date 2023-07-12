<script setup>
import router from '../router/index'
import { ref } from 'vue'
import {logout} from '../lib/axios/admin'
import { useTokenStore } from '../stores/token'
const tokenStore = useTokenStore()

const donateDialog = ref(false)

//exit
function onLogout() {
  tokenStore.unSetToken()
  tokenStore.unSetPermission()
  logout().then(() => {
    console.log('logout')
  }).catch((err) => {
    console.log(err)
  })
  router.push('/login')
}

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
  <v-app-bar class="bar" :elevation="2"  image="src/assets/NavigationBar2.png" >
    <v-app-bar-nav-icon  @click="() => { router.push('/about') }">
      <img src="src/assets/NavigationBar-icon.png" alt="Custom Icon">
    </v-app-bar-nav-icon>
    <v-toolbar-title>地铁客流量预测系统</v-toolbar-title>
    <v-btn icon="mdi-currency-usd" @click="() => { donateDialog = true }" />
    <v-btn class="tw-text-purple" icon="mdi-wrench" v-if="tokenStore.isAdmin()" @click="() => { router.push('/admin') }"></v-btn>
    <v-btn icon="mdi-poll" @click="() => { router.push('/count') }"></v-btn>
    <v-btn icon="mdi-exit-run" @click="onLogout()"></v-btn>
  </v-app-bar>
</template>

<style scoped>
</style>


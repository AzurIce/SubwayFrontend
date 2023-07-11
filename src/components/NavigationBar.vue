<template>
    <v-app-bar :elevation="2" title="地铁客流量预测系统">
      <v-btn icon="mdi-heart">
          $ 
          <v-dialog 
            v-model="donateDialog"
            activator="parent"
            width="auto"
          >
            <v-card>
              <v-img src="src/assets/showMeMoney.jpg" contain height="300"></v-img>
              <v-card-text style="text-align: center;">
                我很可爱请给我钱
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" block @click="donateDialog = false">Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
      </v-btn>
      <v-btn icon="mdi-poll"></v-btn>
      <v-btn icon="mdi-exit-run" @click="onLogout()"></v-btn>
    </v-app-bar>
</template>

<script setup>
import router from '../router/index'
import { ref } from 'vue'

import { useTokenStore } from '../stores/token'
const tokenStore = useTokenStore()

const donateDialog = ref(false)

//exit
function onLogout() {
  tokenStore.unSetToken()
  router.push('/login')
}

</script>

<style scoped>
</style>
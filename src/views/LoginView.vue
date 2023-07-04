<script setup>
// import TheWelcome from '../components/TheWelcome.vue'

import { reactive, ref } from 'vue'

const state = reactive({
  username: '',
  password: '',
  repeatPassword: '',
})

const rulesUsername = [
  value => {
    if (value) return true

    return '用户名不能为空.'
  },
]

const rulesPassword = [
  value => {
    if (value) return true

    return '密码不能为空.'
  },
]

const rulesRepeatPassword = [
  value => {
    if (value == state.password) return true

    return '两次密码不一致.'
  },
]

const tab = ref('login')

function switchTab() {
  tab.value = tab.value == 'login' ? 'register' : 'login'
}
function onRegister() {

}
function onLogin() {

}
</script>

<template>
  <main>
    <div class="flex flex-col gap-2">
      <v-sheet width="300" class="mx-auto">
        <v-form @submit.prevent>
          <v-text-field v-model="state.username" :rules="rulesUsername" label="Username" />
          <v-text-field v-model="state.password" :rules="rulesPassword" label="Password" />
          <v-text-field v-model="state.repeatPassword" :rules="rulesRepeatPassword" label="RepeatPassword"
            v-if="tab == 'register'" />
        </v-form>
        <div class="flex gap-2 mt-2 w-300 justify-around">
          <v-btn @click="tab == 'login' ? onLogin() : switchTab()" :ripple="false"
            :color="tab == 'login' ? 'blue' : 'white'" size="large" class="flex-1"
            :class="tab == 'login' ? 'basis-3/4' : 'basis-1/4'">
            {{ tab == 'login' ? "登录" : "注册" }}
          </v-btn>
          <v-btn @click="tab == 'register' ? onRegister() : switchTab()" :ripple="false"
            :color="tab == 'login' ? 'white' : 'blue'" size="large" class="flex-1"
            :class="tab == 'login' ? 'basis-1/4' : 'basis-3/4'">
            {{ tab == 'login' ? "注册" : "登录" }}
          </v-btn>
        </div>
      </v-sheet>
    </div>
  </main>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
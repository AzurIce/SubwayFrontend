<script setup>
// import TheWelcome from '../components/TheWelcome.vue'

import { login, register, sendCode } from '../lib/axios/user'
import { reactive, ref } from 'vue'
import router from '../router/index'

import { useTokenStore } from '../stores/token'
const tokenStore = useTokenStore()

const snackbarText = ref('')

const state = reactive({
  username: '',
  password: '',
  repeatPassword: '',
  email: '',
  code: '',
  token: ''
})

const rulesUsername = [
  value => {
    if (value) return true

    return '用户名不能为空.'
  },
]

const rulesEmail = [
  value => {
    if (value) return true

    return '邮箱不能为空.'
  },
]

const rulesCode = [
  value => {
    if (value) return true

    return '验证码不能为空.'
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
function onSendCode() {
  sendCode(state.email).then((res) => {
    console.log(res)
    state.token = res.data.data
  }).catch((err) => {
    console.log(err)
  })
}
function onRegister() {
  register(state.email, state.token, state.code, state.username, state.password).then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })
  // TODO: Register logic
}
function onLogin() {
  if (import.meta.env.DEV) {
    router.push('/')
    return
  }
  login(state.username, state.password).then((res) => {
    console.log(res)
    console.log(res.data.data.token)
    tokenStore.setToken(res.data.data.token)
    // onLoggedIn()
    router.push('/')
  }).catch((err) => {
    console.log(err)
  })
}
</script>

<template>
  <div class="bigContiner">
    <v-snackbar v-model="snackbar">
      {{ snackbarText }}

      <template v-slot:actions>
        <v-btn color="pink" variant="text" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>


    <div class="lg:tw-grid lg:tw-grid-cols-2 lg:tw-p-8">
      <header>
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="200" height="200" />

        <div class="wrapper">
          <div class="greetings">
            <h1 class="green tw-text-center lg:tw-text-left">地铁客流量预测系统</h1>
            <h3 class="tw-text-center lg:tw-text-left">
              <p>「虽是咸鱼，但也要挣扎」</p>
              <p class="mt-2">
                项目地址：
                <a href="https://github.com/AzurIce/2023-BJTU-SummerPractice-Subway" target="_blank"
                  rel="noopener">Github</a>
              </p>
            </h3>
          </div>

          <nav>
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/about">About</RouterLink>
          </nav>
        </div>
      </header>
      <main>
        <div class="tw-flex tw-flex-col tw-gap-2">
          <v-sheet width="300" class="tw-mx-auto">
            <v-form @submit.prevent>
              <div class="flex" v-if="tab == 'register'">
                <v-text-field v-model="state.email" :rules="rulesEmail" label="Email" />
                <v-btn @click="onSendCode()">获取验证码</v-btn>
                <v-text-field v-model="state.code" :rules="rulesCode" label="Code" />
              </div>
              <v-text-field v-model="state.username" :rules="rulesUsername" label="Username" />
              <v-text-field v-model="state.password" :rules="rulesPassword" label="Password" type="password" />
              <v-text-field v-model="state.repeatPassword" :rules="rulesRepeatPassword" label="RepeatPassword"
                v-if="tab == 'register'" type="password" />
            </v-form>
            <div class="tw-flex tw-gap-2 tw-mt-2 tw-w-300 tw-justify-around">
              <v-btn @click="tab == 'login' ? onLogin() : switchTab()" :ripple="false"
                :color="tab == 'login' ? 'blue' : 'white'" size="large" class="tw-flex-1"
                :class="tab == 'login' ? 'basis-3/4' : 'basis-1/4'">
                登录
              </v-btn>
              <v-btn @click="tab == 'register' ? onRegister() : switchTab()" :ripple="false"
                :color="tab == 'login' ? 'white' : 'blue'" size="large" class="tw-flex-1"
                :class="tab == 'login' ? 'basis-1/4' : 'basis-3/4'">
                注册
              </v-btn>
            </div>
          </v-sheet>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* .bigContiner {
  position: relative;
  width: 100%;
  height: 100%;
} */

h1 {
  font-weight: 500;
  font-size: 2.3rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
<script setup>
// import TheWelcome from '../components/TheWelcome.vue'

import { login, register, sendCode } from '../lib/axios/user'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

import { useTokenStore } from '../stores/token'
const tokenStore = useTokenStore()

const state = reactive({
  username: '',
  password: '',
  repeatPassword: '',
  email: '',
  code: '',
  token: ''
})

const tab = ref('login')

function switchTab() {
  tab.value = tab.value == 'login' ? 'register' : 'login'
}

const sendingCode = ref(false)
function onSendCode() {
  // console.log('> onSendCode')
  sendingCode.value = true
  sendCode(state.email).then((res) => {
    msg.value = '验证码已发送'
    console.log(res)
    state.token = res.data.data
  }).catch((err) => {
    msg.value = `验证码发送失败：${err}`
    console.log(err)
  }).finally(() => {
    sendingCode.value = false
  })
}

const registering = ref(false)
function onRegister() {
  // console.log('> onRegister')
  registering.value = true
  register(state.email, state.token, state.code, state.username, state.password).then((res) => {
    msg.value = '注册成功'
    console.log(res)
  }).catch((err) => {
    msg.value = `注册失败：${err}`
    console.log(err)
  }).finally(() => {
    registering.value = false
  })
}

const loggingin = ref(false)
function onLogin() {
  // console.log('> onLogin')
  loggingin.value = true
  // if (import.meta.env.DEV) {
  //   loggingin.value = false
  //   router.push('/')
  //   return
  // }

  // 1 普通
  // 2 企业
  // 3 管理员
  login(state.username, state.password).then((res) => {
    msg.value = '登陆成功'
    console.log(res)
    console.log(res.data.data.token)
    tokenStore.setToken(res.data.data.token)
    tokenStore.setPermission(res.data.data.permission)
    // onLoggedIn()
    router.push('/')
  }).catch((err) => {
    msg.value = `登陆失败：${err}`
    console.log(err)
  }).finally(() => {
    loggingin.value = false
  })
}

import ClickEffect from '../components/ClickEffect.vue' //click special effect
import BgParticle from '../components/BgParticle.vue'
import SnackBar from '../components/SnackBar.vue'
const msg = ref('')
</script>

<template>
  <BgParticle />
  <ClickEffect /> <!--click on special effect-->

  <div>
    <SnackBar v-model="msg"/>

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
            <!-- <RouterLink to="/">Home</RouterLink> -->
            <RouterLink to="/about">About</RouterLink>
          </nav>
        </div>
      </header>
      <main>
        <div class="tw-flex tw-flex-col tw-gap-2">
          <v-sheet width="300" class="tw-mx-auto">
            <v-form @submit.prevent>
              <div class="flex" v-if="tab == 'register'">
                <v-text-field v-model="state.email" :rules="[() => (state.email != '') || '邮箱不能为空.']" label="Email" />
                <v-text-field v-model="state.code" :rules="[() => (state.code != '') || '验证码不能为空.']" label="Code">
                  <template #append>
                    <v-btn color="white" @click="onSendCode" :loading="sendingCode">获取</v-btn>
                  </template>
                </v-text-field>
              </div>
              <v-text-field v-model="state.username" :rules="[() => (state.username != '') || '用户名不能为空.']"
                label="Username" />
              <v-text-field v-model="state.password" :rules="[() => (state.password != '') || '密码不能为空.']" label="Password" type="password"  @keydown.enter="onLogin"/>
              <v-text-field v-model="state.repeatPassword" :rules="[() => (state.repeatPassword == state.password) || '密码不一致.']" label="RepeatPassword"
                v-if="tab == 'register'" type="password" @keydown.enter="onRegister"/>
            </v-form>
            <div class="tw-flex tw-gap-2 tw-mt-2 tw-w-300 tw-justify-around">
              <v-btn @click="tab == 'login' ? onLogin() : switchTab()" :ripple="false"
                :color="tab == 'login' ? 'blue' : 'white'" size="large" class="tw-flex-1"
                :class="tab == 'login' ? 'basis-3/4' : 'basis-1/4'"
                :loading="loggingin">
                登录
              </v-btn>
              <v-btn @click="tab == 'register' ? onRegister() : switchTab()" :ripple="false"
                :color="tab == 'login' ? 'white' : 'blue'" size="large" class="tw-flex-1"
                :class="tab == 'login' ? 'basis-1/4' : 'basis-3/4'"
                :loading="registering">
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
<script setup>
// import TheWelcome from '../components/TheWelcome.vue'
import LoginClickEffect from '../components/LoginClickEffect.vue' //click special effect

import { login, register, sendCode } from '../lib/axios/user'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

import { useTokenStore } from '../stores/token'
const tokenStore = useTokenStore()

const snackbar = ref(false)
const snackbarText = ref('')

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
    showSnackBar('验证码已发送')
    console.log(res)
    state.token = res.data.data
  }).catch((err) => {
    showSnackBar(`验证码发送失败：${err}`)
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
    showSnackBar('注册成功')
    console.log(res)
  }).catch((err) => {
    showSnackBar(`注册失败：${err}`)
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
  login(state.username, state.password).then((res) => {
    showSnackBar('登陆成功')
    console.log(res)
    console.log(res.data.data.token)
    tokenStore.setToken(res.data.data.token)
    // onLoggedIn()
    router.push('/')
  }).catch((err) => {
    showSnackBar(`登陆失败：${err}`)
    console.log(err)
  }).finally(() => {
    loggingin.value = false
  })
}
const amountX = 50
const amountY = 50
const color = "#cacfde"
// const top = 350

import * as THREE from "three";

const SEPARATION = 100;

// let stats;
let container, camera, scene, renderer;

let particles,
  count = 0;

let mouseX = 0;

let windowHalfX = window.innerWidth / 2;

function showSnackBar(msg) {
  console.log('showSnackBar')
  snackbar.value = true
  snackbarText.value = msg
}

function init() {
  container = document.createElement("div");
  document.getElementById("bg").appendChild(container);

  //创建透视相机
  camera = new THREE.PerspectiveCamera(
    75, //摄像机视锥体垂直视野角度
    window.innerWidth / window.innerHeight, //摄像机视锥体长宽比
    10, //摄像机视锥体近端面
    10000 //摄像机视锥体远端面
  );

  //设置相机z轴视野
  camera.position.z = 1000;

  //创建场景
  scene = new THREE.Scene();

  const numParticles = amountX * amountY;

  const positions = new Float32Array(numParticles * 3);
  const scales = new Float32Array(numParticles);

  let i = 0,
    j = 0;

  // 初始化粒子位置和大小
  for (let ix = 0; ix < amountX; ix++) {
    for (let iy = 0; iy < amountY; iy++) {
      positions[i] = ix * SEPARATION - (amountX * SEPARATION) / 2; // x
      positions[i + 1] = 0; // y
      positions[i + 2] = iy * SEPARATION - (amountY * SEPARATION) / 2; // z
      scales[j] = 1;
      i += 3;
      j++;
    }
  }

  //是面片、线或点几何体的有效表述。包括顶点位置，面片索引、法相量、颜色值、UV 坐标和自定义缓存属性值。使用 BufferGeometry 可以有效减少向 GPU 传输上述数据所需的开销
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );
  geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

  //着色器材质(ShaderMaterial),设置球的大小，颜色，等
  const material = new THREE.ShaderMaterial({
    uniforms: {
      //设置球的颜色
      color: { value: new THREE.Color(color) },
    },
    //控制球的大小
    vertexShader:
      "attribute float scale; void main() {vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );gl_PointSize = scale * ( 300.0 / - mvPosition.z );gl_Position = projectionMatrix * mvPosition;}",
    fragmentShader:
      "uniform vec3 color;void main() {if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;gl_FragColor = vec4( color, 1.0 );}",
  });

  //一个用于显示点的类。
  particles = new THREE.Points(geometry, material);
  //往场景中添加点
  scene.add(particles);

  //alpha - canvas是否包含alpha (透明度)。默认为 false。
  //渲染器的背景色默认为黑色，设置渲染器的背景色为透明
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearAlpha(0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  //显示右上角fps框
  // stats = new Stats();
  //   container.appendChild(stats.dom);

  container.style.touchAction = "none";
  //监听鼠标移动事件
  window.addEventListener("pointermove", onPointerMove);

  //调整波浪的位置
  container.style.position = "relative";

  window.addEventListener("resize", onWindowResize);
}

function render() {
  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y = 400;
  camera.lookAt(scene.position);

  const positions = particles.geometry.attributes.position.array;
  const scales = particles.geometry.attributes.scale.array;

  // 设置粒子位置和大小
  let i = 0,
    j = 0;
  for (let ix = 0; ix < amountX; ix++) {
    for (let iy = 0; iy < amountY; iy++) {
      positions[i + 1] =
        Math.sin((ix + count) * 0.3) * 50 +
        Math.sin((iy + count) * 0.5) * 50;

      scales[j] =
        (Math.sin((ix + count) * 0.3) + 1) * 10 +
        (Math.sin((iy + count) * 0.5) + 1) * 10;

      i += 3;
      j++;
    }
  }

  particles.geometry.attributes.position.needsUpdate = true;
  particles.geometry.attributes.scale.needsUpdate = true;

  renderer.render(scene, camera);

  count += 0.1;
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

//监听鼠标移动事件
function onPointerMove(event) {
  if (event.isPrimary === false) return;
  mouseX = event.clientX - windowHalfX;
}

function animate() {
  requestAnimationFrame(animate);
  render();
  //fps 实时更新
  // stats.update();
}

import { onMounted } from 'vue'

onMounted(() => {
  init();
  animate();
});

</script>

<template>
  <div id="bg" class="tw-absolute tw-inset-0 tw-opacity-20" style="z-index: -1"></div>
  <div class="bigContiner tw-z-2">
    <LoginClickEffect></LoginClickEffect> <!--click on special effect-->
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
                <v-text-field v-model="state.email" :rules="[() => (state.email != '') || '邮箱不能为空.']" label="Email" />
                <v-text-field v-model="state.code" :rules="[() => (state.code != '') || '验证码不能为空.']" label="Code">
                  <template #append>
                    <v-btn color="white" @click="onSendCode" :loading="sendingCode">获取</v-btn>
                  </template>
                </v-text-field>
              </div>
              <v-text-field v-model="state.username" :rules="[() => (state.username != '') || '用户名不能为空.']"
                label="Username" />
              <v-text-field v-model="state.password" :rules="[() => (state.password != '') || '密码不能为空.']" label="Password" type="password" />
              <v-text-field v-model="state.repeatPassword" :rules="[() => (state.repeatPassword == state.password) || '密码不一致.']" label="RepeatPassword"
                v-if="tab == 'register'" type="password" />
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
<script setup>
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
// import {useTokenStore} from './stores/token'

// const tokenStore = useTokenStore()
</script>

<template>
  <div class="tw-flex tw-flex-col tw-w-full tw-h-full tw-items-center tw-justify-center">

    <!-- <div class="flex flex-col"> -->
    <!-- <span>{{ tokenStore.token }}</span> -->
    <RouterView />
    <!-- </div> -->
  </div>
</template>

<style scoped></style>

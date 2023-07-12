<script setup>
import NavigationBar from '../components/NavigationBar.vue'
</script>

<template>
  <v-layout class="tw-h-full tw-w-full">
    <NavigationBar></NavigationBar>
    <v-main class="tw-h-full tw-w-full tw-flex-1">
      <RouterView/>
    </v-main>
  </v-layout>
</template>

<style scoped></style>
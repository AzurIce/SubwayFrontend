<script setup>
import NavigationBar from '../components/NavigationBar.vue'
</script>

<template>
  <v-layout class="tw-h-full">
    <NavigationBar></NavigationBar>
    <v-main class="tw-h-full">
      <RouterView />
    </v-main>
  </v-layout>
</template>

<style scoped></style>
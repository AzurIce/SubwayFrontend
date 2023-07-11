<script setup>
import { computed } from 'vue';
import station_details from '../data/station_details.json'

const props = defineProps(['modelValue'])
defineEmits(['update:modelValue'])

const station = computed(() => station_details[props.modelValue] || {})
</script>

<template>
  <div v-if="props.modelValue != ''">
    <v-btn icon="mdi-arrow-left-thin" @click="() => {$emit('update:modelValue', '')}" />
    {{ props.modelValue }}
    {{ station.name }}
    {{ station.longitude }}
    {{ station.latitude }}
  </div>
</template>
<script setup>
import { computed } from 'vue';
const props = defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue'])

const visible = computed(() => (props.modelValue != ''))
</script>

<template>
  <!-- {{ props.modelValue }}
  {{ visible }} -->
  <v-snackbar :modelValue="visible" :timeout="-1">
    {{ props.modelValue }}
    <!-- {{ visible }} -->
    <template v-slot:actions>
      <v-btn color="pink" variant="text" @click="() => { emits('update:modelValue', '') }">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

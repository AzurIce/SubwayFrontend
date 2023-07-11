<script setup>
import { computed } from 'vue';
const props = defineProps(['modelValue'])
defineEmits(['update:modelValue'])

const visible = computed(() => (props.modelValue != ''))
</script>

<template>
  <v-snackbar :modelValue="visible">
    {{ props.modelValue }}
    <!-- {{ visible }} -->
    <template v-slot:actions>
      <v-btn color="pink" variant="text" @click="() => { $emit('update:modelValue', '') }">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

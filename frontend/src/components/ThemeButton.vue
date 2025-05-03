<template>
  <v-btn
    class="rounded-btn"
    :color="darkMode ? 'amber' : 'blue'"
    elevation="4"
    fab
    icon
    title="Alternar tema"
    @click="$emit('toggle-theme')"
  >
    <v-icon>{{ darkMode ? 'mdi-moon-waning-crescent' : 'mdi-white-balance-sunny' }}</v-icon>
  </v-btn>
</template>

<script setup>
  defineProps({
    darkMode: Boolean,
  })
  defineEmits(['toggle-theme'])
</script>

<style scoped>
.rounded-btn {
  border-radius: 50%;
  transition: all 0.3s ease;
}
</style>

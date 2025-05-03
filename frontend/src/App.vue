<template>
  <v-app :theme="darkMode ? 'dark' : 'light'">
    <v-main class="main-no-scroll">
      <v-container>
        <h1 class="text-center">Gestão de usuários</h1>
        <UserTable />
      </v-container>
      <div class="theme-button-wrapper">
        <ThemeButton :darkMode="darkMode" @toggle-theme="toggleDarkMode" />
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
  import { ref } from 'vue'
  import { useTheme } from 'vuetify'

  const darkMode = ref(false)
  const theme = useTheme()

  function toggleDarkMode () {
    darkMode.value = !darkMode.value
    theme.global.name.value = darkMode.value ? 'dark' : 'light'
  }

</script>

<style>
html,
body,
.v-application,
.v-main.main-no-scroll {
  height: 100%;
  overflow: hidden;
}

.theme-button-wrapper {
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 999;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Poppins', sans-serif;
}
</style>

<template>
  <footer>
    <a :href="url" target="_blank">view code on github</a>
  </footer>
</template>

<script setup>
  const url = import.meta.env.VITE_GIT_HUB_URL || ''
</script>


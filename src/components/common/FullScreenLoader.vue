<template>
  <div class="backdrop" :style="{zIndex: Z_INDEXES.loaderBackdrop }" v-if="isLoading">
    <v-progress-circular
    indeterminate
    color="white"
    ></v-progress-circular>
  </div>
</template>

<script setup>
  import { useStore } from 'vuex'
  import { computed } from 'vue';
  import { Z_INDEXES } from '@/constants'

  const store = useStore()
  const isLoading = computed(() => store.getters.getIsLoading)
</script>

<style scoped>
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0,0, 0.42);
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

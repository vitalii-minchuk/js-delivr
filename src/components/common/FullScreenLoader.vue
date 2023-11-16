<template>
  <div v-if="getIsLoading" class="backdrop" :style="{ zIndex }">
    <v-progress-circular
    indeterminate
    color="white"
    />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { Z_INDEXES } from '@/constants'

  export default {
    name: 'FullScreenLoader',

    data() {
      return {
        zIndex: Z_INDEXES.loaderBackdrop
      }
    },

    computed: {
      ...mapGetters(['getIsLoading']),
    }
  }

</script>

<style scoped lang="scss">
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

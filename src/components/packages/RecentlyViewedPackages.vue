<template>
  <v-container >
    <h4>Viewed packages</h4>
      <div class="chips-wrapper">
        <v-chip
          v-for="singlePackage in store.getters.getPackages"
          :key="singlePackage.name"
          elevation="6" class="package-chip"
          @click="() => handleSelectPackage(singlePackage)"
        >
          {{ singlePackage?.name }}
        </v-chip>
      </div>
  </v-container>
</template>

<script setup>
  import { useStore } from 'vuex'

  const store = useStore()
  const handleSelectPackage = (selectedPackage) => {
    store.dispatch('setSelectedPackage', selectedPackage)
    store.dispatch('openModal')
  }
</script>

<style scoped>
.chips-wrapper {
  display: flex;
  justify-content: start;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 20px;
}

</style>

<script setup>
  import { useStore } from 'vuex'
  import { computed } from 'vue';

  const store = useStore()
  const selectedPackage = computed(() => store.getters.getSelectedPackage )

  const handleDeletePackage = () => {
    store.dispatch('deletePackage')
    store.dispatch('closeModal')
  }

  const handleClose = () => {
    store.dispatch('closeModal')
    store.dispatch('setSelectedPackage', null)
  }

</script>

<template>
    <v-dialog
      v-model="store.getters.getPackageInfoModal"
      persistent
      width="auto"
      v-if="store.getters.getPackageInfoModal"
    >
      <v-card>
        <v-card-title class="text-h5">
          {{ `Package: ${selectedPackage?.name}` }}
        </v-card-title>
        <v-card-text>{{ `Link: ${selectedPackage?.links?.self}` }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red"
            variant="text"
            @click="handleDeletePackage"
          >
            Delete
          </v-btn>
          <v-btn
            color="green-darken-1"
            variant="text"
            @click="handleClose"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

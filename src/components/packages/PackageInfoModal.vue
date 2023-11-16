<script setup>
  import { useStore } from 'vuex'
  import { computed } from 'vue';
  import { APP_MODALS } from '@/constants';
  import { getBarChartData } from '@/utils'
  import SimpleChart from '@/components/common/SimpleChart.vue'

  const store = useStore()
  const selectedPackage = computed(() => store.getters.getSelectedPackage)
  const hits = computed(() => store.getters.getSelectedPackage?.hits?.dates || null)

  const handleDeletePackage = () => {
    store.dispatch('deletePackage')
    store.dispatch('closeModal', APP_MODALS.packageInfoModal)
  }

  const handleClose = () => {
    store.dispatch('closeModal', APP_MODALS.packageInfoModal)
    store.dispatch('setSelectedPackage', null)
  }
</script>

<template>
    <v-dialog
      v-if="store.getters.getPackageInfoModal"
      v-model="store.getters.getPackageInfoModal"
      persistent
      width="auto"
    >
      <v-card>
        <v-card-title class="text-h5">
          {{ `Package: ${selectedPackage?.name}` }}
        </v-card-title>
        <v-card-text>{{ `Link: ${selectedPackage?.links?.self}` }}</v-card-text>
        <v-card-item>
          <SimpleChart :chartData="getBarChartData(hits, 'Hits')" />
        </v-card-item>
        <v-card-actions>
          <v-spacer />
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

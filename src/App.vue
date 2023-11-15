<template>
  <v-app>
    <v-main>
      <v-container class="fill-height flex flex-column justify-space-between">
        <PackagesTable />
        <TheFooter />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import TheFooter from '@/components/layout/TheFooter'
import PackagesTable from '@/components/packages/PackagesTable.vue'
</script>

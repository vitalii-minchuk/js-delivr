<template>
  <v-app>
    <v-main>
      <v-container class="fill-height flex flex-column justify-space-between">
        <PackagesTable />
        <RecentlyViewedPackages />
        <v-spacer />
        <TheFooter />
      </v-container>
    </v-main>
  </v-app>
  <PackageInfoModal />
</template>

<script setup>
import TheFooter from '@/components/layout/TheFooter'
import PackagesTable from '@/components/packages/PackagesTable.vue'
import RecentlyViewedPackages from '@/components/packages/RecentlyViewedPackages.vue'
import PackageInfoModal from '@/components/packages/PackageInfoModal.vue'
</script>

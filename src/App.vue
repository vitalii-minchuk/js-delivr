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
  <FullScreenLoader />
  <PackageInfoModal />
</template>

<script>
import FullScreenLoader from '@/components/common/FullScreenLoader.vue'
import PackageInfoModal from '@/components/packages/PackageInfoModal.vue';
import RecentlyViewedPackages from '@/components/packages/RecentlyViewedPackages.vue';
import PackagesTable from '@/components/packages/PackagesTable.vue';
import TheFooter from '@/components/layout/TheFooter.vue';

export default {
    name: 'App',
    components: {
      FullScreenLoader,
      PackageInfoModal,
      RecentlyViewedPackages,
      PackagesTable,
      TheFooter
  }
}
</script>

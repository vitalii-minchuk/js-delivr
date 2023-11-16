<template>
  <v-container>
    <v-card
    elevation="6"
    class="table-card"
    >
      <template v-slot:text>
        <v-text-field
        v-model="search"
        label="Search by package name"
        prepend-inner-icon="mdi-magnify"
        single-line
        clearable
        variant="outlined"
        hide-details
        density="compact"
        />
      </template>
      <v-data-table
        :headers="headers"
        :items="allPackages"
        :search="search"
        hover
        density="compact"
        class="table"
      >
        <template v-slot:body="{ items }">
          <tr
            v-for="item in items"
            :key="item.name"
            @click="() => handleSelectPackage(item)"
            class="tr"
          >
            <td>
              {{ item.name }}
            </td>
            <td v-if="item.type === 'gh'">
              <v-icon icon="mdi-github" size="18" class="ml-2"></v-icon>
            </td>
            <td v-if="item.type === 'npm'">
              <v-icon icon="mdi-npm" size="32"></v-icon>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { APP_MODALS } from '@/constants'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PackagesTable',

  data() {
    return {
      packages: [],
      headers: [
        {
          align: 'start',
          key: 'name',
          title: 'Name',
        },
        { key: 'type', title: 'Type' },
      ],
      search: '',
    }
  }, // data

  async mounted() {
    this.showLoader()
    await this.loadAllPackages()
    this.hideLoader()
  }, // mounted

  computed: {
    ...mapGetters(['getViewedPackages']),

    allPackages() {
      return this.packages
    },
  }, // computed

  methods: {
    ...mapActions([
      'openModal',
      'addPackage',
      'setSelectedPackage',
      'showLoader',
      'hideLoader'
    ]),
    ...mapActions('api', [
      'apiGetAllPackages',
      'apiGetGHPackageByName',
      'apiGetNPMPackageByName',
    ]),

    async loadAllPackages() {
      this.packages = await this.apiGetAllPackages()
    },

    async definePackageRequest (packageType, packageName) {
      return packageType === 'gh'
        ? this.apiGetGHPackageByName(packageName)
        : this.apiGetNPMPackageByName(packageName)
    },

    async handleSelectPackage (item) {
    const { name, type } = item
    const foundPackage = this.getViewedPackages.find(el => el.name === name)
    this.showLoader()

    if (foundPackage) {
      this.setSelectedPackage(foundPackage)
    } else {
      const data = await this.definePackageRequest(type, name)
      const dataWithName = {...data, name}
      this.addPackage(dataWithName)
      this.setSelectedPackage(dataWithName)
    }
    this.hideLoader()
    this.openModal(APP_MODALS.packageInfoModal)
  }
  }, // methods
}
</script>

<style scoped lang="scss">
.table-card {
  min-width: 400px;
  overflow: auto;
  padding-bottom: 20px;
  .tr {
    cursor: pointer;
  }
}
</style>

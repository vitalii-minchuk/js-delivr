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
    :items="items"
    :search="search"
    hover
    density="compact"
    class="table"
    >
    <template v-slot:body="{ items }">
      <tr
        v-for="item in items"
        :key="item.id"
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

<script setup>
import { APP_MODALS } from '@/constants';
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex'

const items = ref()
const store = useStore()

  const test = async () => {
    const res = await fetch('https://data.jsdelivr.com/v1/stats/packages')
    const data = await res.json()
    items.value = data
  }

  onMounted(() => test())

  const handleSelectPackage = async (item) => {
    const {name, type} = item
    const foundPackage = store.getters.getPackages.find(el => el.name === name)

    if (foundPackage) {
      store.dispatch('setSelectedPackage', foundPackage)
    } else {
      const request = `https://data.jsdelivr.com/v1/stats/packages/${type}/${name}`
      const res = await fetch(request)
      const data = await res.json()
      const dataWithName = {...data, name}
      store.dispatch('addPackage', dataWithName)
      store.dispatch('setSelectedPackage', dataWithName)
    }
    store.dispatch('openModal', APP_MODALS.packageInfoModal)
  }
       const search = ref('')
       const headers = [
          {
            align: 'start',
            key: 'name',
            title: 'Name',
          },
          { key: 'type', title: 'Type' },
        ]
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

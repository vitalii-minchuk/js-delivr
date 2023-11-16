import { createStore } from 'vuex'
import apiModule from './api'
import { APP_MODALS } from '@/constants'

const store = createStore({
  modules: {
    api: apiModule,
  },
  state: {
    modals: {
      [APP_MODALS.packageInfoModal]: false
    },
    isLoading: false,
    packages: [],
    selectedPackage: null
  },
  getters: {
    getIsLoading (state) {
      return state.isLoading
    },
    getModals (state) {
      return state.modals
    },
    getPackageInfoModal (state) {
      return state.modals.packageInfoModal
    },
    getPackages (state) {
      return state.packages
    },
    getSelectedPackage (state) {
      return state.selectedPackage
    },
  },
  mutations: {
    openModal (state, modal) {
      state.modals[modal] = true
    },
    closeModal (state, modal) {
      state.modals[modal] = false
    },
    addPackage (state, newPackage) {
      const isAlreadyViewed = state.packages.some(el => el.name === newPackage.name)
      if (isAlreadyViewed) return

      state.packages.push(newPackage)
    },
    setSelectedPackage (state, selectedPackage) {
      state.selectedPackage = selectedPackage
    },
    deletePackage (state) {
      const selectedPackageName = state.selectedPackage?.name
      state.packages = state.packages.filter(el => el.name !== selectedPackageName)
    }
  },
  actions: {
    openModal (context, modal) {
      context.commit('openModal', modal)
    },
    closeModal (context, modal) {
      context.commit('closeModal', modal)
    },
    addPackage (context, newPackage) {
      context.commit('addPackage', newPackage)
    },
    setSelectedPackage (context, selectedPackage) {
      context.commit('setSelectedPackage', selectedPackage)
    },
    deletePackage (context) {
      context.commit('deletePackage')
    }
  },
})

export default store

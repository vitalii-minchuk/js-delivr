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
    viewedPackages: [],
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
    getViewedPackages (state) {
      return state.viewedPackages
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
    showLoader (state) {
      state.isLoading = true
    },
    hideLoader (state) {
      state.isLoading = false
    },
    addPackage (state, newPackage) {
      const isAlreadyViewed = state.viewedPackages.some(el => el.name === newPackage.name)
      if (isAlreadyViewed) return

      state.viewedPackages.push(newPackage)
    },
    setSelectedPackage (state, selectedPackage) {
      state.selectedPackage = selectedPackage
    },
    deletePackage (state) {
      const selectedPackageName = state.selectedPackage?.name
      state.viewedPackages = state.viewedPackages.filter(el => el.name !== selectedPackageName)
    }
  },
  actions: {
    errorHandler({ commit }, error) {
      console.error(`Error: $${error.message}`)
      // TODO handle errors
      const errObj = {
        message: 'Something went wrong',
        code: error.response.status,
      }
      commit('setError', errObj)
    },
    openModal ({ commit }, modal) {
      commit('openModal', modal)
    },
    closeModal ({ commit }, modal) {
      commit('closeModal', modal)
    },
    showLoader ({ commit }) {
      commit('showLoader')
    },
    hideLoader ({ commit }) {
      commit('hideLoader')
    },
    addPackage ({ commit }, newPackage) {
      commit('addPackage', newPackage)
    },
    setSelectedPackage ({ commit }, selectedPackage) {
      commit('setSelectedPackage', selectedPackage)
    },
    deletePackage ({ commit }) {
      commit('deletePackage')
    }
  },
})

export default store

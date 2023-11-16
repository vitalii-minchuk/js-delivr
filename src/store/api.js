import axios from 'axios'
import { PACKAGES_URLS } from '@/constants'

const JSDELIVR_API_HOST = import.meta.env.VITE_JSDELIVR_BASE_URL

export default {
  namespaced: true,
  state: {
    JSDelivrApiHost: JSDELIVR_API_HOST,
    axiosJSDelivr: axios.create({
      baseURL: JSDELIVR_API_HOST,
    }),
  },
  actions: {
    apiGetAllPackages({ state, dispatch }) {
      return state.axiosJSDelivr
        .get(PACKAGES_URLS.allPackages)
        .then(resp => {
          return resp.data
        })
        .catch(error => {
          dispatch('errorHandler', error)
        })
    },
    apiGetGHPackageByName({ state, dispatch }, packageName) {
      return state.axiosJSDelivr
        .get(`${PACKAGES_URLS.ghPackages}/${packageName}`)
        .then(resp => {
          return resp.data
        })
        .catch(error => {
          dispatch('errorHandler', error)
        })
    },
    apiGetNPMPackageByName({ state, dispatch }, packageName) {
      return state.axiosJSDelivr
        .get(`${PACKAGES_URLS.npmPackages}/${packageName}`)
        .then(resp => {
          return resp.data
        })
        .catch(error => {
          dispatch('errorHandler', error)
        })
    }
  },
}

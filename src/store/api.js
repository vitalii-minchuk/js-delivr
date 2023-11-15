import axios from 'axios'
import { PACKAGES_URLS } from '@/constants'

const JSDELIVR_API_HOST = process.env.VUE_APP_JSDELIVR_BASE_URL

export default {
  namespaced: true,
  state: {
    JSDelivrApiHost: JSDELIVR_API_HOST,
    axiosJSDelivr: axios.create({
      baseURL: JSDELIVR_API_HOST,
    }),
  },
  actions: {
    apiGetAllPackages({ state }) {
      return state.axiosJSDelivr.get(PACKAGES_URLS.allPackages)
    },
  },
}

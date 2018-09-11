import {
  SET_TITLE,
  KEEP_USERINFO,
  SET_LOADING
} from './mutation-types.js'

import { setStore, getStore } from '../config/mUtils'
import { localapi, proapi } from 'src/config/env'

export default {
  //loading
  [SET_LOADING](state, status) {
    state.loadingbox = status;
  },
}

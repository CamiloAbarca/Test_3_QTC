import {
  SET_HI
} from '~/store/mutations.types'

export default {
  [SET_HI] (state, value) {
    state.hi = value
  }
}
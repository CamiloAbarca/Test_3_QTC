import {
  ARTICLES_LIST, ARTICLES_FAV,
} from '~/store/mutations.types'

export default {
  [ARTICLES_LIST] (state, value) {
    state.articlesList = value
  },
  [ARTICLES_FAV] (state, value) {
    state.articlesFav = value
  }
}
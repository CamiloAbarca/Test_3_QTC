import {
  ARTICLES_LIST, ARTICLES_FAV, ARTICLES_EDIT
} from '~/store/mutations.types'

export default {
  [ARTICLES_LIST] (state, value) {
    state.articlesList = value
  },
  [ARTICLES_FAV] (state, value) {
    state.articlesFav = value
  },
  [ARTICLES_EDIT] (state, value) {
    state.articlesEdit = value
  }
}
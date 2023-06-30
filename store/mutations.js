import {
  ARTICLES_LIST,
} from '~/store/mutations.types'

export default {
  [ARTICLES_LIST] (state, value) {
    state.articlesList = value
  }
}
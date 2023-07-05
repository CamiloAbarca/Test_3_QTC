import {
  ARTICLES_LIST, IMAGE_URL
} from '~/store/mutations.types'

export default {
  [ARTICLES_LIST] (state, value) {
    state.articlesList = value
  },
  [IMAGE_URL] (state, value) {
    state.imageUrl = value
  },

}
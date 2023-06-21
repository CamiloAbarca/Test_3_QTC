import {
  GET_NEW_MSG
} from './actions.types'

export default {
  async [GET_NEW_MSG] (context) {
    try {
      const { data } = await this.$axios.get('https://dummyjson.com/quotes/random')
      return data
    } catch (error) {
      throw error
    }
  }
}
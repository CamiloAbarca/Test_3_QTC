<template>
  <v-card></v-card>
</template>

<script>
import { mapGetters } from 'vuex'

import {
  GET_NEW_MSG
} from '~/store/actions.types'

export default {
  data () {
    return {
      msg: 'hola!',
      loadingMsg: false,
      quotes: [
        { text: 'This is my first Quote', author: 'Ismael' }
      ]
    }
  },

  methods: {
    async onGetNewMsg () {
      try {
        this.loadingMsg = true
        const { quote } = await this.$store.dispatch(GET_NEW_MSG)
        this.msg = quote
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingMsg = false
      }
    }
  },

  computed: {
    ...mapGetters([
      'hi'
    ])
  }
}
</script>

<style lang="scss" scoped>

</style>
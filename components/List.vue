<template>
  <v-card
    class="mx-auto"
    max-width="400"
    tile
  >
    <v-list-item
    v-for="article, index in articlesFav"
          :key="article.index"
          >
      <v-list-item-content>
        <v-list-item-title>{{index + 1}} - {{ article.title }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

import { ARTICLES_FAV } from '~/store/mutations.types'


export default {
  data () {
    return {
      quotes: [],
    }
  },

  methods: {
    async addArticles (result) {
      const list = [...this.articlesFav]
      list.push(result)
      this.$store.commit(ARTICLES_FAV, list)

    },
  },

  computed: {
    ...mapGetters([
      'articlesFav',
    ])
  }
}

</script>

<style>

</style>
<template>
  <v-simple-table
    fixed-header
    height="375px"
  >
    <template v-slot:default>
      <h4>Artículos guardados</h4>
      <thead>
        
      </thead>
      <tbody>
        <tr
        v-for="(article, index) in articlesFav" :key="article.index"
        >
          <td>{{index +1}} - {{ article.title }}</td>
          <td>
            <v-btn icon @click="deleteFav(index)">
            <v-icon>mdi-trash-can-outline</v-icon>
          </v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { mapGetters } from "vuex";

import { ARTICLES_FAV } from "~/store/mutations.types";

export default {
  data() {
    return {
      quotes: [],
    };
  },

  methods: {
    async addArticles(result) {
      const list = [...this.articlesFav];
      list.push(result);
      this.$store.commit(ARTICLES_FAV, list);
    },

    async deleteFav(index) {
      const list = [...this.articlesFav];
      list.splice(index, 1);
      this.$store.commit(ARTICLES_FAV, list);
    },
  },

  computed: {
    ...mapGetters(["articlesFav"]),
  },
};
</script>

<style>
</style>
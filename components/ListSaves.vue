<template>
  <v-simple-table fixed-header height="375px">
    <template v-slot:default>
      <thead></thead>
      <tbody>
        <tr v-for="article in articlesList" :key="article.index">
          <td v-if="article.fav === true">- {{ article.title }}</td>
          <td v-if="article.fav === true">
            <v-btn icon @click="deleteFav(article)">
              <v-icon>mdi-star-remove</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { mapGetters } from "vuex";

import { ARTICLES_LIST } from "~/store/mutations.types";

export default {
  data() {
    return {};
  },

  methods: {
    async deleteFav(art) {
      const newList = [...this.articlesList].map((article) => {
        if (article.id === art.id) {
          return {
            ...article,
            fav: false
          };
        }
        return article;
      });

      this.$store.commit(ARTICLES_LIST, newList);
    },
  },

  computed: {
    ...mapGetters(["articlesList"]),
  },
};
</script>

<style lang="scss" scoped>
</style>
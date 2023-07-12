<template>
  <v-simple-table fixed-header height="375px">
    <template v-slot:default>
      <thead></thead>
      <tbody>
        <tr v-for="article in articlesList" :key="article.index">
          <td v-if="article.fav === true">- {{ article.title }}</td>
          <td v-if="article.fav === true">
            <v-btn icon @click="deleteFav(article.id)">
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
    async deleteFav(id) {
      const list = [...this.articlesList];

      const obj = list.find((article) => article.id === id);

      const newList = list.map((article) => {
        if (article.id === id) {
          return {
            ...article,
            title: obj.title,
            content: obj.content,
            fav: false,
            imageUrl: obj.imageUrl,
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
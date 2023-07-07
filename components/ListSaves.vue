<template>
  <v-simple-table
    fixed-header
    height="375px"
  >
    <template v-slot:default>
      <thead>
        
      </thead>
      <tbody>
        <tr
        v-for="article, index in articlesList" :key="article.index"
        >
          <td v-if="article.fav === true">- {{ article.title }}</td>
          <td v-if="article.fav === true">
            <v-btn icon @click="deleteFav(index, article.title, article.content, article.imageUrl, article.fav)">
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
    return {
    };
  },

  methods: {

    async deleteFav(index, title, content, image, fav) {
      const list = [...this.articlesList];
      fav = false;
      list.splice(index, 1, {
        title: title,
        content: content,
        fav: fav,
        imageUrl: image
      });
      this.$store.commit(ARTICLES_LIST, list);
    },
  },

  computed: {
    ...mapGetters(["articlesList"]),
  },
};
</script>

<style lang="scss" scoped>

</style>
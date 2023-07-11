<template>
  <v-simple-table fixed-header height="375px">
    <template v-slot:default>
      <thead></thead>
      <tbody>
        <tr v-for="article in articlesList" :key="article.index">
          <td v-if="article.fav === true">- {{ article.title }}</td>
          <td v-if="article.fav === true">
            <v-btn
              icon
              @click="
                deleteFav(
                  article.id,
                  article.title,
                  article.content,
                  article.imageUrl
                  //todo: no pasar objeto de esta forma
                )
              "
            >
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
    async deleteFav(id, title, content, image) {
      const list = [...this.articlesList];
      const index = list.findIndex((article) => article.id === id);
      if (index !== -1) {
        list[index] = {
          ...list[index],
          title,
          content,
          fav: false,
          imageUrl: image,
        };
        this.$store.commit(ARTICLES_LIST, list);
      }
    },
  },

  computed: {
    ...mapGetters(["articlesList"]),
  },
};
</script>

<style lang="scss" scoped>
</style>
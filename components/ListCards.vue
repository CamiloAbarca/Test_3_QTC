<template>
  <v-card class="mx-auto" max-width="330">
    <v-card
      v-for="article in articlesList"
      :key="article.index"
      fixed-header
      height="375px"
    >
      <div class="articles">
        <v-card-title id="titulo">
          {{ article.title }}
        </v-card-title>
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="200px"
        ></v-img>

        <v-card-text>
          {{ article.content }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn icon @click="editArticle(article.title)">
            <v-icon>mdi-square-edit-outline</v-icon>
          </v-btn>

          <v-btn icon @click="deleteArticle(index)">
            <v-icon>mdi-trash-can-outline</v-icon>
          </v-btn>

          <v-btn icon @click="addFav(article.title)">
            <v-icon>mdi-star</v-icon>
          </v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

import { ARTICLES_LIST, ARTICLES_FAV } from "~/store/mutations.types";

export default {
  data() {
    return {
      index: "",
    };
  },

  methods: {
    async addArticles(result) {
      const list = [...this.articlesList];
      list.push(result);
      this.$store.commit(ARTICLES_LIST, list);
    },

    async deleteArticle(index) {
      const list = [...this.articlesList];
      list.splice(index, 1);
      this.$store.commit(ARTICLES_LIST, list);
    },

    async addFav(title) {
      const list = [...this.articlesFav];
      list.push({ title });
      this.$store.commit(ARTICLES_FAV, list);
    },

    async editArticle(title) {
      document.querySelector("#title").innerHTML = title;
    },
  },

  computed: {
    ...mapGetters(["articlesList", "articlesFav"]),
  },
};
</script>

<style lang="scss" scoped>
.articles {
  display: grid;
  place-items: center;  
}
</style>
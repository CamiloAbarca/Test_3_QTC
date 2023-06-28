<template>
  <v-card class="mx-auto" max-width="330">
    <v-card
      v-for="article, index in articlesList"
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

          <v-btn icon @click="editArticle(index, article.title, article.content)">
            <v-icon>mdi-square-edit-outline</v-icon>
          </v-btn>

          <v-btn icon @click="deleteArticle(index)">
            <v-icon>mdi-trash-can-outline</v-icon>
          </v-btn>

          <v-btn
          icon
          @click="addFav(index, article.title, article.content, article.done)"
          :disabled="article.done">
            <v-icon>mdi-star</v-icon>
          </v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

import { ARTICLES_LIST, ARTICLES_EDIT } from "~/store/mutations.types";

export default {
  data() {
    return {
      valid: true,
    };
    
  },

  methods: {

    async deleteArticle(index) {
      const list = [...this.articlesList];
      list.splice(index, 1);
      this.$store.commit(ARTICLES_LIST, list)
    },

    async addFav(index, title, content, done) {
      const list = [...this.articlesList];
      done = true
      list.splice(index, 1, {title: title, content: content, done: done});
      this.$store.commit(ARTICLES_LIST, list)

    },

    async editArticle(title, content) {
      const list = [...this.articlesEdit];
      list.push({ title, content });
      if (list.length >= 0) {
        list.splice(0,1);
      }
      this.$store.commit(ARTICLES_EDIT, list);      
    },
  },

  computed: {
    ...mapGetters(["articlesList", "articlesEdit"]),
  },
};
</script>

<style lang="scss" scoped>

h4{
  text-align: center;
}
</style>
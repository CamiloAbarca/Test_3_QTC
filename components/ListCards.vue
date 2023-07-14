<template>
  <v-container grid-list-md>
    <v-layout col wrap>
      <v-flex>
        <v-card
          v-for="article in articlesList"
          :key="article.index"
          class="card-margin"
        >
          <v-card-title>
            {{ article.title }}
          </v-card-title>
          <v-img v-if="article.imageUrl">
            <v-img :src="article.imageUrl" :width="300" />
          </v-img>
          <v-card-text>
            {{ article.content }}
          </v-card-text>
          <v-card-actions style="display: flex; justify-content: flex-end">
            <v-btn icon @click="btnEditArticle(article)">
              <v-icon>mdi-square-edit-outline</v-icon>
            </v-btn>

            <v-btn icon @click="deleteArticle(article.id)">
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>

            <v-btn icon @click="addFav(article)" :disabled="article.fav">
              <v-icon>mdi-star</v-icon>
            </v-btn>

            <!--Botón de prueba-->
            <v-btn icon @click="openDialog">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>

          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

import { ARTICLES_LIST } from "~/store/mutations.types";

export default {
  data() {
    return {
      index: null,
      imagen: null,
      imageUrl: null,
      dialog: false,
      title: "",
      content: "",
      fav: "",
    };
  },

  methods: {
    async deleteArticle(id) {
      const list = this.articlesList.filter((article) => article.id !== id);
      this.$store.commit(ARTICLES_LIST, list);
    },

    async addFav(art) {

      const newList = [...this.articlesList].map((article) => {
        if (article.id === art.id) {
          return {
            ...article,
            fav: true
          };
        }
        return article;
      });

      this.$store.commit(ARTICLES_LIST, newList);
    },

    async btnEditArticle(art) {

      this.title = art.title;
      this.content = art.content;
      this.id = art.id;
      this.fav = art.fav;
      this.imageUrl = art.imageUrl;
      this.dialog = true;
      this.imagen = null;
    },

    async updateArticle() {

      const newList = [...this.articlesList].map((article) => {
        if (article.id === this.id) {
          return {
            ...article,
            title: this.title,
            content: this.content,
            fav: this.fav,
            imageUrl: this.imagen
              ? URL.createObjectURL(this.imagen)
              : this.imageUrl,
          };
        }
        return article;
      });

      this.dialog = false;
      this.$store.commit(ARTICLES_LIST, newList);
    },

    getImageUrl(img) {
      if (img) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(img);
        });
      }
    },

    openDialog() {
      this.$emit('open-dialog');
    },
  },

  computed: {
    ...mapGetters(["articlesList"]),
  },
};
</script>

<style lang="scss" scoped>
.card-margin {
  margin-bottom: 20px;
}
</style>
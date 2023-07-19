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

            <v-btn icon @click="openDialog(article)">
              <v-icon>mdi-square-edit-outline</v-icon>
            </v-btn>

            <v-btn icon @click="deleteArticle(article.id)">
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>

            <v-btn icon @click="addFav(article)" :disabled="article.fav">
              <v-icon>mdi-star</v-icon>
            </v-btn>

          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <DialogUpdate v-if="selectedArticle" :article="selectedArticle" @close-dialog="selectedArticle = null" />
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

import { ARTICLES_LIST } from "~/store/mutations.types";


import DialogUpdate from '../components/DialogUpdate.vue';

export default {

  components: {
    DialogUpdate,
  },

  data() {
    return {
      index: null,
      imagen: null,
      imageUrl: null,
      dialog: false,
      title: "",
      content: "",
      fav: "",
      selectedArticle: null,
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

    openDialog(article) {
      this.$emit('open-dialog', article);
      this.selectedArticle = article;
    },


    updateArticle(updatedArticle) {
      const updatedList = this.articlesList.map((article) => {
        if (article.id === updatedArticle.id) {
          return updatedArticle;
        }
        return article;
      });

      this.$store.commit(ARTICLES_LIST, updatedList);
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
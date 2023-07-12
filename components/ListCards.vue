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
            <v-btn icon @click="btnEditArticle(article.id)">
              <v-icon>mdi-square-edit-outline</v-icon>
            </v-btn>

            <v-btn icon @click="deleteArticle(article.id)">
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>

            <v-btn icon @click="addFav(article.id)" :disabled="article.fav">
              <v-icon>mdi-star</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <!-- Dialog -->

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Editar</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="Título"
                required
                :value="title"
                v-model="title"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-textarea
                label="Contenido"
                required
                :value="content"
                v-model="content"
              ></v-textarea>
            </v-col>

            <v-col cols="12">
              <v-img v-if="imageUrl" :src="imageUrl" :width="500" />
            </v-col>

            <v-col cols="12">
              <v-file-input
                v-model="imagen"
                label="Editar imagen"
                accept="image/*"
                @change="getImageUrl"
              ></v-file-input>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Cancelar
          </v-btn>
          <v-btn color="blue darken-1" text @click="updateArticle()">
            Actualizar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Fin Dialog -->
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

    async addFav(id) {
      const list = [...this.articlesList];

      const obj = list.find((article) => article.id === id);

      const newList = list.map((article) => {
        if (article.id === id) {
          return {
            ...article,
            title: obj.title,
            content: obj.content,
            fav: true,
            imageUrl: obj.imageUrl,
          };
        }
        return article;
      });

      this.$store.commit(ARTICLES_LIST, newList);
    },

    async btnEditArticle(id) {
      const list = [...this.articlesList];
      const obj = list.find((article) => article.id === id);

      this.title = obj.title;
      this.content = obj.content;
      this.id = obj.id;
      this.fav = obj.fav;
      this.imageUrl = obj.imageUrl;
      this.dialog = true;
      this.imagen = null;
    },

    async updateArticle() {
      const list = [...this.articlesList];

      const newList = list.map((article) => {
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
<template>
  <v-container grid-list-md>
    <v-layout col wrap>
      <v-flex>
        <v-card v-for="(article, index) in articlesList" :key="article.index">
          <v-card-title>
            {{ article.title }}
          </v-card-title>
          <v-img v-if="article.imageUrl">
            <v-img :src="article.imageUrl" :width="500" />
          </v-img>
          <v-card-text>
            {{ article.content }}
          </v-card-text>
          <v-card-actions>
            <v-btn
              icon
              @click="
                btnEditArticle(
                  index,
                  article.title,
                  article.content,
                  article.fav
                )
              "
            >
              <v-icon>mdi-square-edit-outline</v-icon>
            </v-btn>

            <v-btn icon @click="deleteArticle(index)">
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>

            <v-btn
              icon
              @click="
                addFav(
                  index,
                  article.title,
                  article.content,
                  article.imageUrl,
                  article.fav
                )
              "
              :disabled="article.fav"
            >
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
                  label="Editar imagen"
                  accept="image/*"
                  @change="cargarImagen"
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
      dialog: false,
      title: "",
      content: "",
      fav: "",
    };
  },

  methods: {
    async deleteArticle(index) {
      const list = [...this.articlesList];
      list.splice(index, 1);
      this.$store.commit(ARTICLES_LIST, list);
    },

    async addFav(index, title, content, image, fav) {
      const list = [...this.articlesList];
      fav = true;
      list.splice(index, 1, {
        title: title,
        content: content,
        fav: fav,
        imageUrl: image,
        //imageUrl: imageUrl,
      });
      this.$store.commit(ARTICLES_LIST, list);
    },

    async btnEditArticle(index, title, content, imageUrl, fav) {
      this.title = title;
      this.content = content;
      this.index = index;
      this.fav = fav;
      this.imageUrl = imageUrl;
      this.dialog = true;
    },

    async updateArticle() {
      const list = [...this.articlesList];
      list.splice(this.index, 1, {
        title: this.title,
        content: this.content,
        fav: this.fav,
        imageUrl: this.imageUrl,
      });
      this.dialog = false;
      this.$store.commit(ARTICLES_LIST, list);
    },

    async cargarImagen() {
      const reader = new FileReader();

      reader.onload = (event) => {
        this.imagenPreview = event.target.result;
      };

      if (this.imagen) {
        reader.readAsDataURL(this.imagen);
      }
    },
  },

  computed: {
    ...mapGetters(["articlesList", "imageUrl"])
  },
};
</script>

<style lang="scss" scoped>
</style>
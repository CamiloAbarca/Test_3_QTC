<template>
  <div class="form">
    <h3>Agregar Post</h3>
    <v-card v-if="edit">
      <v-text-field
        v-model="titleArt"
        label="Título"
        prepend-icon="mdi-text"
      ></v-text-field>
      <v-textarea
        v-model="contentArt"
        label="Contenido"
        class="mx-2"
        rows="1"
        prepend-icon="mdi-comment"
      ></v-textarea>
      <v-file-input
        label="Imagen..."
        filled
        prepend-icon="mdi-camera"
        id="imgArt"
      ></v-file-input>
      <v-card-subtitle>
        <v-btn
          id="btnSave"
          class="justify-center"
          @click="createArticle()"
        >
          Guardar
        </v-btn>
      </v-card-subtitle>
    </v-card>

    <v-card v-else>
      <v-text-field
        v-model="titleArt"
        label="Título2"
        prepend-icon="mdi-text"
        
      ></v-text-field>
      <v-textarea
        v-model="contentArt"
        label="Contenido2"
        class="mx-2"
        rows="1"
        prepend-icon="mdi-comment"
      ></v-textarea>
      <v-file-input
        label="Imagen..."
        filled
        prepend-icon="mdi-camera"
        id="imgArt"
      ></v-file-input>
      <v-card-subtitle>
        <v-btn
          id="btnSave"
          class="justify-center"
          @click="createArticle()"
        >
          Actualizar
        </v-btn>
      </v-card-subtitle>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import { ARTICLES_LIST, ARTICLES_EDIT } from "~/store/mutations.types";

export default {
  data() {
    return {
      titleArt: "",
      contentArt: "",
      imgArt: "",
      edit: true,
    };
  },

  methods: {
    async createArticle(title = this.titleArt, content = this.contentArt, img = this.imgArt) {
      const list = [...this.articlesList];
      const newArticle = { title, content, img };
      list.unshift(newArticle);
      this.$store.commit(ARTICLES_LIST, list);
      
      this.titleArt = ''
      this.contentArt = ''

    },

    async editForm () {
      const listEdit = [...this.articlesEdit];

      if (listEdit.length >= 0) {
        this.edit = false
      }
    }
  },

  computed: {
    ...mapGetters(["articlesList", "articlesEdit"]),
  },
};
</script>

<style>
h3 {
  text-align: center;
}
</style>
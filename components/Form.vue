<template>
  <div class="form">
    <h3>Agregar Post</h3>
    <v-text-field
      v-model="titleArt"
      label="Título"
      id="title"
      prepend-icon="mdi-text"
    ></v-text-field>
    <v-textarea
      v-model="contentArt"
      label="Contenido"
      id="content"
      class="mx-2"
      rows="1"
      prepend-icon="mdi-comment"
    ></v-textarea>
    <v-file-input
      label="Imagen..."
      filled
      prepend-icon="mdi-camera"
    ></v-file-input>
    <v-card-subtitle>
      <v-btn
        id="btnSave"
        class="justify-center"
        @click="createArticle(titleArt, contentArt, imgArt)"
      >
        Guardar
      </v-btn>
    </v-card-subtitle>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import { ARTICLES_LIST } from "~/store/mutations.types";

export default {
  data() {
    return {
      titleArt: "",
      contentArt: "",
      imgArt: "",
    };
  },

  methods: {
    async createArticle(title, content, img) {
      const list = [...this.articlesList];
      const newArticle = { title, content, img };
      list.push(newArticle);
      this.$store.commit(ARTICLES_LIST, list);
      console.log(list);
    },
  },

  computed: {
    ...mapGetters(["articlesList"]),
  },
};
</script>

<style>
</style>
<template>
  <div class="container">
    <div class="divForm">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="title"
          :counter="20"
          :rules="titleRules"
          label="Título"
          required
        ></v-text-field>

        <v-textarea
          v-model="content"
          :counter="280"
          :rules="contentRules"
          label="Contenido"
          required
        ></v-textarea>

        <v-file-input
          v-model="imagen"
          label="Seleccionar imagen"
          accept="image/*"
          :rules="imagenRules"
          @change="cargarImagen"
        ></v-file-input>

        <v-btn :disabled="!valid" class="mr-4" @click="createArticle()">
          Crear
        </v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import { ARTICLES_LIST } from "~/store/mutations.types";

export default {
  data() {
    return {
      imagen: null,
      imageUrl: null,
      valid: true,
      title: "",
      titleRules: [
        (v) => !!v || "Falta título",
        (v) =>
          (v && v.length <= 20) ||
          "El título no puede tener más de 20 caracteres",
        (v) =>
          v.trim().length !== 0 || "El título no puede contener solo espacios",
      ],
      content: "",
      contentRules: [
        (v) => !!v || "Falta contenido",
        (v) =>
          (v && v.length <= 280) ||
          "El contenido no puede tener más de 280 caracteres",
        (v) =>
          v.trim().length !== 0 ||
          "El contenido no puede contener solo espacios",
      ],
      imagenRules: [(v) => !!v || "Falta imagen"],
    };
  },

  methods: {
    async createArticle() {
      this.$refs.form.validate();

      if (this.title === "" || this.content === "" || !this.imagen) {
        return;
      } else {
        const list = [...this.articlesList];
        const fav = false;
        const newArticle = {
          title: this.title,
          content: this.content,
          imageUrl: this.imageUrl,
          fav: false
        };
        list.unshift(newArticle);
        this.$store.commit(ARTICLES_LIST, list);
        this.title = "";
        this.content = "";
        this.$refs.form.resetValidation();
        this.imagen = null;
        this.imageUrl = null;
      }
    },

    cargarImagen() {
    if (this.imagen) {
      const reader = new FileReader();

      reader.onload = (event) => {
        this.imageUrl = event.target.result;
      };

      reader.readAsDataURL(this.imagen);
    }
  },
  },

  computed: {
    ...mapGetters(["articlesList"]),
  },
};
</script>

<style>
</style>
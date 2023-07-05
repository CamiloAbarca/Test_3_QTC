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
      <v-card-text>
        <v-img v-if="imagenPreview" :src="imagenPreview" :width="200" />
      </v-card-text>
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
      files: [],
      imagenPreview: null,
      imagen: null,
      valid: true,
      title: "",
      titleRules: [
        (v) => !!v || "Falta título",
        (v) =>
          (v && v.length <= 20) ||
          "El título no puede tener más de 20 caracteres",
        (v) => v.trim().length !== 0 || "El título no puede contener solo espacios"
      ],
      content: "",
      contentRules: [
        (v) => !!v || "Falta contenido",
        (v) =>
          (v && v.length <= 280) ||
          "El contenido no puede tener más de 280 caracteres",
        (v) => v.trim().length !== 0 || "El contenido no puede contener solo espacios"
      ],
      imagenRules: [(v) => !!v || "Falta imagen"],
    };
  },

  methods: {
    async createArticle(title = this.title, content = this.content) {
      this.$refs.form.validate();

      if (title == "" || content == "" || !this.imagenPreview) {
        return;
      } else {
        const list = [...this.articlesList];
        const fav = false;
        const edit = true;
        const newArticle = { title, content, imageUrl: this.imagenPreview, fav, edit };
        list.unshift(newArticle);
        this.$store.commit(ARTICLES_LIST, list);
        this.title = "";
        this.content = "";
        this.$refs.form.resetValidation();
        this.imagenPreview = null;
        this.imagen = null;
      }
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

<style>
h3 {
  text-align: center;
}

.divForm {
  border: 1px solid #000;
  padding: 10px;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}
</style>
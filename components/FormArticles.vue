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
          @change="getImageUrl"
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

      if (this.title === "" || this.content === "" || !this.imagen) return;
      try {
        this.loadingImg = true;
        const imgUrl = await this.getImageUrl(this.imagen);

        const newArticle = {
          id: crypto.randomUUID(),
          title: this.title,
          content: this.content,
          imageUrl: imgUrl,
          fav: false,
        };

        const list = [...this.articlesList];
        list.unshift(newArticle);
        this.$store.commit(ARTICLES_LIST, list);
        this.title = "";
        this.content = "";
        this.$refs.form.resetValidation();
        this.imagen = null;
        this.imageUrl = null;
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingImg = false;
      }
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

<style>
</style>
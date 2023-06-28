<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
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

    <v-btn
      :disabled="!valid"
      class="mr-4"
      @click="createArticle()"
    >
      Crear
    </v-btn>
  </v-form>
</template>

<script>
import { mapGetters } from "vuex";

import { ARTICLES_LIST, ARTICLES_EDIT } from "~/store/mutations.types";

export default {
  data() {
    return {
      valid: true,
      title: '',
      titleRules: [
        v => !!v || 'Falta título',
        v => (v && v.length <= 20) || 'El título no puede tener más de 20 caracteres',
      ],
      content: '',
      contentRules: [
        v => !!v || 'Falta contenido',
        v => (v && v.length <= 280) || 'El contenido no puede tener más de 280 caracteres',
      ],
    };
  },

  methods: {
    async createArticle(title = this.title, content = this.content) {
        this.$refs.form.validate()

        if (title == "" || content == "") {
          return
        } else {
          const list = [...this.articlesList];
          const done = false
          const newArticle = { title, content, done};
          list.unshift(newArticle);
          this.$store.commit(ARTICLES_LIST, list);
          this.title = ''
          this.content = ''
          this.$refs.form.resetValidation()
        }
    },

    async editForm () {
      const listEdit = [...this.articlesEdit];

      if (listEdit.length >= 0) {
        this.edit = false
      }
    },
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
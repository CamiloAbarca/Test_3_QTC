<template>
  <div >
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

    <v-file-input
          v-model="imagen"
          label="Seleccionar imagen"
          accept="image/*"
          @change="cargarImagen"
        ></v-file-input>

    <v-btn
      :disabled="!valid"
      class="mr-4"
      @click="createArticle()"
    >
      Crear
    </v-btn>

    <v-card>
      <v-card-title>Pre-visualización de la imagen</v-card-title>
      <v-card-text>
        <v-img v-if="imagenCargada" :src="imagenCargada" :width="200"/>
      </v-card-text>
    </v-card>
  </v-form>
</div>  
</template>

<script>
import { mapGetters } from "vuex";

import { ARTICLES_LIST } from "~/store/mutations.types";

export default {
  data() {
    return {
      files: [],
      valid: true,
      editBtn: false,
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
          const fav = false
          const edit = true
          const f = this.files
          const newArticle = { title, content, fav, edit, f};
          list.unshift(newArticle);
          this.$store.commit(ARTICLES_LIST, list);
          this.title = ''
          this.content = ''
          this.$refs.form.resetValidation()
          console.log(list)
          console.log(this.files)
        }
    },

    async editForm () {
      
      this.editBtn = false
      
    },

    //sdfsdf
    async cargarImagen() {
      const reader = new FileReader();

      reader.onload = (event) => {
        this.imagenCargada = event.target.result;
      };

      if (this.imagen) {
        reader.readAsDataURL(this.imagen);
      }
    },


    //sdsdf
  },

  computed: {
    ...mapGetters(["articlesList"]),
  },
};
</script>

<style>
h3 {
  text-align: center;
}
</style>
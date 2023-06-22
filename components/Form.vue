<template>
  <div>
    <v-card>
      <v-card-subtitle>
        <v-text-field
      v-model="titleArt"
      label="Título"
    ></v-text-field>
      </v-card-subtitle>
      <v-card-subtitle>
    <v-textarea
      v-model="contentArt"
      name="input-7-4"
      label="Contenido"
    ></v-textarea>
  </v-card-subtitle>
  <!--
  <v-card-subtitle>
    <v-file-input
      v-model="imgArt"
      accept="image/*"
      label="Imagen"
    ></v-file-input>
    </v-card-subtitle>
    -->
    <v-card-subtitle>
      <v-btn
      class="mr-4"
      @click="createArticle(titleArt, contentArt)"
    >
      Guardar
    </v-btn>
    </v-card-subtitle>
    
  </v-card>
</div>
</template>

<script>
import { mapGetters } from 'vuex';

import { ARTICLES_LIST } from '~/store/mutations.types'


export default {
  data () {
    return {
      titleArt: '',
      contentArt: '',
      imgArt: ''
    }
  },

  methods: {

    async createArticle (title, content) {
      console.log(title, content)
      const list = [...this.articlesList]
      const newArticle = {title, content}
      list.push(newArticle)
      this.$store.commit(ARTICLES_LIST, list)
      console.log(this.articlesList)
    },

    /*
    async addQuotes (result) {
      const list = [...this.quoteList]
      list.push(result)
      this.$store.commit(SET_QUOTELIST, list)

    },

    async deleteQuotes (index) {
      const list = [...this.quoteList]
      list.splice(index, 1)
      this.$store.commit(SET_QUOTELIST, list)
    },

    

    async updateQuote () {

    }
    */
  },

  computed: {
    ...mapGetters([
      'articlesList'
    ])
  }
}
</script>

<style>

</style>
<template>
  <v-container class="grey lighten-5" id="app" data-app>
    <v-row>
      <v-col>
        <v-card> <h4>Crear Artículo</h4> </v-card>
        <v-card class=" component-border "> <FormArticles /> </v-card>
      </v-col>
      <v-col order="12">
        <v-card> <h4>Lista de Artículos</h4> </v-card>
        <v-card class=" component-scrollable "> <ListCards @open-dialog="openDialog" /> </v-card>
      </v-col>
      <v-col order="1">
        <v-card> <h4>Artículos Guardados</h4> </v-card>
        <v-card class=" component-border "> <ListSaves /> </v-card>
      </v-col>

      
      <DialogUpdate v-if="selectedArticle" :article="selectedArticle" @close-dialog="selectedArticle = null" />
    </v-row>
  </v-container>
</template>

<script>
import ListCards from "../components/ListCards.vue";
import FormArticles from "../components/FormArticles.vue";
import ListSaves from "../components/ListSaves.vue";
import DialogUpdate from '../components/DialogUpdate.vue';

export default {
  components: {
    ListCards,
    FormArticles,
    ListSaves,
    DialogUpdate,
  },

  data() {
    return {
      selectedArticle: null,
    };
  },
  methods: {
    openDialog(article) {
      this.selectedArticle = article;
    },
  },
};
</script>

<style lang="scss" scoped>
.component-border {
  border: 1px solid #000;
  padding: 10px;
}

.component-scrollable {
  overflow-y: auto;
  max-height: 670px;
}

h4{
  text-align: center;
}
</style>
<template>
  <div>
    <v-row justify="center">
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
                  v-model="article.title"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-textarea
                  label="Contenido"
                  required
                  :value="content"
                  v-model="article.content"
                ></v-textarea>
              </v-col>

              <v-col cols="12">
                <v-img
                  v-if="article.imageUrl"
                  :src="article.imageUrl"
                  :width="500"
                />
              </v-col>

              <v-col cols="12">
                <v-file-input
                  v-model="imagen"
                  label="Editar imagen"
                  accept="image/*"
                  @change="getImageUrl"
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
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      imagen: null,
      imageUrl: null,
      dialog: true,
      title: "",
      content: "",
    };
  },

  methods: {
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

    updateArticle() {

      const imgUrl = this.getImageUrl(this.imagen);
      const updatedArticle = {
        id: this.article.id,
        title: this.article.title,
        content: this.content,
        imageUrl: imgUrl,
        fav: this.article.fav
      };
      
      this.$emit("update-article", updatedArticle);
      this.dialog = false;
    },
  },

  computed: {
    ...mapGetters(["articlesList"]),
  },
};
</script>

<style>
</style>
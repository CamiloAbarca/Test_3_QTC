<template>
  <div class="container">
    <div class="divForm">
      <v-simple-table fixed-header height="375px">
        <template v-slot:default>
          <thead></thead>
          <tbody>
            <tr v-for="article in articlesList" :key="article.index">
              <td>
                <template>
                  <v-card class="mx-auto" max-width="300">
                    <v-img
                      class="white--text align-end"
                      height="200px"
                      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                    >
                    </v-img>

                    <v-card-title>{{ article.title }}</v-card-title>

                    <v-card-text class="text--primary">
                      <div>{{ article.content }}</div>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn icon @click="editArticle()">
                        <v-icon>mdi-square-edit-outline</v-icon>
                      </v-btn>

                      <v-btn icon @click="deleteArticle(index)">
                        <v-icon>mdi-trash-can-outline</v-icon>
                      </v-btn>

                      <v-btn
                        icon
                        @click="
                          addFav(
                            index,
                            article.title,
                            article.content,
                            article.fav,
                            article.edit
                          )
                        "
                        :disabled="article.fav"
                      >
                        <v-icon>mdi-star</v-icon>
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </td>
            </tr>
          </tbody></template
        ></v-simple-table
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import { ARTICLES_LIST } from "~/store/mutations.types";

import dialog from "../components/DialogEdit.vue"

export default {
  data() {
    return {
      index: null,
      dialog: dialog
    };
    
  },

  methods: {
    async deleteArticle(index) {
      const list = [...this.articlesList];
      list.splice(index, 1);
      this.$store.commit(ARTICLES_LIST, list);
    },

    async addFav(index, title, content, fav, edit) {
      const list = [...this.articlesList];
      fav = true;
      edit = true;
      list.splice(index, 1, {
        title: title,
        content: content,
        fav: fav,
        edit: edit,
      });
      this.$store.commit(ARTICLES_LIST, list);
    },

    async editArticle() {
      this.dialog
    },
  },

  computed: {
    ...mapGetters(["articlesList"]),
  },
};
</script>

<style lang="scss" scoped>
.div {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
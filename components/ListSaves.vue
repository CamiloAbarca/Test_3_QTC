<template>
  <v-simple-table
    fixed-header
    height="375px"
  >
    <template v-slot:default>
      <h4>Artículos guardados</h4>
      <thead>
        
      </thead>
      <tbody>
        <tr
        v-for="article in articlesList" :key="article.index"
        >
          <td v-if="article.done === true">- {{ article.title }}</td>
          
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { mapGetters } from "vuex";

import { ARTICLES_LIST } from "~/store/mutations.types";

export default {
  data() {
    return {
      quotes: [],
    };
  },

  methods: {

    async deleteFav(index) {
      const list = [...this.articlesList];
      list.splice(index, 1);
      this.$store.commit(ARTICLES_LIST, list);
    },
  },

  computed: {
    ...mapGetters(["articlesList"]),
  },
};
</script>

<style>

h4{
  text-align: center;
}
</style>
<template>
  <div id="app" data-app>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col order="last">
        <v-card class="pa-2" outlined tile>
          <Form />
        </v-card>
      </v-col>
      <v-col>
        <v-card class="pa-2" outlined tile>
          <ListCards />
        </v-card>
      </v-col>
      <v-col order="first">
        <v-card id="fav" class="pa-2" outlined tile>
          <ListSaves />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</div>
</template>

<script>
import ListCards from "../components/ListCards.vue";
import Form from "../components/Form.vue";
import ListSaves from "../components/ListSaves.vue";

export default {
  components: {
    ListCards,
    Form,
    ListSaves,
  },
};
</script>

<style lang="scss" scoped>

.fav {
  width: 100%;
  display: grid;
  place-content: center;
}
</style>
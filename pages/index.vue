<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col order="last">
        <v-card id="form" class="pa-2" outlined tile>
          <Form />
        </v-card>
      </v-col>
      <v-col>
        <v-card id="lista" class="pa-2" outlined tile>
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
.form {
  width: 100%;
  display: grid;
  place-content: center;
  padding-top: 50px;
  padding-block: 50px;
}

.lista {
  width: 100%;
  display: grid;
  place-content: center;
}

.fav {
  width: 100%;
  display: grid;
  place-content: center;
}
</style>
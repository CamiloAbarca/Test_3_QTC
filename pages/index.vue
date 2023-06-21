<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col order="last">
        <v-card
          class="pa-2"
          outlined
          tile
        >
          <Form />
        </v-card>
      </v-col>
      <v-col>
        <v-card
          class="pa-2"
          outlined
          tile
        >
          <Test />
        </v-card>
      </v-col>
      <v-col order="first">
        <v-card
          class="pa-2"
          outlined
          tile
        >
          <h3>Artículos guardados</h3>
          <br>
          <List />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Test from '~/components/Test.vue'
  export default {
    layout: 'empty',
    components: {
      Test
    }
  }
</script>

<style lang="scss" scoped>

</style>
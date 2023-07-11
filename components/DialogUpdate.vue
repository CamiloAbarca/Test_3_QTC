<template>
  <v-container>
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
                v-model="title"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-textarea
                label="Contenido"
                required
                :value="content"
                v-model="content"
              ></v-textarea>
            </v-col>

            <v-col cols="12">
              <v-img v-if="imageUrl" :src="imageUrl" :width="500" />
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
  </v-container>
</template>

<script>
export default {

}
</script>

<style>

</style>
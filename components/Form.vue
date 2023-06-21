<template>
  <div>
    <v-card>
      <v-card-subtitle>
        <v-text-field
      v-model="title"
      label="Título"
      @input="stop"
    ></v-text-field>
      </v-card-subtitle>
      <v-card-subtitle>
    <v-textarea
      tArea
      name="input-7-4"
      label="Contenido"
    ></v-textarea>
  </v-card-subtitle>
  <v-card-subtitle>
    <v-file-input
      accept="image/*"
      label="Imagen"
    ></v-file-input>
    </v-card-subtitle>
    <v-card-subtitle>
      <v-btn
      class="mr-4"
      @click="submit"
    >
      Guardar
    </v-btn>
    </v-card-subtitle>
    
  </v-card>
</div>
</template>

<script>

</script>

<style>

</style>
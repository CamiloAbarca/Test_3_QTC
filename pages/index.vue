<template>
  <div id="app" data-app>
    <div class="container">
      <div class="component-border">
        <Form />
      </div>
      <div class="component-scrollable">
        <ListCards />
      </div>
      <div class="component-border component-scrollable">
        <ListSaves />
      </div>
    </div>
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
.container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.component-border {
  border: 1px solid #000;
  padding: 10px;
}

.component-scrollable {
  overflow-y: auto;
  max-height: 500px;
}
</style>
<template>
  <div>
    <h1>Edit item</h1>
    <div>{{ item.name }}</div>
  </div>
</template>

<script lang="ts">
import { Item } from "../domain/item";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "ItemEditor",
  props: {
    item: {
      type: Object as PropType<Item>,
    },
  },
});
</script>
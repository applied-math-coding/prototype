

<template>
  <div>
    <h1>All Items</h1>
    <DataTable :value="items" responsiveLayout="scroll">
      <Column field="name" header="Name"></Column>
      <Column field="available" header="Availability"></Column>
      <Column header="Actions">
        <template #body="slotProps">
          <Button
            type="button"
            label="Delete"
            class="p-button-danger mr-2"
            @click="handleDelete(slotProps.data.id)"
          ></Button>
          <Button
            type="button"
            label="Edit"
            @click="handleEdit(slotProps.data.id)"
          ></Button>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script lang="ts">
import { Item } from "../domain/item";
import { defineComponent, PropType } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";

export default defineComponent({
  name: "ItemList",
  props: {
    items: {
      type: Object as PropType<Item[]>,
      default: () => [] as Item[],
    },
  },
  emits: {
    deleteItem(payload: { id: number }) {
      return payload.id != null;
    },
    editItem(payload: { id: number }) {
      return payload.id != null;
    },
  },
  components: { DataTable, Column, Button },
  methods: {
    handleDelete(id: number) {
      this.$emit("deleteItem", { id });
    },
    handleEdit(id: number) {
      this.$emit("editItem", { id });
    },
  },
});
</script>
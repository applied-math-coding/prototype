

<template>
  <div class="item-list-container">
    <Button label="Create Item" @click="handleCreateItem()" />
    <h1>All Items</h1>
    <div class="data-table-positioner">
      <DataTable :value="items" responsiveLayout="scroll">
        <Column field="name" header="Name"></Column>
        <Column field="available" header="Available"></Column>
        <Column header="Actions">
          <template #body="slotProps">
            <div class="flex align-items-center">
              <Button
                type="button"
                label="Delete"
                class="p-button-danger mr-3"
                @click="handleDelete(slotProps.data.id)"
              ></Button>
              <router-link
                :to="{ name: 'itemEditor', params: { id: slotProps.data.id } }"
                >Edit
              </router-link>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
    <div v-if="showLoader" class="loading-positioner">
      <ProgressSpinner />
    </div>
  </div>
</template>

<script lang="ts">
import { Item } from "../domain/item";
import { defineComponent } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import { itemService } from "../services";
import ProgressSpinner from "primevue/progressspinner";

export default defineComponent({
  name: "ItemList",
  data() {
    return {
      items: [] as Item[],
      showLoader: false,
    };
  },
  async created() {
    try {
      this.showLoader = true;
      this.items = await itemService.getItems();
    } catch (e) {
      console.error(e);
    } finally {
      this.showLoader = false;
    }
  },
  components: { DataTable, Column, Button, ProgressSpinner },
  methods: {
    async handleDelete(id: number) {
      try {
        this.showLoader = true;
        await itemService.deleteItem(id);
        this.items = this.items.filter((e) => e.id !== id);
      } catch (e) {
        console.error(e);
      } finally {
        this.showLoader = false;
      }
    },
    handleCreateItem() {
      (this as any).$router.push({ name: "itemEditor", params: { id: "-1" } });
    },
  },
});
</script>

<style scoped lang="scss">
.item-list-container {
  position: relative;
  min-height: 100px;
  z-index: 0;
  padding: 20px 0;

  .data-table-positioner {
    z-index: 1;
  }

  .loading-positioner {
    z-index: 2;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
  }
}
</style>
<template>
  <div class="items-container">
    <div class="header-actions">
      <Button label="Create Item" />
      <div class="use-graphql">
        <div class="mr-2">Use GraphQL:</div>
        <InputSwitch v-model="useGraphQL" />
      </div>
    </div>
    <ItemList
      v-if="showItemList"
      :items="items"
      @delete-item="handleDeleteItem($event)"
      @edit-item="handleEditItem($event)"
    />
    <ItemEditor v-if="showItemEditor" :item="selectedItem" />
    <div v-if="showLoader" class="loading-positioner">
      <ProgressSpinner />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ItemList from "../components/ItemList.vue";
import Button from "primevue/button";
import { itemService } from "../services";
import { Item } from "../domain/item";
import InputSwitch from "primevue/inputswitch";
import ItemEditor from "../components/ItemEditor.vue";
import ProgressSpinner from "primevue/progressspinner";

export default defineComponent({
  name: "Items",
  data() {
    return {
      items: [] as Item[],
      useGraphQL: false,
      showItemList: true,
      showItemEditor: false,
      selectedItem: {} as Item,
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
  components: {
    ItemList,
    Button,
    InputSwitch,
    ItemEditor,
    ProgressSpinner,
  },
  methods: {
    async handleDeleteItem({ id }: { id: number }) {
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
    async handleEditItem({ id }: { id: number }) {
      this.showItemList = false;
      this.selectedItem = this.items.find((e) => e.id === id) as Item;
      this.showItemEditor = true;
    },
  },
});
</script>

<style scoped lang="scss">
.items-container {
  position: relative;
  min-height: 100px;

  .header-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .use-graphql {
      display: flex;
      align-items: center;
    }
  }

  .loading-positioner {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.25);
  }
}
</style>

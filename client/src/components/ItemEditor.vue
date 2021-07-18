<template>
  <div class="item-editor-container">
    <div class="editor-positioner">
      <h1>{{ item.id != null ? "Edit" : "Create" }} item</h1>

      <div class="item-field">
        <div>Name:</div>
        <div>
          <InputText id="name" type="text" v-model="item.name" />
        </div>
      </div>

      <div class="item-field mt-3">
        <div>Available:</div>
        <div>
          <Checkbox id="availability" :binary="true" v-model="item.available" />
        </div>
      </div>

      <Button
        label="Save"
        class="p-button-success mt-6"
        @click="handleSave()"
      />
      <div class="mt-3">
        <router-link :to="{ name: 'itemList' }">&lt; back to list </router-link>
      </div>
    </div>
    <div v-if="showLoader" class="loading-positioner">
      <ProgressSpinner />
    </div>
  </div>
</template>

<script lang="ts">
import { Item } from "../domain/item";
import { defineComponent } from "vue";
import ProgressSpinner from "primevue/progressspinner";
import Button from "primevue/button";
import { itemService } from "../services";
import Checkbox from "primevue/checkbox";
import InputText from "primevue/inputtext";

export default defineComponent({
  name: "ItemEditor",
  data() {
    return {
      showLoader: false,
      item: {} as Item,
    };
  },
  props: {
    id: {
      type: String,
      default: () => "",
    },
  },
  components: {
    ProgressSpinner,
    Button,
    Checkbox,
    InputText,
  },
  methods: {
    async handleSave() {
      try {
        this.showLoader = true;
        const isEdit = this.item.id != null;
        this.item = await (isEdit
          ? itemService.updateItem(this.item)
          : itemService.createItem(this.item));
        if (!isEdit) {
          (this as any).$router.push({ name: "itemList" });
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.showLoader = false;
      }
    },
  },
  async created() {
    if (this.$props.id === "-1") {
      this.item = new Item({});
    } else {
      try {
        this.showLoader = true;
        this.item = await itemService.getItem(+this.$props.id);
      } catch (e) {
        console.error(e);
      } finally {
        this.showLoader = false;
      }
    }
  },
});
</script>

<style scoped lang="scss">
.item-editor-container {
  z-index: 0;
  position: relative;
  padding: 20px 0;
  min-height: 100px;

  .editor-positioner {
    z-index: 1;

    .item-field {
      display: flex;
      align-items: center;

      div:first-child {
        margin-right: 10px;
      }
    }
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
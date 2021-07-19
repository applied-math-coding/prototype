<template>
  <div class="items-container">
    <div class="header-actions">
      <div class="use-graphql">
        <div class="mr-2">Use GraphQL:</div>
        <InputSwitch v-model="itemServiceState.useGraphQL" />
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import InputSwitch from "primevue/inputswitch";
import { itemService } from "../services";

export default defineComponent({
  name: "Items",
  data() {
    return {
      itemServiceState: itemService.state,
    };
  },
  components: {
    InputSwitch,
  },
});
</script>

<style scoped lang="scss">
.items-container {
  .header-actions {
    display: flex;
    justify-content: flex-end;

    .use-graphql {
      display: flex;
      align-items: center;
    }
  }
}
</style>

<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TgButton'
});
</script>

<style>
.button {
  padding: 10px 15px;
  background: var(--tg-theme-button-color);
  color: var(--tg-theme-button-text-color);
  border: none;
  outline: none;
  cursor: pointer;
}
</style>

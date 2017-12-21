<template>
  <button class="btn" :style="{ backgroundColor: color }" @click="handleClick">
    <svg class="icon" aria-hidden="true" v-if="icon">
      <use :xlink:href="`#${icon}`"></use>
    </svg>
    {{text}}
  </button>
</template>

<script>
export default {
  props: ['text', 'color', 'icon', 'handleClick'],
};
</script>

<style scoped>
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(130 / 14 * 1em);
  height: calc(45 / 14 * 1em);
  border: 0;
  border-radius: 5px;
  font-size: calc(14 / 16 * 1em);
  color: white;
}

.btn > .icon {
  width: calc(20 / 14 * 1em);
  height: calc(20 / 14 * 1em);
  margin-right: calc(11 / 14 * 1em);
  fill: white;
}
</style>

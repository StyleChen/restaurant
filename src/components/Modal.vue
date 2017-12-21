<template>
  <div class="mask" v-show="global.modal">
    <div class="modal" :class="[type]">
      <header class="modal-header">
        {{title}}
        <svg class="icon" aria-hidden="true" @click="X_click" style="position: absolute;right: 10px;top: 10px;">
          <use xlink:href="#icon-cha"></use>
        </svg>
      </header>
      <div class="modal-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  props: ['type', 'title', 'reload', 'refresh', 'step', 'time', 'dis', 'price', 'price2', 'refund'], // type ** small或者big两个尺寸
  computed: {
    ...mapState([
      'global',
    ]),
  },
  methods: {
    ...mapMutations([
      'CLOSE_MODAL',
    ]),
    X_click() {
      this.$emit('update:step', 1);
      this.$emit('update:time', '');
      this.$emit('update:dis', '');
      this.$emit('update:price', '');
      this.$emit('update:price2', '');
      this.$emit('update:refund', '');
      if (this.reload) {
        this.CLOSE_MODAL();
        this.$emit('update:refresh', true);
      } else {
        this.CLOSE_MODAL();
      }
    },
  },
};
</script>

<style scoped>

.mask {
  position: fixed;
  z-index: 5;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal {
  position: fixed;
  z-index: 6;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -70%);
  background-color: white;
  border-radius: 5px;
}

.modal.small {
  width: calc(460 / 16 * 1em);
}

.modal.big {
  width: calc(550 / 16 * 1em);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: calc(45 / 14 * 1em);
  padding: 0 calc(17 / 14 * 1em);
  border-radius: 5px 5px 0 0;
  background-color: #e8e9ee;
  font-size: calc(14 / 16 * 1em);
}

.modal-header > .icon {
  width: calc(20 / 14 * 1em);
  height: calc(20 / 14 * 1em);
  fill: #c4c4c4;
}

.modal-body {
  padding: calc(20 / 16 * 1em);
}
</style>

<template>
  <div class="number-selector">
    <label>{{label}}</label>
    <div class="btn-wrapper">
      <div @click="CHANGE_PEOPLE_NUM([number.type, number.value - 1])"><Icon class="icon" type="minus-round" aria-hidden="true"></Icon></div>
      <!-- <svg class="icon" aria-hidden="true" @click="CHANGE_PEOPLE_NUM([number.type, number.value - 1])">
        <use xlink:href="#jian"></use>
      </svg> -->
      <input type="text" :name="name" v-model="number.value" id="number" pattern="[0-9]" @change="CHANGE_PEOPLE_NUM([number.type, Number(number.value)])">
      <!-- <svg class="icon" aria-hidden="true" @click="CHANGE_PEOPLE_NUM([number.type, number.value + 1])">
        <use xlink:href="#jia"></use>
      </svg> -->
      <div @click="CHANGE_PEOPLE_NUM([number.type, number.value + 1])"><Icon type="plus-round" class="icon" aria-hidden="true"></Icon></div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  props: {
    name: {
      required: false,
    },
    label: {
      required: false,
    },
    number: {
      required: true,
    },
  },
  methods: {
    ...mapMutations('waiter', [
      'CHANGE_PEOPLE_NUM',
    ]),
  },
};
</script>

<style scoped>
.number-selector {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: calc(24 / 20 * 1em);
  margin: calc(20 / 20 * 1em) 0;
  font-size: calc(20 / 16 * 1em);
}

.btn-wrapper {
  display: flex;
  width: calc(84 / 14 * 1em);
  height: 100%;
}

.icon {
  vertical-align: top;
}

.btn-wrapper #number {
  width: calc(24 / 20 * 1em);
  height: calc(24 / 20 * 1em);
  border: 1px solid #e8e8e8;
  margin-top: 2px;
  border-left: none;
  border-right: none;
  text-indent: 0.1em;
}

.number-selector .icon {
  width: calc(24 / 20 * 1em);
  fill: white;
  background-color: #c4c4c4;
  padding-left: 5px;
  padding-top: 3px;
}
</style>

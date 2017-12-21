<template>
  <div class="grid" :class="[!number? 'free' : 'started', checked ? 'selected' : null]" :data-id="id" @click="handleClick(id)">
    <header class="number">{{tablename}}
      <svg class="icon" aria-hidden="true" v-if="checked">
        <use xlink:href="#icon-danxuan"></use>
      </svg>
    </header>
    <div class="member">{{mealAnum}}成人{{mealBnum}}儿童</div>
    <div class="mark" v-if="number">开</div>
  </div>
</template>

<script>
export default {
  props: ['id', 'number', 'tablename', 'mealAnum', 'mealBnum', 'handleClick', 'checked'],
};
</script>

<style scoped>
.grid {
  /* display: flex;
  flex-wrap: wrap;
  flex-direction: column; */
  width: calc(148 / 14 * 1em);
  height: calc(130 / 14 * 1em);
  margin: calc(14 / 14 * 1em) calc(26 / 14 * 1em) 0 0;
  border-radius: 5px;
  background-color: #ffffff;
  border: solid 1px #e8e8e8;
  font-size: calc(14 / 16 * 1em);
  float: left;
  position: relative;
}

.grid.selected {
  border-color: #ea5820;
}

.number {
  flex-basis: calc(40 / 14 * 1em);
  line-height: calc(40 / 14 * 1em);
  text-indent: 1em;
  border-radius: 5px 5px 0 0;
  color: white;
}

.started > .number {
  background-color: #ff7a18;
}

.free > .number {
  background-color: #91b9f0;
}

.member {
  /* flex-grow:1;
  flex-shrink:1;
  flex-basis:0; */
  line-height: calc(40 / 14 * 1em);
  text-indent: 1em;
}

.mark {
  /* align-self: flex-end; */
  width: calc(28 / 14 * 1em);
  height: calc(28 / 14 * 1em);
  border: solid 1px #ff7a18;
  border-radius: 50%;
  margin: 0 calc(11 / 14 * 1em) calc(11 / 14 * 1em) 0;
  color: #ff7a18;
  text-align: center;
  line-height: calc(28 / 14 * 1em);
  float: right;
}

.icon {
  float: right;
  width: calc(20 / 14 * 1em);
  height: calc(20 / 14 * 1em);
  margin: calc(10 / 14 * 1em) calc(10 / 14 * 1em) 0 0;
  fill: white;
}
</style>

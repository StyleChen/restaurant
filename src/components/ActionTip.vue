<template>
  <dl class="action-tip" :style="{height: (list.length+1)*50 +'px'}" v-show="active" @click.stop="() => { return }">
    <dt>消息</dt>
    <div class="list_wrapper" :style="{bottom: list.length > 6 ? -(list.length - 6)*50+'px':0}">
      <dd v-for="(item,index) in list" :key="index">{{item}}<div class="tishi"  @click.stop="onClick(index)">已处理</div></dd>
    </div>
  </dl>
</template>

<script>
export default {
  props: ['list', 'onClick', 'active'],
};
</script>


<style scoped>
.action-tip {
  position: absolute;
  top: 0;
  right: 25%;
  width: 50%;
  max-height: calc(350 / 12 * 1em);
  background-color: white;
  font-size: calc(12 / 16 * 1em);
  box-shadow: 0px 5px 8px 0 rgba(0, 0, 0, 0.25);
  overflow: hidden;
  z-index: 1007;
}

.action-tip dt,.action-tip dd {
  padding: calc(10 / 12 * 1em);
}

.action-tip dt {
  position: relative;
  z-index: 1008;
  background-color: white;
}

.action-tip dd {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #e5e5e5;
}

.list_wrapper {
  position: absolute;
  width: 100%;
  animation: scroll 4s linear infinite alternate;
}

.list_wrapper:hover {
  animation-play-state:paused;
}

.tishi {
  width: 70px;
  height: 30px;
  line-height: 30px;
  border-radius: 15px;
  background-color: #f2d7c7;
  color: #f06f23;
  text-align: center;
}

.tishi:hover {
  cursor: pointer;
}

@keyframes scroll {
  to {
    bottom: 0;
  }
}
</style>

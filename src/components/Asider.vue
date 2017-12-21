<template>
  <aside id="Aside">
    <ul>
      <router-link class="table table--all" tag="li" :to="{ path: basePath, query: { type: 'all' }}">全部桌型</router-link>
      <router-link class="table table--free" tag="li" :to="{ path: basePath, query: { type: 'free' }}">空闲桌</router-link>
      <router-link class="table table--started" tag="li" :to="{ path: basePath, query: { type: 'started' }}">开始桌</router-link>
    </ul>
  </aside>
</template>

<script>
export default {
  props: ['base-path'],
};
</script>


<style scoped>
aside {
  width: calc(176 / 16 * 1em);
  background-color: white;
  border-right: 1px solid #e8e8e8;
  height: calc(100vh - 120px);
}

aside ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.table {
  display: flex;
  align-items: center;
  height: calc(54 / 16 * 1em);
  text-indent: calc(48 / 16 * 1em);
  border-bottom: 1px solid #e8e8e8;
}

.router-link-exact-active {
  margin-right: -1px;
  background: url('../assets/img/red.png') no-repeat #e8e9ee;
}

.table--free::after {
  display: block;
  content: '';
  width: calc(10 / 16 * 1em);
  height: calc(10 / 16 * 1em);
  margin-left: 1.5em;
  background-color: #91b9f0;
}

.table--started::after {
  display: block;
  content: '';
  width: calc(10 / 16 * 1em);
  height: calc(10 / 16 * 1em);
  margin-left: 1.5em;
  background-color: #ff7a18;
}
</style>

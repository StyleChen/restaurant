<template>
  <!-- <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a href="https://vuejs.org" target="_blank">Core Docs</a>
      </li>
      <li>
        <a href="https://forum.vuejs.org" target="_blank">Forum</a>
      </li>
      <li>
        <a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a>
      </li>
      <li>
        <a href="https://twitter.com/vuejs" target="_blank">Twitter</a>
      </li>
      <br>
      <li>
        <a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a href="http://router.vuejs.org/" target="_blank">vue-router</a>
      </li>
      <li>
        <a href="http://vuex.vuejs.org/" target="_blank">vuex</a>
      </li>
      <li>
        <a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a>
      </li>
      <li>
        <a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a>
      </li>
    </ul>
    <div @click="a">{{getFullName}}</div>
    <div @click="incrementSuccess">{{count}}</div>
  </div> -->
<Carousel  class="message" v-model="value1" loop autoplay dots="inside" arrow="always" height="200px">
      <CarouselItem>
        <div class="demo-carousel">11111</div>
      </CarouselItem>
      <CarouselItem>
        <div class="demo-carousel">22222</div>
      </CarouselItem>
      <CarouselItem>
        <div class="demo-carousel">33333</div>
      </CarouselItem>
      <CarouselItem>
        <div class="demo-carousel">44444</div>
      </CarouselItem>
    </Carousel>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';

export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      value1: 0,
    };
  },
  methods: {
    ...mapMutations([
      'increment',
    ]),
    ...mapActions([
      'incrementSuccess',
    ]),
    a() {
      console.log(this.$store.state.count);
      console.log(this.$route);
    },
  },
  computed: {
    ...mapGetters([
      'getFullName',
    ]),
    count() {
      return this.$store.state.count;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.carousel {
  width: 200px;
  height: 100px;
}
</style>

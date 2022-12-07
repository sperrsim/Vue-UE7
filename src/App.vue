template>
<template>
  <Suspense>
    <template #default>
      <GameList />
    </template>
    <template #fallback>
      <span>Loading...</span>
    </template>
  </Suspense>
</template>

<script>
import GameList from './components/GameList.vue';

export default {
  name: 'App',
  components: {
    GameList,
  },
};
</script>

<style>
#app1 {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

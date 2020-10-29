<template>
    <div id="app">
        <div id="nav">
            <!-- 导航可能是 hash 值, 也可能是 history值-->
            <router-link to="/">Home</router-link>
            |
            <router-link to="/about">About</router-link>
        </div>
        <router-view/>
    </div>
</template>
<script>
  export default {
    name: 'App',
  }
</script>
<style>
</style>

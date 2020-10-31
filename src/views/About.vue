<template>
    <div class="about">
        <h1>About</h1>
        <router-link to="/about/a">about a</router-link>
        <router-link to="/about/b">about b</router-link>
        <router-view></router-view>
    </div>
</template>
<script>

  export default {
    name: 'About',
    components: {
    }
  }

</script>

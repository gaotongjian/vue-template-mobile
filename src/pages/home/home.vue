<template>
  <div>
    home
    <router-link to="/home/home1">去路由1</router-link>
    <router-link  to="/home/home2">去路由2</router-link>

    <router-view></router-view>
  </div>

</template>

<script>
export default {
  name: 'home',
  mounted () {
    console.log('home-mounted')
  }
}
</script>

<style>

</style>

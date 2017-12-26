<template>
  <h2>home--1<button @click="$router.go(-1)">返回</button></h2>
</template>

<script>
export default {
  name: 'home-1',
  mounted () {
    console.log('home-1-mounted')
  }
}
</script>

<style>

</style>
